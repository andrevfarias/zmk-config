# Corne Layout Editor

Editor **visual** do layout do Corne 42: layers, combos, stickers e catálogo —
tudo clicando e arrastando, sem escrever YAML. Mescla as ideias do
[keyboard-layout-editor.com](https://www.keyboard-layout-editor.com/) (legendas
em múltiplas posições da tecla), do
[keymap-drawer](https://keymap-drawer.streamlit.app/) (catálogo de combos em
mini-teclados) e do [keymap-editor](https://nickcoutsos.github.io/keymap-editor/)
(edição interativa).

O resultado é exportado em **dois arquivos**:

| Arquivo | Conteúdo | Consumidor |
|---|---|---|
| `functional.json` | layers, bindings (tap/hold/shift), combos | **agente de IA** → gera o `corne.keymap` ZMK |
| `visual.json` | posições de legenda, cores, offsets de pílulas | a própria página / stickers |

> Este projeto **não gera o keymap ZMK** — ele produz a especificação que a IA
> lê para gerar/ajustar o firmware (timings, behaviors etc. são responsabilidade
> do agente, guiado pela skill `zmk-keymap` do repo).

## Rodando

```bash
cd layout-editor
npm install
npm run dev        # desenvolvimento (http://localhost:5173)
npm test           # testes (vitest)
npm run build      # build estático em dist/ (servível no github.io)
npm run preview    # serve o build
```

Build 100% estático (Vite, `base: './'`): o conteúdo de `dist/` funciona em
GitHub Pages, file:// ou qualquer host.

## Conceitos

- **Teclas fixas** pela geometria (Corne 42; registro em `src/model/geometry.ts`
  preparado para outras placas no futuro).
- **10 posições de legenda por tecla**: 9 do KLE (TL/TC/TR/CL/C/CR/BL/BC/BR) +
  **F** (frente da tecla). Cada posição exibe uma layer (mapeamento global em
  *Layers*), com override por tecla.
- **Layers**: `base` (letras, no centro), `overlay` (layer real do firmware) e
  `virtual` (acessada por combos/thumb-chords — a IA implementa como combos).
- **Hold-tap**: o `hold` de cada binding aparece no slot configurável
  (padrão centro-baixo), com estilo próprio.

## Interações

| Gesto | Efeito |
|---|---|
| clique na tecla | seleciona (painel de edição à direita) |
| Ctrl+clique | multi-seleção |
| **⇋ Espelhar** | copia bindings/visual para a outra metade (por dedo) |
| arrastar legenda → outro slot | move a legenda (override visual) |
| arrastar legenda → outra tecla | move o binding daquela layer |
| **Shift + arrastar** | copia em vez de mover |
| pílula de combo (overlay ligado) | arrastável para posicionar |
| clique no slot no painel | texto custom / ocultar / resetar |
| Ctrl+Z / Ctrl+Y | desfazer / refazer |
| Esc | limpa seleção / cancela combo |

**Combos**: painel *Combos* → “+ Novo combo” → clique nas teclas no board →
nome **funcional** (“Compilar”), ação (“Ctrl+F9”), grupo. O **Catálogo**
renderiza um mini-teclado por combo (teclas coloridas + descrição) — a colinha
imprimível do teclado.

**Permalink**: 🔗 comprime o estado inteiro (gzip+base64) no hash da URL —
compartilhe/salve o link; abrir a URL restaura tudo.

## Formato dos arquivos (contrato com a IA)

`functional.json` (resumo — fonte da verdade em `src/model/types.ts`):

```jsonc
{
  "version": 1,
  "keyboard": "corne42",          // mapa de posições 0..41 (linhas de 12 + 2×3 polegares)
  "layers": [
    { "id": "nav", "name": "NAV", "kind": "overlay",
      "access": "hold polegar interno (38/39) · combo 26+28 / 31+33" }
  ],
  "keys": {                        // posição → layer → binding
    "13": { "qwerty": { "tap": "A", "hold": "⌃" } }
  },
  "combos": [
    { "id": "x", "name": "Compilar", "action": "Ctrl+F9",
      "keys": [39, 30, 31], "group": "delphi" }
  ]
}
```

Convenções dos textos: glifos de mods `⌃ ⌥ ⇧ ❖`, ações como o usuário as
entende (“Ctrl+F9”, “→imp”, “tap=trava”) — a IA traduz para keycodes
ABNT2/ZMK. O campo `access` das layers e o `name/action` dos combos carregam a
intenção; detalhes de timing ficam fora do escopo deste arquivo.

## Estrutura

```
src/model/      types · geometry · defaults (seed = layout atual do repo)
                store (ações + undo) · serialization · permalink
src/components/ KeyboardView/KeyView (board + drag) · SidePanel (tecla)
                LayerPanel · ComboPanel · ComboCatalog/MiniBoard · Toolbar
tests/          55 testes (modelo, serialização, permalink, espelho, UI)
```
