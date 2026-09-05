/**
 * Endpoint de solicitação do cashback bônus.
 *
 * Escrito com APIs web padrão (Request/Response/FormData) para rodar tanto no
 * Cloudflare Workers quanto em funções serverless da Vercel/Netlify e no
 * middleware de desenvolvimento do Vite.
 *
 * Envia dois e-mails via API HTTP do Resend:
 *   1. solicitação completa + comprovante anexado para a caixa da cantina;
 *   2. confirmação simples para o e-mail do responsável.
 */

import {
  FIELD_NAMES,
  MAX_FILE_BYTES,
  isAllowedExtension,
  isAllowedMime,
  isValidEmail,
  sanitizeText,
  validateFields,
  type FieldName,
  type SolicitacaoFields,
  type ValidationErrors,
} from '../shared/solicitacao';

export type Env = {
  /** Chave da API do serviço transacional (Resend). */
  EMAIL_API_KEY?: string;
  /** Remetente verificado, ex.: "Kingdom Canteen <bonus@kingdomcanteen.cloud>". */
  EMAIL_FROM?: string;
  /** Caixa que recebe as solicitações. Default: bonus@kingdomcanteen.cloud */
  EMAIL_TO?: string;
};

const DEFAULT_TO = 'bonus@kingdomcanteen.cloud';
const RESEND_ENDPOINT = 'https://api.resend.com/emails';
/** Folga sobre o limite do arquivo para acomodar os campos de texto do multipart. */
const MAX_BODY_BYTES = MAX_FILE_BYTES + 1024 * 1024;

/* ------------------------------------------------------------------ *
 * CORS
 *
 * O frontend é servido pela Hostinger e a API roda no Cloudflare Worker,
 * então toda requisição é cross-origin. A lista é explícita — nunca "*".
 * ------------------------------------------------------------------ */

const ALLOWED_ORIGINS = new Set([
  'https://kingdomcanteen.cloud',
  'https://www.kingdomcanteen.cloud',
  // Enquanto o certificado da Hostinger não estiver ativo, o site pode ser
  // acessado por http. Remover estas duas linhas quando o SSL estiver no ar.
  'http://kingdomcanteen.cloud',
  'http://www.kingdomcanteen.cloud',
]);

/** Qualquer porta de localhost/127.0.0.1, apenas para desenvolvimento. */
const LOCALHOST_RE = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;

const isAllowedOrigin = (origin: string) =>
  ALLOWED_ORIGINS.has(origin) || LOCALHOST_RE.test(origin);

/**
 * Cabeçalhos CORS para a origem da requisição. Origem não permitida recebe
 * resposta sem `Access-Control-Allow-Origin` — o navegador é quem bloqueia.
 */
export function corsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get('origin') ?? '';
  const headers: Record<string, string> = { vary: 'Origin' };

  if (origin && isAllowedOrigin(origin)) {
    headers['access-control-allow-origin'] = origin;
    headers['access-control-allow-methods'] = 'POST, OPTIONS';
    headers['access-control-allow-headers'] = 'Content-Type';
    headers['access-control-max-age'] = '86400';
  }

  return headers;
}

/** Toda resposta da API passa por aqui, então todo status carrega o CORS. */
export const json = (body: unknown, status: number, cors: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      ...cors,
    },
  });

/* ------------------------------------------------------------------ *
 * Rate limiting (best-effort)
 * ------------------------------------------------------------------ */

const RATE_LIMIT = { max: 10, windowMs: 15 * 60 * 1000 };
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(ip, recent);

  // Poda simples para a memória não crescer sem limite entre invocações quentes.
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_LIMIT.windowMs)) hits.delete(key);
    }
  }

  return recent.length > RATE_LIMIT.max;
}

/* ------------------------------------------------------------------ *
 * Utilidades
 * ------------------------------------------------------------------ */

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

