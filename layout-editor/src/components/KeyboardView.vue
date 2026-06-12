<script setup lang="ts">
/**
 * Board interativo: teclas fixas (geometria), drag de legendas entre slots
 * (Shift = copiar) e pílulas de combo arrastáveis.
 */
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { useStore } from '../model/store'
import type { Slot } from '../model/types'
import type { Combo } from '../model/types'
import KeyView from './KeyView.vue'

const store = useStore()
const props = defineProps<{ showCombos: boolean; comboGroups: Set<string> }>()

const board = computed(() => store.board.value)
const viewBox = computed(() => `-8 -8 ${board.value.width + 16} ${board.value.height + 16}`)

/* ------------------------- drag de legenda ------------------------- */
const pending = reactive({
  active: false, pos: 0, slot: 'C' as Slot, text: '', startX: 0, startY: 0,
})

function onSlotDown(pos: number, slot: Slot, text: string, ev: PointerEvent) {
  if (!text) {
    store.selectKey(pos, ev.ctrlKey || ev.metaKey)
    return
  }
  pending.active = true
  pending.pos = pos
  pending.slot = slot
  pending.text = text
  pending.startX = ev.clientX
  pending.startY = ev.clientY
}
function onKeyDown(pos: number, ev: PointerEvent) {
  store.selectKey(pos, ev.ctrlKey || ev.metaKey)
}

function onMove(ev: PointerEvent) {
  if (comboDrag.id) {
    const scale = svgScale()
    store.setComboOffset(comboDrag.id,
      comboDrag.baseDx + (ev.clientX - comboDrag.startX) / scale,
      comboDrag.baseDy + (ev.clientY - comboDrag.startY) / scale)
    return
  }
  if (!pending.active) return
  if (!store.state.drag) {
    const dist = Math.hypot(ev.clientX - pending.startX, ev.clientY - pending.startY)
    if (dist < 5) return
    store.state.drag = { fromKey: pending.pos, fromSlot: pending.slot, text: pending.text, x: ev.clientX, y: ev.clientY }
  }
  store.state.drag.x = ev.clientX
  store.state.drag.y = ev.clientY
}

function onUp(ev: PointerEvent) {
  if (comboDrag.id) {
    comboDrag.id = ''
    store.commit()
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
  if (el?.dataset.pos != null && el.dataset.slot) {
    store.dropLegend(Number(el.dataset.pos), el.dataset.slot as Slot, ev.shiftKey)
  } else {
    store.state.drag = null
  }
}

/* ------------------------- pílulas de combo ------------------------- */
const comboDrag = reactive({ id: '', startX: 0, startY: 0, baseDx: 0, baseDy: 0 })
const svgEl = ref<SVGSVGElement>()

function svgScale(): number {
  const w = svgEl.value?.getBoundingClientRect().width
  return w ? w / (board.value.width + 16) : 1
}

const visibleCombos = computed(() =>
  props.showCombos
    ? store.state.f.combos.filter((c) => !c.group || props.comboGroups.has(c.group))
    : [])

function comboCenter(c: Combo): { x: number; y: number } {
  const ks = c.keys.map((k) => board.value.keys[k])
  const x = ks.reduce((a, k) => a + k.x + k.w / 2, 0) / ks.length
  const y = ks.reduce((a, k) => a + k.y + k.h / 2, 0) / ks.length
  const off = store.state.v.comboLabels[c.id]
  return { x: x + (off?.dx ?? 0), y: y + (off?.dy ?? 0) }
}
function comboKeyCenters(c: Combo): { x: number; y: number }[] {
  return c.keys.map((k) => {
    const g = board.value.keys[k]
    return { x: g.x + g.w / 2, y: g.y + g.h / 2 }
  })
}
function pillWidth(c: Combo): number {
  return Math.max(34, c.name.length * 5.6 + 14)
}
function onComboDown(c: Combo, ev: PointerEvent) {
  const off = store.state.v.comboLabels[c.id]
  comboDrag.id = c.id
  comboDrag.startX = ev.clientX
  comboDrag.startY = ev.clientY
  comboDrag.baseDx = off?.dx ?? 0
  comboDrag.baseDy = off?.dy ?? 0
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
    <svg ref="svgEl" class="board-svg" :viewBox="viewBox" xmlns="http://www.w3.org/2000/svg">
      <KeyView v-for="g in board.keys" :key="g.pos" :geom="g"
        @key-down="onKeyDown" @slot-down="onSlotDown" />
      <g v-for="c in visibleCombos" :key="c.id" class="combo-pill"
        @pointerdown.stop="onComboDown(c, $event)">
        <polyline v-for="(p, i) in comboKeyCenters(c)" :key="i" class="combo-line"
          :points="`${p.x},${p.y} ${comboCenter(c).x},${comboCenter(c).y}`" />
        <rect :x="comboCenter(c).x - pillWidth(c) / 2" :y="comboCenter(c).y - 9"
          :width="pillWidth(c)" height="18" rx="7" :fill="store.comboColor(c)" />
        <text :x="comboCenter(c).x" :y="comboCenter(c).y + 3" text-anchor="middle">{{ c.name }}</text>
      </g>
    </svg>
    <div v-if="store.state.drag" class="drag-ghost"
      :style="{ left: store.state.drag.x + 10 + 'px', top: store.state.drag.y + 8 + 'px' }">
      {{ store.state.drag.text }}
    </div>
  </div>
</template>
