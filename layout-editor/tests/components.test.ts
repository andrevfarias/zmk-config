/**
 * Testes de componentes (jsdom): renderização do board, catálogo de combos,
 * painéis e fluxos principais de UI.
 */
import { describe, expect, it, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { resetStore, useStore } from '../src/model/store'
import KeyboardView from '../src/components/KeyboardView.vue'
import MiniBoard from '../src/components/MiniBoard.vue'
import ComboCatalog from '../src/components/ComboCatalog.vue'
import SidePanel from '../src/components/SidePanel.vue'
import ComboPanel from '../src/components/ComboPanel.vue'
import LayerPanel from '../src/components/LayerPanel.vue'
import Toolbar from '../src/components/Toolbar.vue'
import App from '../src/App.vue'

beforeEach(() => {
  resetStore()
  location.hash = ''
})

describe('KeyboardView', () => {
  it('renderiza as 42 teclas com legendas do seed', () => {
    const w = mount(KeyboardView, { props: { showCombos: false, comboGroups: new Set<string>() } })
    expect(w.findAll('[data-pos]').length).toBeGreaterThanOrEqual(42)
    expect(w.text()).toContain('ç')
    expect(w.text()).toContain('F12')
    expect(w.text()).toContain('§')
  })

  it('clique numa tecla seleciona; ctrl+clique acumula', async () => {
    const store = useStore()
    const w = mount(KeyboardView, { props: { showCombos: false, comboGroups: new Set<string>() } })
    await w.find('[data-pos="13"] .key-body').trigger('pointerdown')
    expect(store.state.selection).toEqual([13])
    await w.find('[data-pos="14"] .key-body').trigger('pointerdown', { ctrlKey: true })
    expect(store.state.selection).toEqual([13, 14])
  })

  it('mostra pílulas de combo quando habilitado e filtra por grupo', () => {
    const store = useStore()
    const all = new Set(store.state.f.combos.map((c) => c.group ?? 'outros'))
    const w = mount(KeyboardView, { props: { showCombos: true, comboGroups: all } })
    expect(w.findAll('.combo-pill').length).toBe(store.state.f.combos.length)
    const so = new Set(['delphi'])
    const w2 = mount(KeyboardView, { props: { showCombos: true, comboGroups: so } })
    expect(w2.findAll('.combo-pill').length).toBe(
      store.state.f.combos.filter((c) => c.group === 'delphi').length,
    )
  })
})

describe('MiniBoard / ComboCatalog', () => {
  it('MiniBoard destaca as teclas do combo', () => {
    const w = mount(MiniBoard, { props: { highlight: [30, 31], color: '#ff0000' } })
    const hl = w.findAll('rect').filter((r) => r.attributes('fill') === '#ff0000')
    expect(hl).toHaveLength(2)
    expect(hl.map((r) => r.attributes('data-mini-pos')).sort()).toEqual(['30', '31'])
  })

  it('catálogo renderiza um cartão por combo com nome e ação', () => {
    const store = useStore()
    const w = mount(ComboCatalog)
    expect(w.findAll('.combo-card')).toHaveLength(store.state.f.combos.length)
    expect(w.text()).toContain('Compilar')
    expect(w.text()).toContain('Ctrl+F9')
    expect(w.text()).toContain('Backspace')
  })
})

describe('SidePanel', () => {
  it('edita binding da tecla selecionada', async () => {
    const store = useStore()
    store.selectKey(1)
    const w = mount(SidePanel)
    const tap = w.find('[data-bind="qwerty-tap"]')
    await tap.setValue('Ω')
    await tap.trigger('change')
    expect(store.getBinding(1, 'qwerty')?.tap).toBe('Ω')
  })

  it('mostra grade de slots com conteúdo resolvido', () => {
    const store = useStore()
    store.selectKey(7)
    const w = mount(SidePanel)
    expect(w.find('[data-slot-cell="TL"]').text()).toContain('7')
    expect(w.find('[data-slot-cell="BR"]').text()).toContain('(')
  })
})

describe('ComboPanel', () => {
  it('cria combo pelo fluxo de seleção', async () => {
    const store = useStore()
    const before = store.state.f.combos.length
    const w = mount(ComboPanel)
    await w.find('[data-new-combo]').trigger('click')
    expect(store.state.pickingCombo).toBe(true)
    store.selectKey(30)
    store.selectKey(35)
    await w.find('[data-combo-name]').setValue('Teste')
    await w.find('[data-combo-action]').setValue('F24')
    await w.find('[data-confirm-combo]').trigger('click')
    expect(store.state.f.combos.length).toBe(before + 1)
    expect(store.state.f.combos.at(-1)).toMatchObject({ name: 'Teste', action: 'F24', keys: [30, 35] })
  })
})

describe('LayerPanel', () => {
  it('adiciona layer nova com slot', async () => {
    const store = useStore()
    const w = mount(LayerPanel)
    await w.find('[data-new-layer-name]').setValue('MACRO')
    await w.find('[data-add-layer]').trigger('click')
    const l = store.state.f.layers.find((x) => x.name === 'MACRO')
    expect(l).toBeTruthy()
    expect(store.state.v.layerSlots[l!.id]).toBeTruthy()
  })
})

describe('Toolbar', () => {
  it('permalink escreve o hash com o estado atual', async () => {
    const w = mount(Toolbar, { props: { showCombos: false } })
    await w.find('[data-permalink]').trigger('click')
    expect(location.hash).toMatch(/^#d=/)
  })

  it('alterna abas', async () => {
    const store = useStore()
    const w = mount(Toolbar, { props: { showCombos: false } })
    await w.find('[data-tab-combos]').trigger('click')
    expect(store.state.activeTab).toBe('combos')
    await w.find('[data-tab-editor]').trigger('click')
    expect(store.state.activeTab).toBe('editor')
  })
})

describe('App', () => {
  it('monta o editor completo com board e painéis', () => {
    const w = mount(App)
    expect(w.findComponent(KeyboardView).exists()).toBe(true)
    expect(w.findComponent(SidePanel).exists()).toBe(true)
    expect(w.findComponent(LayerPanel).exists()).toBe(true)
  })

  it('troca para o catálogo', async () => {
    const store = useStore()
    const w = mount(App)
    store.state.activeTab = 'combos'
    await w.vm.$nextTick()
    expect(w.findComponent(ComboCatalog).exists()).toBe(true)
  })
})
