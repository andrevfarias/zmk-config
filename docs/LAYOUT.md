# Corne 42 — Layout Delphi + uso geral (ABNT2)

> Branch `layout-redesign` · SO alvo: **Windows em Português (Brasil) ABNT2**
> Fonte: [`config/corne.keymap`](../config/corne.keymap)

## Ferramentas de visualização

### keyboard-layout-editor.com (stickers)

Dois arquivos, um por layout base — são a arte para impressão dos stickers:

| Arquivo | Conteúdo |
|---------|----------|
| [`kle_qwerty.json`](kle_qwerty.json) | base QWERTY + as 6 layers nas legendas |
| [`kle_colemak.json`](kle_colemak.json) | base COLEMAK-DH + as 6 layers nas legendas |

**Importar:** <https://www.keyboard-layout-editor.com/> → ☰ → *Import* → *JSON* (arquivo inteiro).
**Convenção por tecla:** centro = base · centro-baixo = hold (HRM/polegar) · topo-centro = shift ·
frente da tecla = CONFIG (nos polegares, a dica "tap = trava") ·
cantos/laterais: **TL**=NUM **BL**=FN **TR**=NAV **BR**=PROG_SYM **CL**=NORM_SYM (**CR** livre).
**Regenerar** após mudar o keymap: `python docs/gen_kle.py` (edite as tabelas no topo do script).

### keymap-drawer (diagrama de referência)

| Arquivo | Conteúdo |
|---------|----------|
| [`keymap.svg`](keymap.svg) | diagrama completo: 8 layers + combos (sem thumb-chords) |
| [`keymap.yaml`](keymap.yaml) | fonte do diagrama (edite e redesenhe) |
| [`keymap_drawer_config.yaml`](keymap_drawer_config.yaml) | legendas ABNT2/Delphi |

**No site** <https://keymap-drawer.streamlit.app/>: cole o [`keymap.yaml`](keymap.yaml) na aba principal
e o [`keymap_drawer_config.yaml`](keymap_drawer_config.yaml) na aba *Configuration*.
Os combos aparecem só na layer relevante: gerais/edição/janelas na **QWERTY**, Delphi na **NAV**;
os thumb-chords de símbolos não são desenhados (espelham as layers PROG_SYM/NORM_SYM).
**Regenerar** após mudar o keymap: `python docs/gen_drawer.py` (requer `pip install keymap-drawer`).

---

## Mapa de posições

```
 0  1  2  3  4  5      6  7  8  9 10 11
12 13 14 15 16 17     18 19 20 21 22 23
24 25 26 27 28 29     30 31 32 33 34 35
         36 37 38     39 40 41
```

## Arquitetura

| # | Layer | Acesso | Observação |
|---|-------|--------|------------|
| 0 | QWERTY | base default | |
| 1 | COLEMAK-DH | GoTo na CONFIG | toggle *por cima* do QWERTY; só as letras mudam |
| 2 | NAV | polegar **interno** (hold/tap) · combo 26+28 / 31+33 | espelhada; setas seguram/repetem |
| 3 | NUM | polegar **externo** (hold/tap) · combo 2+4 / 7+9 | numpad espelhado por dedo |
| 4 | FN | combo 27+29 / 30+32 | F-keys nas posições dos números |
| 5 | CONFIG | combo 0+11 | BT, reset, bootloader, Studio, troca de base |
| 6 | PROG_SYM | combo 15+17 / 18+20 · thumb-chord **interno** | símbolos de programação |
| 7 | NORM_SYM | combo 3+5 / 6+8 · thumb-chord **externo** | shift-número + AltGr |

**Polegares:** `38/39` (internos) = **NAV** · `36/41` (externos) = **NUM** (hold = momentâneo, tap = trava).
`37` = Space, `40` = Enter (puros, seguram/repetem).
**Voltar à base:** combo `14+16` / `19+21` (`base_reset`) — desliga todas as funções e cai na base setada
(QWERTY **ou** COLEMAK), de qualquer estado.

---

## Layers

### 0 — QWERTY

