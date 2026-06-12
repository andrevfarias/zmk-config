<script setup lang="ts">
/**
 * Scan de atalho: clica, pressiona a combinação no teclado físico e o
 * resultado ("Ctrl+F9") é emitido para preencher o campo de ação.
 */
import { onBeforeUnmount, ref } from 'vue'
import { formatShortcut } from '../model/text'

const emit = defineEmits<{ (e: 'scan', shortcut: string): void }>()
const armed = ref(false)

function onKey(ev: KeyboardEvent) {
  ev.preventDefault()
  ev.stopPropagation()
  if (['Control', 'Alt', 'Shift', 'Meta'].includes(ev.key)) return // espera a tecla final
  emit('scan', formatShortcut(ev))
  disarm()
}
function arm() {
  if (armed.value) {
    disarm()
    return
  }
  armed.value = true
  window.addEventListener('keydown', onKey, true)
}
function disarm() {
  armed.value = false
  window.removeEventListener('keydown', onKey, true)
}
onBeforeUnmount(disarm)
</script>

<template>
  <button :class="{ primary: armed }" data-scan
    :title="armed ? 'Pressione a combinação no teclado…' : 'Capturar atalho do teclado (scan)'"
    @click="arm">
    {{ armed ? '…' : '⌨' }}
  </button>
</template>
