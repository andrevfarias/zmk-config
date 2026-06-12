<script setup lang="ts">
/**
 * Combos (painel lateral): grupos colapsáveis; o editor aparece INLINE logo
 * abaixo do item em edição. Clique na pílula do board também abre aqui.
 */
import { computed, reactive, ref, watch } from 'vue'
import { useStore } from '../model/store'
import type { Combo, ComboAnchor } from '../model/types'

const store = useStore()
const collapsed = ref(new Set<string>())
const form = reactive({ label: '', action: '', notes: '', group: '' })
const creating = ref(false)

const groups = computed(() => {
  const m = new Map<string, Combo[]>()
  for (const c of store.state.f.combos) {
    const g = c.group ?? 'outros'
    if (!m.has(g)) m.set(g, [])
    m.get(g)!.push(c)
  }
  return m
})

watch(() => store.state.editingCombo, (id) => {
  const c = store.comboById(id)
  if (c) {
    creating.value = false
    Object.assign(form, { label: c.label, action: c.action, notes: c.notes ?? '', group: c.group ?? '' })
  }
})

function toggleGroup(g: string) {
  const s = new Set(collapsed.value)
  if (s.has(g)) s.delete(g)
  else s.add(g)
  collapsed.value = s
}
function anchorOf(c: Combo): ComboAnchor {
  return store.state.v.comboLabels[c.id]?.anchor ?? 'auto'
}
function startNew() {
  creating.value = true
  Object.assign(form, { label: '', action: '', notes: '', group: '' })
  store.startPickCombo(null)
}
function confirmNew() {
  const keys = [...store.state.pickedKeys].sort((a, b) => a - b)
  if (keys.length < 2 || !form.label.trim() || !form.action.trim()) {
    alert('Selecione 2+ teclas no board e preencha etiqueta e atalho.')
    return
  }
  store.addCombo({
    id: `combo_${Date.now().toString(36)}`,
    label: form.label.trim(), action: form.action.trim(),
    notes: form.notes.trim() || undefined, group: form.group.trim() || undefined,
    keys,
  })
  creating.value = false
}
function saveEdit(c: Combo) {
  store.updateCombo(c.id, {
    label: form.label.trim() || c.label,
    action: form.action.trim() || c.action,
    notes: form.notes.trim() || undefined,
    group: form.group.trim() || undefined,
    ...(store.state.pickingCombo && store.state.pickedKeys.length >= 2
      ? { keys: [...store.state.pickedKeys].sort((a, b) => a - b) }
      : {}),
  })
  store.cancelPickCombo()
}
</script>

<template>
  <div>
    <div v-if="creating" class="picking-banner" data-picking>
      <span>🖱️ clique nas teclas ({{ store.state.pickedKeys.length }})</span>
      <button class="primary" data-confirm-combo title="Criar o combo" @click="confirmNew">OK</button>
      <button title="Cancelar criação" @click="store.cancelPickCombo(); creating = false">✕</button>
    </div>
    <button v-else class="primary" data-new-combo
      title="Cria um combo: clique nas teclas no board e preencha os campos" @click="startNew">
      + Novo combo
    </button>

    <div v-if="creating" class="combo-editor">
      <input v-model="form.label" placeholder="etiqueta (pílula — aceita ícones)" data-combo-label />
      <input v-model="form.action" placeholder="atalho/comando executado" data-combo-action />
      <input v-model="form.notes" placeholder="observações p/ a IA" />
      <input v-model="form.group" placeholder="grupo" list="grupos-list" />
      <datalist id="grupos-list">
        <option v-for="[g] in groups" :key="g" :value="g" />
      </datalist>
    </div>

    <template v-for="[group, combos] in groups" :key="group">
      <div class="row" style="margin-top:8px">
        <button class="chip" :data-combo-group="group"
          :title="collapsed.has(group) ? 'Expandir grupo' : 'Colapsar grupo'" @click="toggleGroup(group)">
          {{ collapsed.has(group) ? '▸' : '▾' }}
          <span class="dot" :style="{ background: store.state.v.groupColors[group] ?? '#74c0fc' }" />
          {{ group }} ({{ combos.length }})
        </button>
        <input type="color" :value="store.state.v.groupColors[group] ?? '#74c0fc'"
          style="width:24px;padding:1px" title="Cor do grupo"
          @input="store.state.v.groupColors[group] = ($event.target as HTMLInputElement).value" />
      </div>
      <template v-if="!collapsed.has(group)">
        <template v-for="c in combos" :key="c.id">
          <div class="list-item" :class="{ editing: store.state.editingCombo === c.id }" :data-combo-row="c.id">
            <span class="grow" :title="`${c.action}${c.notes ? ' — ' + c.notes : ''}`">
              <b>{{ c.label }}</b> · {{ c.action }}
            </span>
            <span class="keys-badge">{{ c.keys.join('+') }}</span>
            <button :data-edit-combo="c.id" title="Editar este combo (destaca no board)"
              @click="store.editCombo(store.state.editingCombo === c.id ? null : c.id)">✎</button>
          </div>

          <!-- editor inline, logo abaixo do item -->
          <div v-if="store.state.editingCombo === c.id && !creating" class="combo-editor" :data-combo-editor="c.id">
            <input v-model="form.label" placeholder="etiqueta" data-combo-label
              title="Texto da pílula (aceita ícones da paleta)" />
            <input v-model="form.action" placeholder="atalho/comando" data-combo-action
              title="Tecla/atalho/comando que o combo executa (lido pela IA)" />
            <input v-model="form.notes" placeholder="observações p/ a IA"
              title="Detalhes: restrições, layers onde vale, comportamento especial..." />
            <input v-model="form.group" placeholder="grupo" list="grupos-list" title="Grupo (cor/filtros)" />
            <div class="row">
              <label title="Lado da etiqueta em relação às teclas (vale p/ todos os layouts)">etiqueta</label>
              <select :value="anchorOf(c)" data-combo-anchor
                @change="store.setComboAnchor(c.id, ($event.target as HTMLSelectElement).value as ComboAnchor)">
                <option value="auto">auto</option>
                <option value="top">acima</option>
                <option value="bottom">abaixo</option>
                <option value="left">esquerda</option>
                <option value="right">direita</option>
              </select>
              <button :title="store.state.pickingCombo ? 'Clique nas teclas no board' : 'Re-selecionar as teclas no board'"
                :class="{ primary: store.state.pickingCombo }"
                @click="store.startPickCombo(c.id)">
                ⌨ teclas ({{ store.state.pickingCombo ? store.state.pickedKeys.length : c.keys.length }})
              </button>
            </div>
            <div class="row">
              <button class="primary" data-save-combo title="Aplicar alterações" @click="saveEdit(c)">Salvar</button>
              <button title="Fechar sem aplicar os campos" @click="store.cancelPickCombo()">Fechar</button>
              <span class="spacer" />
              <button class="danger" title="Remover combo" @click="store.removeCombo(c.id)">✕ remover</button>
            </div>
          </div>
        </template>
      </template>
    </template>
  </div>
</template>
