/**
 * Entrada do Cloudflare Worker (modelo Workers + Static Assets).
 *
 * A configuração em wrangler.toml usa `run_worker_first = ["/api/*"]`, então
 * apenas as rotas de API chegam aqui — HTML, CSS, JS e imagens são servidos
 * diretamente pelo Static Assets, sem passar pelo Worker.
 *
 * Toda a regra de negócio continua em server/solicitacao.ts; este arquivo é
 * só o adaptador de runtime.
 */
import { handleSolicitacao, type Env } from '../server/solicitacao';

const API_SOLICITACAO = '/api/solicitar-cashback';

/** O binding de assets é injetado pelo Workers quando `[assets]` está configurado. */
type WorkerEnv = Env & {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
};

const notFound = () =>
  new Response(JSON.stringify({ error: 'Rota não encontrada.' }), {
    status: 404,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

export default {
  async fetch(request: Request, env: WorkerEnv): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (pathname === API_SOLICITACAO) {
      return handleSolicitacao(request, env);
    }

    // Qualquer outra rota /api/* é inexistente — não devolve o SPA por engano.
    if (pathname.startsWith('/api/')) {
      return notFound();
    }

    // Fora de /api/* o Worker normalmente nem é invocado; o fallback mantém o
    // comportamento correto caso a rota chegue até aqui.
    return env.ASSETS.fetch(request);
  },
};
