<script setup lang="ts">
/**
 * Aba "Por layer": um board por layer (ação central na cor da layer),
 * com filtros e disposição em colunas.
 */
import { computed, ref } from 'vue'
import { useStore } from '../model/store'
import LayerBoard from './LayerBoard.vue'

const store = useStore()
const columns = ref(2)
const hidden = ref(new Set<string>())

const layers = computed(() => store.state.f.layers.filter((l) => !hidden.value.has(l.id)))

function toggle(id: string) {
  const s = new Set(hidden.value)
  if (s.has(id)) s.delete(id)
  else s.add(id)
  hidden.value = s
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
          <span class="dot" :style="{ background: l.color ?? '#adb5bd' }" />
          {{ l.name }} <span class="keys-badge">({{ l.kind }})</span>
        </div>
        <div v-if="l.access" class="action">{{ l.access }}</div>
        <LayerBoard :layer-left="l.id" :layer-right="l.id" />
      </div>
    </div>
  </div>
</template>
