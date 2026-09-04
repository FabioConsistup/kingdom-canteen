import { defineConfig, loadEnv, type Plugin, type ViteDevServer } from 'vite';
import react from '@vitejs/plugin-react';
import type { Env } from './server/solicitacao';

const API_PATH = '/api/solicitar-cashback';

/**
 * Em produção o endpoint roda como função serverless (Cloudflare Pages
 * Functions ou Vercel/Netlify). Este plugin monta o mesmo handler no servidor
 * de desenvolvimento para que o formulário seja testável com `npm run dev`.
 */
function apiDevServer(env: Env): Plugin {
  return {
    name: 'kingdom-canteen:api-dev',
    apply: 'serve',
    configureServer(server: ViteDevServer) {
      server.middlewares.use(API_PATH, async (req, res) => {
        try {
          const chunks: Buffer[] = [];
          for await (const chunk of req) chunks.push(chunk as Buffer);
          const body = Buffer.concat(chunks);

          const headers = new Headers();
          for (const [key, value] of Object.entries(req.headers)) {
            if (typeof value === 'string') headers.set(key, value);
            else if (Array.isArray(value)) headers.set(key, value.join(', '));
          }

          const request = new Request(`http://localhost${API_PATH}`, {
            method: req.method ?? 'GET',
            headers,
            body: body.length > 0 ? body : undefined,
          });

          const { handleSolicitacao } = (await server.ssrLoadModule('/server/solicitacao.ts')) as {
            handleSolicitacao: (request: Request, env: Env) => Promise<Response>;
          };

          const response = await handleSolicitacao(request, env);
          res.statusCode = response.status;
          response.headers.forEach((value, key) => res.setHeader(key, value));
          res.end(Buffer.from(await response.arrayBuffer()));
        } catch (error) {
          server.config.logger.error(`[api-dev] ${String(error)}`);
          res.statusCode = 500;
          res.setHeader('content-type', 'application/json; charset=utf-8');
          res.end(JSON.stringify({ error: 'Erro interno no servidor de desenvolvimento.' }));
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  // Carrega .env / .env.local sem expor as chaves ao bundle do cliente.
  const env = loadEnv(mode, process.cwd(), '') as unknown as Env;

  return {
    plugins: [react(), apiDevServer(env)],
    server: { port: 5173, open: false },
  };
});
