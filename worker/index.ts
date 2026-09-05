/**
 * Entrada do Cloudflare Worker (modelo Workers + Static Assets).
 *
 * O frontend é hospedado na Hostinger e chama este Worker de outra origem,
 * então as respostas da API carregam os cabeçalhos CORS. O Static Assets
 * continua servindo a cópia da página publicada no próprio Worker.
 *
 * Toda a regra de negócio continua em server/solicitacao.ts; este arquivo é
 * só o adaptador de runtime.
 */
import { corsHeaders, handleSolicitacao, json, type Env } from '../server/solicitacao';

const API_SOLICITACAO = '/api/solicitar-cashback';

/** O binding de assets é injetado pelo Workers quando `[assets]` está configurado. */
type WorkerEnv = Env & {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
};

export default {
  async fetch(request: Request, env: WorkerEnv): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (pathname === API_SOLICITACAO) {
      return handleSolicitacao(request, env);
    }

    // Qualquer outra rota /api/* é inexistente — não devolve o SPA por engano.
    if (pathname.startsWith('/api/')) {
      const cors = corsHeaders(request);
      if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: { ...cors, 'cache-control': 'no-store' } });
      }
      return json({ error: 'Rota não encontrada.' }, 404, cors);
    }

    // Fora de /api/* o Worker normalmente nem é invocado; o fallback mantém o
    // comportamento correto caso a rota chegue até aqui.
    return env.ASSETS.fetch(request);
  },
};
