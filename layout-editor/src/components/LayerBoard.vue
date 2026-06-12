<script setup lang="ts">
/**
 * Teclado com UMA layer centrada por metade (esq/dir podem diferir —
 * útil porque as layers são espelhadas). Usado na seção "Por layer" e
 * nos painéis configuráveis do Integrado.
 */
import { computed, ref } from 'vue'
import { useStore } from '../model/store'
import { splitLines } from '../model/text'

const props = defineProps<{ layerLeft: string; layerRight: string }>()
const store = useStore()
const board = computed(() => store.board.value)
const viewBox = computed(() => `-6 -6 ${board.value.width + 12} ${board.value.height + 12}`)
const svgEl = ref<SVGSVGElement>()
defineExpose({ svgEl })

function layerOf(half: 'L' | 'R') {
  return store.layerById(half === 'L' ? props.layerLeft : props.layerRight)
}
function tap(pos: number, half: 'L' | 'R'): string {
  const l = layerOf(half)
  if (!l) return ''
  const b = store.getBinding(pos, l.id)
  return b?.display || b?.tap || ''
}
</script>

<template>
  <svg ref="svgEl" class="board-svg" :viewBox="viewBox" xmlns="http://www.w3.org/2000/svg">
    <g v-for="g in board.keys" :key="g.pos"
      :transform="`translate(${g.x} ${g.y}) rotate(${g.r} ${g.w / 2} ${g.h / 2})`">
      <rect :width="g.w" :height="g.h" rx="8" fill="#fff" stroke="#ced4da" stroke-width="1.2" />
      <text v-if="tap(g.pos, g.half)" :x="g.w / 2" :y="g.h / 2" text-anchor="middle"
        dominant-baseline="middle" font-size="12.5"
        :fill="layerOf(g.half)?.color ?? '#212529'">
        <tspan v-for="(ln, i) in splitLines(tap(g.pos, g.half))" :key="i"
          :x="g.w / 2" :dy="i === 0 ? 0 : '1.05em'">{{ ln }}</tspan>
      </text>
    </g>
  </svg>
</template>
