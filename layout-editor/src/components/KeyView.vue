<script setup lang="ts">
/**
 * Uma tecla do board: corpo, faixa frontal e os 10 slots de legenda.
 * Cada slot tem uma área de hit transparente (drag/drop e clique).
 */
import { computed } from 'vue'
import type { KeyGeom } from '../model/geometry'
import type { Slot } from '../model/types'
import { SLOTS } from '../model/types'
import { useStore } from '../model/store'

const props = defineProps<{ geom: KeyGeom }>()
const emit = defineEmits<{
  (e: 'key-down', pos: number, ev: PointerEvent): void
  (e: 'slot-down', pos: number, slot: Slot, text: string, ev: PointerEvent): void
}>()

const store = useStore()
const pos = computed(() => props.geom.pos)
const resolved = computed(() => store.resolveKey(pos.value))
const selected = computed(() => store.state.selection.includes(pos.value))
const picked = computed(() => store.state.pickedKeys.includes(pos.value))
const fill = computed(() => store.state.v.keyColors[String(pos.value)])

const FRONT_H = 0.14 // fração da altura reservada à "frente" da tecla

/** posição relativa (0..1) de cada slot dentro da tecla */
const SLOT_XY: Record<Slot, { x: number; y: number; anchor: string }> = {
  TL: { x: 0.1, y: 0.2, anchor: 'start' },
  TC: { x: 0.5, y: 0.2, anchor: 'middle' },
  TR: { x: 0.9, y: 0.2, anchor: 'end' },
  CL: { x: 0.1, y: 0.47, anchor: 'start' },
  C: { x: 0.5, y: 0.5, anchor: 'middle' },
  CR: { x: 0.9, y: 0.47, anchor: 'end' },
  BL: { x: 0.1, y: 0.74, anchor: 'start' },
  BC: { x: 0.5, y: 0.76, anchor: 'middle' },
  BR: { x: 0.9, y: 0.74, anchor: 'end' },
  F: { x: 0.5, y: 0.95, anchor: 'middle' },
}

function fontSize(slot: Slot): number {
  const base = slot === 'C' ? 12 : slot === 'F' ? 7.5 : 8.5
  return base * (store.state.v.slotScale[slot] ?? 1)
}
function slotClass(slot: Slot): string {
  const src = resolved.value[slot]?.source
  return src === 'hold' || src === 'shift' || slot === 'F' ? 'slot-text muted' : 'slot-text'
}
const usableH = computed(() => props.geom.h * (1 - FRONT_H))
function sx(slot: Slot): number {
  return props.geom.w * SLOT_XY[slot].x
}
function sy(slot: Slot): number {
  const p = SLOT_XY[slot]
  return slot === 'F' ? props.geom.h * p.y : usableH.value * p.y + 4
}
const transform = computed(() => {
  const g = props.geom
  return `translate(${g.x} ${g.y}) rotate(${g.r} ${g.w / 2} ${g.h / 2})`
})
</script>

<template>
  <g class="key" :class="{ selected, picked }" :transform="transform"
    :data-pos="pos" @pointerdown.self="emit('key-down', pos, $event)">
    <rect class="key-body" :style="fill ? `fill:${fill}` : ''"
      :width="geom.w" :height="geom.h" rx="7"
      @pointerdown="emit('key-down', pos, $event)" />
    <rect class="key-front" :y="geom.h * (1 - 0.14)" :width="geom.w" :height="geom.h * 0.14" rx="4"
      @pointerdown="emit('key-down', pos, $event)" />
    <template v-for="slot in SLOTS" :key="slot">
      <text v-if="resolved[slot]" :class="slotClass(slot)"
        :x="sx(slot)" :y="sy(slot)" :font-size="fontSize(slot)"
        :text-anchor="SLOT_XY[slot].anchor" dominant-baseline="middle">
        {{ resolved[slot]!.text }}
      </text>
      <rect class="slot-hit droppable" :data-pos="pos" :data-slot="slot"
        :x="sx(slot) - (SLOT_XY[slot].anchor === 'middle' ? geom.w * 0.18 : SLOT_XY[slot].anchor === 'end' ? geom.w * 0.3 : 0) - 2"
        :y="sy(slot) - 7" :width="geom.w * 0.36" height="14" rx="3"
        @pointerdown.stop="emit('slot-down', pos, slot, resolved[slot]?.text ?? '', $event)" />
    </template>
  </g>
</template>
