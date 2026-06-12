<script setup lang="ts">
/**
 * Painel de layout configurável (seção Integrado):
 * - modo: teclado integrado (slots) · teclado por layer (esq/dir) · mini-combos
 * - filtro de slots exibidos; filtros de grupos; visibilidade por combo/lado
 * - zoom, pan (estilo mapa), números das teclas e export JPG
 */
import { computed, reactive, ref } from 'vue'
import { useStore, type BoardInstance, type ComboInstance } from '../model/store'
import { SLOTS, type Slot } from '../model/types'
import { downloadBlob, svgToJpeg } from '../model/export-image'
import KeyboardView from './KeyboardView.vue'
import LayerBoard from './LayerBoard.vue'
import ComboCards from './ComboCards.vue'

const store = useStore()
const props = defineProps<{ instance: BoardInstance; removable: boolean }>()

const kb = ref<InstanceType<typeof KeyboardView>>()
const lb = ref<InstanceType<typeof LayerBoard>>()
const scroller = ref<HTMLDivElement>()
const zoom = ref(1)
const showVis = ref(false)

const groups = computed(() => store.comboGroups.value)
function groupOn(g: string): boolean {
  return !props.instance.groups || props.instance.groups.includes(g)
}
function slotOn(s: Slot): boolean {
  return !props.instance.slotsShown || props.instance.slotsShown.includes(s)
}
function toggleSlot(s: Slot) {
  const cur = new Set(props.instance.slotsShown ?? SLOTS)
  if (cur.has(s)) cur.delete(s)
  else cur.add(s)
  props.instance.slotsShown = cur.size === SLOTS.length ? null : [...cur] as Slot[]
}

const baseId = computed(() => store.activeBase.value?.id ?? store.state.f.layers[0]?.id)
const layerLeft = computed(() => props.instance.layerLeft ?? baseId.value)
const layerRight = computed(() => props.instance.layerRight ?? baseId.value)

/** instâncias do painel, agrupadas (p/ lista de visibilidade) */
const panelInstances = computed(() => {
  const m = new Map<string, ComboInstance[]>()
  for (const i of store.comboInstances.value) {
    const g = i.combo.group ?? 'outros'
    if (props.instance.groups && !props.instance.groups.includes(g)) continue
    if (!m.has(g)) m.set(g, [])
    m.get(g)!.push(i)
  }
  return m
})

/* ------------------------ pan estilo mapa ------------------------ */
const pan = reactive({ active: false, x: 0, y: 0, left: 0, top: 0 })
function onPointerDown(ev: PointerEvent) {
  const t = ev.target as Element
  if (t.closest('[data-pos]') || t.closest('.combo-pill') || t.closest('input')) return
  pan.active = true
  pan.x = ev.clientX
  pan.y = ev.clientY
  pan.left = scroller.value!.scrollLeft
  pan.top = scroller.value!.scrollTop
}
function onPointerMove(ev: PointerEvent) {
  if (!pan.active) return
  scroller.value!.scrollLeft = pan.left - (ev.clientX - pan.x)
  scroller.value!.scrollTop = pan.top - (ev.clientY - pan.y)
}
function onPointerUp() {
  pan.active = false
}
function onWheel(ev: WheelEvent) {
  if (!ev.ctrlKey) return
  ev.preventDefault()
  zoom.value = Math.min(3, Math.max(0.4, zoom.value * (ev.deltaY < 0 ? 1.12 : 0.89)))
}

/* ----------------------- números (toggle/segurar) ----------------------- */
let numDownAt = 0
let numPrev = false
function numbersDown() {
  numDownAt = Date.now()
  numPrev = store.state.showNumbers
  store.state.showNumbers = true
}
function numbersUp() {
  if (Date.now() - numDownAt < 250) store.state.showNumbers = !numPrev
  else store.state.showNumbers = numPrev
}

/* ----------------------------- export JPG ----------------------------- */
const jpgScale = ref(2)
const exporting = ref(false)
async function exportJpg() {
  const svg = props.instance.mode === 'layer' ? lb.value?.svgEl : kb.value?.svgEl
  if (!svg) return
  exporting.value = true
  try {
    downloadBlob(await svgToJpeg(svg, jpgScale.value), `corne-layout-${jpgScale.value}x.jpg`)
  } catch (e) {
    alert(`Export falhou: ${e}`)
  } finally {
    exporting.value = false
  }
}
</script>

