/**
 * Projeto inicial: o layout Corne Delphi/ABNT2 real deste repo (branch
 * layout-redesign) no modelo v2 — espelha config/corne.keymap e docs/LAYOUT.md.
 *
 * Hold/shift NÃO são campos estruturados: viram texto representativo nos
 * slots (BC/TC) + notas de comportamento no binding (lidas pela IA).
 */
import type { Bundle, Combo, FunctionalDoc, VisualDoc } from './types'
import { emptyVisual } from './types'

const E = ''

// ---- tabelas por posição (0..41), '' = vazio --------------------------------
const QWERTY = [
  "'", 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '´',
  '⇪', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'ç', '~',
  '\\', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', ';', '/',
  'Num', '␣', 'Nav', 'Nav', '⏎', 'Num',
]
const COLEMAK = [
  "'", 'Q', 'W', 'F', 'P', 'B', 'J', 'L', 'U', 'Y', 'ç', '´',
  '⇪', 'A', 'R', 'S', 'T', 'G', 'M', 'N', 'E', 'I', 'O', '~',
  '\\', 'Z', 'X', 'C', 'D', 'V', 'K', 'H', ',', '.', ';', '/',
  'Num', '␣', 'Nav', 'Nav', '⏎', 'Num',
]
/** shift que difere do óbvio (ABNT2) — vira slot TC + nota no binding */
const SHIFT: Record<number, string> = {
  0: '"', 11: '`', 23: '^', 24: '|', 32: '<', 33: '>', 34: ':', 35: '?',
}
/** hold (home row mods / polegares) — vira slot BC + nota no binding */
const HOLD: Record<number, { glyph: string; nota: string }> = {
  12: { glyph: '⇧', nota: 'hold = Shift' },
  13: { glyph: '⌃', nota: 'home row mod: hold = Ctrl' },
  14: { glyph: '⇧', nota: 'home row mod: hold = Shift' },
  15: { glyph: '⌥', nota: 'home row mod: hold = Alt' },
  16: { glyph: '❖', nota: 'home row mod: hold = Win/GUI' },
  19: { glyph: '❖', nota: 'home row mod: hold = Win/GUI' },
  20: { glyph: '⌥', nota: 'home row mod: hold = Alt' },
  21: { glyph: '⇧', nota: 'home row mod: hold = Shift' },
  22: { glyph: '⌃', nota: 'home row mod: hold = Ctrl' },
}
const NUM = [
  '*', '/', '9', '8', '7', E, E, '7', '8', '9', '/', '*',
  '-', '.', '6', '5', '4', '=', '=', '4', '5', '6', '.', '-',
  '+', ',', '3', '2', '1', '0', '0', '1', '2', '3', ',', '+',
  E, E, E, E, E, E,
]
const FN = [
  '⏯', E, 'F9', 'F8', 'F7', 'F12', 'F12', 'F7', 'F8', 'F9', E, '⏯',
  '⏮', '🔇', 'F6', 'F5', 'F4', 'F11', 'F11', 'F4', 'F5', 'F6', '🔇', '⏮',
  '⏭', E, 'F3', 'F2', 'F1', 'F10', 'F10', 'F1', 'F2', 'F3', E, '⏭',
  E, E, E, E, E, E,
]
// Direcionais mantêm o sentido físico nas duas metades
const NAV = [
  E, '⌃←', 'PgDn', 'PgUp', '⌃→', '⌃Home', '⌃Home', '⌃←', 'PgDn', 'PgUp', '⌃→', E,
  '⇧', '←', '↓', '↑', '→', 'I⇄M', 'I⇄M', '←', '↓', '↑', '→', '⇧',
  '⌃End', 'Home', 'mét↓', 'mét↑', 'End', '→imp', '→imp', 'Home', 'mét↓', 'mét↑', 'End', '⌃End',
  E, E, E, E, E, E,
]
const PROG = [
  E, '<', '{', '[', '(', '/', '/', '(', '[', '{', '<', E,
  E, '>', '}', ']', ')', '\\', '\\', ')', ']', '}', '>', E,
  ':=', ':', '=', "'", '"', '|', '|', '"', "'", '=', ':', ':=',
  E, E, E, E, E, E,
]
const NORM = [
  'º', 'ª', '_', '*', '&', '§', '§', '&', '*', '_', 'ª', 'º',
  '¬', '£', '¨', '%', '$', '°', '°', '$', '%', '¨', '£', '¬',
  '³', '²', '#', '@', '!', '¹', '¹', '!', '@', '#', '²', '³',
  E, E, E, E, E, E,
]
const CONFIG: Record<number, string> = {
  0: 'Studio', 2: '→QWE', 3: '→CLM', 7: 'USB', 8: 'BLE', 11: 'BOOT',
  23: 'RESET', 24: 'BT0', 25: 'BT1', 26: 'BT2', 27: 'BT3', 28: 'BT4', 35: 'BTCLR',
}

