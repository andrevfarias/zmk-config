<script setup lang="ts">
/**
 * Modal de área de transferência: exportar (copiar o JSON do bundle) e
 * importar (colar o JSON). Sempre o bundle completo.
 */
import { ref, watch } from 'vue'

const props = defineProps<{ mode: 'export' | 'import'; text?: string }>()
const emit = defineEmits<{ (e: 'close'): void; (e: 'import', text: string) : void }>()

const value = ref(props.text ?? '')
const copied = ref(false)
watch(() => props.text, (t) => (value.value = t ?? ''))

async function copy() {
  await navigator.clipboard?.writeText(value.value).catch(() => {})
  copied.value = true
  setTimeout(() => (copied.value = false), 1500)
}
</script>

<template>
  <div class="modal-backdrop" @click.self="emit('close')">
    <div class="modal" data-clipboard-modal>
      <h2>{{ mode === 'export' ? 'Exportar (copie o JSON)' : 'Importar (cole o JSON do bundle)' }}</h2>
      <textarea v-model="value" :readonly="mode === 'export'" rows="14" data-clipboard-text
        spellcheck="false" />
      <div class="row">
        <button v-if="mode === 'export'" class="primary" title="Copiar para a área de transferência"
          @click="copy">{{ copied ? '✓ copiado!' : '📋 Copiar' }}</button>
        <button v-else class="primary" data-clipboard-import title="Validar e carregar o bundle colado"
          @click="emit('import', value)">Importar</button>
        <span class="spacer" />
        <button @click="emit('close')">Fechar</button>
      </div>
    </div>
  </div>
</template>
