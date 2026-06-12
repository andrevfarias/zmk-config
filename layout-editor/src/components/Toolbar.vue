<script setup lang="ts">
/**
 * Barra superior: seções, undo/redo, import/export do BUNDLE (arquivo e
 * área de transferência), permalink e reset.
 */
import { ref } from 'vue'
import { useStore } from '../model/store'
import { exportBundle, importBundle, ImportError } from '../model/serialization'
import { encodePermalink } from '../model/permalink'
import { defaultBundle } from '../model/defaults'
import ClipboardModal from './ClipboardModal.vue'

const store = useStore()
const fileInput = ref<HTMLInputElement>()
const linkCopied = ref(false)
const clip = ref<'export' | 'import' | null>(null)
const clipText = ref('')

function download() {
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([exportBundle(store.currentBundle())], { type: 'application/json' }))
  a.download = 'corne-layout.json'
  a.click()
  URL.revokeObjectURL(a.href)
}

async function onImportFile(ev: Event) {
  const file = (ev.target as HTMLInputElement).files?.[0]
  if (!file) return
  importText(await file.text())
  if (fileInput.value) fileInput.value.value = ''
}
function importText(text: string) {
  try {
    store.loadBundle(importBundle(text))
    clip.value = null
  } catch (e) {
    alert(e instanceof ImportError ? `Import falhou: ${e.message}` : `Erro: ${e}`)
  }
}
function openClipExport() {
  clipText.value = exportBundle(store.currentBundle())
  clip.value = 'export'
}

async function permalink() {
  const hash = encodePermalink(store.currentBundle())
  history.replaceState(null, '', hash)
  await navigator.clipboard?.writeText(location.href).catch(() => {})
  linkCopied.value = true
  setTimeout(() => (linkCopied.value = false), 1800)
}

function reset() {
  if (confirm('Recarregar o layout padrão (Corne Delphi/ABNT2)? Alterações não exportadas serão perdidas.'))
    store.loadBundle(defaultBundle())
}
</script>

<template>
  <div class="toolbar">
    <h1>⌨️ Corne Layout Editor</h1>
    <div class="tabs">
      <button :class="{ active: store.state.activeTab === 'integrado' }" data-tab-integrado
        title="Layout completo com todas as legendas e combos" @click="store.state.activeTab = 'integrado'">
        Integrado
      </button>
      <button :class="{ active: store.state.activeTab === 'layers' }" data-tab-layers
        title="Um board por layer, só com a ação central" @click="store.state.activeTab = 'layers'">
        Por layer
      </button>
      <button :class="{ active: store.state.activeTab === 'catalogo' }" data-tab-catalogo
        title="Mini-teclado por combo (colinha)" @click="store.state.activeTab = 'catalogo'">
        Combos
      </button>
    </div>

    <span class="spacer" />

    <button title="Desfazer (Ctrl+Z)" :disabled="!store.state.undoStack.length" @click="store.undo()">↩</button>
    <button title="Refazer (Ctrl+Y)" :disabled="!store.state.redoStack.length" @click="store.redo()">↪</button>

    <button data-import title="Importar bundle de um arquivo .json" @click="fileInput?.click()">📂 Importar</button>
    <input ref="fileInput" type="file" accept=".json,application/json" hidden @change="onImportFile" />
    <button data-import-clip title="Importar colando o JSON" @click="clipText = ''; clip = 'import'">📋⤵</button>

    <button data-export title="Baixar o bundle completo (.json)" @click="download">💾 Exportar</button>
    <button data-export-clip title="Exportar copiando o JSON" @click="openClipExport">📋⤴</button>

    <button data-permalink title="Comprime o estado na URL e copia o link"
      @click="permalink">{{ linkCopied ? '✓ copiado!' : '🔗 Permalink' }}</button>
    <button title="Voltar ao layout padrão do repo" @click="reset">⟲</button>

    <ClipboardModal v-if="clip" :mode="clip" :text="clipText"
      @close="clip = null" @import="importText" />
  </div>
</template>
