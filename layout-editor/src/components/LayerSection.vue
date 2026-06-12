<script setup lang="ts">
/**
 * Seção "Por layer": um board por layer mostrando APENAS a ação daquela
 * layer no centro de cada tecla, na cor da layer.
 */
import { computed, ref } from 'vue'
import { useStore } from '../model/store'
import type { Layer } from '../model/types'

const store = useStore()
const board = computed(() => store.board.value)
const viewBox = computed(() => `-6 -6 ${board.value.width + 12} ${board.value.height + 12}`)
const columns = ref(2)
const hidden = ref(new Set<string>())

const layers = computed(() => store.state.f.layers.filter((l) => !hidden.value.has(l.id)))

function toggle(id: string) {
  const s = new Set(hidden.value)
  if (s.has(id)) s.delete(id)
  else s.add(id)
  hidden.value = s
}
function tap(l: Layer, pos: number): string {
  return store.getBinding(pos, l.id)?.tap ?? ''
}
</script>

<template>
  <div class="catalog">
    <div class="row">
      <button v-for="l in store.state.f.layers" :key="l.id" class="chip"
        :class="{ off: hidden.has(l.id) }" :title="`Exibir/ocultar a layer ${l.name}`"
        @click="toggle(l.id)">
        <span class="dot" :style="{ background: l.color ?? '#adb5bd' }" />{{ l.name }}
      </button>
      <span class="spacer" />
      <label title="Colunas da grade">colunas</label>
      <select v-model.number="columns">
        <option :value="1">1</option>
        <option :value="2">2</option>
        <option :value="3">3</option>
      </select>
    </div>

    <div class="layers-grid" :style="{ gridTemplateColumns: `repeat(${columns}, 1fr)` }">
      <div v-for="l in layers" :key="l.id" class="combo-card" :data-layer-board="l.id">
        <div class="name">
          <span class="dot" :style="{ background: l.color ?? '#adb5bd', display: 'inline-block', width: 10, height: 10, borderRadius: '50%' }" />
          {{ l.name }} <span class="keys-badge">({{ l.kind }})</span>
        </div>
        <div v-if="l.access" class="action">{{ l.access }}</div>
        <svg :viewBox="viewBox" xmlns="http://www.w3.org/2000/svg">
          <g v-for="g in board.keys" :key="g.pos"
            :transform="`translate(${g.x} ${g.y}) rotate(${g.r} ${g.w / 2} ${g.h / 2})`">
            <rect :width="g.w" :height="g.h" rx="8" fill="#fff" stroke="#ced4da" stroke-width="1.2" />
            <text v-if="tap(l, g.pos)" :x="g.w / 2" :y="g.h / 2" text-anchor="middle"
              dominant-baseline="middle" font-size="13" :fill="l.color ?? '#212529'">
              {{ tap(l, g.pos) }}
            </text>
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>
