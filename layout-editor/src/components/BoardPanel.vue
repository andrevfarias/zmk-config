<script setup lang="ts">
/**
 * Um board da seção Integrado: filtros de grupo, zoom, pan (arrastar o fundo,
 * estilo mapa), overlay de números (clique alterna · segurar espia) e
 * exportação JPG com resolução proporcional.
 */
import { computed, reactive, ref } from 'vue'
import { useStore, type BoardInstance } from '../model/store'
import { downloadBlob, svgToJpeg } from '../model/export-image'
import KeyboardView from './KeyboardView.vue'

const store = useStore()
const props = defineProps<{ instance: BoardInstance; removable: boolean }>()

const kb = ref<InstanceType<typeof KeyboardView>>()
const scroller = ref<HTMLDivElement>()
const zoom = ref(1)

const groups = computed(() => store.comboGroups.value)
function groupOn(g: string): boolean {
  return !props.instance.groups || props.instance.groups.includes(g)
}

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
  const svg = kb.value?.svgEl
  if (!svg) return
  exporting.value = true
  try {
    const blob = await svgToJpeg(svg, jpgScale.value)
    downloadBlob(blob, `corne-layout-${jpgScale.value}x.jpg`)
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
      <label class="chip" :class="{ off: !instance.showCombos }" style="cursor:pointer"
        title="Exibir/ocultar as etiquetas de combo neste layout">
        <input type="checkbox" :checked="instance.showCombos" style="margin:0"
          @change="instance.showCombos = ($event.target as HTMLInputElement).checked" />
        combos
      </label>
      <button v-for="g in groups" :key="g" class="chip" :class="{ off: !groupOn(g) }"
        :title="`Exibir/ocultar o grupo &quot;${g}&quot; neste layout`"
        @click="store.toggleBoardGroup(instance, g)">
        <span class="dot" :style="{ background: store.state.v.groupColors[g] ?? '#74c0fc' }" />{{ g }}
      </button>
      <span class="spacer" />
      <button title="Diminuir zoom" @click="zoom = Math.max(0.4, zoom - 0.15)">−</button>
      <span class="hint" style="width:38px;text-align:center">{{ Math.round(zoom * 100) }}%</span>
      <button title="Aumentar zoom (Ctrl+roda também funciona)" @click="zoom = Math.min(3, zoom + 0.15)">+</button>
      <button data-numbers title="Números das teclas — clique alterna · segure para espiar"
        @pointerdown="numbersDown" @pointerup="numbersUp">#</button>
      <select v-model.number="jpgScale" title="Resolução da imagem exportada (proporcional)">
        <option :value="1">1×</option>
        <option :value="2">2×</option>
        <option :value="3">3×</option>
        <option :value="4">4×</option>
      </select>
      <button data-export-jpg :disabled="exporting" title="Exporta este layout como JPG, do jeito que está"
        @click="exportJpg">🖼 JPG</button>
      <button v-if="removable" class="danger" title="Remover este layout" @click="store.removeBoard(instance.id)">✕</button>
    </div>
    <div ref="scroller" class="board-scroller" :class="{ panning: pan.active }"
      @pointerdown="onPointerDown" @pointermove="onPointerMove" @pointerup="onPointerUp"
      @pointerleave="onPointerUp" @wheel="onWheel">
      <div :style="{ width: `calc(${Math.round(zoom * 100)}% )`, minWidth: '560px' }">
        <KeyboardView ref="kb" :show-combos="instance.showCombos" :groups="instance.groups" />
      </div>
    </div>
  </div>
</template>
