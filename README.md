# Kingdom Canteen — Landing page

Landing page de página única (navegação por âncoras) da cantina escolar **Kingdom Canteen**,
com a apresentação da conta digital IUUPI, o cashback padrão de 10%, o bônus adicional de
10% da promoção de cadastramento facial e o formulário de solicitação do bônus.

## Stack

- [Vite](https://vitejs.dev) 5
- React 18 + TypeScript (modo `strict`)
- Tailwind CSS 3
- Cloudflare Workers + Static Assets, com o endpoint escrito em APIs web padrão (`Request`/`Response`/`FormData`)
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

## Deploy — Cloudflare Workers + Static Assets

A página é servida pelo Static Assets e **apenas `/api/*` executa o Worker**, graças ao
`run_worker_first` em [`wrangler.toml`](wrangler.toml). Rotas desconhecidas caem no
fallback de SPA.

Configuração no painel do Cloudflare (Workers → Settings → Build):

```
Build command:   npm run build
Deploy command:  npx wrangler deploy
```

Localmente, `npm run workers:dev` roda a página e o endpoint no mesmo runtime da
produção (`workerd`), e `npm run deploy` publica a partir da sua máquina.

O limite de corpo do Workers acomoda com folga os 10 MB aceitos pelo formulário.

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
