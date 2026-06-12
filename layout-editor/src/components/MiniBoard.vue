<script setup lang="ts">
/**
 * Miniatura do teclado: usada no catálogo de combos — teclas do combo
 * coloridas, demais em cinza claro. Opcionalmente mostra a legenda central.
 */
import { computed } from 'vue'
import { getBoard } from '../model/geometry'
import { useStore } from '../model/store'

const props = defineProps<{
  highlight: number[]
  color?: string
  showLegends?: boolean
}>()

const store = useStore()
const board = computed(() => getBoard(store.state.f.keyboard))
const viewBox = computed(() => `-4 -4 ${board.value.width + 8} ${board.value.height + 8}`)
const hl = computed(() => new Set(props.highlight))

function legend(pos: number): string {
  return store.resolveSlot(pos, 'C')?.text ?? ''
}
</script>

<template>
  <svg :viewBox="viewBox" xmlns="http://www.w3.org/2000/svg">
    <g v-for="g in board.keys" :key="g.pos"
      :transform="`translate(${g.x} ${g.y}) rotate(${g.r} ${g.w / 2} ${g.h / 2})`">
      <rect :width="g.w" :height="g.h" rx="8"
        :fill="hl.has(g.pos) ? (color ?? '#74c0fc') : '#f1f3f5'"
        :stroke="hl.has(g.pos) ? '#495057' : '#ced4da'" stroke-width="1.5"
        :data-mini-pos="g.pos" />
      <text v-if="showLegends && legend(g.pos)" :x="g.w / 2" :y="g.h / 2"
        text-anchor="middle" dominant-baseline="middle" font-size="16" fill="#495057">
        {{ legend(g.pos) }}
      </text>
    </g>
  </svg>
</template>
