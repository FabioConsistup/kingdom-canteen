# Kingdom Canteen — Landing page

Landing page de página única (navegação por âncoras) da cantina escolar **Kingdom Canteen**,
com a apresentação da conta digital IUUPI e a promoção de 10% de cashback bônus.

## Stack

- [Vite](https://vitejs.dev) 5
- React 18 + TypeScript (modo `strict`)
- Tailwind CSS 3
- Sem dependências de UI ou de animação: os efeitos usam apenas CSS/transições nativas.

## Como rodar

```bash
npm install
npm run dev      # http://localhost:5173
```

Outros scripts:

```bash
npm run build      # typecheck + build de produção em dist/
npm run preview    # serve o build de produção
npm run typecheck  # apenas o TypeScript
```

## Deploy

`npm run build` gera a pasta `dist/`, que é 100% estática e pode ser publicada em
Vercel, Netlify, Cloudflare Pages, GitHub Pages ou qualquer servidor web.

## Estrutura

```
public/assets/       logotipo oficial (também usado como favicon e imagem Open Graph)
src/data/content.ts  todo o conteúdo textual, regras e dados da promoção
src/components/      componentes da página
Midia/               arquivos originais fornecidos (logo e referência IUUPI)
```

O conteúdo (textos, regulamento, FAQ, e-mail, período e valores) está centralizado em
`src/data/content.ts`. Para atualizar a promoção, edite apenas esse arquivo.
