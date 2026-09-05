/**
 * Endereço da API.
 *
 * O frontend é estático (Hostinger) e a API roda no Cloudflare Worker, em
 * outro domínio. `VITE_API_BASE_URL` é embutida na build — é uma URL pública,
 * não um segredo. Vazia, as chamadas ficam relativas (útil no `npm run dev` e
 * quando a página é servida pelo próprio Worker).
 */
const base = (import.meta.env.VITE_API_BASE_URL ?? '').trim().replace(/\/+$/, '');

export const API_SOLICITACAO_URL = `${base}/api/solicitar-cashback`;
