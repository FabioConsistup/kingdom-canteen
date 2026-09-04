/** Adaptador para Cloudflare Pages Functions. */
import { handleSolicitacao, type Env } from '../../server/solicitacao';

export const onRequestPost = (context: { request: Request; env: Env }) =>
  handleSolicitacao(context.request, context.env);