/** notas dos polegares (comportamento p/ a IA) */
const THUMB_NOTES: Record<number, string> = {
  36: 'hold = NUM momentâneo; tap = trava/destrava NUM',
  38: 'hold = NAV momentâneo; tap = trava/destrava NAV; chord c/ tecla = símbolo PROG_SYM',
  39: 'hold = NAV momentâneo; tap = trava/destrava NAV; chord c/ tecla = símbolo PROG_SYM',
  41: 'hold = NUM momentâneo; tap = trava/destrava NUM; chord c/ tecla = símbolo NORM_SYM',
}

// ---- combos ------------------------------------------------------------------
let seq = 0
function par(label: string, action: string, group: string, l: number[], r: number[],
  notes?: string): Combo[] {
  const mk = (keys: number[], lado: string): Combo =>
    ({ id: `c${seq}_${lado}`, label, action, group, keys, notes })
  seq++
  return [mk(l, 'l'), mk(r, 'r')]
}

const COMBOS: Combo[] = [
  ...par('Tab', '⇥', 'edição', [13, 14], [21, 22]),
  ...par('Del', '⌦', 'edição', [14, 15], [20, 21]),
  ...par('Backspace', '⌫', 'edição', [15, 16], [19, 20]),
  ...par('Shift+Tab', '⇤', 'edição', [16, 17], [18, 19], 'des-indenta'),
  ...par('Esc', 'Esc', 'edição', [5, 17], [6, 18]),
  ...par('Enter', '⏎', 'edição', [4, 16], [7, 19]),

  ...par('BASE', 'base_reset', 'layers', [14, 16], [19, 21],
    'desliga todas as funções; preserva a base ativa (QWERTY/COLEMAK)'),
  ...par('NUM ⇄', 'toggle NUM', 'layers', [2, 4], [7, 9]),
  ...par('NAV ⇄', 'toggle NAV', 'layers', [26, 28], [31, 33]),
  ...par('NORM_SYM ⇄', 'toggle NORM_SYM', 'layers', [3, 5], [6, 8]),
  ...par('PROG_SYM ⇄', 'toggle PROG_SYM', 'layers', [15, 17], [18, 20]),
  ...par('FN ⇄', 'toggle FN', 'layers', [27, 29], [30, 32]),
  { id: 'cfg', label: 'CONFIG ⇄', action: 'toggle CONFIG', group: 'layers', keys: [0, 11] },

  ...par('Win+Tab', 'Win+Tab', 'janelas', [4, 5], [6, 7]),
  ...par('Alt+Tab', 'Alt+Tab', 'janelas', [2, 3, 4], [7, 8, 9]),
  ...par('aba ←', 'Ctrl+Shift+Tab', 'abas', [2, 3], [7, 8]),
  ...par('aba →', 'Ctrl+Tab', 'abas', [3, 4], [8, 9]),

  ...par('Debugar', 'F9', 'delphi', [28, 29], [30, 31], 'run / continuar'),
  ...par('Compilar', 'Ctrl+F9', 'delphi', [38, 28, 29], [39, 30, 31]),
  ...par('Step over', 'F8', 'delphi', [27, 28], [31, 32]),
  ...par('Até retorno', 'Shift+F8', 'delphi', [38, 27, 28], [39, 31, 32]),
  ...par('Step into', 'F7', 'delphi', [26, 27], [32, 33]),
  ...par('Avaliar', 'Ctrl+F7', 'delphi', [38, 26, 27], [39, 32, 33], 'avaliar/modificar'),
  ...par('Inspecionar', 'Alt+F5', 'delphi', [25, 26], [33, 34]),
  ...par('Add uses', 'Ctrl+Shift+A', 'delphi', [38, 25, 26], [39, 33, 34], 'add unit ao uses'),
  ...par('Renomear', 'Ctrl+Alt+L', 'delphi', [24, 25], [34, 35], 'CnPack'),
  ...par('Mover ln↑', 'Shift+Alt+↑', 'delphi', [37, 26, 27], [40, 32, 33]),
  ...par('Mover ln↓', 'Shift+Alt+↓', 'delphi', [37, 27, 28], [40, 31, 32]),
]

