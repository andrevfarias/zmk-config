<script setup lang="ts">
/**
 * Miniatura do teclado para o catálogo: teclas do combo coloridas.
 * Com `editable`, clicar numa tecla marca/desmarca (emite toggle).
 */
import { computed } from 'vue'
import { getBoard } from '../model/geometry'
import { useStore } from '../model/store'

const props = defineProps<{
  highlight: number[]
  color?: string
  editable?: boolean
}>()
const emit = defineEmits<{ (e: 'toggle', pos: number): void }>()

const store = useStore()
const board = computed(() => getBoard(store.state.f.keyboard))
const viewBox = computed(() => `-4 -4 ${board.value.width + 8} ${board.value.height + 8}`)
const hl = computed(() => new Set(props.highlight))
</script>

<template>
  <svg :viewBox="viewBox" xmlns="http://www.w3.org/2000/svg" :class="{ editable }">
    <g v-for="g in board.keys" :key="g.pos"
      :transform="`translate(${g.x} ${g.y}) rotate(${g.r} ${g.w / 2} ${g.h / 2})`">
      <rect :width="g.w" :height="g.h" rx="8"
        :fill="hl.has(g.pos) ? (color ?? '#74c0fc') : '#f1f3f5'"
        :stroke="hl.has(g.pos) ? '#495057' : '#ced4da'" stroke-width="1.5"
        :style="editable ? 'cursor:pointer' : ''"
        :data-mini-pos="g.pos"
        @click="editable && emit('toggle', g.pos)">
        <title v-if="editable">tecla {{ g.pos }} — clique p/ marcar/desmarcar</title>
      </rect>
    </g>
  </svg>
</template>
