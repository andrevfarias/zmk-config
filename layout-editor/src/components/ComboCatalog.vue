<script setup lang="ts">
/**
 * Catálogo/colinha: um mini-teclado por combo, com as teclas coloridas e o
 * texto descritivo — o guia impresso de uso do teclado.
 */
import { computed } from 'vue'
import { useStore } from '../model/store'
import type { Combo } from '../model/types'
import MiniBoard from './MiniBoard.vue'

const store = useStore()

const groups = computed(() => {
  const m = new Map<string, Combo[]>()
  for (const c of store.state.f.combos) {
    const g = c.group ?? 'outros'
    if (!m.has(g)) m.set(g, [])
    m.get(g)!.push(c)
  }
  return m
})
</script>

<template>
  <div class="catalog">
    <p class="hint">
      Guia de combos — cada cartão mostra as teclas pressionadas juntas e a ação produzida.
      Combos espelhados aparecem duas vezes (uma por mão).
    </p>
    <template v-for="[group, combos] in groups" :key="group">
      <h2>
        <span class="chip">
          <span class="dot" :style="{ background: store.state.v.groupColors[group] ?? '#74c0fc' }" />
          {{ group }} ({{ combos.length }})
        </span>
      </h2>
      <div class="catalog-grid">
        <div v-for="c in combos" :key="c.id" class="combo-card" :data-combo="c.id">
          <MiniBoard :highlight="c.keys" :color="store.comboColor(c)" />
          <div class="name">{{ c.name }}</div>
          <div class="action">
            {{ c.action }}<template v-if="c.description"> — {{ c.description }}</template>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
