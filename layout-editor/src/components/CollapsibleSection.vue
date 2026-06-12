<script setup lang="ts">
/**
 * Seção lateral colapsável. Pode ser controlada de fora (prop `open` +
 * evento) — usado p/ os botões ✎ expandirem o painel certo.
 */
import { computed, ref } from 'vue'

const props = defineProps<{ title: string; hint?: string; open?: boolean; startOpen?: boolean }>()
const emit = defineEmits<{ (e: 'update:open', v: boolean): void }>()

const inner = ref(props.startOpen ?? true)
const isOpen = computed(() => props.open ?? inner.value)

function toggle() {
  const v = !isOpen.value
  inner.value = v
  emit('update:open', v)
}
</script>

<template>
  <section class="collapsible" :data-section="title">
    <h2 style="cursor:pointer; user-select:none" :title="hint ?? (isOpen ? 'Colapsar' : 'Expandir')"
      @click="toggle">
      {{ isOpen ? '▾' : '▸' }} {{ title }}
    </h2>
    <div v-show="isOpen"><slot /></div>
  </section>
</template>
