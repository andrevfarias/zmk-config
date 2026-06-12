/**
 * Estado reativo do editor + todas as ações de edição.
 * Mantido como composable simples (sem Pinia) para facilitar manutenção
 * e teste — toda mutação passa por uma action que registra undo.
 */
import { computed, reactive } from 'vue'
import type { Bundle, Combo, KeyBinding, Layer, LayerId, Slot, SlotOverride } from './types'
import { SLOTS } from './types'
import { defaultBundle } from './defaults'
import { getBoard } from './geometry'

export interface ResolvedSlot {
  text: string
  /** de onde veio: layer id, 'base', 'shift', 'hold' ou 'custom' */
  source: string
}

interface DragState {
  fromKey: number
  fromSlot: Slot
  text: string
  x: number
  y: number
}

function snapshot(b: Bundle): string {
  return JSON.stringify(b)
}

export function createStore(initial?: Bundle) {
  const bundle = initial ?? defaultBundle()
  const state = reactive({
    f: bundle.functional,
    v: bundle.visual,
    selection: [] as number[],
    /** modo de seleção de teclas para criação/edição de combo */
    pickingCombo: false,
    pickedKeys: [] as number[],
    drag: null as DragState | null,
    undoStack: [] as string[],
    redoStack: [] as string[],
    activeTab: 'editor' as 'editor' | 'combos',
  })

  const board = computed(() => getBoard(state.f.keyboard))
  const baseLayer = computed<Layer | undefined>(() => state.f.layers.find((l) => l.kind === 'base'))

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
    const clean = b && Object.values(b).some((x) => x)
    if (clean) key[layer] = { ...b }
    else delete key[layer]
  }

  /* ------------------------- resolução de slots ------------------------- */
  function resolveSlot(pos: number, slot: Slot): ResolvedSlot | null {
    const o: SlotOverride | undefined = state.v.keyOverrides[String(pos)]?.[slot]
    if (o?.hidden) return null
    if (o?.text !== undefined) return { text: o.text, source: 'custom' }
    if (o?.layer) {
      const t = getBinding(pos, o.layer)?.tap
      return t ? { text: t, source: o.layer } : null
    }
    const base = baseLayer.value
    if (slot === 'C') {
      const t = base && getBinding(pos, base.id)?.tap
      return t ? { text: t, source: 'base' } : null
    }
    if (slot === state.v.shiftSlot) {
      const t = base && getBinding(pos, base.id)?.shift
      if (t) return { text: t, source: 'shift' }
    }
    if (slot === state.v.holdSlot) {
      const t = base && getBinding(pos, base.id)?.hold
      if (t) return { text: t, source: 'hold' }
    }
    for (const layer of state.f.layers) {
      if (state.v.layerSlots[layer.id] === slot) {
        const t = getBinding(pos, layer.id)?.tap
        if (t) return { text: t, source: layer.id }
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

  /* ----------------------- drag de legenda (slots) ----------------------- */
  function setSlotOverride(pos: number, slot: Slot, o: SlotOverride | undefined) {
    commit()
    const k = (state.v.keyOverrides[String(pos)] ??= {})
    if (o) k[slot] = o
    else delete k[slot]
    if (!Object.keys(k).length) delete state.v.keyOverrides[String(pos)]
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

    const srcLayer =
      src.source === 'custom' || src.source === 'base' || src.source === 'shift' || src.source === 'hold'
        ? null
        : src.source

    if (d.fromKey === dstKey) {
      // visual: mostra esse conteúdo no slot destino
      const k = (state.v.keyOverrides[String(dstKey)] ??= {})
      k[dstSlot] = srcLayer ? { layer: srcLayer } : { text: src.text }
      if (!copy) {
        if (srcLayer || src.source === 'custom') k[d.fromSlot] = { hidden: true }
      }
      return
    }
    // funcional: move/copia o binding da layer para outra tecla
    if (srcLayer) {
      const b = getBinding(d.fromKey, srcLayer)
      if (!b) return
      const dst = (state.f.keys[String(dstKey)] ??= {})
      dst[srcLayer] = { ...b }
      if (!copy) delete state.f.keys[String(d.fromKey)]![srcLayer]
    } else {
      const k = (state.v.keyOverrides[String(dstKey)] ??= {})
      k[dstSlot] = { text: src.text }
      if (!copy && src.source === 'custom')
        delete state.v.keyOverrides[String(d.fromKey)]?.[d.fromSlot]
    }
  }

  /* ----------------------------- espelhamento ----------------------------- */
  const H_MIRROR: Partial<Record<Slot, Slot>> = {
    TL: 'TR', TR: 'TL', CL: 'CR', CR: 'CL', BL: 'BR', BR: 'BL',
  }
  /**
   * Espelha as teclas selecionadas para a outra metade (por dedo).
   * Copia bindings de todas as layers + overrides visuais (slots laterais
   * trocados). Conteúdo direcional fica a cargo do usuário ajustar.
   */
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
      const vo = state.v.keyOverrides[String(pos)]
      if (vo) {
        const d: Partial<Record<Slot, SlotOverride>> = {}
        for (const [slot, o] of Object.entries(vo) as [Slot, SlotOverride][])
          d[H_MIRROR[slot] ?? slot] = { ...o }
        state.v.keyOverrides[String(dst)] = d
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

  /* ----------------------------- combos ----------------------------- */
  function startPickCombo(initial: number[] = []) {
    state.pickingCombo = true
    state.pickedKeys = [...initial]
    state.selection = []
  }
  function cancelPickCombo() {
    state.pickingCombo = false
    state.pickedKeys = []
  }
  function addCombo(c: Combo) {
    commit()
    state.f.combos.push(c)
    cancelPickCombo()
  }
  function updateCombo(id: string, patch: Partial<Combo>) {
    commit()
    const c = state.f.combos.find((x) => x.id === id)
    if (c) Object.assign(c, patch)
    cancelPickCombo()
  }
  function removeCombo(id: string) {
    commit()
    state.f.combos = state.f.combos.filter((c) => c.id !== id)
    delete state.v.comboLabels[id]
  }
  function setComboOffset(id: string, dx: number, dy: number) {
    state.v.comboLabels[id] = { dx, dy }
  }
  function comboColor(c: Combo): string {
    return (c.group && state.v.groupColors[c.group]) || '#74c0fc'
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
    state, board, baseLayer,
    undo, redo, commit,
    selectKey, clearSelection,
    getBinding, setBinding,
    resolveSlot, resolveKey, setSlotOverride, dropLegend,
    mirrorSelection,
    addLayer, removeLayer, setLayerSlot,
    startPickCombo, cancelPickCombo, addCombo, updateCombo, removeCombo,
    setComboOffset, comboColor,
    loadBundle, currentBundle,
  }
}

export type Store = ReturnType<typeof createStore>

/** instância global usada pela UI (testes criam as suas com createStore) */
let _store: Store | null = null
export function useStore(): Store {
  return (_store ??= createStore())
}
export function resetStore(b?: Bundle) {
  _store = createStore(b)
  return _store
}
