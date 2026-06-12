---
name: kle-stickers
description: >-
  Gera/atualiza os layouts do keyboard-layout-editor.com (kle_qwerty.json e
  kle_colemak.json em docs/) — a arte para impressão dos STICKERS do teclado —
  e os permalinks embutidos no docs/LAYOUT.md. Use SEMPRE que o usuário pedir
  para atualizar/regenerar os stickers, mexer nos layouts do KLE, mudar ícones
  ou legendas das teclas impressas, gerar permalink do KLE, ou após qualquer
  mudança no corne.keymap que altere teclas/layers (os stickers devem
  acompanhar o firmware).
---

# Stickers do KLE (keyboard-layout-editor.com)

Gerador: [`scripts/gen_kle.py`](scripts/gen_kle.py). **Edite as tabelas no topo
do script** (BASE_Q, BASE_C, NUM, FN, NAV, PROG, NORM, CFG, SHIFT, HOLD — uma
lista de 36 posições por layer + dicts) e rode da **raiz do repo**:

```
python .claude/skills/kle-stickers/scripts/gen_kle.py
```

Saídas: `docs/kle_qwerty.json`, `docs/kle_colemak.json` e os permalinks
atualizados dentro de `docs/LAYOUT.md` (marcadores `<!-- KLE_LINKS -->`).
Nunca edite os .json à mão — sempre via script (são regenerados por inteiro).

## Convenção de legendas por tecla (12 posições do KLE)

```
TL = NUM        TR = NAV (ícones)      TC = shift da base
CL = NORM_SYM   CR = (livre)           C  = base (fonte maior)
BL = FN         BR = PROG_SYM          BC = hold (HRM/polegar)
FC (frente da tecla) = CONFIG; nos polegares = dica "tap = trava"
```

Polegares: nome da layer principal no centro (Nav/Num); a layer de chord no
canto correspondente (Prog no BR, Norm no BL). Teclas brancas (impressão),
sem combos — combos ficam nos diagramas do keymap-drawer.

## Semântica dos ícones (fonte "keyboard-font" do KLE)

Cada tipo de seta = um comportamento de navegação. Não trocar:

| Ícone (`kb kb-*`) | Significado |
|---|---|
| `Multimedia-Back/Down/Up/Play` (triângulos ◀▼▲▶) | mover por **caractere/linha** |
| `Arrows-Left/Right` (setas finas) | mover por **palavra** |
| `Arrows-Up/Down` (setas finas) | **método** anterior/próximo |
| `Line-Start/End` | **Home / End** |
| `Arrows-Top-3/Bottom-3` (diagonais ↖↘) | **início/fim do arquivo** |
| `Arrows-Top-4/Bottom-4` (seta na barra) | **PgUp / PgDn** |
| `Multimedia-Play-Pause / Rewind-Start / FastForward-End` | mídia ⏯ ⏮ ⏭ |

Glifos de mods nos holds: `⌃` Ctrl · `⇧` Shift · `⌥` Alt · `❖` Win.
Catálogo completo de ícones disponíveis:
<https://github.com/ijprest/keyboard-layout-editor/tree/master/font-src/kbd-webfont>
(usar via `<i class='kb kb-Nome'></i>` na legenda).

## Permalink

O script contém um encoder do formato de hash do KLE com **autoteste**
(`_selftest()`, validado contra um permalink real). Se o autoteste falhar após
uma mudança, o formato foi quebrado — não remova o teste para "passar".

## Regras

- São **dois arquivos**, um por base (QWERTY e COLEMAK-DH) — exigência do
  projeto (CLAUDE.md): é o que vai para impressão.
- No COLEMAK só as letras mudam; pontuação/acentos/funções idênticos (ç migra
  para pos10 e O ocupa pos22).
- Espelhamento por dedo entre as metades (mesmo símbolo no mesmo dedo).
- Fonte da verdade = `config/corne.keymap`; em divergência, o firmware manda.
