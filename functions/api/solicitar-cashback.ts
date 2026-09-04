/**
 * Adaptador para Cloudflare Pages Functions.
 *
 * Trata todos os métodos (não só POST) para que uma requisição GET receba 405
 * em vez de cair no fallback de arquivo estático da Pages.
 */
import { handleSolicitacao, type Env } from '../../server/solicitacao';

export const onRequest = (context: { request: Request; env: Env }) =>
  handleSolicitacao(context.request, context.env);
