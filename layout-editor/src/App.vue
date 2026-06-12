<script setup lang="ts">
/**
 * Raiz: toolbar + seções (Integrado / Por layer / Combos). No Integrado,
 * painéis laterais colapsáveis (Tecla, Combos, Layers, Paleta de ícones).
 */
import { onBeforeUnmount, onMounted } from 'vue'
import { useStore } from './model/store'
import { decodePermalink } from './model/permalink'
import Toolbar from './components/Toolbar.vue'
import BoardsSection from './components/BoardsSection.vue'
import LayerSection from './components/LayerSection.vue'
import ComboCatalog from './components/ComboCatalog.vue'
import SidePanel from './components/SidePanel.vue'
import LayerPanel from './components/LayerPanel.vue'
import ComboPanel from './components/ComboPanel.vue'
import GlyphPalette from './components/GlyphPalette.vue'
import CollapsibleSection from './components/CollapsibleSection.vue'

const store = useStore()

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
  <Toolbar />
  <div v-if="store.state.activeTab === 'integrado'" class="main">
    <div class="board-area">
      <BoardsSection />
    </div>
    <aside class="side">
      <CollapsibleSection title="Tecla" hint="Edição da tecla selecionada">
        <SidePanel />
      </CollapsibleSection>
      <CollapsibleSection title="Combos" hint="Criação e edição de combos">
        <ComboPanel />
      </CollapsibleSection>
      <CollapsibleSection title="Layers" hint="Layers e mapeamento de slots" :start-open="false">
        <LayerPanel />
      </CollapsibleSection>
      <CollapsibleSection title="Paleta de ícones" hint="Clique insere · arraste p/ slots e etiquetas"
        :start-open="false">
        <GlyphPalette />
      </CollapsibleSection>
    </aside>
  </div>
  <LayerSection v-else-if="store.state.activeTab === 'layers'" />
  <ComboCatalog v-else />
</template>
