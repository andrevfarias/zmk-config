<script setup lang="ts">
/**
 * Mapa de ícones (estilo fonte do KLE): clique insere no último campo
 * focado; arrastar solta em slots do board e em etiquetas de combo.
 */
import { onBeforeUnmount, onMounted } from 'vue'
import { GLYPHS } from '../model/glyphs'

let lastInput: HTMLInputElement | HTMLTextAreaElement | null = null
function trackFocus(ev: FocusEvent) {
  const t = ev.target as HTMLElement
  if ((t.tagName === 'INPUT' && (t as HTMLInputElement).type === 'text') ||
    t.tagName === 'TEXTAREA' || (t.tagName === 'INPUT' && !(t as HTMLInputElement).type))
    lastInput = t as HTMLInputElement
}

function insert(ch: string) {
  const el = lastInput
  if (!el || !el.isConnected) return
  const start = el.selectionStart ?? el.value.length
  const end = el.selectionEnd ?? start
  el.value = el.value.slice(0, start) + ch + el.value.slice(end)
  el.dispatchEvent(new Event('input', { bubbles: true }))
  el.dispatchEvent(new Event('change', { bubbles: true }))
  el.focus()
  el.selectionStart = el.selectionEnd = start + ch.length
}

function onDragStart(ch: string, ev: DragEvent) {
  ev.dataTransfer?.setData('text/plain', ch)
}

onMounted(() => document.addEventListener('focusin', trackFocus))
onBeforeUnmount(() => document.removeEventListener('focusin', trackFocus))
</script>

<template>
  <div>
    <p class="hint">Clique insere no último campo focado · arraste para um slot ou etiqueta.</p>
    <div v-for="g in GLYPHS" :key="g.name" class="glyph-group">
      <label>{{ g.name }}</label>
      <div class="glyph-row">
        <button v-for="gl in g.glyphs" :key="gl.ch" class="glyph" draggable="true"
          :title="gl.hint" :data-glyph="gl.ch"
          @click="insert(gl.ch)" @dragstart="onDragStart(gl.ch, $event)">
          {{ gl.ch }}
        </button>
      </div>
    </div>
  </div>
</template>
