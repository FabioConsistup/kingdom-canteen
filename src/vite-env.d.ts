/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base da API (Cloudflare Worker). Vazia = chamadas relativas. */
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
