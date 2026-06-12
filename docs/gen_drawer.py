# -*- coding: utf-8 -*-
"""Gera docs/keymap.yaml e docs/keymap.svg a partir do config/corne.keymap.
Rode após qualquer mudança no keymap:

    python docs/gen_drawer.py

- Remove os thumb-chords de símbolos do diagrama (eles espelham as layers
  PROG_SYM/NORM_SYM — mostrar as layers basta).
- Distribui os combos por relevância: gerais na layer QWERTY, Delphi na NAV.
- Alinha os grupos para fora do teclado (topo/base) para não cobrir as teclas.
"""
import subprocess
import sys
import yaml

PARSE = [sys.executable, "-m", "keymap_drawer", "-c", "docs/keymap_drawer_config.yaml",
         "parse", "-z", "config/corne.keymap"]
DRAW = [sys.executable, "-m", "keymap_drawer", "-c", "docs/keymap_drawer_config.yaml",
        "draw", "docs/keymap.yaml", "-o", "docs/keymap.svg"]

THUMBS = {36, 38, 39, 41}
JANELAS = {"Alt+Tab", "Win+Tab", "aba →", "aba ←"}
DELPHI = {"F9", "F8", "F7", "Shift+F8", "Ctrl+F9", "Ctrl+F7", "Alt+F5",
          "Ctrl+Sh+A", "Ctrl+Alt+L", "mover ln ↑", "mover ln ↓"}
EDICAO = {"TAB", "DEL", "BSPC", "Shift+Tab", "ESC", "RET"}
ACESSO = {"BASE", "NAV ⇄", "NUM ⇄", "FN ⇄", "PROG_SYM ⇄", "NORM_SYM ⇄"}

km = yaml.safe_load(subprocess.run(PARSE, capture_output=True, check=True).stdout)

combos = []
for c in km.get("combos", []):
    if set(c["p"]) & THUMBS:          # thumb-chord de símbolo -> só nas layers
        continue
    k = c["k"] if isinstance(c["k"], str) else c["k"].get("t", "")
    big = len(c["p"]) >= 3
    if k in JANELAS:
        c.update(l=["QWERTY"], align="top", offset=1.0 if big else 0.2)
    elif k in DELPHI:
        c.update(l=["NAV"], align="bottom", offset=1.0 if big else 0.2)
    elif k in EDICAO:
        c.update(l=["QWERTY"])
    elif k == "CONFIG ⇄":
        c.update(l=["QWERTY"], align="top", offset=1.8)
    elif k in ACESSO:
        c.update(l=["QWERTY"])
    combos.append(c)
km["combos"] = combos

with open("docs/keymap.yaml", "w", encoding="utf-8") as f:
    yaml.dump(km, f, allow_unicode=True, sort_keys=False)
subprocess.run(DRAW, check=True)
print(f"docs/keymap.yaml ({len(combos)} combos) e docs/keymap.svg gerados")
