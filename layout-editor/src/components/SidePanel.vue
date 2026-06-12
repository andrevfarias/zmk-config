<script setup lang="ts">
/**
 * Painel da tecla selecionada: bindings por layer (funcional) e grade de
 * slots (visual) com override de texto/ocultar. Multi-seleção → espelhar.
 */
import { computed, ref, watch } from 'vue'
import { useStore } from '../model/store'
import type { KeyBinding, Slot } from '../model/types'
import { SLOTS } from '../model/types'

const store = useStore()
const sel = computed(() => store.state.selection)
const pos = computed(() => sel.value[0])

/** rascunho local dos bindings p/ edição fluida */
const draft = ref<Record<string, KeyBinding>>({})
watch([pos, () => store.state.f], () => {
  if (pos.value === undefined) return
  const d: Record<string, KeyBinding> = {}
  for (const l of store.state.f.layers) {
    const b = store.getBinding(pos.value, l.id)
    d[l.id] = { tap: b?.tap ?? '', hold: b?.hold ?? '', shift: b?.shift ?? '' }
  }
  draft.value = d
}, { immediate: true, deep: false })

function apply(layer: string) {
  if (pos.value === undefined) return
  store.setBinding(pos.value, layer, { ...draft.value[layer] })
}

const GRID: (Slot | null)[] = ['TL', 'TC', 'TR', 'CL', 'C', 'CR', 'BL', 'BC', 'BR']

function cellContent(slot: Slot): string {
  if (pos.value === undefined) return ''
  return store.resolveSlot(pos.value, slot)?.text ?? ''
}
function editSlot(slot: Slot) {
  if (pos.value === undefined) return
  const cur = store.state.v.keyOverrides[String(pos.value)]?.[slot]
  const r = window.prompt(
    `Tecla ${pos.value} · slot ${slot}\nTexto custom (vazio = derivado da layer; "-" = ocultar):`,
    cur?.text ?? cellContent(slot),
  )
  if (r === null) return
  if (r === '') store.setSlotOverride(pos.value, slot, undefined)
  else if (r === '-') store.setSlotOverride(pos.value, slot, { hidden: true })
  else store.setSlotOverride(pos.value, slot, { text: r })
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
  <section v-if="!sel.length">
    <h2>Tecla</h2>
    <p class="hint">
      Clique numa tecla para editar. Ctrl+clique seleciona várias (p/ espelhar).
      Arraste uma legenda para outro slot ou tecla — segure <b>Shift</b> para copiar.
    </p>
  </section>

  <section v-else>
    <h2>
      Tecla {{ pos }}
      <template v-if="sel.length > 1"> (+{{ sel.length - 1 }} selecionadas)</template>
    </h2>

    <div class="row">
      <button @click="store.mirrorSelection()" title="Copia bindings e visual para a metade oposta (por dedo)">
        ⇋ Espelhar p/ outra metade
      </button>
      <button @click="store.clearSelection()">Limpar seleção</button>
    </div>

    <h2>Slots (visual)</h2>
    <div class="slot-grid">
      <div v-for="slot in GRID" :key="slot!" class="slot-cell"
        :class="{ filled: cellContent(slot!) }" :data-slot-cell="slot"
        @click="editSlot(slot!)">
        <span class="tag">{{ slot }}</span>{{ cellContent(slot!) }}
      </div>
      <div class="slot-cell front" :class="{ filled: cellContent('F') }"
        data-slot-cell="F" @click="editSlot('F')">
        <span class="tag">F (frente)</span>{{ cellContent('F') }}
      </div>
    </div>
    <div class="row" style="margin-top:6px">
      <label>Cor da tecla</label>
      <input v-model="keyColor" type="color" />
    </div>

    <h2>Bindings (funcional)</h2>
    <p class="hint">O que a tecla faz em cada layer — é isto que a IA lê para gerar o keymap.</p>
    <div v-for="l in store.state.f.layers" :key="l.id" style="margin-bottom:6px">
      <label>
        <span class="dot" :style="{ background: l.color ?? '#adb5bd', display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%' }" />
        {{ l.name }}
      </label>
      <div class="row">
        <input v-model="draft[l.id].tap" :data-bind="`${l.id}-tap`" placeholder="tap" @change="apply(l.id)" />
        <input v-model="draft[l.id].hold" :data-bind="`${l.id}-hold`" placeholder="hold" @change="apply(l.id)" />
        <input v-if="l.kind === 'base'" v-model="draft[l.id].shift" :data-bind="`${l.id}-shift`"
          placeholder="shift" @change="apply(l.id)" />
      </div>
    </div>
  </section>
</template>
