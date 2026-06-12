# -*- coding: utf-8 -*-
"""Gera docs/keymap.yaml, docs/keymap.svg e o permalink do keymap-drawer a
partir do config/corne.keymap. Rode após qualquer mudança no keymap:

    python docs/gen_drawer.py

- Remove os thumb-chords de símbolos do diagrama (eles espelham as layers
  PROG_SYM/NORM_SYM — mostrar as layers basta).
- Espalha os combos pelos 8 diagramas, um grupo por layer, p/ nada sobrepor:
    QWERTY=edição · COLEMAK=troca de layer · NUM=abas · FN=janelas ·
    NAV=Delphi (pares) · PROG_SYM=inspeção · NORM_SYM=refactor · CONFIG=mover linha
- Alinha os grupos para fora do teclado (topo/base) para não cobrir as teclas.
- Substitui as teclas transparentes (▽) pela tecla efetiva (estilo esmaecido).
- Gera docs/keymap_drawer_permalink.md com o link direto do diagrama.
"""
import base64
import gzip
import subprocess
import sys
from urllib.parse import quote

import yaml

CONFIG = "docs/keymap_drawer_config.yaml"
PARSE = [sys.executable, "-m", "keymap_drawer", "-c", CONFIG,
         "parse", "-z", "config/corne.keymap"]
DRAW = [sys.executable, "-m", "keymap_drawer", "-c", CONFIG,
        "draw", "docs/keymap.yaml", "-o", "docs/keymap.svg"]

THUMBS = {36, 38, 39, 41}
EDICAO = {"⇥", "⌦", "⌫", "⇤", "⎋", "⏎"}                      # -> QWERTY
ACESSO = {"BASE", "NAV", "NUM", "FN", "PSym", "NSym"}        # -> COLEMAK
ABAS = {"⌃⇥", "⌃⇧⇥"}                                         # -> NUM
TELAS = {"⌥⇥", "❖⇥"}                                         # -> FN
DELPHI_PARES = {"F9", "F8", "F7", "⇧F8", "⌃F9"}              # -> NAV
INSPECAO = {"⌃F7", "⌥F5"}                                    # -> PROG_SYM
REFACTOR = {"⌃⇧A", "⌃⌥L"}                                    # -> NORM_SYM
MOVER = {"ln↑", "ln↓"}                                       # -> CONFIG

km = yaml.safe_load(subprocess.run(PARSE, capture_output=True, check=True).stdout)

# --- combos: filtra thumb-chords e distribui por relevância ---
combos = []
for c in km.get("combos", []):
    if set(c["p"]) & THUMBS:          # thumb-chord de símbolo -> só nas layers
        continue
    k = c["k"] if isinstance(c["k"], str) else c["k"].get("t", "")
    big = len(c["p"]) >= 3
    if k in EDICAO:
        c.update(l=["QWERTY"])
    elif k in ACESSO:
        c.update(l=["COLEMAK"])
    elif k == "CFG":
        c.update(l=["COLEMAK"], align="top", offset=0.5)
    elif k in ABAS:
        c.update(l=["NUM"], align="top", offset=0.2)
    elif k in TELAS:
        c.update(l=["FN"], align="top", offset=1.0 if big else 0.2)
    elif k in DELPHI_PARES:
        c.update(l=["NAV"], align="bottom", offset=0.4)
    elif k in INSPECAO:
        c.update(l=["PROG_SYM"], align="bottom", offset=0.4 if k == "⌃F7" else 1.2)
    elif k in REFACTOR:
        c.update(l=["NORM_SYM"], align="top" if k == "⌃⌥L" else "bottom", offset=0.4)
    elif k in MOVER:
        c.update(l=["CONFIG"], align="top" if k == "ln↑" else "bottom", offset=0.4)
    combos.append(c)
km["combos"] = combos

# --- sem ▽: cada layer repete a tecla efetiva (herdada da base QWERTY),
#     mantendo o estilo "trans" (esmaecido) para indicar herança ---
layers = km["layers"]
base = layers["QWERTY"]
for name, layer in layers.items():
    if name == "QWERTY":
        continue
    for i, k in enumerate(layer):
        if isinstance(k, dict) and k.get("type") == "trans":
            b = base[i]
            nk = dict(b) if isinstance(b, dict) else {"t": b}
            nk["type"] = "trans"
            layer[i] = nk

# --- embute o draw_config p/ o permalink renderizar igual ao SVG local ---
with open(CONFIG, encoding="utf-8") as f:
    km["draw_config"] = yaml.safe_load(f)["draw_config"]

with open("docs/keymap.yaml", "w", encoding="utf-8") as f:
    yaml.dump(km, f, allow_unicode=True, sort_keys=False)
subprocess.run(DRAW, check=True)

# --- permalink: ?keymap_yaml = base64-urlsafe(gzip(yaml)) ---
raw = open("docs/keymap.yaml", "rb").read()
b64 = base64.urlsafe_b64encode(gzip.compress(raw, mtime=0)).decode()
url = "https://caksoylar.github.io/keymap-drawer?keymap_yaml=" + quote(b64, safe="")
with open("docs/keymap_drawer_permalink.md", "w", encoding="utf-8") as f:
    f.write("# Permalink do keymap-drawer\n\n"
            "Gerado por `docs/gen_drawer.py` — abre o diagrama direto no site.\n\n"
            f"[Abrir no keymap-drawer]({url})\n")
print(f"docs/keymap.yaml ({len(combos)} combos), docs/keymap.svg e "
      "docs/keymap_drawer_permalink.md gerados")
