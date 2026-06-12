<script setup lang="ts">
/**
 * Combos: lista por grupo, criação clicando nas teclas do board
 * (modo seleção), edição e remoção.
 */
import { computed, ref } from 'vue'
import { useStore } from '../model/store'
import type { Combo } from '../model/types'

const store = useStore()
const editing = ref<string | null>(null)
const form = ref({ name: '', action: '', description: '', group: '' })

const groups = computed(() => {
  const m = new Map<string, Combo[]>()
  for (const c of store.state.f.combos) {
    const g = c.group ?? 'outros'
    if (!m.has(g)) m.set(g, [])
    m.get(g)!.push(c)
  }
  return m
})

function startNew() {
  editing.value = null
  form.value = { name: '', action: '', description: '', group: '' }
  store.startPickCombo()
}
function startEdit(c: Combo) {
  editing.value = c.id
  form.value = { name: c.name, action: c.action, description: c.description ?? '', group: c.group ?? '' }
  store.startPickCombo(c.keys)
}
function confirmPick() {
  const keys = [...store.state.pickedKeys].sort((a, b) => a - b)
  if (keys.length < 2 || !form.value.name.trim() || !form.value.action.trim()) {
    alert('Selecione 2+ teclas no board e preencha nome e ação.')
    return
  }
  const data = {
    name: form.value.name.trim(),
    action: form.value.action.trim(),
    description: form.value.description.trim() || undefined,
    group: form.value.group.trim() || undefined,
    keys,
  }
  if (editing.value) store.updateCombo(editing.value, data)
  else store.addCombo({ id: `combo_${Date.now().toString(36)}`, ...data })
  editing.value = null
}
function remove(c: Combo) {
  if (confirm(`Remover combo "${c.name}"?`)) store.removeCombo(c.id)
}
</script>

<template>
  <section>
    <h2>Combos</h2>

    <div v-if="store.state.pickingCombo" class="picking-banner" data-picking>
      <span>
        🖱️ Clique nas teclas do board ({{ store.state.pickedKeys.length }} selecionadas)
      </span>
      <button class="primary" data-confirm-combo @click="confirmPick">OK</button>
      <button @click="store.cancelPickCombo(); editing = null">Cancelar</button>
    </div>
    <button v-else class="primary" data-new-combo @click="startNew">+ Novo combo</button>

    <div v-if="store.state.pickingCombo" style="margin-top:8px">
      <div class="row"><input v-model="form.name" placeholder="nome (ex.: Compilar)" data-combo-name /></div>
      <div class="row"><input v-model="form.action" placeholder="ação (ex.: Ctrl+F9)" data-combo-action /></div>
      <div class="row"><input v-model="form.description" placeholder="descrição (opcional)" /></div>
      <div class="row">
        <input v-model="form.group" placeholder="grupo (ex.: delphi)" list="grupos" />
        <datalist id="grupos">
          <option v-for="[g] in groups" :key="g" :value="g" />
        </datalist>
      </div>
    </div>

    <template v-for="[group, combos] in groups" :key="group">
      <h2 style="margin-top:10px">
        <span class="chip">
          <span class="dot" :style="{ background: store.state.v.groupColors[group] ?? '#74c0fc' }" />
          {{ group }}
        </span>
      </h2>
      <div v-for="c in combos" :key="c.id" class="list-item" :data-combo-row="c.id">
        <span class="grow" :title="c.description"><b>{{ c.name }}</b> · {{ c.action }}</span>
        <span class="keys-badge">{{ c.keys.join('+') }}</span>
        <button title="Editar (re-selecione as teclas no board)" @click="startEdit(c)">✎</button>
        <button class="danger" title="Remover" @click="remove(c)">✕</button>
      </div>
    </template>
  </section>
</template>
