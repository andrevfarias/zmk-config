/**
 * Estado reativo do editor + ações. Toda mutação de documento passa por uma
 * action que registra undo. Slots são REPRESENTAÇÃO (texto/ref/tinta) — o
 * mapeamento layer→slot é só o gerador padrão.
 */
import { computed, reactive } from 'vue'
import type {
  Bundle, Combo, ComboAnchor, KeyBinding, Layer, LayerId, Slot, SlotOverride,
} from './types'
import { SLOTS } from './types'
import { defaultBundle } from './defaults'
import { getBoard } from './geometry'

export interface ResolvedSlot {
  text: string
  /** origem: layer id, 'base' ou 'custom' */
  source: string
  color?: string
}

interface DragState {
  fromKey: number
  fromSlot: Slot
  text: string
  x: number
  y: number
}

/** instância de board na seção Integrado (filtros próprios) */
export interface BoardInstance {
  id: number
  /** grupos de combo visíveis (null = todos) */
  groups: string[] | null
  showCombos: boolean
}

function snapshot(b: Bundle): string {
  return JSON.stringify(b)
}

let boardSeq = 1

export function createStore(initial?: Bundle) {
  const bundle = initial ?? defaultBundle()
  const state = reactive({
    f: bundle.functional,
    v: bundle.visual,
    selection: [] as number[],
    /** combo em edição (destaque no board; editor inline no painel) */
    editingCombo: null as string | null,
    /** seleção de teclas para o combo em edição/criação */
    pickingCombo: false,
    pickedKeys: [] as number[],
    drag: null as DragState | null,
    undoStack: [] as string[],
    redoStack: [] as string[],
    /** seções: integrado | layers | catalogo */
    activeTab: 'integrado' as 'integrado' | 'layers' | 'catalogo',
    /** boards da seção Integrado */
    boards: [{ id: 0, groups: null, showCombos: true }] as BoardInstance[],
    boardColumns: 1,
    /** overlay com o número físico de cada tecla */
    showNumbers: false,
  })

  const board = computed(() => getBoard(state.f.keyboard))
  const baseLayers = computed(() => state.f.layers.filter((l) => l.kind === 'base'))
  const activeBase = computed<Layer | undefined>(() =>
    baseLayers.value.find((l) => l.id === state.v.baseLayer) ?? baseLayers.value[0])
  const comboGroups = computed(() => {
    const s = new Set<string>()
    for (const c of state.f.combos) s.add(c.group ?? 'outros')
    return [...s]
  })

  function layerById(id: LayerId | undefined): Layer | undefined {
    return id ? state.f.layers.find((l) => l.id === id) : undefined
  }

  /* ----------------------------- undo/redo ----------------------------- */
  function commit() {
    state.undoStack.push(snapshot({ functional: state.f, visual: state.v }))
    if (state.undoStack.length > 100) state.undoStack.shift()
    state.redoStack = []
  }
  function restore(s: string) {
    const b = JSON.parse(s) as Bundle
    state.f = b.functional
    state.v = b.visual
  }
  function undo() {
    const s = state.undoStack.pop()
    if (!s) return
    state.redoStack.push(snapshot({ functional: state.f, visual: state.v }))
    restore(s)
  }
  function redo() {
    const s = state.redoStack.pop()
    if (!s) return
    state.undoStack.push(snapshot({ functional: state.f, visual: state.v }))
    restore(s)
  }

  /* ----------------------------- seleção ----------------------------- */
  function selectKey(pos: number, additive = false) {
    if (state.pickingCombo) {
      const i = state.pickedKeys.indexOf(pos)
      if (i >= 0) state.pickedKeys.splice(i, 1)
      else state.pickedKeys.push(pos)
      return
    }
    if (additive) {
      const i = state.selection.indexOf(pos)
      if (i >= 0) state.selection.splice(i, 1)
      else state.selection.push(pos)
    } else {
      state.selection = [pos]
    }
  }
  function clearSelection() {
    state.selection = []
  }

  /* ----------------------------- bindings ----------------------------- */
  function getBinding(pos: number, layer: LayerId): KeyBinding | undefined {
    return state.f.keys[String(pos)]?.[layer]
  }
  function setBinding(pos: number, layer: LayerId, b: KeyBinding | undefined) {
    commit()
    const key = (state.f.keys[String(pos)] ??= {})
    const keep = b && (b.tap || b.notes)
    if (keep) key[layer] = { ...b }
    else delete key[layer]
  }

  /* ------------------------- resolução de slots ------------------------- */
  function slotColor(o: SlotOverride | undefined, srcLayer?: LayerId): string | undefined {
    if (o?.color) return o.color
    if (o?.tint) return layerById(o.tint)?.color
    return layerById(srcLayer)?.color
  }

  function resolveSlot(pos: number, slot: Slot): ResolvedSlot | null {
    const o: SlotOverride | undefined = state.v.keySlots[String(pos)]?.[slot]
    if (o?.hidden) return null
    if (o?.text !== undefined && o.text !== '')
      return { text: o.text, source: 'custom', color: slotColor(o) }
    if (o?.layer) {
      const t = getBinding(pos, o.layer)?.tap
      return t ? { text: t, source: o.layer, color: slotColor(o, o.layer) } : null
    }
    if (slot === 'C') {
      const base = activeBase.value
      const t = base && getBinding(pos, base.id)?.tap
      return t ? { text: t, source: 'base', color: slotColor(o) } : null
    }
    for (const layer of state.f.layers) {
      if (state.v.layerSlots[layer.id] === slot) {
        const t = getBinding(pos, layer.id)?.tap
        if (t) return { text: t, source: layer.id, color: slotColor(o, layer.id) }
      }
    }
    return null
  }
  function resolveKey(pos: number): Partial<Record<Slot, ResolvedSlot>> {
    const out: Partial<Record<Slot, ResolvedSlot>> = {}
    for (const s of SLOTS) {
      const r = resolveSlot(pos, s)
      if (r) out[s] = r
    }
    return out
  }

  /* ----------------------- overrides de slot ----------------------- */
  function getSlotOverride(pos: number, slot: Slot): SlotOverride | undefined {
    return state.v.keySlots[String(pos)]?.[slot]
  }
  function setSlotOverride(pos: number, slot: Slot, o: SlotOverride | undefined) {
    commit()
    const k = (state.v.keySlots[String(pos)] ??= {})
    const keep = o && (o.text || o.layer || o.hidden || o.color || o.tint)
    if (keep) k[slot] = o
    else delete k[slot]
    if (!Object.keys(k).length) delete state.v.keySlots[String(pos)]
  }

  /**
   * Solta uma legenda em (dstKey, dstSlot).
   * - mesma tecla: re-mapeia o slot (visual); copy mantém a origem.
   * - outra tecla: move/copia o BINDING da layer de origem (funcional).
   */
  function dropLegend(dstKey: number, dstSlot: Slot, copy: boolean) {
    const d = state.drag
    if (!d) return
    state.drag = null
    if (d.fromKey === dstKey && d.fromSlot === dstSlot) return
    const src = resolveSlot(d.fromKey, d.fromSlot)
    if (!src) return
    commit()

    const srcLayer = src.source === 'custom' || src.source === 'base' ? null : src.source

    if (d.fromKey === dstKey) {
      const k = (state.v.keySlots[String(dstKey)] ??= {})
      k[dstSlot] = srcLayer ? { layer: srcLayer } : { text: src.text }
      if (!copy) {
        if (srcLayer || src.source === 'custom') k[d.fromSlot] = { hidden: true }
      }
      return
    }
    if (srcLayer) {
      const b = getBinding(d.fromKey, srcLayer)
      if (!b) return
      const dst = (state.f.keys[String(dstKey)] ??= {})
      dst[srcLayer] = { ...b }
      if (!copy) delete state.f.keys[String(d.fromKey)]![srcLayer]
    } else {
      const k = (state.v.keySlots[String(dstKey)] ??= {})
      k[dstSlot] = { text: src.text }
      if (!copy && src.source === 'custom')
        delete state.v.keySlots[String(d.fromKey)]?.[d.fromSlot]
    }
  }

  /* ----------------------------- espelhamento ----------------------------- */
  const H_MIRROR: Partial<Record<Slot, Slot>> = {
    TL: 'TR', TR: 'TL', CL: 'CR', CR: 'CL', BL: 'BR', BR: 'BL',
  }
  function mirrorSelection() {
    if (!state.selection.length) return
    commit()
    const mirror = board.value.mirror
    for (const pos of state.selection) {
      const dst = mirror[pos]
      const src = state.f.keys[String(pos)]
      if (src) {
        const d = (state.f.keys[String(dst)] ??= {})
        for (const [layer, b] of Object.entries(src)) d[layer] = { ...b }
      }
      const vo = state.v.keySlots[String(pos)]
      if (vo) {
        const d: Partial<Record<Slot, SlotOverride>> = {}
        for (const [slot, o] of Object.entries(vo) as [Slot, SlotOverride][])
          d[H_MIRROR[slot] ?? slot] = { ...o }
        state.v.keySlots[String(dst)] = d
      }
      const c = state.v.keyColors[String(pos)]
      if (c) state.v.keyColors[String(dst)] = c
    }
  }

  /* ----------------------------- layers ----------------------------- */
  function addLayer(layer: Layer, slot?: Slot) {
    commit()
    state.f.layers.push(layer)
    if (slot) state.v.layerSlots[layer.id] = slot
  }
  function removeLayer(id: LayerId) {
    commit()
    state.f.layers = state.f.layers.filter((l) => l.id !== id)
    delete state.v.layerSlots[id]
    for (const k of Object.values(state.f.keys)) delete k[id]
  }
  function setLayerSlot(id: LayerId, slot: Slot | '') {
    commit()
    if (slot) state.v.layerSlots[id] = slot
    else delete state.v.layerSlots[id]
  }
  function setBaseLayer(id: LayerId) {
    state.v.baseLayer = id
  }

  /* ----------------------------- combos ----------------------------- */
  function comboById(id: string | null): Combo | undefined {
    return id ? state.f.combos.find((c) => c.id === id) : undefined
  }
  /** entra em edição (destaque no board + editor inline no painel) */
  function editCombo(id: string | null) {
    state.editingCombo = id
    state.pickingCombo = false
    state.pickedKeys = id ? [...(comboById(id)?.keys ?? [])] : []
  }
  /** liga a seleção de teclas (cria novo se id = null) */
  function startPickCombo(id: string | null) {
    state.editingCombo = id
    state.pickingCombo = true
    state.pickedKeys = id ? [...(comboById(id)?.keys ?? [])] : []
    state.selection = []
  }
  function cancelPickCombo() {
    state.pickingCombo = false
    state.pickedKeys = []
    state.editingCombo = null
  }
  function addCombo(c: Combo) {
    commit()
    state.f.combos.push(c)
    state.pickingCombo = false
    state.editingCombo = null
  }
  function updateCombo(id: string, patch: Partial<Combo>) {
    commit()
    const c = comboById(id)
    if (c) Object.assign(c, patch)
  }
  function removeCombo(id: string) {
    commit()
    state.f.combos = state.f.combos.filter((c) => c.id !== id)
    delete state.v.comboLabels[id]
    if (state.editingCombo === id) cancelPickCombo()
  }
  function toggleComboKey(id: string, pos: number) {
    const c = comboById(id)
    if (!c) return
    commit()
    const i = c.keys.indexOf(pos)
    if (i >= 0) c.keys.splice(i, 1)
    else c.keys.push(pos)
    c.keys.sort((a, b) => a - b)
  }
  function setComboOffset(id: string, dx: number, dy: number) {
    const cur = state.v.comboLabels[id]
    state.v.comboLabels[id] = { ...cur, dx, dy }
  }
  function setComboAnchor(id: string, anchor: ComboAnchor) {
    commit()
    const cur = state.v.comboLabels[id] ?? { dx: 0, dy: 0 }
    state.v.comboLabels[id] = { ...cur, anchor, dx: 0, dy: 0 }
  }
  function comboColor(c: Combo): string {
    return (c.group && state.v.groupColors[c.group]) || '#74c0fc'
  }

  /* --------------------------- boards (Integrado) --------------------------- */
  function addBoard() {
    state.boards.push({ id: boardSeq++, groups: null, showCombos: true })
  }
  function removeBoard(id: number) {
    if (state.boards.length > 1) state.boards = state.boards.filter((b) => b.id !== id)
  }
  /** um board por grupo de combo */
  function splitBoardsByGroup() {
    state.boards = comboGroups.value.map((g) => ({ id: boardSeq++, groups: [g], showCombos: true }))
  }
  function toggleBoardGroup(b: BoardInstance, group: string) {
    const all = comboGroups.value
    const cur = new Set(b.groups ?? all)
    if (cur.has(group)) cur.delete(group)
    else cur.add(group)
    b.groups = cur.size === all.length ? null : [...cur]
  }

  /* ----------------------------- documento ----------------------------- */
  function loadBundle(b: Bundle) {
    commit()
    state.f = b.functional
    state.v = b.visual
    state.selection = []
    cancelPickCombo()
  }
  function currentBundle(): Bundle {
    return JSON.parse(snapshot({ functional: state.f, visual: state.v }))
  }

  return {
    state, board, baseLayers, activeBase, comboGroups, layerById,
    undo, redo, commit,
    selectKey, clearSelection,
    getBinding, setBinding,
    resolveSlot, resolveKey, getSlotOverride, setSlotOverride, dropLegend,
    mirrorSelection,
    addLayer, removeLayer, setLayerSlot, setBaseLayer,
    comboById, editCombo, startPickCombo, cancelPickCombo,
    addCombo, updateCombo, removeCombo, toggleComboKey,
    setComboOffset, setComboAnchor, comboColor,
    addBoard, removeBoard, splitBoardsByGroup, toggleBoardGroup,
    loadBundle, currentBundle,
  }
}

export type Store = ReturnType<typeof createStore>

let _store: Store | null = null
export function useStore(): Store {
  return (_store ??= createStore())
}
export function resetStore(b?: Bundle) {
  _store = createStore(b)
  return _store
}
