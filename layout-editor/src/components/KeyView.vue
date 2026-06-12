<script setup lang="ts">
/**
 * Uma tecla do board: corpo, faixa frontal e os 10 slots de legenda.
 * - cor do texto = cor da layer (ou override/tinta)
 * - filtro de slots exibidos (config do painel)
 * - duplo clique no slot = edição inline; drop de glifos da paleta
 * - ✎ na tecla selecionada abre o painel "Tecla"
 * - modo "números" mostra a posição física
 */
import { computed } from 'vue'
import type { KeyGeom } from '../model/geometry'
import type { Slot } from '../model/types'
import { SLOTS } from '../model/types'
import { useStore } from '../model/store'
import { splitLines } from '../model/text'

const props = defineProps<{
  geom: KeyGeom
  dimmed?: boolean
  highlight?: string
  slotsShown?: Slot[] | null
}>()
const emit = defineEmits<{
  (e: 'key-down', pos: number, ev: PointerEvent): void
  (e: 'key-edit', pos: number): void
  (e: 'slot-down', pos: number, slot: Slot, text: string, ev: PointerEvent): void
  (e: 'slot-dblclick', pos: number, slot: Slot): void
  (e: 'glyph-drop', pos: number, slot: Slot, glyph: string): void
}>()

const store = useStore()
const pos = computed(() => props.geom.pos)
const resolved = computed(() => store.resolveKey(pos.value))
const visibleSlots = computed(() =>
  SLOTS.filter((s) => !props.slotsShown || props.slotsShown.includes(s)))
const selected = computed(() => store.state.selection.includes(pos.value))
const picked = computed(() => store.state.pickedKeys.includes(pos.value))
const fill = computed(() => props.highlight ?? store.state.v.keyColors[String(pos.value)])

const SLOT_XY: Record<Slot, { x: number; y: number; anchor: 'start' | 'middle' | 'end' }> = {
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
const FRONT_H = 0.14

function fontSize(slot: Slot): number {
  const base = slot === 'C' ? 12 : slot === 'F' ? 7.5 : 8.5
  return base * (store.state.v.slotScale[slot] ?? 1)
}
const usableH = computed(() => props.geom.h * (1 - FRONT_H))
function sx(slot: Slot): number {
  return props.geom.w * SLOT_XY[slot].x
}
function sy(slot: Slot): number {
  const p = SLOT_XY[slot]
  return slot === 'F' ? props.geom.h * p.y : usableH.value * p.y + 4
}
/** área de hit alinhada com o texto conforme o anchor */
function hitX(slot: Slot): number {
  const w = props.geom.w * 0.36
  const a = SLOT_XY[slot].anchor
  if (a === 'start') return sx(slot) - 3
  if (a === 'end') return sx(slot) - w + 3
  return sx(slot) - w / 2
}
const transform = computed(() => {
  const g = props.geom
  return `translate(${g.x} ${g.y}) rotate(${g.r} ${g.w / 2} ${g.h / 2})`
})

function onDrop(slot: Slot, ev: DragEvent) {
  const glyph = ev.dataTransfer?.getData('text/plain')
  if (glyph) emit('glyph-drop', pos.value, slot, glyph)
}
</script>

<template>
  <g class="key" :class="{ selected, picked, dimmed }" :transform="transform" :data-pos="pos">
    <rect class="key-body" :style="fill ? `fill:${fill}` : ''"
      :width="geom.w" :height="geom.h" rx="7"
      @pointerdown="emit('key-down', pos, $event)">
      <title>tecla {{ pos }} — clique seleciona · Ctrl+clique multi-seleção</title>
    </rect>
    <rect class="key-front" :y="geom.h * (1 - FRONT_H)" :width="geom.w" :height="geom.h * FRONT_H" rx="4"
      @pointerdown="emit('key-down', pos, $event)" />

    <template v-if="store.state.showNumbers">
      <text class="key-number" :x="geom.w / 2" :y="geom.h / 2" text-anchor="middle"
        dominant-baseline="middle" font-size="16">{{ pos }}</text>
    </template>
    <template v-else>
      <template v-for="slot in visibleSlots" :key="slot">
        <text v-if="resolved[slot]" class="slot-text"
          :x="sx(slot)" :y="sy(slot)" :font-size="fontSize(slot)"
          :fill="resolved[slot]!.color ?? (slot === 'F' ? '#868e96' : '#212529')"
          :text-anchor="SLOT_XY[slot].anchor" dominant-baseline="middle">
          <tspan v-for="(ln, i) in splitLines(resolved[slot]!.text)" :key="i"
            :x="sx(slot)" :dy="i === 0 ? 0 : '1.05em'">{{ ln }}</tspan>
        </text>
        <rect class="slot-hit droppable" :data-pos="pos" :data-slot="slot"
          :x="hitX(slot)" :y="sy(slot) - 7" :width="geom.w * 0.36" height="14" rx="3"
          @pointerdown.stop="emit('slot-down', pos, slot, resolved[slot]?.text ?? '', $event)"
          @dblclick.stop="emit('slot-dblclick', pos, slot)"
          @dragover.prevent @drop.prevent="onDrop(slot, $event)">
          <title>{{ slot }} — arraste p/ mover (Shift copia) · duplo clique edita</title>
        </rect>
      </template>
      <g v-if="selected && store.state.selection.length === 1" class="key-edit-btn"
        :transform="`translate(${geom.w - 9} 9)`" @pointerdown.stop @click.stop="emit('key-edit', pos)">
        <circle r="8" />
        <text text-anchor="middle" dominant-baseline="middle" font-size="9">✎</text>
        <title>Editar esta tecla (abre o painel Tecla)</title>
      </g>
    </template>
  </g>
</template>