```
 '       Q      W      E      R      T        Y      U      I      O      P      ´` ✝
Caps/⇧   A/Ctl  S/Sft  D/Alt  F/Gui  G        H      J/Gui  K/Alt  L/Sft  ç/Ctl  ~^ ✝
 \       Z      X      C      V      B        N      M      ,      .      ;:     /?
                [NUM]  [Spc]  [NAV]           [NAV]  [Ent]  [NUM]
```
✝ = tecla morta (compõe acento com a próxima letra). `X/Y` = tap/hold (home row mods).

### 1 — COLEMAK-DH (só letras mudam; resto herdado do QWERTY)

```
 '       Q      W      F      P      B        J      L      U      Y      ç      ´` ✝
Caps/⇧   A/Ctl  R/Sft  S/Alt  T/Gui  G        M      N/Gui  E/Alt  I/Sft  O/Ctl  ~^ ✝
 \       Z      X      C      D      V        K      H      ,      .      ;:     /?
```

### 2 — NAV (espelhada; coluna = direção, linha = alcance)

```
  —      ⌃→     PgUp   PgDn   ⌃←     ⌃Home      ⌃Home   ⌃←     PgDn   PgUp   ⌃→     —
 Shift   →      ↑      ↓      ←      intf⇄      intf⇄   ←      ↓      ↑      →     Shift
 ⌃End    End    mét.↑  mét.↓  Home   →impl      →impl   Home   mét.↓  mét.↑  End   ⌃End
```
- `⌃←/⌃→` palavra · `⌃Home/⌃End` início/fim do arquivo · `intf⇄` = interface↔implementation (Ctrl+Shift+↑)
- `mét.↑/↓` = método anterior/próximo (Ctrl+Alt+↑/↓) · `→impl` = ir p/ implementação (Alt+↑)
- Shift nas pontas da home = seleção com setas usando uma mão só

### 3 — NUM (espelhada por dedo: "1" sempre no indicador, etc.)

```
 *    /    9    8    7    —         —    7    8    9    /    *
 -    .    6    5    4    =         =    4    5    6    .    -
 +    ,    3    2    1    0         0    1    2    3    ,    +
```

### 4 — FN (F-keys nas posições dos números do NUM)

```
 ⏯    —    F9   F8   F7   F12       F12  F7   F8   F9   —    ⏯
 ⏮   Mute/Ctl F6/⇧ F5/Alt F4/Gui F11   F11  F4/Gui F5/Alt F6/⇧ Mute/Ctl ⏮
 ⏭    —    F3   F2   F1   F10       F10  F1   F2   F3   —    ⏭
```
Home row tem mod-tap (hold = mod) → `Ctrl+F9`, `Shift+F8` etc. **com uma mão**.

### 5 — CONFIG

```
Studio  —     →QWE  →CLM  —    —        —    USB  BLE  —    —    BOOT
 —      —     —     —     —    —        —    —    —    —    —    RESET
BT0    BT1   BT2   BT3   BT4   —        —    —    —    —    —    BT CLR
```
`BT CLR` isolado no canto oposto aos canais. GoTo de base sempre **forçam** a base escolhida.

### 6 — PROG_SYM (abre em cima, fecha embaixo; `/ \ |` na coluna interna)

```
 —    <    {    [    (    /         /    (    [    {    <    —
 —    >    }    ]    )    \         \    )    ]    }    >    —
 :=   :    =    '    "    |         |    "    '    =    :    :=
```

### 7 — NORM_SYM (shift-números nas posições do NUM + AltGr)

```
 º    ª    _    *    &    §         §    &    *    _    ª    º
 ¬    £    ¨    %    $    °         °    $    %    ¨    £    ¬
 ³    ²    #    @    !    ¹         ¹    !    @    #    ²    ³
