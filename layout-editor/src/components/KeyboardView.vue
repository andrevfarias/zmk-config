<script setup lang="ts">
/**
 * Board interativo:
 * - drag de legendas entre slots/teclas (Shift = copiar)
 * - combos como INSTÂNCIAS (espelhados = 2 pílulas a partir de 1 config),
 *   linhas ortogonais, anchor, arrastáveis; espaço cresce p/ etiquetas
 * - clique na pílula = destaque; ✎ na pílula = edição (expande o painel)
 * - duplo clique em slot/pílula = edição inline (Enter salva, Esc cancela)
 */
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { useStore, type ComboInstance } from '../model/store'
import type { Slot } from '../model/types'
import KeyView from './KeyView.vue'
import { splitLines } from '../model/text'

const store = useStore()
const props = defineProps<{
  showCombos: boolean
  groups: string[] | null
  hiddenCombos?: string[]
  slotsShown?: Slot[] | null
}>()

const board = computed(() => store.board.value)
const svgEl = ref<SVGSVGElement>()

/* ------------------------- instâncias visíveis ------------------------- */
const visible = computed<ComboInstance[]>(() => {
  if (!props.showCombos) return []
  return store.comboInstances.value.filter((i) =>
    (!props.groups || props.groups.includes(i.combo.group ?? 'outros')) &&
    !(props.hiddenCombos ?? []).includes(i.iid))
})

interface Pill {
  i: ComboInstance
  x: number
  y: number
  w: number
  h: number
  lines: string[]
  editing: boolean
}

function instBBox(i: ComboInstance) {
  const ks = i.keys.map((k) => board.value.keys[k])
  return {
    minX: Math.min(...ks.map((k) => k.x)),
    maxX: Math.max(...ks.map((k) => k.x + k.w)),
    minY: Math.min(...ks.map((k) => k.y)),
    maxY: Math.max(...ks.map((k) => k.y + k.h)),
    cx: ks.reduce((a, k) => a + k.x + k.w / 2, 0) / ks.length,
    cy: ks.reduce((a, k) => a + k.y + k.h / 2, 0) / ks.length,
  }
}

const pills = computed<Pill[]>(() =>
  visible.value.map((i) => {
    const bb = instBBox(i)
    const lab = store.state.v.comboLabels[i.iid]
    const anchor = lab?.anchor ?? 'auto'
    let x = bb.cx
    let y = bb.cy
    if (anchor === 'top') y = bb.minY - 22
    else if (anchor === 'bottom') y = bb.maxY + 22
    else if (anchor === 'left') { x = bb.minX - 34; y = bb.cy }
    else if (anchor === 'right') { x = bb.maxX + 34; y = bb.cy }
    const lines = splitLines(i.label)
    return {
      i,
      x: x + (lab?.dx ?? 0),
      y: y + (lab?.dy ?? 0),
      w: Math.max(34, Math.max(...lines.map((l) => l.length)) * 5.6 + 14),
      h: lines.length * 11 + 7,
      lines,
      editing: store.state.editingCombo === i.combo.id,
    }
  }))

/** caminho ortogonal pílula→tecla */
function comboPath(p: Pill, keyPos: number): string {
  const g = board.value.keys[keyPos]
  const kx = g.x + g.w / 2
  const ky = g.y + g.h / 2
  const bb = instBBox(p.i)
  const verticalFirst = p.y < bb.minY || p.y > bb.maxY
  if (verticalFirst) {
    const px = p.x < kx ? p.x + p.w / 2 : p.x - p.w / 2
    return `M ${kx} ${ky} V ${p.y} H ${px}`
  }
  const py = p.y < ky ? p.y + p.h / 2 : p.y - p.h / 2
  return `M ${kx} ${ky} H ${p.x} V ${py}`
}

/* --------------------- viewBox expansível --------------------- */
const viewBox = computed(() => {
  let minX = 0
  let minY = 0
  let maxX = board.value.width
  let maxY = board.value.height
  for (const p of pills.value) {
    minX = Math.min(minX, p.x - p.w / 2 - 8)
    maxX = Math.max(maxX, p.x + p.w / 2 + 8)
    minY = Math.min(minY, p.y - p.h / 2 - 8)
    maxY = Math.max(maxY, p.y + p.h / 2 + 8)
  }
  return { x: minX - 8, y: minY - 8, w: maxX - minX + 16, h: maxY - minY + 16 }
})
const viewBoxAttr = computed(() =>
  `${viewBox.value.x} ${viewBox.value.y} ${viewBox.value.w} ${viewBox.value.h}`)

defineExpose({ svgEl })

