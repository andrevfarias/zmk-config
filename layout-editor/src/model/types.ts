/**
 * Modelo de dados do editor — separado em FUNCIONAL e VISUAL.
 *
 * FUNCIONAL (functional.json): o que o teclado FAZ. É o contrato lido pelo
 * agente de IA para gerar o keymap ZMK: layers, bindings (tap/hold/shift)
 * por tecla/layer e combos. Sem nada de posicionamento, fonte ou cor.
 *
 * VISUAL (visual.json): como a página DESENHA. Mapeamento layer→posição da
 * legenda, overrides por tecla, cores, offsets das pílulas de combo.
 */

/** Posições de legenda numa tecla: 9 do KLE + frente ("F"). */
export const SLOTS = ['TL', 'TC', 'TR', 'CL', 'C', 'CR', 'BL', 'BC', 'BR', 'F'] as const
export type Slot = (typeof SLOTS)[number]

export type LayerId = string

export interface Layer {
  id: LayerId
  name: string
  /**
   * base    = layer de letras (QWERTY/COLEMAK); renderiza no centro da tecla
   * overlay = layer de função real no firmware (NAV, NUM, FN...)
   * virtual = "layer" implementada por combos/thumb-chords (PROG_SYM etc.)
   */
  kind: 'base' | 'overlay' | 'virtual'
  color?: string
  /** Como se acessa (texto livre p/ a IA: "hold polegar 39", "combo 2+4"...) */
  access?: string
  note?: string
}

/** O que uma tecla faz numa layer. Textos livres, legíveis por humano e IA. */
export interface KeyBinding {
  /** Ação no toque ("A", "ç", "Ctrl+F9", "→", "PgUp"...) */
  tap?: string
  /** Ação segurando (home row mod "Ctrl", layer "NAV"...) */
  hold?: string
  /** O que sai com Shift, quando difere do óbvio (";"→":") */
  shift?: string
}

export interface Combo {
  id: string
  /** Nome FUNCIONAL exibido no catálogo ("Compilar", "Backspace") */
  name: string
  /** Atalho/efeito produzido ("Ctrl+F9", "⌫") — o que a IA implementa */
  action: string
  description?: string
  /** Posições físicas (0..41) pressionadas juntas */
  keys: number[]
  /** Grupo p/ organização e cor no catálogo ("edição", "delphi"...) */
  group?: string
  /** Layers onde vale; ausente = global */
  layers?: LayerId[]
}

export interface FunctionalDoc {
  version: 1
  /** Identificador da geometria (hoje só "corne42") */
  keyboard: string
  layers: Layer[]
  /** keys[posição][layerId] = binding (esparso) */
  keys: Record<string, Record<LayerId, KeyBinding>>
  combos: Combo[]
}

/* ------------------------------- VISUAL ------------------------------- */

export interface SlotOverride {
  /** Texto custom (substitui o derivado da layer) */
  text?: string
  /** Re-mapeia: este slot desta tecla mostra esta layer */
  layer?: LayerId
  /** Esconde o conteúdo derivado */
  hidden?: boolean
}

export interface VisualDoc {
  version: 1
  /** Slot padrão de cada layer overlay/virtual (base usa C/TC + holdSlot) */
  layerSlots: Record<LayerId, Slot>
  /** Onde renderizar o HOLD das teclas da base (padrão BC) */
  holdSlot: Slot
  /** Onde renderizar o SHIFT da base (padrão TC) */
  shiftSlot: Slot
  /** Estilo do hold: 'text' simples ou 'badge' (fundo destacado) */
  holdStyle: 'text' | 'badge'
  /** Escala de fonte por slot (1 = padrão) */
  slotScale: Partial<Record<Slot, number>>
  /** Overrides por tecla: keyOverrides[pos][slot] */
  keyOverrides: Record<string, Partial<Record<Slot, SlotOverride>>>
  /** Cor de fundo por tecla */
  keyColors: Record<string, string>
  /** Offset da pílula de cada combo no board (arrastável) */
  comboLabels: Record<string, { dx: number; dy: number }>
  /** Cor por grupo de combo */
  groupColors: Record<string, string>
}

/** Bundle completo (export único / permalink) */
export interface Bundle {
  functional: FunctionalDoc
  visual: VisualDoc
}

export function emptyVisual(): VisualDoc {
  return {
    version: 1,
    layerSlots: {},
    holdSlot: 'BC',
    shiftSlot: 'TC',
    holdStyle: 'text',
    slotScale: {},
    keyOverrides: {},
    keyColors: {},
    comboLabels: {},
    groupColors: {},
  }
}

export function emptyFunctional(keyboard = 'corne42'): FunctionalDoc {
  return { version: 1, keyboard, layers: [], keys: {}, combos: [] }
}
