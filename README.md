# Planta Tattoo Studio — redesign multipáginas EN/ES

Projeto implementado a partir do **primeiro layout minimalista inspirado no TA2**. A versão atual mantém a tipografia grande, os elementos botânicos e o verde da marca. O vídeo real de tatuagem aparece apenas nos heros da Home e do Portfólio; as outras páginas usam direções visuais estáticas e distintas.

## Abrir e publicar

1. Extraia `planta-tattoo-video-background.zip` mantendo a estrutura de diretórios.
2. Abra `index.html` para visualizar localmente ou, de preferência, execute `python -m http.server 8000` na pasta do projeto e acesse `http://localhost:8000`.
3. Para publicar, envie **o conteúdo da pasta** a um host estático (Vercel, Netlify, hospedagem convencional ou equivalente) mantendo os endereços relativos.
4. Este projeto não modifica automaticamente o site Wix atualmente publicado. É preciso configurar o domínio/hospedagem ou migrar o conteúdo para a ferramenta escolhida.

## Páginas

- `index.html` — Home
- `about.html` — About Us / Sobre Nosotros
- `specialties.html` — Specialties / Especialidades
- `artists.html` — Artists / Artistas
- `portfolio.html` — Portfolio / Portafolio
- `reviews.html` — Reviews + FAQ / Reseñas + preguntas frecuentes
- `contact.html` — Contact / Contacto

CSS compartilhado: `assets/styles.css` (estilos originais), `assets/video-background.css` (camada de vídeo e contraste), `assets/subpage-themes.css` (direções visuais individuais) e `assets/plant-effects.css` (folhas laterais). JavaScript, dados e traduções: `assets/app.js`. O vídeo está em `assets/tattoo-background.mp4`; a imagem de fallback em `assets/tattoo-background-poster.webp`.

## Fundo em vídeo — atualização

- O vídeo de tatuagem enviado foi otimizado de aproximadamente **52 MB** para **2,2 MB**, em 1600 × 900 px, sem áudio; a versão original permanece fora do pacote final.
- O vídeo faz parte do próprio projeto e roda automaticamente **sem som**, em loop e adaptado à tela (`object-fit: cover`). A camada é criada somente na Home e no Portfólio.
- O **hero** e os banners das páginas internas usam cobertura escura translúcida com títulos claros. O resto do conteúdo usa superfícies claras translúcidas, preservando leitura, fotos e botões.
- Existe um botão **Pause video / Play video** (ou **Pausar vídeo / Reproducir vídeo**, em espanhol). A pausa é deliberadamente temporária: vale apenas para o documento atual e não é salva no navegador.
- Na Home e no Portfólio, o vídeo tenta iniciar automaticamente em toda visita, inclusive quando o sistema anuncia `prefers-reduced-motion`; o botão fixo continua permitindo pausar e retomar a reprodução.
- A imagem `tattoo-background-poster.webp` também aparece enquanto o vídeo ainda está carregando ou não pode ser reproduzido.
- **Como substituir o vídeo:** mantenha o nome `assets/tattoo-background.mp4` e recomende uma versão otimizada H.264, sem áudio, com `moov` no início (`-movflags +faststart`); substitua também o poster se desejar. A camada e os contrastes podem ser ajustados em `assets/video-background.css`.

## Funcionalidades implementadas

- Navegação real por sete URLs, menu responsivo e indicação de página ativa.
- Inglês por padrão, seletor EN/ES sem recarregamento na página; preferência guardada no `localStorage` para a navegação seguinte.
- Conteúdo, menus, CTAs, FAQ e depoimentos com versões EN/ES.
- Animações fade-in progressivas com `IntersectionObserver`, deslocamento de 28 px, blur sutil, duração de 740 ms e delays escalonados de 105–115 ms. Cards entram também com escala discreta. O fallback por posição no viewport evita conteúdo invisível. Neste projeto, o fade solicitado permanece ativo mesmo quando o sistema anuncia `prefers-reduced-motion`.
- Folhas decorativas de Monstera deliciosa em SVG nas laterais (`assets/plant-effects.css` e `assets/plant-effects.js`), com entrada escalonada, balanço de brisa e parallax discreto no scroll. A camada é leve, não intercepta cliques e é reduzida para duas folhas em telas pequenas.
- As seis páginas internas receberam composições próprias em `assets/subpage-themes.css`: About editorial, Specialties gráfica, Artists em estilo de revista, Portfolio cinematográfico, Reviews inspirado em cartas e Contact imersivo.
- Galeria com 25 URLs de imagens já presentes no projeto anterior (derivadas da galeria original do Wix). Lightbox com botões, teclado (setas/Escape), gesto swipe e carregamento progressivo.
- Cards de artistas separados e botões que expandem painéis individuais de certificados. A estrutura aceita imagens individuais ampliáveis quando houver certificados legítimos fornecidos.
- Depoimentos reais extraídos do site original, carrossel navegável e FAQ.
- Contato funcional por WhatsApp, telefone e e-mail e link do Google Maps; destaque para Instagram.
- Layout responsivo, metadados por página, HTML semântico, navegação pelo teclado, foco visível, alt text e fallbacks para imagens não carregadas.

