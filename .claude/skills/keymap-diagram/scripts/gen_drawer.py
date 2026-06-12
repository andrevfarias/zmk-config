# -*- coding: utf-8 -*-
"""Gera docs/keymap.yaml, docs/keymap.svg e o permalink do keymap-drawer a
partir do config/corne.keymap. Rode da raiz do repo após qualquer mudança
no keymap:

    python .claude/skills/keymap-diagram/scripts/gen_drawer.py

- Remove os thumb-chords de símbolos do diagrama (eles espelham as layers
  PROG_SYM/NORM_SYM — mostrar as layers basta).
- Combos Delphi recebem o NOME DA FUNÇÃO (Compilar, Debugar...) por posição.
- Mescla layers espelhadas em um diagrama ("PROG_SYM | NAV", "NORM_SYM | NUM"):
  metade esquerda mostra uma layer, direita a outra. Combos espelhados são
  desenhados uma vez só (lado direito, direção física).
- Espalha os combos pelos diagramas, um grupo por layer, p/ nada sobrepor:
    QWERTY=edição · COLEMAK=troca de layer · "NORM_SYM | NUM"=abas ·
    FN=janelas · "PROG_SYM | NAV"=Delphi (todos bottom, bandas alternadas) ·
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
ABAS = {"aba →", "aba ←"}                                    # -> NUM
TELAS = {"Alt+Tab", "Win+Tab"}                               # -> FN

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
    frozenset({37, 26, 27}): "Mover ln↑",  frozenset({40, 32, 33}): "Mover ln↑",
    frozenset({37, 27, 28}): "Mover ln↓",  frozenset({40, 31, 32}): "Mover ln↓",
}
# Todos os combos Delphi no diagrama mesclado (relacionados juntos), TODOS
# align bottom em bandas: pares (comando base) e acordes (modificador) em
# offsets distintos — vizinhos compartilham teclas e não podem colidir.
# Acordes incluem o polegar no bounding box, por isso offsets diferentes.
DELPHI_BAIXO = ["Debugar", "Step over", "Step into", "Inspecionar", "Renomear"]
DELPHI_CIMA = ["Compilar", "Até retorno", "Avaliar", "Add uses"]
DELPHI_CFG = {"Mover ln↑", "Mover ln↓"}        # -> CONFIG

# Diagramas mesclados: as layers de função são espelhadas, então cada metade
# mostra uma layer (título "ESQUERDA | DIREITA"). Combos espelhados são
# desenhados só na instância da metade direita (uma vez, direção física).
M_NAV = "PROG_SYM | NAV"
M_NUM = "NORM_SYM | NUM"
LEFT_HALF = set(range(0, 6)) | set(range(12, 18)) | set(range(24, 30)) | {36, 37, 38}
RIGHT_KEEP = set(range(42)) - LEFT_HALF        # metade direita + thumbs 39-41

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
        if not pos <= RIGHT_KEEP:       # espelhado: desenhar só o lado direito
            continue
        c["k"] = nome
        if nome in DELPHI_CFG:          # mover linha: CONFIG, ambos bottom
            c.update(l=["CONFIG"], align="bottom",
                     offset=0.4 if nome == "Mover ln↑" else 1.1)
        elif nome in DELPHI_BAIXO:      # pares: bandas 1.6/2.3
            i = DELPHI_BAIXO.index(nome)
            c.update(l=[M_NAV], align="bottom", offset=1.6 if i % 2 == 0 else 2.3)
        else:                           # acordes c/ polegar (bbox inclui thumb):
            i = DELPHI_CIMA.index(nome)  # bandas mais fundas 1.8/2.5
            c.update(l=[M_NAV], align="bottom", offset=1.8 if i % 2 == 0 else 2.5)
    elif k in EDICAO:
        c.update(l=["QWERTY"])
    elif k in ACESSO:
        c.update(l=["COLEMAK"])
    elif k == "CFG":
        c.update(l=["COLEMAK"], align="top", offset=0.5)
    elif k in ABAS:
        if not pos <= RIGHT_KEEP:       # uma instância, direção física
            continue
        c.update(l=[M_NUM], align="top", offset=0.2 if k == "aba ←" else 0.9)
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

# --- mescla layers espelhadas: metade esquerda = uma layer, direita = outra ---
def merge(esq, dir_, titulo):
    layers[titulo] = [layers[esq][i] if i in LEFT_HALF else layers[dir_][i]
                      for i in range(42)]


merge("PROG_SYM", "NAV", M_NAV)
merge("NORM_SYM", "NUM", M_NUM)
km["layers"] = {n: layers[n] for n in
                ["QWERTY", "COLEMAK", M_NAV, M_NUM, "FN", "CONFIG"]}

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
