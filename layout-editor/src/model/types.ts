/**
 * Modelo de dados v2 — separado em FUNCIONAL e VISUAL.
 *
 * FUNCIONAL (lido pela IA p/ gerar o keymap ZMK): layers, bindings por
 * tecla/layer (ação + notas de comportamento) e combos. Sem posicionamento.
 *
 * VISUAL (a página/stickers): SLOTS SÃO REPRESENTAÇÃO, não amarração —
 * um slot pode referenciar uma layer, ter texto livre e/ou "tingir" com a
 * cor de uma layer sem pertencer a ela (ex.: "Norm" no BL do polegar).
 * O mapeamento global layer→slot é apenas o GERADOR PADRÃO das legendas.
 */

/** Posições de legenda numa tecla: 9 do KLE + frente ("F"). */
export const SLOTS = ['TL', 'TC', 'TR', 'CL', 'C', 'CR', 'BL', 'BC', 'BR', 'F'] as const
export type Slot = (typeof SLOTS)[number]

export type LayerId = string

export interface Layer {
  id: LayerId
  name: string
  /**
   * base    = layer de letras (QWERTY/COLEMAK); renderiza no centro
   * overlay = layer real do firmware (NAV, NUM, FN...)
   * virtual = "layer" via combos/thumb-chords (a IA implementa como combos)
   */
  kind: 'base' | 'overlay' | 'virtual'
  color?: string
  /** Como se acessa (texto p/ a IA: "hold polegar 39", "combo 2+4"...) */
  access?: string
  note?: string
}

/** O que uma tecla faz numa layer. */
export interface KeyBinding {
  /** Ação executada ("A", "ç", "Ctrl+F9", "toggle NAV"...) — o que a IA lê */
  tap?: string
  /** Ícone/caractere/texto EXIBIDO na tecla (default = tap) */
  display?: string
  /**
   * Detalhes de comportamento p/ a IA (texto livre): hold, shift ABNT2,
   * timing especial etc. Ex.: "home row mod: hold = Ctrl" ou
   * "shift produz :" ou "hold = NAV momentâneo; tap trava a layer".
   */
  notes?: string
}

export interface Combo {
  id: string
  /** Etiqueta exibida na pílula/catálogo (ícones e \n permitidos) */
  label: string
  /** Tecla/atalho/comando executado ("Ctrl+F9", "⌫", "toggle NAV") */
  action: string
  /** Observações p/ a IA (detalhamento, restrições, layer onde vale...) */
  notes?: string
  /** Posições físicas (0..41) pressionadas juntas (lado definido) */
  keys: number[]
  /** Grupo p/ organização, cor e filtros ("edição", "delphi"...) */
  group?: string
  /** Layers onde vale; ausente = global */
  layers?: LayerId[]
  /**
   * Espelhado: existe também na outra metade (teclas espelhadas por dedo,
   * via mapa da geometria). Uma config define os dois lados.
   */
  mirror?: boolean
  /** Etiqueta do lado espelhado, quando difere (comandos direcionais) */
  mirrorLabel?: string
  /** Ação do lado espelhado, quando difere (ex.: aba → vira aba ←) */
  mirrorAction?: string
}

export interface FunctionalDoc {
  version: 2
  keyboard: string
  layers: Layer[]
  /** keys[posição][layerId] = binding (esparso) */
  keys: Record<string, Record<LayerId, KeyBinding>>
  combos: Combo[]
}

/* ------------------------------- VISUAL ------------------------------- */

/**
 * Conteúdo de um slot de uma tecla (override do gerador padrão).
 * Prioridade: hidden > text > layer(ref) > gerador padrão.
 */
export interface SlotOverride {
  /** Texto livre (representativo — não precisa pertencer a layer alguma) */
  text?: string
  /** Este slot desta tecla mostra o tap desta layer */
  layer?: LayerId
  /** Esconde o conteúdo derivado */
  hidden?: boolean
  /** Cor explícita do texto */
  color?: string
  /** "Tinge" com a cor desta layer (sem vincular o conteúdo a ela) */
  tint?: LayerId
}

export type ComboAnchor = 'auto' | 'left' | 'right' | 'top' | 'bottom'

export interface ComboLabelPos {
  dx: number
  dy: number
  /** Lado da etiqueta em relação às teclas (compartilhado entre layouts) */
  anchor?: ComboAnchor
}

export interface VisualDoc {
  version: 2
  /** Gerador padrão: slot onde cada layer overlay/virtual aparece */
  layerSlots: Record<LayerId, Slot>
  /** Overrides por tecla: keySlots[pos][slot] */
  keySlots: Record<string, Partial<Record<Slot, SlotOverride>>>
  /** Cor de fundo por tecla */
  keyColors: Record<string, string>
  /** Etiquetas de combo: offset arrastável + anchor */
  comboLabels: Record<string, ComboLabelPos>
  /** Cor por grupo de combo */
  groupColors: Record<string, string>
  /** Escala de fonte por slot (1 = padrão) */
  slotScale: Partial<Record<Slot, number>>
  /** Qual layer base exibir quando houver mais de uma (QWERTY/COLEMAK) */
  baseLayer?: LayerId
}

/** Bundle completo — formato único de import/export/permalink. */
export interface Bundle {
  functional: FunctionalDoc
  visual: VisualDoc
}

export function emptyVisual(): VisualDoc {
  return {
    version: 2,
    layerSlots: {},
    keySlots: {},
    keyColors: {},
    comboLabels: {},
    groupColors: {},
    slotScale: {},
  }
}

export function emptyFunctional(keyboard = 'corne42'): FunctionalDoc {
  return { version: 2, keyboard, layers: [], keys: {}, combos: [] }
}
