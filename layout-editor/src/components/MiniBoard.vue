<script setup lang="ts">
/**
 * Miniatura do teclado para cards de combo: teclas do lado definido
 * coloridas (com o número da posição), lado espelhado em tom mais claro.
 * Com `editable`, clicar marca/desmarca a tecla (lado definido).
 */
import { computed } from 'vue'
import { getBoard } from '../model/geometry'
import { useStore } from '../model/store'

const props = defineProps<{
  highlight: number[]
  secondary?: number[]
  color?: string
  editable?: boolean
  numbers?: boolean
}>()
const emit = defineEmits<{ (e: 'toggle', pos: number): void }>()

const store = useStore()
const board = computed(() => getBoard(store.state.f.keyboard))
const viewBox = computed(() => `-4 -4 ${board.value.width + 8} ${board.value.height + 8}`)
const hl = computed(() => new Set(props.highlight))
const sec = computed(() => new Set(props.secondary ?? []))

function fill(pos: number): string {
  if (hl.value.has(pos)) return props.color ?? '#74c0fc'
  if (sec.value.has(pos)) return (props.color ?? '#74c0fc') + '55'
  return '#f1f3f5'
}
</script>

<template>
  <svg :viewBox="viewBox" xmlns="http://www.w3.org/2000/svg">
    <g v-for="g in board.keys" :key="g.pos"
      :transform="`translate(${g.x} ${g.y}) rotate(${g.r} ${g.w / 2} ${g.h / 2})`">
      <rect :width="g.w" :height="g.h" rx="8" :fill="fill(g.pos)"
        :stroke="hl.has(g.pos) || sec.has(g.pos) ? '#495057' : '#ced4da'" stroke-width="1.5"
        :style="editable ? 'cursor:pointer' : ''" :data-mini-pos="g.pos"
        @click="editable && emit('toggle', g.pos)">
        <title v-if="editable">tecla {{ g.pos }} — clique p/ marcar/desmarcar</title>
      </rect>
      <text v-if="numbers !== false && (hl.has(g.pos) || sec.has(g.pos))"
        :x="g.w / 2" :y="g.h / 2" text-anchor="middle" dominant-baseline="middle"
        font-size="20" fill="#212529" pointer-events="none">{{ g.pos }}</text>
    </g>
  </svg>
</template>