```
`¢` ficou sem slot (raro) — pode substituir algum símbolo após validação em hardware.

---

## Combos

Parâmetros: `timeout-ms` 30–50 (quase-simultâneo) · `require-prior-idle-ms` 100–150 (não dispara em digitação corrida).

### Acesso a layers

| Esquerda | Direita | Ação |
|----------|---------|------|
| 14+16 (S+F) | 19+21 (J+L) | **BASE** — desliga todas as funções, preserva QWERTY/COLEMAK |
| 2+4 (W+R) | 7+9 (U+O) | NUM ⇄ |
| 26+28 (X+V) | 31+33 (M+.) | NAV ⇄ |
| 3+5 (E+T) | 6+8 (Y+I) | NORM_SYM ⇄ |
| 15+17 (D+G) | 18+20 (H+K) | PROG_SYM ⇄ |
| 27+29 (C+B) | 30+32 (N+,) | FN ⇄ |
| 0+11 (canto a canto, duas mãos) | | CONFIG ⇄ |

### Edição (home row + verticais do indicador)

| Esquerda | Direita | Ação |
|----------|---------|------|
| 13+14 (A+S) | 21+22 (L+ç) | Tab |
| 14+15 (S+D) | 20+21 (K+L) | Del |
| 15+16 (D+F) | 19+20 (J+K) | Backspace |
| 16+17 (F+G) | 18+19 (H+J) | Shift+Tab (des-indenta) |
| 5+17 (T+G) | 6+18 (Y+H) | Esc |
| 4+16 (R+F) | 7+19 (U+J) | Enter |

### Janelas / abas (row superior)

| Esquerda | Direita | Ação |
|----------|---------|------|
| 4+5 | 6+7 | Win+Tab |
| 3+4 | 7+8 | aba anterior (Ctrl+Shift+Tab) |
| 2+3 | 8+9 | próxima aba (Ctrl+Tab) |
| 2+3+4 | 7+8+9 | Alt+Tab |

### Delphi — compilação / debug / refactor (row inferior)

| Esquerda | Direita | Ação |
|----------|---------|------|
| 28+29 (V+B) | 30+31 (N+M) | F9 (run/continue) |
| 27+28 (C+V) | 31+32 (M+,) | F8 (step over) |
| 26+27 (X+C) | 32+33 (,+.) | F7 (step into) |
| 25+26 (Z+X) | 33+34 (.+;) | Shift+F8 (run until return) |
| 24+25 (\+Z) | 34+35 (;+/) | Ctrl+F9 (compilar) |
| 14+27+28 | 21+31+32 | Ctrl+F7 (avaliar/inspecionar) |
| 16+26+27 | 19+32+33 | Alt+F5 (inspecionar) |
| 16+25+26 | 19+33+34 | Ctrl+Shift+A (add unit ao uses) |
| 4+14+15 | 7+20+21 | Ctrl+Alt+L (rename — CnPack) |
| 3+4+14 | 7+8+21 | mover linha ↑ (Shift+Alt+↑) |
| 3+4+13 | 7+8+22 | mover linha ↓ (Shift+Alt+↓) |

### Thumb-chords de símbolos (polegar + tecla, quase-simultâneo)

- **Polegar INTERNO (38/39) + tecla da mesma metade** → símbolo de **PROG_SYM** naquela posição
- **Polegar EXTERNO (36/41) + tecla da mesma metade** → símbolo de **NORM_SYM** naquela posição
- Segurar o polegar (>40 ms antes da tecla) = layer momentânea normal; o chord só dispara em pressão quase-simultânea

---

## Home row mods (resumo do tuning)

| Parâmetro | Valor | Efeito |
|-----------|-------|--------|
| flavor | `balanced` | hold só se outra tecla for pressionada **e solta** durante o hold |
| tapping-term-ms | 250 | tempo p/ virar hold por timeout |
| quick-tap-ms | 175 | tap-tap-segura = repete a letra |
| require-prior-idle-ms | 150 | digitação corrida nunca vira mod |
| hold-trigger-key-positions | allowlist | direita: só metade oposta; **esquerda: metade oposta + W R T S D F G Z X C V B** → Ctrl/Gui+C/V/X etc. com uma mão |
| hold-trigger-on-release | on | permite encadear mods (Ctrl+Shift+A, Ctrl+Alt+L) |