/* ------------------- destaque do combo em edição ------------------- */
const editingKeys = computed(() => {
  const c = store.comboById(store.state.editingCombo)
  if (!c) return new Set<number>()
  const base = store.state.pickingCombo ? store.state.pickedKeys : c.keys
  const all = [...base]
  if (c.mirror) all.push(...store.mirrorKeys(base))
  return new Set(all)
})
function keyDim(pos: number): boolean {
  return !!store.state.editingCombo && !editingKeys.value.has(pos)
}
function keyHighlight(pos: number): string | undefined {
  if (!store.state.editingCombo || !editingKeys.value.has(pos)) return undefined
  const c = store.comboById(store.state.editingCombo)
  return c ? store.comboColor(c) + '66' : undefined
}

/* ------------------------- drag de legenda ------------------------- */
const pending = reactive({ active: false, pos: 0, slot: 'C' as Slot, text: '', startX: 0, startY: 0 })

function onSlotDown(pos: number, slot: Slot, text: string, ev: PointerEvent) {
  if (!text) {
    store.selectKey(pos, ev.ctrlKey || ev.metaKey)
    return
  }
  Object.assign(pending, { active: true, pos, slot, text, startX: ev.clientX, startY: ev.clientY })
}
function onKeyDown(pos: number, ev: PointerEvent) {
  store.selectKey(pos, ev.ctrlKey || ev.metaKey)
}
function onKeyEdit(pos: number) {
  if (!store.state.selection.includes(pos)) store.selectKey(pos)
  store.openPanel('tecla')
}

function onMove(ev: PointerEvent) {
  if (comboDrag.iid) {
    const s = scale()
    comboDrag.moved = true
    store.setComboOffset(comboDrag.iid,
      comboDrag.baseDx + (ev.clientX - comboDrag.startX) / s,
      comboDrag.baseDy + (ev.clientY - comboDrag.startY) / s)
    return
  }
  if (!pending.active) return
  if (!store.state.drag) {
    if (Math.hypot(ev.clientX - pending.startX, ev.clientY - pending.startY) < 5) return
    store.state.drag = { fromKey: pending.pos, fromSlot: pending.slot, text: pending.text, x: ev.clientX, y: ev.clientY }
  }
  store.state.drag.x = ev.clientX
  store.state.drag.y = ev.clientY
}

function onUp(ev: PointerEvent) {
  if (comboDrag.iid) {
    const { comboId, moved } = comboDrag
    comboDrag.iid = ''
    if (moved) store.commit()
    else store.editCombo(store.state.editingCombo === comboId ? null : comboId)
    return
  }
  if (!pending.active) return
  const wasDrag = !!store.state.drag
  pending.active = false
  if (!wasDrag) {
    store.selectKey(pending.pos, ev.ctrlKey || ev.metaKey)
    return
  }
  const el = document.elementFromPoint(ev.clientX, ev.clientY)?.closest('[data-slot]') as SVGElement | null
  if (el?.dataset.pos != null && el.dataset.slot)
    store.dropLegend(Number(el.dataset.pos), el.dataset.slot as Slot, ev.shiftKey)
  else store.state.drag = null
}

function scale(): number {
  const w = svgEl.value?.getBoundingClientRect().width
  return w ? w / viewBox.value.w : 1
}

/* ------------------------- drag/clique de pílula ------------------------- */
const comboDrag = reactive({ iid: '', comboId: '', moved: false, startX: 0, startY: 0, baseDx: 0, baseDy: 0 })
function onComboDown(p: Pill, ev: PointerEvent) {
  const off = store.state.v.comboLabels[p.i.iid]
  Object.assign(comboDrag, {
    iid: p.i.iid, comboId: p.i.combo.id, moved: false,
    startX: ev.clientX, startY: ev.clientY,
    baseDx: off?.dx ?? 0, baseDy: off?.dy ?? 0,
  })
}
function onPillEditBtn(p: Pill) {
  store.editCombo(p.i.combo.id)
  store.openPanel('combos')
}

/* ------------------------- edição inline ------------------------- */
const slotEdit = reactive({ open: false, pos: 0, slot: 'C' as Slot, value: '' })
const pillEdit = reactive({ open: false, iid: '', comboId: '', mirrorSide: false, value: '' })

function openSlotEdit(pos: number, slot: Slot) {
  slotEdit.open = true
  slotEdit.pos = pos
  slotEdit.slot = slot
  slotEdit.value = store.resolveSlot(pos, slot)?.text ?? ''
  pillEdit.open = false
}
function saveSlotEdit() {
  if (!slotEdit.open) return
  const cur = store.getSlotOverride(slotEdit.pos, slotEdit.slot)
  store.setSlotOverride(slotEdit.pos, slotEdit.slot,
    slotEdit.value ? { ...cur, hidden: undefined, text: slotEdit.value } : undefined)
  slotEdit.open = false
}
function openPillEdit(p: Pill) {
  pillEdit.open = true
  pillEdit.iid = p.i.iid
  pillEdit.comboId = p.i.combo.id
  pillEdit.mirrorSide = p.i.side === 'R' && !!p.i.combo.mirror
  pillEdit.value = p.i.label
  slotEdit.open = false
}
function savePillEdit() {
  if (!pillEdit.open) return
  const v = pillEdit.value.trim()
  if (v) store.updateCombo(pillEdit.comboId, pillEdit.mirrorSide ? { mirrorLabel: v } : { label: v })
  pillEdit.open = false
}

