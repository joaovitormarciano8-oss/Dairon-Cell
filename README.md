# Site institucional — Dairon Cell

Site de uma página (one-page) da **Dairon Cell**, com as seções Início, Produtos, Testando, Assistência técnica, Sobre, Clientes e Contato.

- **Custo:** R$ 0,00. HTML5 + CSS3 + JavaScript puro, sem framework, sem etapa de build, sem serviços pagos.
- **Fontes:** Google Fonts (Sora e Inter), gratuitas.
- **Imagens:** ilustrações próprias em SVG/CSS. Nenhuma imagem externa que possa quebrar.
- **Contato:** todos os botões de WhatsApp já vêm com mensagens prontas.

## Estrutura

```
dairon-cell-site/
├── index.html            Página principal (todo o conteúdo)
├── 404.html              Página de erro
├── css/styles.css        Estilos (cores e fontes no topo, em :root)
├── js/config.js          ⭐ DADOS DA EMPRESA (edite aqui)
├── js/main.js            Interações (menu, animações, links)
├── assets/img/           Ícones e imagem de compartilhamento (og-image.png)
├── favicon.svg
├── site.webmanifest
├── robots.txt
├── _headers              Cabeçalhos de cache/segurança (Cloudflare Pages)
├── .nojekyll             Necessário para o GitHub Pages
└── CHECKLIST-DADOS.md    O que ainda depende da empresa
```

## Como atualizar os dados

Abra **`js/config.js`** e preencha os campos. Tudo que estiver vazio aparece no site como **"A confirmar"**.

| Campo         | O que é                                   | Exemplo |
|---------------|-------------------------------------------|---------|
| `whatsapp`    | Número com 55 + DDD, só dígitos           | `"5533999360317"` |
| `instagram`   | Usuário sem @                             | `"daironcell"` |
| `endereco`    | Endereço completo                         | `"Rua X, 123 – Centro, Cidade – MG"` |
| `horarios`    | Lista de dias e horários                  | `[{ dias: "Segunda a sexta", horas: "09h às 18h" }]` |
| `mapaEmbed`   | Link do mapa incorporado do Google Maps   | `"https://www.google.com/maps/embed?pb=..."` |
| `mapaLink`    | Link para abrir a rota                    | `"https://maps.app.goo.gl/..."` |

**Como pegar o mapa (grátis):** Google Maps → pesquise a loja → **Compartilhar** → **Incorporar um mapa** → copie apenas o endereço que está dentro de `src="..."`.

**Mensagens do WhatsApp:** cada botão tem um atributo `data-wa="..."` no `index.html` com a mensagem pré-configurada. Basta alterar o texto.

**Lista de serviços da assistência:** no `index.html`, procure o comentário `PLACEHOLDER` na seção Assistência e troque pela lista oficial.

**Cores:** no topo de `css/styles.css` (`--black`, `--white`, `--orange`, `--gray`).

## Como executar no computador

Não precisa instalar nada. Opções:

1. **Mais simples:** dê dois cliques em `index.html`.
2. **Com servidor local** (recomendado para testar como no ar):
   ```bash
   # Python (já vem no macOS/Linux)
   python3 -m http.server 8080
   # ou Node.js
   npx serve .
   ```
   Depois abra http://localhost:8080

## Como publicar grátis

### Opção A — Cloudflare Pages (recomendada)
Rápido, grátis, HTTPS automático e endereço `*.pages.dev`.

1. Crie uma conta gratuita em https://dash.cloudflare.com
2. **Workers & Pages** → **Create** → **Pages** → **Upload assets** (enviar arquivos).
3. Dê um nome ao projeto (ex.: `daironcell`) e arraste a pasta inteira do site.
4. Pronto: o site fica em `https://daironcell.pages.dev` (se o nome estiver livre).

Para atualizar, envie a pasta novamente (ou conecte um repositório do GitHub para publicar a cada alteração).

### Opção B — GitHub Pages
1. Crie uma conta gratuita em https://github.com
2. Crie um repositório **público** (ex.: `daironcell-site`).
3. **Add file → Upload files** e envie *o conteúdo* da pasta (o `index.html` deve ficar na raiz).
4. **Settings → Pages → Source: Deploy from a branch → Branch: `main` / `(root)`** → Save.
5. Em 1 a 2 minutos o site fica em `https://SEU-USUARIO.github.io/daironcell-site/`.

### Depois de publicar
- Coloque o link do site na **bio do Instagram**.
- Na `index.html`, troque `content="assets/img/og-image.png"` por o endereço completo
  (ex.: `https://daironcell.pages.dev/assets/img/og-image.png`) para a prévia aparecer bonita no WhatsApp.
- Opcional: adicione `<link rel="canonical" href="https://SEU-ENDERECO/">` no `<head>`.
- **Domínio próprio** (ex.: `daironcell.com.br`) é **pago** (registro.br cobra anuidade). Não é necessário: o endereço gratuito `.pages.dev` ou `.github.io` funciona normalmente. Se um dia quiserem, as duas plataformas aceitam domínio próprio sem custo extra de hospedagem.
- Grátis e muito útil: criar/atualizar o **Perfil da Empresa no Google** (Google Maps) da loja.

## O que foi testado

- Desktop (1440 px), tablet (820 px) e celular (390 px), sem rolagem horizontal.
- Menu mobile (abrir, fechar, fechar com Esc, fechar ao clicar em um item).
- Todos os links internos apontam para seções existentes.
- 14 botões de WhatsApp com mensagem pré-configurada e links do Instagram.
- Preenchimento automático de endereço, horários e mapa pelo `config.js`.
- Sem erros de JavaScript no console.

## Acessibilidade e SEO

- Link "Pular para o conteúdo", foco visível, `aria-label` nos botões de ícone, navegação por teclado.
- Respeita "reduzir movimento" do sistema (desliga animações).
- Título, descrição, Open Graph, dados estruturados (schema.org `Store`), `robots.txt`, manifest e ícones.
