# Kingdom Canteen — Landing page

Landing page de página única (navegação por âncoras) da cantina escolar **Kingdom Canteen**,
com a apresentação da conta digital IUUPI, o cashback padrão de 10%, o bônus adicional de
10% da promoção de cadastramento facial e o formulário de solicitação do bônus.

## Stack

- [Vite](https://vitejs.dev) 5
- React 18 + TypeScript (modo `strict`)
- Tailwind CSS 3
- Frontend estático (Hostinger) + API no Cloudflare Worker, escrita em APIs web padrão (`Request`/`Response`/`FormData`)
- Sem dependências de UI, de animação ou de SDK de e-mail

## Como rodar

**Requer Node 22 ou superior** — o Wrangler 4 não roda em versões anteriores.
O `.nvmrc` e o `.node-version` já fixam a 22.

```bash
npm install
npm run dev      # http://localhost:5173
```

O servidor de desenvolvimento também monta o endpoint em
`POST /api/solicitar-cashback`, então o formulário é testável localmente.

Outros scripts:

```bash
npm run build        # typecheck + build de produção em dist/
npm run workers:dev  # build + runtime real do Worker (página + endpoint)
npm run deploy       # build + wrangler deploy
npm run preview      # serve só o build estático, sem o endpoint
npm run typecheck    # apenas o TypeScript
```

## Variáveis de ambiente

O envio de e-mail usa a API HTTP do [Resend](https://resend.com). Copie `.env.example`
para `.env.local` (desenvolvimento) ou configure as variáveis no painel do host
(produção). **Nenhuma chave é exposta ao navegador** — elas só são lidas no servidor.

| Variável | Obrigatória | Descrição |
| --- | --- | --- |
| `EMAIL_API_KEY` | sim | Chave da API do Resend (começa com `re_`). |
| `EMAIL_FROM` | sim | Remetente verificado, ex.: `Kingdom Canteen <bonus@kingdomcanteen.cloud>`. O domínio precisa estar validado (SPF/DKIM) no provedor. |
| `EMAIL_TO` | não | Caixa que recebe as solicitações. Padrão: `bonus@kingdomcanteen.cloud`. |

Sem `EMAIL_API_KEY` e `EMAIL_FROM` o endpoint responde **503** com uma mensagem
genérica e registra o motivo no log do servidor — nunca finge que o envio ocorreu.

## O endpoint

`POST /api/solicitar-cashback` recebe `multipart/form-data` e envia dois e-mails:

1. **para a cantina** — todos os dados do responsável e do aluno, com o comprovante
   como anexo real e `reply_to` apontando para o e-mail do responsável;
2. **para o responsável** — confirmação de recebimento.

Validações server-side: campos obrigatórios, tamanho máximo por campo, e-mail e
telefone, remoção de caracteres de controle (header injection), tamanho do arquivo
(10 MB), extensão, MIME type e **assinatura real do arquivo** (magic bytes), além de
rate limiting best-effort por IP.

O núcleo fica em [`server/solicitacao.ts`](server/solicitacao.ts) e é reaproveitado por
adaptadores finos de runtime, sem duplicar regra de negócio:

- [`worker/index.ts`](worker/index.ts) — Cloudflare Workers (produção);
- `api/solicitar-cashback.ts` — Vercel / Netlify (opcional, não usado hoje);
- plugin de desenvolvimento em `vite.config.ts`, para o `npm run dev` com HMR.

## Arquitetura de produção

O frontend e a API vivem em hosts diferentes:

| Camada | Onde | Endereço |
| --- | --- | --- |
| Frontend | Hostinger (estático) | https://kingdomcanteen.cloud |
| API | Cloudflare Worker | https://kingdom-canteen.f-rodrigues-mg.workers.dev |

O formulário chama `${VITE_API_BASE_URL}/api/solicitar-cashback` — uma requisição
cross-origin. O Worker responde com CORS restrito às origens do site e a
localhost; nunca `*`. O preflight `OPTIONS` e todos os status (200, 400, 404,
405, 413, 429, 500, 502, 503) carregam os cabeçalhos.

`VITE_API_BASE_URL` é embutida na build e **não é segredo** — o valor de produção
está versionado em `.env.production`. Vazia, as chamadas ficam relativas, o que
serve ao `npm run dev` e à cópia da página publicada no próprio Worker.

### Publicar o frontend na Hostinger

```bash
npm ci
npm run build
```

Suba o **conteúdo** de `dist/` (não a pasta) em `public_html`, de modo que fique
`public_html/index.html` e `public_html/assets/…`. O `.htaccess` incluído faz o
fallback de SPA preservando arquivos reais, além de compressão e cache.

O arquivo `CNAME` gerado em `dist/` serve apenas ao GitHub Pages e pode ser
descartado no envio para a Hostinger.

### Publicar a API no Cloudflare

```
Build command:   npm run build
Deploy command:  npx wrangler deploy
```

Localmente, `npm run workers:dev` roda a API no mesmo runtime da produção
(`workerd`). O Worker é independente da Hostinger: continua funcionando mesmo
que o site esteja fora do ar, e vice-versa.

## Estrutura

```
public/assets/       logotipo oficial (favicon e imagem Open Graph)
src/data/content.ts  todo o conteúdo textual, regras e dados da promoção
src/components/      componentes da página
shared/              regras de validação usadas pelo frontend e pelo backend
server/              núcleo do endpoint de solicitação
worker/              entrada do Cloudflare Worker
api/                 adaptador serverless alternativo (Vercel / Netlify)
Midia/               arquivos originais fornecidos (logo e identidade visual)
```

O conteúdo (textos, regulamento, FAQ, e-mail, período e valores) está centralizado em
`src/data/content.ts`. Para atualizar a promoção, edite apenas esse arquivo.
