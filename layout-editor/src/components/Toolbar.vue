<script setup lang="ts">
/**
 * Barra superior: abas, espelhar, overlay de combos, undo/redo,
 * import/export (functional/visual/bundle) e permalink.
 */
import { ref } from 'vue'
import { useStore } from '../model/store'
import { exportBundle, exportFunctional, exportVisual, importAny, ImportError } from '../model/serialization'
import { encodePermalink } from '../model/permalink'
import { defaultBundle } from '../model/defaults'

const store = useStore()
const props = defineProps<{ showCombos: boolean }>()
const emit = defineEmits<{ (e: 'update:showCombos', v: boolean): void }>()

const fileInput = ref<HTMLInputElement>()
const exportOpen = ref(false)
const linkCopied = ref(false)

function download(name: string, text: string) {
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([text], { type: 'application/json' }))
  a.download = name
  a.click()
  URL.revokeObjectURL(a.href)
  exportOpen.value = false
}

async function onImport(ev: Event) {
  const file = (ev.target as HTMLInputElement).files?.[0]
  if (!file) return
  try {
    const r = importAny(await file.text())
    const cur = store.currentBundle()
    store.loadBundle({
      functional: r.functional ?? cur.functional,
      visual: r.visual ?? cur.visual,
    })
  } catch (e) {
    alert(e instanceof ImportError ? `Import falhou: ${e.message}` : `Erro: ${e}`)
  } finally {
    if (fileInput.value) fileInput.value.value = ''
  }
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
      <button :class="{ active: store.state.activeTab === 'editor' }" data-tab-editor
        @click="store.state.activeTab = 'editor'">Editor</button>
      <button :class="{ active: store.state.activeTab === 'combos' }" data-tab-combos
        @click="store.state.activeTab = 'combos'">Catálogo de combos</button>
    </div>

    <button :disabled="!store.state.selection.length" title="Espelha a seleção para a outra metade"
      @click="store.mirrorSelection()">⇋ Espelhar</button>
    <label class="chip" :class="{ off: !props.showCombos }" style="cursor:pointer">
      <input type="checkbox" :checked="props.showCombos"
        style="margin:0" @change="emit('update:showCombos', ($event.target as HTMLInputElement).checked)" />
      combos no board
    </label>

    <span class="spacer" />

    <button title="Desfazer (Ctrl+Z)" :disabled="!store.state.undoStack.length" @click="store.undo()">↩</button>
    <button title="Refazer (Ctrl+Y)" :disabled="!store.state.redoStack.length" @click="store.redo()">↪</button>

    <button data-import @click="fileInput?.click()">Importar…</button>
    <input ref="fileInput" type="file" accept=".json,application/json" hidden @change="onImport" />

    <span style="position:relative">
      <button data-export @click="exportOpen = !exportOpen">Exportar ▾</button>
      <span v-if="exportOpen"
        style="position:absolute; right:0; top:110%; background:var(--panel); border:1px solid var(--line); border-radius:8px; display:flex; flex-direction:column; z-index:30; min-width:190px">
        <button style="border:0; text-align:left" data-export-functional
          @click="download('functional.json', exportFunctional(store.currentBundle()))">
          functional.json (p/ a IA)
        </button>
        <button style="border:0; text-align:left" data-export-visual
          @click="download('visual.json', exportVisual(store.currentBundle()))">
          visual.json (aparência)
        </button>
        <button style="border:0; text-align:left" data-export-bundle
          @click="download('layout-bundle.json', exportBundle(store.currentBundle()))">
          bundle completo
        </button>
      </span>
    </span>

    <button data-permalink @click="permalink">{{ linkCopied ? '✓ copiado!' : '🔗 Permalink' }}</button>
    <button title="Voltar ao layout padrão" @click="reset">⟲</button>
  </div>
</template>
