<script setup lang="ts">
/**
 * Raiz do app: toolbar + (Editor | Catálogo). No Editor: board à esquerda,
 * painéis (tecla / layers / combos) à direita. Carrega permalink do hash.
 */
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useStore } from './model/store'
import { decodePermalink } from './model/permalink'
import Toolbar from './components/Toolbar.vue'
import KeyboardView from './components/KeyboardView.vue'
import SidePanel from './components/SidePanel.vue'
import LayerPanel from './components/LayerPanel.vue'
import ComboPanel from './components/ComboPanel.vue'
import ComboCatalog from './components/ComboCatalog.vue'

const store = useStore()
const showCombos = ref(false)

const comboGroups = computed(() => {
  const s = new Set<string>()
  for (const c of store.state.f.combos) s.add(c.group ?? 'outros')
  return s
})

function onKey(ev: KeyboardEvent) {
  const tag = (ev.target as HTMLElement).tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
  if ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === 'z') {
    ev.preventDefault()
    ev.shiftKey ? store.redo() : store.undo()
  } else if ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === 'y') {
    ev.preventDefault()
    store.redo()
  } else if (ev.key === 'Escape') {
    store.clearSelection()
    store.cancelPickCombo()
  }
}

onMounted(() => {
  try {
    const b = decodePermalink(location.hash)
    if (b) store.loadBundle(b)
  } catch {
    console.warn('Permalink inválido — carregando layout padrão.')
  }
  window.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <Toolbar v-model:show-combos="showCombos" />
  <div v-if="store.state.activeTab === 'editor'" class="main">
    <div class="board-area">
      <KeyboardView :show-combos="showCombos" :combo-groups="comboGroups" />
      <p class="hint" style="text-align:center; margin-top: 8px">
        Clique = selecionar · Ctrl+clique = multi-seleção · arrastar legenda = mover ·
        Shift+arrastar = copiar · pílula de combo = arrastável
      </p>
    </div>
    <aside class="side">
      <SidePanel />
      <ComboPanel />
      <LayerPanel />
    </aside>
  </div>
  <ComboCatalog v-else />
</template>
