# -*- coding: utf-8 -*-
"""Gera os layouts do keyboard-layout-editor.com (stickers) a partir das
tabelas abaixo — uma por layer. Rode após qualquer mudança no corne.keymap:

    python docs/gen_kle.py

Convenção de posições da legenda em cada tecla (KLE, alinhamento padrão):
    TL = NUM        TR = NAV (ícones)
    CL = NORM_SYM   CR = (livre)
    BL = FN         BR = PROG_SYM
    TC = shift da base | C = base | BC = hold (HRM / thumb)
    FC (frente da tecla) = CONFIG; nos polegares = dica "tap = trava"
"""
import json

# Ícones da fonte "keyboard-font" do KLE.
# Convenção de setas (mesma do layout antigo): triângulos sólidos = caractere/
# linha; setas finas = palavra (horiz.) e método (vert.); barra = Home/End;
# diagonais = início/fim do arquivo.
I = lambda name: f"<i class='kb kb-{name}'></i>"
AR_L, AR_D = I("Multimedia-Back"), I("Multimedia-Down")           # ← ↓ (caractere/linha)
AR_U, AR_R = I("Multimedia-Up"), I("Multimedia-Play")             # ↑ →
W_BK, W_FW = I("Arrows-Left"), I("Arrows-Right")                  # palavra ← / →
MET_U, MET_D = I("Arrows-Up"), I("Arrows-Down")                   # método ↑ / ↓
PGUP, PGDN = I("Arrows-Top-4"), I("Arrows-Bottom-4")              # PgUp / PgDn
FTOP, FEND = I("Arrows-Top-3"), I("Arrows-Bottom-3")              # início / fim do arquivo
LIN_S, LIN_E = I("Line-Start"), I("Line-End")                     # Home / End
PP, PREV, NEXT = I("Multimedia-Play-Pause"), I("Multimedia-Rewind-Start"), I("Multimedia-FastForward-End")

E = ""
BASE_Q = ["'", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "´",
          "⇪", "A", "S", "D", "F", "G", "H", "J", "K", "L", "ç", "~",
          "\\", "Z", "X", "C", "V", "B", "N", "M", ",", ".", ";", "/"]
BASE_C = ["'", "Q", "W", "F", "P", "B", "J", "L", "U", "Y", "ç", "´",
          "⇪", "A", "R", "S", "T", "G", "M", "N", "E", "I", "O", "~",
          "\\", "Z", "X", "C", "D", "V", "K", "H", ",", ".", ";", "/"]
SHIFT = {0: '"', 11: "`", 23: "^", 24: "|", 32: "<", 33: ">", 34: ":", 35: "?"}
HOLD = {12: "⇧", 13: "⌃", 14: "⇧", 15: "⌥", 16: "❖",
        19: "❖", 20: "⌥", 21: "⇧", 22: "⌃"}
NUM = ["*", "/", "9", "8", "7", E,   E, "7", "8", "9", "/", "*",
       "-", ".", "6", "5", "4", "=", "=", "4", "5", "6", ".", "-",
       "+", ",", "3", "2", "1", "0", "0", "1", "2", "3", ",", "+"]
FN = [PP, E, "F9", "F8", "F7", "F12",      "F12", "F7", "F8", "F9", E, PP,
      PREV, "Mute", "F6", "F5", "F4", "F11", "F11", "F4", "F5", "F6", "Mute", PREV,
      NEXT, E, "F3", "F2", "F1", "F10",    "F10", "F1", "F2", "F3", E, NEXT]
NAV = [E, W_FW, PGUP, PGDN, W_BK, FTOP,    FTOP, W_BK, PGDN, PGUP, W_FW, E,
       "⇧", AR_R, AR_U, AR_D, AR_L, "I⇄M", "I⇄M", AR_L, AR_D, AR_U, AR_R, "⇧",
       FEND, LIN_E, MET_U, MET_D, LIN_S, "→imp", "→imp", LIN_S, MET_D, MET_U, LIN_E, FEND]
PROG = [E, "<", "{", "[", "(", "/",        "/", "(", "[", "{", "<", E,
        E, ">", "}", "]", ")", "\\",       "\\", ")", "]", "}", ">", E,
        ":=", ":", "=", "'", '"', "|",     "|", '"', "'", "=", ":", ":="]
NORM = ["º", "ª", "_", "*", "&", "§",      "§", "&", "*", "_", "ª", "º",
        "¬", "£", "¨", "%", "$", "°",      "°", "$", "%", "¨", "£", "¬",
        "³", "²", "#", "@", "!", "¹",      "¹", "!", "@", "#", "²", "³"]
CFG = {0: "Stu", 2: "→Q", 3: "→C", 7: "USB", 8: "BLE", 11: "BOOT", 23: "RST",
       24: "BT0", 25: "BT1", 26: "BT2", 27: "BT3", 28: "BT4", 35: "BTCLR"}

FA = [2, 2, 2, 2, 0, 0, 2, 2, 2, 4, 2, 1]   # tamanho de fonte por posição (centro maior)