// ---- montagem ----------------------------------------------------------------
export function defaultBundle(): Bundle {
  const f: FunctionalDoc = {
    version: 2,
    keyboard: 'corne42',
    layers: [
      { id: 'qwerty', name: 'QWERTY', kind: 'base' },
      { id: 'colemak', name: 'COLEMAK-DH', kind: 'base', access: 'GoTo na CONFIG', note: 'só as letras mudam' },
      { id: 'nav', name: 'NAV', kind: 'overlay', color: '#2c7be5', access: 'hold polegar interno (38/39) · combo 26+28 / 31+33' },
      { id: 'num', name: 'NUM', kind: 'overlay', color: '#d6336c', access: 'hold polegar externo (36/41) · combo 2+4 / 7+9' },
      { id: 'fn', name: 'FN', kind: 'overlay', color: '#f59f00', access: 'combo 27+29 / 30+32' },
      { id: 'prog', name: 'PROG_SYM', kind: 'virtual', color: '#0ca678', access: 'thumb-chord interno (38/39 + tecla) · combo 15+17 / 18+20' },
      { id: 'norm', name: 'NORM_SYM', kind: 'virtual', color: '#7048e8', access: 'thumb-chord externo (36/41 + tecla) · combo 3+5 / 6+8' },
      { id: 'config', name: 'CONFIG', kind: 'overlay', color: '#868e96', access: 'combo 0+11' },
    ],
    keys: {},
    // cópia profunda: o seed é módulo-level e não pode vazar mutações
    combos: COMBOS.map((c) => ({ ...c, keys: [...c.keys] })),
  }

  const put = (pos: number, layer: string, tap: string, notes?: string) => {
    const k = (f.keys[String(pos)] ??= {})
    k[layer] = notes ? { tap, notes } : { tap }
  }

  const v: VisualDoc = {
    ...emptyVisual(),
    layerSlots: { num: 'TL', fn: 'BL', nav: 'TR', prog: 'BR', norm: 'CL', config: 'F' },
    slotScale: { C: 1.5, TL: 0.8, BL: 0.8, F: 0.75 },
    groupColors: {
      'edição': '#74c0fc', layers: '#b197fc', janelas: '#ffd43b',
      abas: '#ffa94d', delphi: '#69db7c',
    },
    baseLayer: 'qwerty',
  }
  const slot = (pos: number, s: string, o: object) => {
    const k = (v.keySlots[String(pos)] ??= {})
    ;(k as Record<string, object>)[s] = o
  }

  for (let i = 0; i < 42; i++) {
    const notas: string[] = []
    if (SHIFT[i]) {
      notas.push(`shift = ${SHIFT[i]}`)
      slot(i, 'TC', { text: SHIFT[i] })
    }
    if (HOLD[i]) {
      notas.push(HOLD[i].nota)
      slot(i, 'BC', { text: HOLD[i].glyph })
    }
    if (THUMB_NOTES[i]) notas.push(THUMB_NOTES[i])
    put(i, 'qwerty', QWERTY[i], notas.join('; ') || undefined)
    if (COLEMAK[i] !== QWERTY[i]) put(i, 'colemak', COLEMAK[i])
    if (NUM[i]) put(i, 'num', NUM[i])
    if (FN[i]) put(i, 'fn', FN[i])
    if (NAV[i]) put(i, 'nav', NAV[i])
    if (PROG[i]) put(i, 'prog', PROG[i])
    if (NORM[i]) put(i, 'norm', NORM[i])
    if (CONFIG[i]) put(i, 'config', CONFIG[i])
  }

  // polegares: tinta da layer no centro + texto representativo do chord
  // ("Norm"/"Prog" não pertencem à layer do slot — são só representação)
  for (const t of [36, 41]) {
    slot(t, 'C', { tint: 'num' })
    slot(t, 'BL', { text: 'Norm', tint: 'norm' })
    slot(t, 'F', { text: 'tap=trava' })
  }
  for (const t of [38, 39]) {
    slot(t, 'C', { tint: 'nav' })
    slot(t, 'BR', { text: 'Prog', tint: 'prog' })
    slot(t, 'F', { text: 'tap=trava' })
  }

  return { functional: f, visual: v }
}