<template>
  <div class="board-panel">
    <div class="board-toolbar">
      <select :value="instance.mode" data-board-mode title="O que este painel exibe"
        @change="instance.mode = ($event.target as HTMLSelectElement).value as BoardInstance['mode']">
        <option value="slots">Teclado integrado</option>
        <option value="layer">Teclado por layer</option>
        <option value="cards">Mini-layouts de combo</option>
      </select>

      <template v-if="instance.mode === 'layer'">
        <label title="Layer da metade esquerda">esq</label>
        <select :value="layerLeft" data-layer-left
          @change="instance.layerLeft = ($event.target as HTMLSelectElement).value">
          <option v-for="l in store.state.f.layers" :key="l.id" :value="l.id">{{ l.name }}</option>
        </select>
        <label title="Layer da metade direita (as layers são espelhadas — pode diferir)">dir</label>
        <select :value="layerRight" data-layer-right
          @change="instance.layerRight = ($event.target as HTMLSelectElement).value">
          <option v-for="l in store.state.f.layers" :key="l.id" :value="l.id">{{ l.name }}</option>
        </select>
      </template>

      <template v-if="instance.mode === 'slots'">
        <span class="chip-row" title="Slots exibidos neste painel">
          <button v-for="s in SLOTS" :key="s" class="chip slot-chip" :class="{ off: !slotOn(s) }"
            :data-slot-toggle="s" @click="toggleSlot(s)">{{ s }}</button>
        </span>
      </template>

      <template v-if="instance.mode !== 'cards'">
        <label class="chip" :class="{ off: !instance.showCombos }" style="cursor:pointer"
          title="Exibir as etiquetas de combo neste painel">
          <input type="checkbox" :checked="instance.showCombos" style="margin:0"
            @change="instance.showCombos = ($event.target as HTMLInputElement).checked" />
          combos
        </label>
      </template>
      <button v-for="g in groups" :key="g" class="chip" :class="{ off: !groupOn(g) }"
        :title="`Exibir/ocultar o grupo &quot;${g}&quot;`" @click="store.toggleBoardGroup(instance, g)">
        <span class="dot" :style="{ background: store.state.v.groupColors[g] ?? '#74c0fc' }" />{{ g }}
      </button>
      <button class="chip" :class="{ off: !showVis }" data-vis-toggle
        title="Escolher combo a combo (e o lado, nos espelhados) o que aparece"
        @click="showVis = !showVis">por combo ▾</button>

      <span class="spacer" />
      <template v-if="instance.mode !== 'cards'">
        <button title="Diminuir zoom" @click="zoom = Math.max(0.4, zoom - 0.15)">−</button>
        <span class="hint" style="width:38px;text-align:center">{{ Math.round(zoom * 100) }}%</span>
        <button title="Aumentar zoom (Ctrl+roda também)" @click="zoom = Math.min(3, zoom + 0.15)">+</button>
        <button data-numbers title="Números das teclas — clique alterna · segure para espiar"
          @pointerdown="numbersDown" @pointerup="numbersUp">#</button>
        <select v-model.number="jpgScale" title="Resolução da imagem exportada (proporcional)">
          <option :value="1">1×</option>
          <option :value="2">2×</option>
          <option :value="3">3×</option>
          <option :value="4">4×</option>
        </select>
        <button data-export-jpg :disabled="exporting" title="Exporta este painel como JPG, do jeito que está"
          @click="exportJpg">🖼</button>
      </template>
      <button v-if="removable" class="danger" title="Remover este painel" @click="store.removeBoard(instance.id)">✕</button>
    </div>

    <div v-if="showVis" class="vis-list" data-vis-list>
      <div v-for="[g, insts] in panelInstances" :key="g" class="vis-group">
        <b>{{ g }}</b>
        <label v-for="i in insts" :key="i.iid" class="chip"
          :class="{ off: instance.hiddenCombos.includes(i.iid) }" style="cursor:pointer"
          :title="`${i.action} (lado ${i.side === 'L' ? 'definido' : 'espelhado'})`">
          <input type="checkbox" :checked="!instance.hiddenCombos.includes(i.iid)" style="margin:0"
            :data-vis="i.iid" @change="store.toggleComboVisibility(instance, i.iid)" />
          {{ i.label }} <small>{{ i.side }}</small>
        </label>
      </div>
    </div>

    <div v-if="instance.mode === 'cards'" class="catalog" style="max-height:72vh">
      <ComboCards :groups="instance.groups" :hidden-combos="instance.hiddenCombos" />
    </div>
    <div v-else ref="scroller" class="board-scroller" :class="{ panning: pan.active }"
      @pointerdown="onPointerDown" @pointermove="onPointerMove" @pointerup="onPointerUp"
      @pointerleave="onPointerUp" @wheel="onWheel">
      <div :style="{ width: `calc(${Math.round(zoom * 100)}% )`, minWidth: '560px' }">
        <KeyboardView v-if="instance.mode === 'slots'" ref="kb"
          :show-combos="instance.showCombos" :groups="instance.groups"
          :hidden-combos="instance.hiddenCombos" :slots-shown="instance.slotsShown" />
        <LayerBoard v-else ref="lb" :layer-left="layerLeft" :layer-right="layerRight" />
      </div>
    </div>
  </div>
</template>