def legend(i, base):
    slots = [NUM[i], FN[i], NAV[i], PROG[i], E, E, NORM[i], E,
             SHIFT.get(i, E), base[i], HOLD.get(i, E), CFG.get(i, E)]
    return "\n".join(slots).rstrip("\n")


def thumb(center, corner_slot, corner_text):
    slots = [E] * 12
    slots[9] = center
    slots[corner_slot] = corner_text
    slots[11] = "tap = trava"
    return "\n".join(slots).rstrip("\n")


def build(base, name):
    t_nav = thumb("Nav", 3, "Prog")    # interno: hold/tap NAV · chord PROG_SYM (BR)
    t_num = thumb("Num", 1, "Norm")    # externo: hold/tap NUM · chord NORM_SYM (BL)
    rows = [
        {"name": name,
         "notes": ("Legendas: centro = base | centro-baixo = hold (⌃ Ctrl · ⇧ Shift · ⌥ Alt · ❖ Win) | "
                   "topo-centro = shift | frente = CONFIG\n"
                   "Cantos/laterais: TL=NUM  BL=FN  TR=NAV  BR=PROG_SYM  CL=NORM_SYM\n"
                   "Polegares: internos = NAV (hold) + PROG_SYM (chord, canto BR) · "
                   "externos = NUM (hold) + NORM_SYM (chord, canto BL)\n"
                   "Importar em https://www.keyboard-layout-editor.com/ -> ☰ -> Import -> JSON")},
        [{"c": "#ffffff", "fa": FA}] + [legend(i, base) for i in range(6)]
        + [{"x": 1}] + [legend(i, base) for i in range(6, 12)],
        [legend(i, base) for i in range(12, 18)]
        + [{"x": 1}] + [legend(i, base) for i in range(18, 24)],
        [legend(i, base) for i in range(24, 30)]
        + [{"x": 1}] + [legend(i, base) for i in range(30, 36)],
        [{"x": 3}, t_num, {"a": 7}, "⎵", {"a": 4}, t_nav,
         {"x": 1}, t_nav, {"a": 7}, "⏎", {"a": 4}, t_num],
    ]
    return rows


# ---------- Permalink do KLE (formato do hash, validado contra exemplo real) ----------

def _esc(s):
    return "".join("/" + ch if ch in "=&;@:_/" else ch for ch in s)


def _enc_item(it):
    if isinstance(it, str):
        return "=" + _esc(it)
    parts = []
    for k, v in it.items():
        if isinstance(v, list):
            parts.append(k + "@" + "&".join(f":{e:g}" for e in v) + ";")
        elif isinstance(v, (int, float)):
            parts.append(f"{k}:{v:g}")
        else:
            parts.append(k + "=" + _esc(str(v)))
    return "_" + "&".join(parts) + ";"


def permalink(rows):
    from urllib.parse import quote
    body = "@" + "&".join(
        "@" + "&".join(_enc_item(i) for i in row) + ";"
        for row in rows if isinstance(row, list)
    )
    return ("https://www.keyboard-layout-editor.com/##"
            + quote(body.rstrip(";"), safe="&=@:_!'()*,~$-+."))


def _selftest():
    row = [{"x": 3, "a": 7}, "Top Left", "⎵", "Top Right", {"x": 1}, "Top Right", "⏎", "Top Left"]
    got = permalink([row])
    want = ("https://www.keyboard-layout-editor.com/##@@_x:3&a:7%3B&=Top%20Left&="
            "%E2%8E%B5&=Top%20Right&_x:1%3B&=Top%20Right&=%E2%8F%8E&=Top%20Left")
    assert got == want, f"permalink (estrutura):\n{got}\n{want}"
    leg = permalink([["F1\nF1\n<i class='kb kb-Line-Start'></i>\n\n\n\n\n\n\nQ"]])
    want_leg = ("https://www.keyboard-layout-editor.com/##@@=F1%0AF1%0A%3Ci%20class"
                "%2F='kb%20kb-Line-Start'%3E%3C%2F%2Fi%3E%0A%0A%0A%0A%0A%0A%0AQ")
    assert leg == want_leg, f"permalink (legenda):\n{leg}\n{want_leg}"


_selftest()

links = ["# Permalinks do keyboard-layout-editor.com",
         "", "Gerado por `docs/gen_kle.py` — links abrem o layout direto no site.", ""]
for fname, base, name in [
    ("docs/kle_qwerty.json", BASE_Q, "Corne 42 — QWERTY (Delphi + ABNT2)"),
    ("docs/kle_colemak.json", BASE_C, "Corne 42 — COLEMAK-DH (Delphi + ABNT2)"),
]:
    rows = build(base, name)
    with open(fname, "w", encoding="utf-8") as f:
        json.dump(rows, f, ensure_ascii=False, indent=1)
    links += [f"## {name}", "", f"[Abrir no KLE]({permalink(rows)})", ""]
    print(f"{fname} ok")

with open("docs/kle_permalinks.md", "w", encoding="utf-8") as f:
    f.write("\n".join(links))
print("docs/kle_permalinks.md ok")
