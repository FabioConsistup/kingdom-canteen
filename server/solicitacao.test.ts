import { describe, expect, it } from 'vitest';
import { corsHeaders, handleSolicitacao } from './solicitacao';

const ORIGIN = 'https://kingdomcanteen.cloud';
const WWW = 'https://www.kingdomcanteen.cloud';

const request = (init: { method?: string; origin?: string; headers?: Record<string, string> } = {}) => {
  const headers = new Headers(init.headers);
  if (init.origin) headers.set('origin', init.origin);
  return new Request('https://kingdom-canteen.f-rodrigues-mg.workers.dev/api/solicitar-cashback', {
    method: init.method ?? 'GET',
    headers,
  });
};

describe('CORS — origens permitidas', () => {
  it.each([ORIGIN, WWW, 'http://localhost:5173', 'http://127.0.0.1:4173'])(
    'libera %s',
    (origin) => {
      const headers = corsHeaders(request({ origin }));
      expect(headers['access-control-allow-origin']).toBe(origin);
      expect(headers['access-control-allow-methods']).toBe('POST, OPTIONS');
      expect(headers.vary).toBe('Origin');
    },
  );

  it.each(['https://site-malicioso.com', 'https://kingdomcanteen.cloud.evil.com', 'null'])(
    'não libera %s',
    (origin) => {
      const headers = corsHeaders(request({ origin }));
      expect(headers['access-control-allow-origin']).toBeUndefined();
      expect(headers.vary).toBe('Origin');
    },
  );

  it('sem header Origin não emite allow-origin', () => {
    expect(corsHeaders(request())['access-control-allow-origin']).toBeUndefined();
  });
});

describe('handleSolicitacao — respostas com CORS', () => {
  const env = {}; // sem credenciais: suficiente para os status testados aqui

  it('responde 204 ao preflight OPTIONS', async () => {
    const response = await handleSolicitacao(request({ method: 'OPTIONS', origin: ORIGIN }), env);
    expect(response.status).toBe(204);
    expect(response.headers.get('access-control-allow-origin')).toBe(ORIGIN);
    expect(response.headers.get('access-control-allow-headers')).toBe('Content-Type');
    expect(response.headers.get('access-control-max-age')).toBe('86400');
  });

  it('preflight de origem não permitida não recebe allow-origin', async () => {
    const response = await handleSolicitacao(
      request({ method: 'OPTIONS', origin: 'https://site-malicioso.com' }),
      env,
    );
    expect(response.status).toBe(204);
    expect(response.headers.get('access-control-allow-origin')).toBeNull();
  });

  it('405 em GET, com CORS', async () => {
    const response = await handleSolicitacao(request({ method: 'GET', origin: ORIGIN }), env);
    expect(response.status).toBe(405);
    expect(response.headers.get('access-control-allow-origin')).toBe(ORIGIN);
  });

  it('413 quando o corpo declarado excede o limite, com CORS', async () => {
    const oversized = new Request('https://worker.dev/api/solicitar-cashback', {
      method: 'POST',
      headers: { origin: ORIGIN, 'content-length': String(20 * 1024 * 1024) },
    });
    const response = await handleSolicitacao(oversized, env);
    expect(response.status).toBe(413);
    expect(response.headers.get('access-control-allow-origin')).toBe(ORIGIN);
    await expect(response.json()).resolves.toMatchObject({ error: expect.stringContaining('10 MB') });
  });
});
