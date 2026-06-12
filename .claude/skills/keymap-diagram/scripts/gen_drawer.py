# -*- coding: utf-8 -*-
"""Gera docs/keymap.yaml, docs/keymap.svg e o permalink do keymap-drawer a
partir do config/corne.keymap. Rode da raiz do repo após qualquer mudança
no keymap:

    python .claude/skills/keymap-diagram/scripts/gen_drawer.py

- Remove os thumb-chords de símbolos do diagrama (eles espelham as layers
  PROG_SYM/NORM_SYM — mostrar as layers basta).
- Combos Delphi recebem o NOME DA FUNÇÃO (Compilar, Debugar...) por posição.
- Espalha os combos pelos 8 diagramas, um grupo por layer, p/ nada sobrepor:
    QWERTY=edição · COLEMAK=troca de layer · NUM=abas · FN=janelas ·
    NAV=Delphi base · PROG_SYM=compilar/até retorno · NORM_SYM=avaliar/uses ·
    CONFIG=mover linha
- Substitui as teclas transparentes (▽) pela tecla efetiva (estilo esmaecido).
- Atualiza o permalink dentro do LAYOUT.md (marcadores DRAWER_LINK).
"""
import base64
import gzip
import re
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
EDICAO = {"⇥", "⌦", "⌫", "⇤", "Esc", "⏎"}                    # -> QWERTY
ACESSO = {"BASE", "NAV", "NUM", "FN", "PSym", "NSym"}        # -> COLEMAK
ABAS = {"⌃⇥", "⌃⇧⇥"}                                         # -> NUM
TELAS = {"⌥⇥", "❖⇥"}                                         # -> FN

# Combos Delphi: nome da função por posições (esq. e dir.)
DELPHI = {
    frozenset({28, 29}): "Debugar",        frozenset({30, 31}): "Debugar",
    frozenset({38, 28, 29}): "Compilar",   frozenset({39, 30, 31}): "Compilar",
    frozenset({27, 28}): "Step over",      frozenset({31, 32}): "Step over",
    frozenset({38, 27, 28}): "Até retorno", frozenset({39, 31, 32}): "Até retorno",
    frozenset({26, 27}): "Step into",      frozenset({32, 33}): "Step into",
    frozenset({38, 26, 27}): "Avaliar",    frozenset({39, 32, 33}): "Avaliar",
    frozenset({25, 26}): "Inspecionar",    frozenset({33, 34}): "Inspecionar",
    frozenset({38, 25, 26}): "Add uses",   frozenset({39, 33, 34}): "Add uses",
    frozenset({24, 25}): "Renomear",       frozenset({34, 35}): "Renomear",
    frozenset({36, 26, 27}): "Mover ln↑",  frozenset({41, 32, 33}): "Mover ln↑",
    frozenset({36, 27, 28}): "Mover ln↓",  frozenset({41, 31, 32}): "Mover ln↓",
}
DELPHI_LAYER = {                       # diagrama onde cada função é desenhada
    "Debugar": "NAV", "Step over": "NAV", "Step into": "NAV",
    "Inspecionar": "NAV", "Renomear": "NAV",
    "Compilar": "PROG_SYM", "Até retorno": "PROG_SYM",
    "Avaliar": "NORM_SYM", "Add uses": "NORM_SYM",
    "Mover ln↑": "CONFIG", "Mover ln↓": "CONFIG",
}

km = yaml.safe_load(subprocess.run(PARSE, capture_output=True, check=True).stdout)

# --- combos: filtra thumb-chords de símbolo e distribui por relevância ---
combos = []
for c in km.get("combos", []):
    pos = frozenset(c["p"])
    nome = DELPHI.get(pos)
    if nome is None and pos & THUMBS:   # thumb-chord de símbolo -> só nas layers
        continue
    k = c["k"] if isinstance(c["k"], str) else c["k"].get("t", "")
    if nome:                            # Delphi: nome da função
        c["k"] = nome
        lay = DELPHI_LAYER[nome]
        if len(pos) == 2:               # pares: pílula entre as teclas
            c.update(l=[lay])
        else:                           # acordes c/ polegar: abaixo dos thumbs
            off = 1.2 if nome in {"Compilar", "Avaliar", "Mover ln↑"} else 1.9
            c.update(l=[lay], align="bottom", offset=off)
    elif k in EDICAO:
        c.update(l=["QWERTY"])
    elif k in ACESSO:
        c.update(l=["COLEMAK"])
    elif k == "CFG":
        c.update(l=["COLEMAK"], align="top", offset=0.5)
    elif k in ABAS:
        c.update(l=["NUM"], align="top", offset=0.2)
    elif k in TELAS:
        c.update(l=["FN"], align="top", offset=1.0 if len(pos) >= 3 else 0.2)
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

# --- variante "combos": um mini-teclado por combo (teclas coloridas + nome
#     da ação), só com a base QWERTY — guia simplificado de combos ---
kc = dict(km)
kc["combos"] = [{k: v for k, v in c.items() if k in ("p", "k")}
                for c in combos]
kc["draw_config"] = dict(km["draw_config"],
                         separate_combo_diagrams=True, combo_diagrams_scale=2)
with open("docs/keymap_combos.yaml", "w", encoding="utf-8") as f:
    yaml.dump(kc, f, allow_unicode=True, sort_keys=False)
subprocess.run([sys.executable, "-m", "keymap_drawer", "-c", CONFIG, "draw",
                "docs/keymap_combos.yaml", "-s", "QWERTY",
                "-o", "docs/keymap_combos.svg"], check=True)


def permalink(path):
    b64 = base64.urlsafe_b64encode(
        gzip.compress(open(path, "rb").read(), mtime=0)).decode()
    return "https://caksoylar.github.io/keymap-drawer?keymap_yaml=" + quote(b64, safe="")


# --- permalinks (?keymap_yaml = base64-urlsafe(gzip(yaml))) no LAYOUT.md ---
links = (f"[abrir completo no keymap-drawer]({permalink('docs/keymap.yaml')}) · "
         f"[abrir guia de combos]({permalink('docs/keymap_combos.yaml')})")
md = open("docs/LAYOUT.md", encoding="utf-8").read()
md = re.sub(r"(<!-- DRAWER_LINK -->).*?(<!-- /DRAWER_LINK -->)",
            lambda m: m.group(1) + links + m.group(2), md, flags=re.S)
open("docs/LAYOUT.md", "w", encoding="utf-8", newline="\n").write(md)
print(f"docs/keymap[.combos].yaml/svg ({len(combos)} combos) e "
      "permalinks no LAYOUT.md gerados")
