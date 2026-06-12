---
name: keymap-diagram
description: >-
  Gera/atualiza os diagramas de referência do keymap-drawer (docs/keymap.yaml,
  docs/keymap.svg) e o permalink embutido no docs/LAYOUT.md a partir do
  config/corne.keymap. Use SEMPRE que o usuário pedir para regenerar/ajustar o
  diagrama do teclado, mexer em legendas/combos do SVG, gerar permalink do
  keymap-drawer/streamlit, ou após QUALQUER mudança no corne.keymap (layers,
  combos, teclas) — os diagramas devem acompanhar o firmware.
---

# Diagramas do keymap-drawer

Pipeline: [`scripts/gen_drawer.py`](scripts/gen_drawer.py). Requer
`pip install keymap-drawer` (CLI oficial; mesma engine do site
<https://keymap-drawer.streamlit.app/>). Rodar da **raiz do repo**:

```
python .claude/skills/keymap-diagram/scripts/gen_drawer.py
```

Saídas: `docs/keymap.yaml` (com `draw_config` embutido), `docs/keymap.svg` e
o permalink (`?keymap_yaml=` gzip+base64) nos marcadores
`<!-- DRAWER_LINK -->` do `docs/LAYOUT.md`.

## O que o pipeline faz (e por quê)

1. **Parse** do `config/corne.keymap` com as legendas de
   `docs/keymap_drawer_config.yaml` (`raw_binding_map`) — converte scancodes
   US nos caracteres reais do **ABNT2** (`'`, `ç`, `;:`…) e nomeia atalhos.
2. **Filtra os thumb-chords de símbolos** — eles espelham as layers
   PROG_SYM/NORM_SYM; desenhá-los duplicaria 68 combos ilegíveis.
3. **Nomeia combos Delphi pela FUNÇÃO** (Debugar, Compilar, Avaliar…) via
   mapa posição→nome (`DELPHI` no script). Mudou combo no firmware? Atualize
   esse mapa junto.
4. **Distribui os combos: um grupo por diagrama** (evita linhas sobrepostas):
   QWERTY=edição · COLEMAK=troca de layer · NUM=abas · FN=janelas ·
   NAV=Delphi (relacionados juntos: pares embaixo, acordes c/ modificador em
   cima) · CONFIG=mover linha. Combos valem em qualquer layer — divisão visual.
5. **Alinha para fora do teclado** com **bandas alternadas**: combos vizinhos
   que compartilham teclas recebem offsets diferentes (0.2/1.0 em cima,
   1.6/2.3 embaixo — abaixo dos polegares). Sobrepôs? Aumente o offset ou
   alterne a banda. Legendas de combo preferem TEXTO curto e funcional
   ("Compilar", "aba →") a glifos crípticos.
6. **Elimina ▽**: tecla transparente vira a tecla efetiva herdada da base,
   com `type: trans` (esmaecida) — exigência do usuário.

## Legendas

- Novos keycodes/atalhos: adicionar em `docs/keymap_drawer_config.yaml`
  (`raw_binding_map`) — glifos compactos que caibam na pílula do combo
  (`⌫ ⌦ ⇥ ⇤ ⏎`, `⌃⇧⌥❖` + tecla). "Esc" em texto (o glifo ⎋ confunde).
- Combos com nome longo: o keymap-drawer encolhe automaticamente
  (`shrink_wide_legends`), nomes funcionais são bem-vindos.

## Referência

Especificação completa do formato (campos de combo: `align`, `offset`, `l`,
`width`, `draw_config` etc.):
<https://github.com/caksoylar/keymap-drawer/blob/v0.23.0/KEYMAP_SPEC.md>

## Regras

- Nunca editar `docs/keymap.yaml`/`keymap.svg` à mão — regenerar via script.
- Fonte da verdade = `config/corne.keymap`.
- Conferir o resultado: abrir o SVG ou o permalink; se o usuário mandar
  print apontando sobreposição, ajustar offsets/distribuição no script.
