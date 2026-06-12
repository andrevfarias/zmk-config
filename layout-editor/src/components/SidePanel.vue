<script setup lang="ts">
/**
 * Painel da tecla selecionada — tudo inline (sem modais):
 * - grade dos 10 slots; clicar numa célula abre os controles dela
 *   (texto, ref. de layer, tinta, cor, ocultar)
 * - bindings por layer: ação (tap) + detalhes de comportamento (notes)
 */
import { computed, reactive, ref, watch } from 'vue'
import { useStore } from '../model/store'
import type { KeyBinding, Slot } from '../model/types'
import { SLOTS } from '../model/types'

const store = useStore()
const sel = computed(() => store.state.selection)
const pos = computed(() => sel.value[0])

/* ----------------------- bindings (funcional) ----------------------- */
const draft = ref<Record<string, KeyBinding>>({})
watch([pos, () => store.state.f], () => {
  if (pos.value === undefined) return
  const d: Record<string, KeyBinding> = {}
  for (const l of store.state.f.layers) {
    const b = store.getBinding(pos.value, l.id)
    d[l.id] = { tap: b?.tap ?? '', notes: b?.notes ?? '' }
  }
  draft.value = d
}, { immediate: true })

function apply(layer: string) {
  if (pos.value === undefined) return
  store.setBinding(pos.value, layer, { ...draft.value[layer] })
}

/* ----------------------- slots (visual) ----------------------- */
const GRID: Slot[] = ['TL', 'TC', 'TR', 'CL', 'C', 'CR', 'BL', 'BC', 'BR']
const activeSlot = ref<Slot | null>(null)
const slotForm = reactive({ text: '', layer: '', tint: '', color: '', hidden: false })

watch([activeSlot, pos], () => {
  if (pos.value === undefined || !activeSlot.value) return
  const o = store.getSlotOverride(pos.value, activeSlot.value)
  Object.assign(slotForm, {
    text: o?.text ?? '', layer: o?.layer ?? '', tint: o?.tint ?? '',
    color: o?.color ?? '', hidden: o?.hidden ?? false,
  })
})

function cellContent(slot: Slot): string {
  if (pos.value === undefined) return ''
  return store.resolveSlot(pos.value, slot)?.text ?? ''
}
function applySlot() {
  if (pos.value === undefined || !activeSlot.value) return
  store.setSlotOverride(pos.value, activeSlot.value, {
    text: slotForm.text || undefined,
    layer: (slotForm.layer || undefined) as string | undefined,
    tint: (slotForm.tint || undefined) as string | undefined,
    color: slotForm.color || undefined,
    hidden: slotForm.hidden || undefined,
  })
}
function resetSlot() {
  if (pos.value === undefined || !activeSlot.value) return
  store.setSlotOverride(pos.value, activeSlot.value, undefined)
  Object.assign(slotForm, { text: '', layer: '', tint: '', color: '', hidden: false })
}

const keyColor = computed({
  get: () => (pos.value !== undefined ? store.state.v.keyColors[String(pos.value)] ?? '#ffffff' : '#ffffff'),
  set: (c: string) => {
    if (pos.value === undefined) return
    if (c.toLowerCase() === '#ffffff') delete store.state.v.keyColors[String(pos.value)]
    else store.state.v.keyColors[String(pos.value)] = c
  },
})
</script>

<template>
  <div v-if="!sel.length">
    <p class="hint">
      Clique numa tecla do board para editar aqui. As interações têm dicas ao
      passar o mouse (hover).
    </p>
  </div>

  <div v-else>
    <div class="row">
      <b>Tecla {{ pos }}</b>
      <span v-if="sel.length > 1" class="keys-badge">+{{ sel.length - 1 }} selecionadas</span>
      <span class="spacer" />
      <button title="Copia bindings e visual da seleção para a metade oposta (por dedo)"
        @click="store.mirrorSelection()">⇋ Espelhar</button>
    </div>

    <label>Slots (visual — representação; clique numa célula p/ editar)</label>
    <div class="slot-grid">
      <div v-for="slot in GRID" :key="slot" class="slot-cell"
        :class="{ filled: cellContent(slot), active: activeSlot === slot }" :data-slot-cell="slot"
        :title="`Slot ${slot} — clique para editar texto/layer/cor`"
        @click="activeSlot = slot">
        <span class="tag">{{ slot }}</span>{{ cellContent(slot) }}
      </div>
      <div class="slot-cell front" :class="{ filled: cellContent('F'), active: activeSlot === 'F' }"
        data-slot-cell="F" title="Frente da tecla" @click="activeSlot = 'F'">
        <span class="tag">F (frente)</span>{{ cellContent('F') }}
      </div>
    </div>

    <div v-if="activeSlot" class="slot-editor" :data-slot-editor="activeSlot">
      <div class="row">
        <label style="width:52px">texto</label>
        <input v-model="slotForm.text" data-slot-text
          title="Texto livre (representativo — não precisa pertencer a uma layer)"
          @change="applySlot" />
      </div>
      <div class="row">
        <label style="width:52px" title="O slot mostra o tap desta layer nesta tecla">layer</label>
        <select v-model="slotForm.layer" data-slot-layer @change="applySlot">
          <option value="">—</option>
          <option v-for="l in store.state.f.layers" :key="l.id" :value="l.id">{{ l.name }}</option>
        </select>
        <label title="Tinge com a cor desta layer (sem vincular o conteúdo)">tinta</label>
        <select v-model="slotForm.tint" data-slot-tint @change="applySlot">
          <option value="">—</option>
          <option v-for="l in store.state.f.layers" :key="l.id" :value="l.id">{{ l.name }}</option>
        </select>
      </div>
      <div class="row">
        <label style="width:52px" title="Cor explícita do texto deste slot">cor</label>
        <input type="color" :value="slotForm.color || '#212529'"
          @input="slotForm.color = ($event.target as HTMLInputElement).value; applySlot()" />
        <label class="chip" style="cursor:pointer" title="Oculta o conteúdo derivado deste slot">
          <input v-model="slotForm.hidden" type="checkbox" style="margin:0" @change="applySlot" /> ocultar
        </label>
        <span class="spacer" />
        <button data-slot-reset title="Volta ao conteúdo derivado do gerador padrão" @click="resetSlot">reset</button>
      </div>
    </div>

    <div class="row">
      <label title="Cor de fundo da tecla">fundo da tecla</label>
      <input v-model="keyColor" type="color" />
    </div>

    <label>Bindings (funcional — o que a IA lê)</label>
    <div v-for="l in store.state.f.layers" :key="l.id" class="binding-row">
      <div class="row">
        <span class="dot" :style="{ background: l.color ?? '#adb5bd' }" />
        <label style="width:90px" :title="l.access">{{ l.name }}</label>
        <input v-model="draft[l.id].tap" :data-bind="`${l.id}-tap`" placeholder="ação (tap)"
          :title="`O que a tecla faz na layer ${l.name}`" @change="apply(l.id)" />
      </div>
      <input v-model="draft[l.id].notes" :data-bind="`${l.id}-notes`" class="notes"
        placeholder="detalhes de comportamento (hold, shift, timing...)"
        title="Texto livre p/ a IA: ex. 'home row mod: hold = Ctrl' ou 'shift = :'"
        @change="apply(l.id)" />
    </div>
  </div>
</template>