## Informações que a cliente precisa fornecer

1. **Logo vetorial oficial e cores HEX da identidade:** o logo atual é a marca botânica simplificada que já estava no primeiro redesign; substitua pelo arquivo oficial, caso haja uma versão mais fiel.
2. **História do estúdio:** origem, ano, fundadores, missão e fotos autorizadas do espaço. A página About contém placeholders visíveis e não atribui fatos não confirmados.
3. **Artistas:** 2–3 fotografias aprovadas, nomes, funções, biografias, especialidades e URLs das redes sociais. Atualmente aparecem três perfis explicitamente não preenchidos.
4. **Certificados:** documentos reais, legíveis e ligados a cada profissional. Nenhuma certificação fictícia foi criada.
5. **Fotos da galeria:** exportar os arquivos originais do Wix em boa qualidade e salvá-los localmente para desempenho e disponibilidade consistentes. **As imagens no projeto atualmente dependem dos URLs externos da CDN Wix e de conexão com a internet**; não foi possível incluir os binários. O site apresenta um fallback quando a imagem não carrega.
6. **Confirmar antes de publicar:** se Instagram `@planta_tattoo`, telefone `+34 613 785 578`, e-mail `plantatattoostudio@gmail.com`, horário 9h–22h, endereço e política de depósitos continuam atuais. Os dados de contato/hora usados vêm do site original, e o Instagram foi encontrado na página pública `link.me/plantatattoo`.

## Onde editar

- **Traduções:** objetos `D.en` e `D.es` em `assets/app.js`.
- **Artistas e certificados:** array `ARTISTS` no começo de `assets/app.js`. Cada item aceita `id`, `name`, `role`, `bio`, `image`, `social` e `certificates`, sendo `certificates` uma lista de `{title, image}`. Adicione/remova itens do array conforme a equipe.
- **Fotos do portfólio:** array `ids` e `photos` em `assets/app.js`. Para substituir pelo acervo local, altere `photos` para um array com URLs de arquivos como `assets/portfolio/foto-01.webp`.
- **Links comerciais:** constantes `BOOK`, `MAIL`, `INSTA`, `MAP` e `address` no começo de `assets/app.js`.
- **Cores:** variáveis CSS `:root` em `assets/styles.css`.

## Observações técnicas

Não há formulário demonstrativo sem backend: os CTAs abrem canais de contato que já existem. O site é um projeto estático funcional, mas **não está publicado em domínio público** por esta entrega. Antes da publicação definitiva, é recomendável obter as imagens e os certificados originais, revisar informações comerciais e executar uma auditoria final de performance com os arquivos hospedados.

Testes anteriores: navegação e renderização de todas as sete páginas em larguras de 1440px, 768px e 390px, verificação de ausência de overflow horizontal, EN/ES, menu móvel, painéis de certificados, lightbox e teclas de navegação, carregar mais fotos, rolagem/fade-in e console JavaScript. Nesta atualização, verificados ainda o fundo em vídeo (desktop e celular), a continuidade visual durante a rolagem, pausa/retomada, troca EN/ES e ausência de overflow em ambas as larguras. Os testes visuais ocorreram em ambiente sem acesso à CDN Wix, portanto os fallbacks de imagens foram exercitados; a entrega não comprova disponibilidade permanente dos URLs externos.


## Ajustes visuais e vídeo — 14/10/2026

- `assets/clean-refinement.css` acrescenta uma direção mais clean: menos elementos decorativos, cartões suaves, mais espaço em branco e contraste verde/preto. As sete páginas o carregam após os estilos anteriores.
- Os heros da Home e do Portfólio mantêm o vídeo em destaque. About, Specialties, Artists, Reviews e Contact usam fundos estáticos próprios.
- O vídeo (`assets/tattoo-background.mp4`, aproximadamente 2,2 MB) é mudo e tem `autoplay`, `muted`, `playsinline` e `loop`. Cada abertura da Home ou do Portfólio tenta reproduzi-lo automaticamente. A pausa manual vale apenas na página atual e pode ser retomada pelo botão. Uma política própria do navegador ainda pode impedir a reprodução automática; nesse caso, o poster e o botão de reprodução permanecem disponíveis.
- Para pré-visualizar e publicar, mantenha os arquivos HTML e o diretório `assets` juntos. Em produção, hospede em HTTPS.
