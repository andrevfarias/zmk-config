<script setup lang="ts">
/**
 * Gerência de layers: criar/remover, tipo (base/overlay/virtual), slot padrão
 * da legenda, cor e forma de acesso. Também configura hold/shift slots.
 */
import { ref } from 'vue'
import { useStore } from '../model/store'
import type { Slot } from '../model/types'
import { SLOTS } from '../model/types'

const store = useStore()
const novo = ref({ id: '', name: '', kind: 'overlay' as 'base' | 'overlay' | 'virtual', slot: 'CR' as Slot })

function add() {
  const id = novo.value.id.trim() || novo.value.name.trim().toLowerCase().replace(/\W+/g, '_')
  if (!id || !novo.value.name.trim()) return
  if (store.state.f.layers.some((l) => l.id === id)) {
    alert(`Já existe layer "${id}"`)
    return
  }
  store.addLayer(
    { id, name: novo.value.name.trim(), kind: novo.value.kind },
    novo.value.kind === 'base' ? undefined : novo.value.slot,
  )
  novo.value = { id: '', name: '', kind: 'overlay', slot: 'CR' }
}
function remove(id: string) {
  if (confirm(`Remover a layer "${id}" e todos os seus bindings?`)) store.removeLayer(id)
}
</script>

<template>
  <section>
    <h2>Layers</h2>
    <p class="hint">
      Slot = posição da legenda nas teclas (TL/TR/…). Layers <b>virtuais</b> são as
      acessadas por combos/thumb-chords — a IA as implementa como combos no ZMK.
    </p>
    <div v-for="l in store.state.f.layers" :key="l.id" class="list-item" :data-layer-row="l.id">
      <input type="color" :value="l.color ?? '#adb5bd'" style="width:26px;padding:1px"
        @input="l.color = ($event.target as HTMLInputElement).value" />
      <input v-model="l.name" style="width:96px" />
      <select v-model="l.kind" style="width:80px">
        <option value="base">base</option>
        <option value="overlay">overlay</option>
        <option value="virtual">virtual</option>
      </select>
      <select v-if="l.kind !== 'base'" :value="store.state.v.layerSlots[l.id] ?? ''"
        style="width:58px" @change="store.setLayerSlot(l.id, ($event.target as HTMLSelectElement).value as Slot | '')">
        <option value="">—</option>
        <option v-for="s in SLOTS" :key="s" :value="s">{{ s }}</option>
      </select>
      <span v-else class="keys-badge">centro</span>
      <button class="danger" title="Remover layer" @click="remove(l.id)">✕</button>
    </div>
    <div v-for="l in store.state.f.layers" :key="l.id + '_acc'" class="row">
      <label style="width:86px">{{ l.name }}</label>
      <input v-model="l.access" placeholder="como se acessa (p/ a IA)" style="font-size:11.5px" />
    </div>

    <h2 style="margin-top:10px">Nova layer</h2>
    <div class="row">
      <input v-model="novo.name" placeholder="nome" style="width:110px" data-new-layer-name />
      <select v-model="novo.kind">
        <option value="overlay">overlay</option>
        <option value="virtual">virtual</option>
        <option value="base">base</option>
      </select>
      <select v-if="novo.kind !== 'base'" v-model="novo.slot">
        <option v-for="s in SLOTS" :key="s" :value="s">{{ s }}</option>
      </select>
      <button class="primary" data-add-layer @click="add">+</button>
    </div>
  </section>

  <section>
    <h2>Hold-tap (visual)</h2>
    <p class="hint">Onde o <b>hold</b> (home row mod) e o <b>shift</b> aparecem na tecla.</p>
    <div class="row">
      <label style="width:60px">hold</label>
      <select v-model="store.state.v.holdSlot">
        <option v-for="s in SLOTS" :key="s" :value="s">{{ s }}</option>
      </select>
      <select v-model="store.state.v.holdStyle" title="estilo do hold">
        <option value="text">texto</option>
        <option value="badge">destaque</option>
      </select>
    </div>
    <div class="row">
      <label style="width:60px">shift</label>
      <select v-model="store.state.v.shiftSlot">
        <option v-for="s in SLOTS" :key="s" :value="s">{{ s }}</option>
      </select>
    </div>
  </section>
</template>
