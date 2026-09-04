/** Adaptador para funções serverless da Vercel / Netlify (Web handler). */
import { handleSolicitacao, type Env } from '../server/solicitacao';

const readEnv = (): Env => {
  const proc = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process;
  return (proc?.env ?? {}) as Env;
};

export default (request: Request) => handleSolicitacao(request, readEnv());