function slotEditXY() {
  const g = board.value.keys[slotEdit.pos]
  return { x: g.x, y: g.y + g.h / 2 - 11, transform: `rotate(${g.r} ${g.x + g.w / 2} ${g.y + g.h / 2})` }
}
function onGlyphDrop(pos: number, slot: Slot, glyph: string) {
  const cur = store.getSlotOverride(pos, slot)
  store.setSlotOverride(pos, slot, { ...cur, hidden: undefined, text: glyph })
}
function onPillGlyphDrop(p: Pill, ev: DragEvent) {
  const glyph = ev.dataTransfer?.getData('text/plain')
  if (!glyph) return
  store.updateCombo(p.i.combo.id,
    p.i.side === 'R' && p.i.combo.mirror
      ? { mirrorLabel: (p.i.combo.mirrorLabel ?? p.i.combo.label) + glyph }
      : { label: p.i.combo.label + glyph })
}

onMounted(() => {
  window.addEventListener('pointermove', onMove)
  window.addEventListener('pointerup', onUp)
})
onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onMove)
  window.removeEventListener('pointerup', onUp)
})
</script>

<template>
  <div>
    <svg ref="svgEl" class="board-svg" :viewBox="viewBoxAttr" xmlns="http://www.w3.org/2000/svg">
      <KeyView v-for="g in board.keys" :key="g.pos" :geom="g"
        :dimmed="keyDim(g.pos)" :highlight="keyHighlight(g.pos)" :slots-shown="slotsShown"
        @key-down="onKeyDown" @key-edit="onKeyEdit" @slot-down="onSlotDown"
        @slot-dblclick="openSlotEdit" @glyph-drop="onGlyphDrop" />

      <g v-for="p in pills" :key="p.i.iid" class="combo-pill"
        :class="{ dim: store.state.editingCombo && !p.editing, editing: p.editing }"
        :data-pill="p.i.iid"
        @pointerdown.stop="onComboDown(p, $event)"
        @dblclick.stop="openPillEdit(p)"
        @dragover.prevent @drop.prevent="onPillGlyphDrop(p, $event)">
        <path v-for="k in p.i.keys" :key="k" class="combo-line" :d="comboPath(p, k)" />
        <rect :x="p.x - p.w / 2" :y="p.y - p.h / 2" :width="p.w" :height="p.h" rx="7"
          :fill="store.comboColor(p.i.combo)" />
        <text :y="p.y - p.h / 2 + 12" text-anchor="middle">
          <tspan v-for="(ln, li) in p.lines" :key="li" :x="p.x" :dy="li === 0 ? 0 : 11">{{ ln }}</tspan>
        </text>
        <g class="pill-edit-btn" :transform="`translate(${p.x + p.w / 2 - 1} ${p.y - p.h / 2 + 1})`"
          :data-pill-edit-btn="p.i.iid"
          @pointerdown.stop @click.stop="onPillEditBtn(p)">
          <circle r="7" />
          <text text-anchor="middle" dominant-baseline="middle" font-size="8">✎</text>
          <title>Editar combo (expande o painel Combos)</title>
        </g>
        <title>{{ p.i.label }} → {{ p.i.action }}
clique = destacar · arrastar = posicionar · duplo clique = renomear</title>
      </g>

      <foreignObject v-if="slotEdit.open" v-bind="slotEditXY()" :width="board.keys[slotEdit.pos].w" height="22">
        <input class="inline-edit" :value="slotEdit.value" autofocus data-slot-edit
          @input="slotEdit.value = ($event.target as HTMLInputElement).value"
          @keydown.enter="saveSlotEdit" @keydown.esc="slotEdit.open = false"
          @blur="slotEdit.open = false" @vue:mounted="(e: any) => e.el.focus()" />
      </foreignObject>
      <foreignObject v-if="pillEdit.open"
        :x="(pills.find(p => p.i.iid === pillEdit.iid)?.x ?? 0) - 50"
        :y="(pills.find(p => p.i.iid === pillEdit.iid)?.y ?? 0) - 11" width="100" height="22">
        <input class="inline-edit" :value="pillEdit.value" autofocus data-pill-edit
          @input="pillEdit.value = ($event.target as HTMLInputElement).value"
          @keydown.enter="savePillEdit" @keydown.esc="pillEdit.open = false"
          @blur="pillEdit.open = false" @vue:mounted="(e: any) => e.el.focus()" />
      </foreignObject>
    </svg>
    <div v-if="store.state.drag" class="drag-ghost"
      :style="{ left: store.state.drag.x + 10 + 'px', top: store.state.drag.y + 8 + 'px' }">
      {{ store.state.drag.text }}
    </div>
  </div>
</template>
