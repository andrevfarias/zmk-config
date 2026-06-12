<script setup lang="ts">
/**
 * Grade de cards de combo (usada no Catálogo e nos painéis do Integrado):
 * mini-teclado com números nas teclas, lado espelhado em tom claro,
 * grupos colapsáveis e edição inline no card (✎ alinhado ao nome).
 */
import { computed, reactive, ref } from 'vue'
import { useStore } from '../model/store'
import type { Combo } from '../model/types'
import { splitLines } from '../model/text'
import MiniBoard from './MiniBoard.vue'

const props = defineProps<{
  /** grupos exibidos (null = todos) */
  groups?: string[] | null
  /** instâncias ocultas (id / id~m) */
  hiddenCombos?: string[]
}>()

const store = useStore()
const collapsed = ref(new Set<string>())
const editingId = ref<string | null>(null)
const form = reactive({
  label: '', action: '', notes: '', group: '',
  mirror: false, mirrorLabel: '', mirrorAction: '',
})

function sideVisible(c: Combo, side: 'L' | 'R'): boolean {
  const iid = side === 'L' ? c.id : `${c.id}~m`
  return !(props.hiddenCombos ?? []).includes(iid)
}
const grouped = computed(() => {
  const m = new Map<string, Combo[]>()
  for (const c of store.state.f.combos) {
    const g = c.group ?? 'outros'
    if (props.groups && !props.groups.includes(g)) continue
    if (!sideVisible(c, 'L') && !(c.mirror && sideVisible(c, 'R'))) continue
    if (!m.has(g)) m.set(g, [])
    m.get(g)!.push(c)
  }
  return m
})

function highlightOf(c: Combo): number[] {
  return sideVisible(c, 'L') ? c.keys : []
}
function secondaryOf(c: Combo): number[] {
  return c.mirror && sideVisible(c, 'R') ? store.mirrorKeys(c.keys) : []
}

function toggleGroup(g: string) {
  const s = new Set(collapsed.value)
  if (s.has(g)) s.delete(g)
  else s.add(g)
  collapsed.value = s
}
function startEdit(c: Combo) {
  editingId.value = c.id
  Object.assign(form, {
    label: c.label, action: c.action, notes: c.notes ?? '', group: c.group ?? '',
    mirror: !!c.mirror, mirrorLabel: c.mirrorLabel ?? '', mirrorAction: c.mirrorAction ?? '',
  })
}
function save(c: Combo) {
  store.updateCombo(c.id, {
    label: form.label.trim() || c.label,
    action: form.action.trim() || c.action,
    notes: form.notes.trim() || undefined,
    group: form.group.trim() || undefined,
    mirror: form.mirror || undefined,
    mirrorLabel: (form.mirror && form.mirrorLabel.trim()) || undefined,
    mirrorAction: (form.mirror && form.mirrorAction.trim()) || undefined,
  })
  editingId.value = null
}
</script>

<template>
  <div>
    <datalist id="grupos-cards">
      <option v-for="[g] in grouped" :key="g" :value="g" />
    </datalist>
    <template v-for="[group, combos] in grouped" :key="group">
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
          <div class="row" style="margin:0">
            <span class="name" style="white-space:pre-line">{{ splitLines(c.label).join('\n') }}</span>
            <span v-if="c.mirror" class="keys-badge" title="Espelhado: vale nos dois lados">⇋</span>
            <span class="spacer" />
            <button v-if="editingId !== c.id" :data-edit-combo="c.id"
              title="Editar (clique nas teclas do mini-teclado p/ marcar/desmarcar)"
              @click="startEdit(c)">✎</button>
          </div>
          <MiniBoard :highlight="highlightOf(c)" :secondary="secondaryOf(c)"
            :color="store.comboColor(c)" :editable="editingId === c.id" :numbers="true"
            @toggle="store.toggleComboKey(c.id, $event)" />
          <template v-if="editingId === c.id">
            <input v-model="form.label" placeholder="etiqueta" title="Texto da pílula (ícones e \n permitidos)" />
            <input v-model="form.action" placeholder="atalho/comando"
              title="Tecla/atalho/comando executado (lido pela IA)" />
            <input v-model="form.notes" placeholder="observações p/ a IA" />
            <input v-model="form.group" placeholder="grupo (escolha ou digite novo)" list="grupos-cards" />
            <label class="chip" style="cursor:pointer" title="Vale nos dois lados (teclas espelhadas por dedo)">
              <input v-model="form.mirror" type="checkbox" style="margin:0" /> espelhado
            </label>
            <template v-if="form.mirror">
              <input v-model="form.mirrorLabel" placeholder="etiqueta do lado espelhado (se difere)"
                title="Comandos direcionais invertem: ex. aba → vira aba ←" />
              <input v-model="form.mirrorAction" placeholder="ação do lado espelhado (se difere)" />
            </template>
            <div class="row">
              <button class="primary" data-save-combo @click="save(c)">Salvar</button>
              <button @click="editingId = null">Cancelar</button>
              <span class="spacer" />
              <button class="danger" title="Remover combo" @click="store.removeCombo(c.id); editingId = null">✕</button>
            </div>
          </template>
          <template v-else>
            <div class="action">
              {{ c.action }}<template v-if="c.mirror && (c.mirrorLabel || c.mirrorAction)">
                · lado espelhado: {{ c.mirrorLabel ?? c.label }} → {{ c.mirrorAction ?? c.action }}</template>
              <template v-if="c.notes"> — {{ c.notes }}</template>
            </div>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>
