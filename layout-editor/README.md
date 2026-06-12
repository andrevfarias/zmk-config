# Corne Layout Editor

Editor **visual** do layout do Corne 42: layers, combos, stickers e catálogo —
tudo clicando e arrastando, sem escrever YAML. Mescla as ideias do
[keyboard-layout-editor.com](https://www.keyboard-layout-editor.com/) (legendas
em múltiplas posições da tecla + mapa de ícones), do
[keymap-drawer](https://keymap-drawer.streamlit.app/) (linhas ortogonais e
catálogo de combos em mini-teclados) e do
[keymap-editor](https://nickcoutsos.github.io/keymap-editor/) (edição interativa).

> Este projeto **não gera o keymap ZMK** — ele produz a especificação que o
> agente de IA lê para gerar/ajustar o firmware (skill `zmk-keymap` do repo).
> Timings e behaviors internos do ZMK ficam fora daqui: são descritos
> textualmente nos campos de detalhes e implementados pela IA.

## Rodando

```bash
cd layout-editor
npm install
npm run dev        # desenvolvimento (http://localhost:5173)
npm test           # 65 testes (vitest)
npm run build      # build estático em dist/ (servível no github.io)
npm run preview    # serve o build
```

## Conceito central: slot ≠ layer

Cada tecla tem **10 posições de legenda** (9 do KLE + frente). Os slots são
**representação**, não amarração:

- o mapeamento global *layer → slot* é só o **gerador padrão** das legendas;
- qualquer slot de qualquer tecla pode ter **texto livre**, referenciar
  **outra layer**, ou usar a **tinta** (cor) de uma layer sem pertencer a ela
  — ex.: o "Norm" no canto do polegar, que só indica o chord;
- a cor do texto segue a cor da layer, com override por slot.

O **comportamento** (hold do home row mod, shift ABNT2, tap=trava...) é texto
no campo *detalhes* do binding — ex.: `home row mod: hold = Ctrl` — que a IA
interpreta ao gerar o ZMK.

## Seções

| Seção | Conteúdo |
|---|---|
| **Integrado** | **N painéis configuráveis** com scroll: cada um pode ser *Teclado integrado* (com filtro de slots exibidos), *Teclado por layer* (uma layer por metade — esq/dir podem diferir) ou *Mini-layouts de combo*. Filtros de grupo, visibilidade combo a combo (e por lado), colunas e "separar por grupo" |
| **Por layer** | um board por layer, só com a ação central na cor da layer |
| **Combos** | catálogo/colinha: mini-teclado por combo com os números nas teclas, grupos colapsáveis, edição clicando nas teclas do mini |

## Combos espelhados

Um combo com a flag **espelhado ⇋** vale nos dois lados: uma config gera as
duas instâncias (as teclas do outro lado vêm do espelho por dedo da
geometria). Comandos **direcionais** podem definir `mirrorLabel`/
`mirrorAction` — ex.: `aba → (Ctrl+Tab)` espelha como `aba ← (Ctrl+Shift+Tab)`.
Cada lado pode ser exibido/oculto individualmente em cada painel.

## Ação × exibição

Cada binding tem **ação** (o que executa — texto livre ou atalho; use o botão
**⌨ scan** para capturar a combinação direto do teclado físico) e, opcional,
**exibir** (ícone/caractere mostrado na tecla). Etiquetas e textos aceitam
quebra de linha manual com `\n`.

## Interações (todas com hint no hover)

| Gesto | Efeito |
|---|---|
| clique na tecla / Ctrl+clique | seleciona / multi-seleção |
| **⇋ Espelhar** | copia bindings+visual para a outra metade (por dedo) |
| arrastar legenda → slot/tecla | move (Shift = copia) |
| **duplo clique** no slot ou na etiqueta | edição inline (Enter salva · Esc/blur cancela) |
| clique na etiqueta de combo | edita no painel; teclas do combo destacam, resto esmaece |
| arrastar etiqueta | posiciona (o espaço cresce para caber); anchor auto/↑/↓/←/→ |
| arrastar fundo do board | **pan** (estilo mapa) · Ctrl+roda ou botões = **zoom** |
| botão **#** | números das teclas (clique alterna · segurar espia) |
| paleta de ícones | clique insere no campo focado · arraste para slot/etiqueta |
| Ctrl+Z / Ctrl+Y · Esc | desfazer/refazer · limpar seleção |

**Export JPG**: cada board exporta como imagem na resolução escolhida
(1×–4×, proporcional), do jeito que está na tela.

## Import/Export (sempre o bundle completo)

- **💾 / 📂** — arquivo `corne-layout.json`
- **📋⤴ / 📋⤵** — área de transferência (modal com o JSON)
- **🔗 Permalink** — estado inteiro gzip+base64 no hash da URL

### Formato (contrato com a IA — fonte: `src/model/types.ts`)

```jsonc
{
  "functional": {                    // ← a IA lê este bloco
    "version": 2,
    "keyboard": "corne42",           // posições 0..41 (3 linhas de 12 + 2×3 polegares)
    "layers": [{ "id": "nav", "name": "NAV", "kind": "overlay",
                 "access": "hold polegar interno (38/39)" }],
    "keys": { "13": { "qwerty": { "tap": "A",
              "notes": "home row mod: hold = Ctrl" } } },
    "combos": [{ "id": "x", "label": "Compilar", "action": "Ctrl+F9",
                 "notes": "…", "keys": [39, 30, 31], "group": "delphi" }]
  },
  "visual": { /* slots, cores, etiquetas — a IA ignora */ }
}
```

Convenções: glifos `⌃ ⌥ ⇧ ❖`, ações como o usuário entende ("Ctrl+F9",
"toggle NAV"); `label` = etiqueta exibida, `action` = o que executa,
`notes` = observações para a IA.

## Estrutura

```
src/model/      types · geometry · defaults (seed = layout do repo) · store
                serialization · permalink · export-image · glyphs
src/components/ BoardsSection/BoardPanel/KeyboardView/KeyView (Integrado)
                LayerSection · ComboCatalog/MiniBoard · SidePanel · ComboPanel
                LayerPanel · GlyphPalette · Toolbar · ClipboardModal · CollapsibleSection
tests/          65 testes (modelo, serialização, permalink, espelho, UI)
```
