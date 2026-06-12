<script setup lang="ts">
/**
 * Catálogo/colinha: grupos colapsáveis; cada cartão tem o mini-teclado do
 * combo. Editar = formulário inline no cartão + clique nas teclas do mini.
 */
import { computed, reactive, ref } from 'vue'
import { useStore } from '../model/store'
import type { Combo } from '../model/types'
import MiniBoard from './MiniBoard.vue'

const store = useStore()
const collapsed = ref(new Set<string>())
const editingId = ref<string | null>(null)
const form = reactive({ label: '', action: '', notes: '', group: '' })

const groups = computed(() => {
  const m = new Map<string, Combo[]>()
  for (const c of store.state.f.combos) {
    const g = c.group ?? 'outros'
    if (!m.has(g)) m.set(g, [])
    m.get(g)!.push(c)
  }
  return m
})

function toggleGroup(g: string) {
  const s = new Set(collapsed.value)
  if (s.has(g)) s.delete(g)
  else s.add(g)
  collapsed.value = s
}
function startEdit(c: Combo) {
  editingId.value = c.id
  Object.assign(form, { label: c.label, action: c.action, notes: c.notes ?? '', group: c.group ?? '' })
}
function save(c: Combo) {
  store.updateCombo(c.id, {
    label: form.label.trim() || c.label,
    action: form.action.trim() || c.action,
    notes: form.notes.trim() || undefined,
    group: form.group.trim() || undefined,
  })
  editingId.value = null
}
function toggleKey(c: Combo, pos: number) {
  store.toggleComboKey(c.id, pos)
}
</script>

<template>
  <div class="catalog">
    <template v-for="[group, combos] in groups" :key="group">
      <h2>
        <button class="chip" :title="collapsed.has(group) ? 'Expandir grupo' : 'Colapsar grupo'"
          :data-group-header="group" @click="toggleGroup(group)">
          {{ collapsed.has(group) ? '▸' : '▾' }}
          <span class="dot" :style="{ background: store.state.v.groupColors[group] ?? '#74c0fc' }" />
          {{ group }} ({{ combos.length }})
        </button>
      </h2>
      <div v-if="!collapsed.has(group)" class="catalog-grid">
        <div v-for="c in combos" :key="c.id" class="combo-card" :data-combo="c.id">
          <MiniBoard :highlight="editingId === c.id ? c.keys : c.keys" :color="store.comboColor(c)"
            :editable="editingId === c.id" @toggle="toggleKey(c, $event)" />
          <template v-if="editingId === c.id">
            <input v-model="form.label" placeholder="etiqueta" title="Texto exibido na pílula (aceita ícones)" />
            <input v-model="form.action" placeholder="atalho/comando"
              title="Tecla/atalho/comando que o combo executa (lido pela IA)" />
            <input v-model="form.notes" placeholder="observações p/ a IA"
              title="Detalhes de comportamento, restrições, layer onde vale..." />
            <input v-model="form.group" placeholder="grupo" title="Grupo (cor e filtros)" />
            <div class="row">
              <button class="primary" data-save-combo @click="save(c)">Salvar</button>
              <button @click="editingId = null">Cancelar</button>
              <span class="spacer" />
              <button class="danger" title="Remover combo" @click="store.removeCombo(c.id); editingId = null">✕</button>
            </div>
          </template>
          <template v-else>
            <div class="name">{{ c.label }}</div>
            <div class="action">
              {{ c.action }}<template v-if="c.notes"> — {{ c.notes }}</template>
            </div>
            <div class="row">
              <span class="keys-badge">{{ c.keys.join('+') }}</span>
              <span class="spacer" />
              <button :data-edit-combo="c.id" title="Editar (clique nas teclas do mini-teclado p/ marcar/desmarcar)"
                @click="startEdit(c)">✎</button>
            </div>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>