function toBase64(bytes: Uint8Array): string {
  let binary = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

/** Confere a assinatura real do arquivo — não confia no MIME informado. */
function sniffType(bytes: Uint8Array): string | null {
  const startsWith = (...sig: number[]) => sig.every((byte, i) => bytes[i] === byte);

  if (startsWith(0x25, 0x50, 0x44, 0x46)) return 'application/pdf'; // %PDF
  if (startsWith(0xff, 0xd8, 0xff)) return 'image/jpeg';
  if (startsWith(0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a)) return 'image/png';
  if (
    startsWith(0x52, 0x49, 0x46, 0x46) && // RIFF
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50 // WEBP
  ) {
    return 'image/webp';
  }
  return null;
}

/** Nome de arquivo seguro para o cabeçalho do anexo. */
function safeFileName(name: string): string {
  const cleaned = name
    .split(/[\\/]/)
    .pop()!
    .replace(/[^\w.\- ]+/g, '_')
    .slice(0, 80)
    .trim();
  return cleaned || 'comprovante';
}

/* ------------------------------------------------------------------ *
 * Montagem dos e-mails
 * ------------------------------------------------------------------ */

const ROW_LABELS: Record<FieldName, string> = {
  responsavelNome: 'Nome',
  responsavelTelefone: 'Telefone / WhatsApp',
  responsavelEmail: 'E-mail',
  alunoNome: 'Nome',
  alunoSerie: 'Série',
  alunoSala: 'Sala / Professora',
};

function buildInternalEmail(fields: SolicitacaoFields, fileName: string) {
  const block = (title: string, names: FieldName[]) => `
    <h2 style="margin:24px 0 8px;font:600 13px/1.4 system-ui,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#29568f">${title}</h2>
    <table style="border-collapse:collapse;width:100%">
      ${names
        .map(
          (name) => `<tr>
            <td style="padding:6px 12px 6px 0;font:400 14px/1.5 system-ui,sans-serif;color:#4c5771;white-space:nowrap">${ROW_LABELS[name]}</td>
            <td style="padding:6px 0;font:600 14px/1.5 system-ui,sans-serif;color:#172033">${escapeHtml(fields[name])}</td>
          </tr>`,
        )
        .join('')}
    </table>`;

  const html = `<div style="max-width:640px;margin:0 auto;padding:24px;background:#ffffff">
    <h1 style="margin:0;font:800 20px/1.3 system-ui,sans-serif;color:#172033">Solicitação de cashback bônus</h1>
    <p style="margin:4px 0 0;font:600 13px/1.4 system-ui,sans-serif;color:#ef963e">Kingdom Canteen</p>
    ${block('Dados do responsável', ['responsavelNome', 'responsavelTelefone', 'responsavelEmail'])}
    ${block('Dados do aluno', ['alunoNome', 'alunoSerie', 'alunoSala'])}
    <h2 style="margin:24px 0 8px;font:600 13px/1.4 system-ui,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#29568f">Comprovante</h2>
    <p style="margin:0;font:600 14px/1.5 system-ui,sans-serif;color:#172033">Arquivo anexado: ${escapeHtml(fileName)}</p>
  </div>`;

  const text = [
    'SOLICITAÇÃO DE CASHBACK BÔNUS',
    'KINGDOM CANTEEN',
    '',
    'DADOS DO RESPONSÁVEL',
    `Nome: ${fields.responsavelNome}`,
    `Telefone / WhatsApp: ${fields.responsavelTelefone}`,
    `E-mail: ${fields.responsavelEmail}`,
    '',
    'DADOS DO ALUNO',
    `Nome: ${fields.alunoNome}`,
    `Série: ${fields.alunoSerie}`,
    `Sala / Professora: ${fields.alunoSala}`,
    '',
    'COMPROVANTE',
    `Arquivo anexado: ${fileName}`,
  ].join('\n');

  return { html, text };
}

function buildConfirmationEmail(fields: SolicitacaoFields, fileName: string) {
  const html = `<div style="max-width:640px;margin:0 auto;padding:24px;background:#ffffff">
    <h1 style="margin:0 0 16px;font:800 20px/1.3 system-ui,sans-serif;color:#172033">Recebemos sua solicitação</h1>
    <p style="margin:0 0 12px;font:400 15px/1.6 system-ui,sans-serif;color:#4c5771">Olá, ${escapeHtml(fields.responsavelNome)}.</p>
    <p style="margin:0 0 12px;font:400 15px/1.6 system-ui,sans-serif;color:#4c5771">
      Recebemos sua solicitação de cashback bônus referente ao aluno <strong style="color:#172033">${escapeHtml(fields.alunoNome)}</strong>.
    </p>
    <table style="border-collapse:collapse;margin:16px 0;width:100%;background:#f7f8fa;border-radius:12px">
      <tr><td style="padding:12px 16px 4px;font:400 13px/1.4 system-ui,sans-serif;color:#6b7793">Aluno</td></tr>
      <tr><td style="padding:0 16px 8px;font:600 15px/1.4 system-ui,sans-serif;color:#172033">${escapeHtml(fields.alunoNome)}</td></tr>
      <tr><td style="padding:4px 16px 4px;font:400 13px/1.4 system-ui,sans-serif;color:#6b7793">Série</td></tr>
      <tr><td style="padding:0 16px 8px;font:600 15px/1.4 system-ui,sans-serif;color:#172033">${escapeHtml(fields.alunoSerie)}</td></tr>
      <tr><td style="padding:4px 16px 4px;font:400 13px/1.4 system-ui,sans-serif;color:#6b7793">Sala / Professora</td></tr>
      <tr><td style="padding:0 16px 8px;font:600 15px/1.4 system-ui,sans-serif;color:#172033">${escapeHtml(fields.alunoSala)}</td></tr>
      <tr><td style="padding:4px 16px 4px;font:400 13px/1.4 system-ui,sans-serif;color:#6b7793">Comprovante recebido</td></tr>
      <tr><td style="padding:0 16px 14px;font:600 15px/1.4 system-ui,sans-serif;color:#172033">${escapeHtml(fileName)}</td></tr>
    </table>
    <p style="margin:0 0 12px;font:400 15px/1.6 system-ui,sans-serif;color:#4c5771">
      Sua solicitação será analisada pela equipe da Kingdom Canteen. O cashback bônus poderá ser creditado em até 7 dias úteis, conforme as condições da promoção.
    </p>
    <p style="margin:0;font:400 13px/1.6 system-ui,sans-serif;color:#6b7793">
      Este e-mail é uma confirmação de recebimento da solicitação.
    </p>
  </div>`;

  const text = [
    `Olá, ${fields.responsavelNome}.`,
    '',
    `Recebemos sua solicitação de cashback bônus referente ao aluno ${fields.alunoNome}.`,
    '',
    'Dados informados:',
    `Aluno: ${fields.alunoNome}`,
    `Série: ${fields.alunoSerie}`,
    `Sala / Professora: ${fields.alunoSala}`,
    `Comprovante recebido: ${fileName}`,
    '',
    'Sua solicitação será analisada pela equipe da Kingdom Canteen.',
    'O cashback bônus poderá ser creditado em até 7 dias úteis, conforme as condições da promoção.',
    '',
    'Este e-mail é uma confirmação de recebimento da solicitação.',
  ].join('\n');

  return { html, text };
}

type ResendPayload = {
  from: string;
  to: string[];
  subject: string;
  html: string;
  text: string;
  reply_to?: string[];
  attachments?: { filename: string; content: string }[];
};

async function sendEmail(apiKey: string, payload: ResendPayload) {
  const response = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${apiKey}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new Error(`Resend ${response.status}: ${detail.slice(0, 300)}`);
  }
}

