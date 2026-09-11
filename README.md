# Green Energy — landing page

Página estática (HTML, CSS e JavaScript sem dependências) para a Green Energy, empresa de energia solar em Dourados e região (MS).

## Direção visual

Abertura em amarelo solar e verde profundo, tipografia ampla e fotografia com recorte diagonal.
Galeria assimétrica, comparação de economia e etapas numeradas mantêm o conteúdo original em uma composição responsiva.
Animações respeitam a preferência de movimento reduzido do navegador.

## Estrutura

- `index.html` — conteúdo e SEO básico.
- `assets/styles.css` — estilos (tokens de cor e tipografia no topo).
- `assets/config.js` — **contatos e mensagem do WhatsApp**. Edite aqui.
- `assets/main.js` — menu mobile, CTA fixo no celular, formulário → WhatsApp.
- `assets/favicon.svg` — ícone provisório.

## Rodar localmente

```bash
npx http-server . -p 5173 -c-1
```

## Pendências antes de publicar

1. **WhatsApp**: preencher `whatsapp.number` em `assets/config.js` (DDI + DDD + número, só dígitos).
   O link do Instagram (`wa.me/message/...`) não aceita mensagem pré-preenchida e não ficou legível no print.
   Enquanto o número estiver vazio, o formulário informa que o contato será pelo Instagram e permite preparar e copiar a mensagem.
   Com o número preenchido, o formulário abre o WhatsApp com o pedido; o envio é confirmado pelo visitante no WhatsApp.
2. **Endereço**: o print mostra "Rua Elsei Fujinaka, 1770 - Jardim dos Cristhais". Os diretórios de CEP
   registram "Rua Eisei Fujinaka", bairro "Jardim Cristhais". Confirmar com a empresa (`assets/config.js`,
   JSON-LD no `<head>` e rodapé).
3. **Logo**: o site usa o nome em texto. Substituir pelo arquivo original (SVG ou PNG em alta) no `.brand`.
4. **Fotos reais**: as imagens atuais são ilustrativas (Unsplash e Pexels, com créditos no rodapé).
   Trocar pelas fotos das obras e da equipe da Green Energy, removendo as legendas "Imagem ilustrativa"
   e o aviso da seção Instalações. Se houver cidade e potência de cada obra, incluir nas legendas.
   Recomenda-se hospedar as fotos no próprio site (WebP/AVIF, 2–3 larguras).
5. **Domínio**: ao publicar, adicionar `<link rel="canonical">` e `og:url` com o endereço final.
