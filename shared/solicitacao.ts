/**
 * Regras compartilhadas entre o formulário (frontend) e o endpoint (backend).
 * O backend revalida tudo — o frontend usa estas regras apenas para dar
 * feedback imediato ao usuário.
 */

export const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB

export const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
] as const;

export const ALLOWED_EXTENSIONS = ['pdf', 'jpg', 'jpeg', 'png', 'webp'] as const;

/** Texto exibido abaixo da área de upload. */
export const UPLOAD_HINT = 'PDF, JPG, PNG ou WEBP • máximo 10 MB';

export const FIELD_LABELS = {
  responsavelNome: 'Nome completo do responsável',
  responsavelTelefone: 'Telefone / WhatsApp do responsável',
  responsavelEmail: 'E-mail do responsável',
  alunoNome: 'Nome completo do aluno',
  alunoSerie: 'Série',
  alunoSala: 'Sala / Professora',
} as const;

export type FieldName = keyof typeof FIELD_LABELS;

export const FIELD_NAMES = Object.keys(FIELD_LABELS) as FieldName[];

export const MAX_FIELD_LENGTH: Record<FieldName, number> = {
  responsavelNome: 120,
  responsavelTelefone: 24,
  responsavelEmail: 160,
  alunoNome: 120,
  alunoSerie: 60,
  alunoSala: 120,
};

/** Formato de e-mail deliberadamente conservador. */
const EMAIL_RE = /^[^\s@,;:<>"'()[\]\\]+@[^\s@,;:<>"'()[\]\\]+\.[a-zA-Z]{2,}$/;

/** Caracteres de controle (inclui CR/LF) — vetor de header injection em e-mail. */
// eslint-disable-next-line no-control-regex
const CONTROL_RE = /[\x00-\x1F\x7F]/;

export const isValidEmail = (value: string) => EMAIL_RE.test(value) && value.length <= 160;

/** Conta apenas os dígitos do telefone: 10 (fixo) ou 11 (celular). */
export const isValidPhone = (value: string) => {
  const digits = value.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 11;
};

/** Remove caracteres de controle e normaliza espaços. */
export const sanitizeText = (value: string) =>
  value
    // eslint-disable-next-line no-control-regex
    .replace(/[\x00-\x1F\x7F]/g, " ")
    .replace(/\s+/g, ' ')
    .trim();

export const hasControlChars = (value: string) => CONTROL_RE.test(value);

export const fileExtension = (name: string) => name.split('.').pop()?.toLowerCase() ?? '';

export const isAllowedExtension = (name: string) =>
  (ALLOWED_EXTENSIONS as readonly string[]).includes(fileExtension(name));

export const isAllowedMime = (type: string) =>
  (ALLOWED_MIME_TYPES as readonly string[]).includes(type);

export const formatBytes = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1).replace('.', ',')} MB`;
};

export type SolicitacaoFields = Record<FieldName, string>;

export type ValidationErrors = Partial<Record<FieldName | 'comprovante' | 'consentimento', string>>;

/** Valida os campos de texto. Usada nos dois lados. */
export function validateFields(values: Partial<SolicitacaoFields>): ValidationErrors {
  const errors: ValidationErrors = {};

  for (const name of FIELD_NAMES) {
    const raw = (values[name] ?? '').trim();

    if (!raw) {
      errors[name] = 'Campo obrigatório.';
      continue;
    }
    if (raw.length > MAX_FIELD_LENGTH[name]) {
      errors[name] = `Máximo de ${MAX_FIELD_LENGTH[name]} caracteres.`;
      continue;
    }
    if (hasControlChars(raw)) {
      errors[name] = 'O campo contém caracteres inválidos.';
      continue;
    }
    if (name === 'responsavelEmail' && !isValidEmail(raw)) {
      errors[name] = 'Informe um e-mail válido.';
      continue;
    }
    if (name === 'responsavelTelefone' && !isValidPhone(raw)) {
      errors[name] = 'Informe um telefone com DDD.';
    }
  }

  return errors;
}

/** Máscara (XX) XXXXX-XXXX, tolerante a números incompletos. */
export function maskPhone(value: string) {
  const d = value.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : '';
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}