/* ------------------------------------------------------------------ *
 * Handler
 * ------------------------------------------------------------------ */

export async function handleSolicitacao(request: Request, env: Env): Promise<Response> {
  const cors = corsHeaders(request);

  // Preflight: o navegador pergunta antes do POST cross-origin.
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: { ...cors, 'cache-control': 'no-store' } });
  }

  if (request.method !== 'POST') {
    return json({ error: 'Método não permitido.' }, 405, cors);
  }

  const ip =
    request.headers.get('cf-connecting-ip') ??
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'desconhecido';

  if (isRateLimited(ip)) {
    return json({ error: 'Muitas solicitações em pouco tempo. Tente novamente mais tarde.' }, 429, cors);
  }

  const declaredLength = Number(request.headers.get('content-length') ?? '0');
  if (declaredLength > MAX_BODY_BYTES) {
    return json({ error: 'O arquivo enviado é maior que o limite de 10 MB.' }, 413, cors);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ error: 'Não foi possível ler os dados enviados.' }, 400, cors);
  }

  // --- campos de texto -------------------------------------------------
  const values: Partial<SolicitacaoFields> = {};
  for (const name of FIELD_NAMES) {
    const raw = form.get(name);
    values[name] = typeof raw === 'string' ? sanitizeText(raw) : '';
  }

  const errors: ValidationErrors = validateFields(values);

  if (form.get('consentimento') !== 'true') {
    errors.consentimento = 'É necessário confirmar as informações.';
  }

  // --- comprovante -----------------------------------------------------
  const upload = form.get('comprovante');
  let bytes: Uint8Array | null = null;
  let fileName = '';

  if (!upload || typeof upload === 'string') {
    errors.comprovante = 'Anexe o comprovante da recarga.';
  } else {
    const file = upload as File;
    fileName = safeFileName(file.name || 'comprovante');

    if (file.size === 0) {
      errors.comprovante = 'O arquivo enviado está vazio.';
    } else if (file.size > MAX_FILE_BYTES) {
      errors.comprovante = 'O arquivo precisa ter no máximo 10 MB.';
    } else if (!isAllowedExtension(fileName)) {
      errors.comprovante = 'Formato não aceito. Envie PDF, JPG, PNG ou WEBP.';
    } else if (!isAllowedMime(file.type)) {
      errors.comprovante = 'Formato não aceito. Envie PDF, JPG, PNG ou WEBP.';
    } else {
      bytes = new Uint8Array(await file.arrayBuffer());
      const sniffed = sniffType(bytes);
      if (!sniffed || sniffed !== file.type) {
        errors.comprovante = 'O conteúdo do arquivo não corresponde a um PDF ou imagem válida.';
        bytes = null;
      }
    }
  }

  if (Object.keys(errors).length > 0) {
    return json({ error: 'Verifique os campos destacados.', fields: errors }, 400, cors);
  }

  const fields = values as SolicitacaoFields;

  // --- configuração do serviço de e-mail -------------------------------
  const apiKey = env.EMAIL_API_KEY;
  const from = env.EMAIL_FROM;
  const to = env.EMAIL_TO || DEFAULT_TO;

  if (!apiKey || !from) {
    console.error('[solicitacao] EMAIL_API_KEY ou EMAIL_FROM ausente no ambiente.');
    return json(
      { error: 'O envio de solicitações está temporariamente indisponível. Tente novamente mais tarde.' },
      503,
      cors,
    );
  }

  // O e-mail do responsável já passou por isValidEmail; a checagem extra
  // evita qualquer uso de valor inesperado como destinatário.
  if (!isValidEmail(fields.responsavelEmail)) {
    return json(
      { error: 'Verifique os campos destacados.', fields: { responsavelEmail: 'Informe um e-mail válido.' } },
      400,
      cors,
    );
  }

  const attachmentContent = bytes ? toBase64(bytes) : '';
  const internal = buildInternalEmail(fields, fileName);
  const confirmation = buildConfirmationEmail(fields, fileName);

  // --- e-mail 1: para a Kingdom Canteen --------------------------------
  try {
    await sendEmail(apiKey, {
      from,
      to: [to],
      reply_to: [fields.responsavelEmail],
      subject: `Solicitação de Cashback Bônus - ${fields.alunoNome}`,
      html: internal.html,
      text: internal.text,
      attachments: [{ filename: fileName, content: attachmentContent }],
    });
  } catch (error) {
    console.error('[solicitacao] falha ao enviar e-mail interno:', error);
    return json(
      { error: 'Não foi possível enviar sua solicitação agora. Verifique os dados e tente novamente.' },
      502,
      cors,
    );
  }

  // --- e-mail 2: confirmação para o responsável ------------------------
  let confirmationSent = true;
  try {
    await sendEmail(apiKey, {
      from,
      to: [fields.responsavelEmail],
      subject: 'Recebemos sua solicitação de cashback - Kingdom Canteen',
      html: confirmation.html,
      text: confirmation.text,
    });
  } catch (error) {
    // A solicitação já chegou à cantina — não é motivo para reportar falha.
    confirmationSent = false;
    console.error('[solicitacao] falha ao enviar confirmação ao responsável:', error);
  }

  return json({ ok: true, confirmationSent }, 200, cors);
}
