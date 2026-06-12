<script setup lang="ts">
/** Seção lateral colapsável (Tecla, Combos, Layers, Paleta...). */
import { ref } from 'vue'

const props = defineProps<{ title: string; hint?: string; startOpen?: boolean }>()
const open = ref(props.startOpen ?? true)
</script>

<template>
  <section class="collapsible" :data-section="title">
    <h2 style="cursor:pointer; user-select:none" :title="hint ?? (open ? 'Colapsar' : 'Expandir')"
      @click="open = !open">
      {{ open ? '▾' : '▸' }} {{ title }}
    </h2>
    <div v-show="open"><slot /></div>
  </section>
</template>
