<script setup lang="ts">
/**
 * Layers: criar/remover, tipo, slot padrão (gerador), cor, acesso e a
 * seleção da BASE ATIVA exibida (QWERTY/COLEMAK).
 */
import { ref } from 'vue'
import { useStore } from '../model/store'
import type { Slot } from '../model/types'
import { SLOTS } from '../model/types'

const store = useStore()
const novo = ref({ name: '', kind: 'overlay' as 'base' | 'overlay' | 'virtual', slot: 'CR' as Slot })

function add() {
  const name = novo.value.name.trim()
  if (!name) return
  const id = name.toLowerCase().replace(/\W+/g, '_')
  if (store.state.f.layers.some((l) => l.id === id)) {
    alert(`Já existe layer "${id}"`)
    return
  }
  store.addLayer({ id, name, kind: novo.value.kind },
    novo.value.kind === 'base' ? undefined : novo.value.slot)
  novo.value = { name: '', kind: 'overlay', slot: 'CR' }
}
function remove(id: string) {
  if (confirm(`Remover a layer "${id}" e todos os seus bindings?`)) store.removeLayer(id)
}
</script>

<template>
  <div>
    <div v-if="store.baseLayers.value.length > 1" class="row">
      <label title="Qual layer base aparece no centro das teclas">base exibida</label>
      <select :value="store.activeBase.value?.id" data-base-select
        @change="store.setBaseLayer(($event.target as HTMLSelectElement).value)">
        <option v-for="l in store.baseLayers.value" :key="l.id" :value="l.id">{{ l.name }}</option>
      </select>
    </div>

    <div v-for="l in store.state.f.layers" :key="l.id" class="list-item" :data-layer-row="l.id">
      <input type="color" :value="l.color ?? '#adb5bd'" style="width:26px;padding:1px"
        title="Cor da layer (tinge as legendas dela)"
        @input="l.color = ($event.target as HTMLInputElement).value" />
      <input v-model="l.name" style="width:92px" title="Nome da layer" />
      <select v-model="l.kind" style="width:78px"
        title="base = letras · overlay = layer real · virtual = via combos/chords">
        <option value="base">base</option>
        <option value="overlay">overlay</option>
        <option value="virtual">virtual</option>
      </select>
      <select v-if="l.kind !== 'base'" :value="store.state.v.layerSlots[l.id] ?? ''" style="width:56px"
        title="Slot padrão das legendas desta layer (gerador)"
        @change="store.setLayerSlot(l.id, ($event.target as HTMLSelectElement).value as Slot | '')">
        <option value="">—</option>
        <option v-for="s in SLOTS" :key="s" :value="s">{{ s }}</option>
      </select>
      <span v-else class="keys-badge">centro</span>
      <button class="danger" title="Remover layer e seus bindings" @click="remove(l.id)">✕</button>
    </div>

    <div v-for="l in store.state.f.layers" :key="l.id + '_acc'" class="row">
      <label style="width:84px">{{ l.name }}</label>
      <input v-model="l.access" placeholder="como se acessa (p/ a IA)" style="font-size:11.5px"
        title="Texto p/ a IA: 'hold polegar 39', 'combo 2+4'..." />
    </div>

    <div class="row" style="margin-top:8px">
      <input v-model="novo.name" placeholder="nova layer" style="width:104px" data-new-layer-name
        title="Nome da nova layer" />
      <select v-model="novo.kind" title="Tipo da nova layer">
        <option value="overlay">overlay</option>
        <option value="virtual">virtual</option>
        <option value="base">base</option>
      </select>
      <select v-if="novo.kind !== 'base'" v-model="novo.slot" title="Slot padrão das legendas">
        <option v-for="s in SLOTS" :key="s" :value="s">{{ s }}</option>
      </select>
      <button class="primary" data-add-layer title="Adicionar layer" @click="add">+</button>
    </div>
  </div>
</template>
