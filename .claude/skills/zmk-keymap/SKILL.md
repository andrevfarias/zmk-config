---
name: zmk-keymap
description: >-
  Edita o firmware ZMK deste Corne 42 (config/corne.keymap e config/corne.conf)
  seguindo as convenções do projeto: keycodes ABNT2 (PT_*), atalhos Delphi
  (DX_*), home row mods com allowlist, thumb-chords e vocabulário de combos.
  Use SEMPRE que o usuário pedir para mudar o layout do teclado, trocar/remapear
  teclas, criar/ajustar combos ou layers, mexer em home row mod, timing
  (tapping-term, require-prior-idle), polegares, símbolos, bluetooth/CONFIG, ou
  mencionar corne.keymap, ZMK, firmware do teclado — mesmo sem citar arquivos.
---

# Edição do keymap ZMK (Corne 42 — Delphi + ABNT2)

Arquivo principal: `config/corne.keymap`. O `config/corne.conf` só muda quando
tecnicamente necessário (limites de combo, features). A especificação legível
do layout é `docs/LAYOUT.md` — leia-a antes de mudanças estruturais.

## Fluxo de trabalho (inegociável)

1. **Toda alteração nasce em branch nova a partir da `main`** — nunca direto.
2. **Build só pelo pipeline do GitHub Actions** (o push dispara). Nunca usar
   `west build` local. Firmware = artifacts `corne_left`/`corne_right` do run.
3. Após alterar o layout, **regenerar os documentos visuais** com as skills
   `kle-stickers` e `keymap-diagram` (regra do CLAUDE.md do projeto).
4. Timing de HRM/combos e códigos AltGr só validam **em hardware** com o
   Windows em "Português (Brasil) ABNT2" — declare isso ao entregar.

## Mapa de posições

```
 0  1  2  3  4  5      6  7  8  9 10 11
12 13 14 15 16 17     18 19 20 21 22 23
24 25 26 27 28 29     30 31 32 33 34 35
         36 37 38     39 40 41
```

## Arquitetura (não quebrar)

- **Layers**: 0 QWERTY (default) · 1 COLEMAK (`tog_on`/`tog_off`, só letras
  mudam) · 2 NAV · 3 NUM · 4 FN · 5 CONFIG · 6 PROG_SYM · 7 NORM_SYM.
  Use os `#define L_*` do topo do keymap, nunca números mágicos.
- **Funções nunca usam `&to`** — preservam a base ativa (QWERTY ou COLEMAK).
  Voltar à base = macro `base_reset` (`tog_off` em todas as funções).
- **Polegares**: 38/39 (internos) = NAV + thumb-chords PROG_SYM; 36/41
  (externos) = NUM + thumb-chords NORM_SYM; 37 Space / 40 Enter (`&kp` puros).
  `ht_mo_tog`: hold = momentâneo, tap = trava.
- **Espelhamento por dedo**: layers de função e combos existem nas duas
  metades, mesmo dedo dos dois lados (uso com uma mão; mouse na outra).
  **Exceção — comandos DIRECIONAIS** (setas, palavra, Home/End, abas):
  mantêm o sentido físico nas duas metades (← sempre mais à esquerda que →,
  como nas arrow keys) — nunca espelhar a direção.
- **HRM**: `hrl`/`hrr` com `hold-trigger-key-positions` (allowlist).
  Direita = só metade oposta + polegares. Esquerda = metade oposta + teclas-
  alvo da própria mão (W R T S D F G Z X C V B) → Ctrl/Gui+C/V/X… com uma mão.
  Timing: balanced · tapping-term 250 · quick-tap 175 · prior-idle 150.

## Keycodes — regra de ouro do ABNT2

O SO está em ABNT2: **nunca** use keycode US cru para pontuação/símbolo.
Use os `#define PT_*` do topo do keymap (ex.: `PT_SQT`=aspas, `PT_CCED`=ç,
`PT_SEMI`=;:, `PT_FSLH`=/?, mortas `PT_ACUT`/`PT_TILD`/`PT_DIAE`, AltGr
`PT_SECT`/`PT_FORD`/…). Atalhos Delphi idem: `DX_*` (intf/impl, método,
mover linha). Falta algum símbolo? Adicione o define, não o código inline.

## Combos

Helper: `COMBO(nome, binding, posições, timeout, idle)`.
Timing: pares 40 ms · acordes com polegar 50 ms · acesso a layer 30 ms ·
`require-prior-idle-ms` 150 (100 nos thumb-chords de símbolo).

- **Vocabulário de posições aprovado** (espelhar por dedo): adjacentes 2–3 na
  horizontal; saltos `6+8 7+9 18+20 19+21 30+32 31+33`; verticais só na coluna
  do indicador (`6+18 7+19`); evitar 4 teclas e pinky-stretch em acordes.
- **Anti-disparo acidental**: antes de criar combo em par de letras, conferir
  se o dígrafo é raro em PT-BR (ex.: 22+23 = ç+~ dispararia em "ção" — proibido).
- **Delphi**: tudo na row inferior — par adjacente = comando base; par +
  polegar interno (38/39) = variante com modificador; par + Space/Enter
  (37/40) = mover linha. Tabela completa em `docs/LAYOUT.md`.
- **Limites**: polegares chegam a 20 combos/tecla. Ao adicionar combo em
  polegar, recontar e ajustar `CONFIG_ZMK_COMBO_MAX_COMBOS_PER_KEY` (hoje 25).

## Validação

1. Push → acompanhar o run no GitHub Actions (`gh run watch`); os 4 jobs
   devem passar. Se a API do GitHub estiver inacessível, informar e apontar
   a URL do Actions.
2. Entregar com checklist de teste em hardware: acentos/ç/aspas, `:=`,
   HRM uma-mão (Ctrl+C/V/X esquerda), chords de símbolo, combos novos,
   GoTo de base e `base_reset` voltando para a base correta.
