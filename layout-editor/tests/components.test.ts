/**
 * Testes de componentes (jsdom): board, seções, painéis e fluxos de UI.
 */
import { describe, expect, it, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { resetStore, useStore } from '../src/model/store'
import KeyboardView from '../src/components/KeyboardView.vue'
import MiniBoard from '../src/components/MiniBoard.vue'
import ComboCatalog from '../src/components/ComboCatalog.vue'
import LayerSection from '../src/components/LayerSection.vue'
import SidePanel from '../src/components/SidePanel.vue'
import ComboPanel from '../src/components/ComboPanel.vue'
import LayerPanel from '../src/components/LayerPanel.vue'
import GlyphPalette from '../src/components/GlyphPalette.vue'
import Toolbar from '../src/components/Toolbar.vue'
import App from '../src/App.vue'

beforeEach(() => {
  resetStore()
  location.hash = ''
})

describe('KeyboardView', () => {
  const mountKb = (groups: string[] | null = null, showCombos = false) =>
    mount(KeyboardView, { props: { showCombos, groups } })

  it('renderiza as 42 teclas com legendas e cores de layer', () => {
    const w = mountKb()
    expect(w.findAll('[data-pos]').length).toBeGreaterThanOrEqual(42)
    expect(w.text()).toContain('ç')
    expect(w.text()).toContain('§')
    const numText = w.findAll('text').find((t) => t.text() === '7' && t.attributes('fill') === '#d6336c')
    expect(numText).toBeTruthy()
  })

  it('clique seleciona; ctrl+clique acumula', async () => {
    const store = useStore()
    const w = mountKb()
    await w.find('[data-pos="13"] .key-body').trigger('pointerdown')
    expect(store.state.selection).toEqual([13])
    await w.find('[data-pos="14"] .key-body').trigger('pointerdown', { ctrlKey: true })
    expect(store.state.selection).toEqual([13, 14])
  })

  it('pílulas: todas, filtradas por grupo, e caminhos ortogonais', () => {
    const store = useStore()
    const all = mountKb(null, true)
    expect(all.findAll('.combo-pill').length).toBe(store.state.f.combos.length)
    const d = all.find('.combo-line').attributes('d')!
    expect(d).toMatch(/^M [\d.-]+ [\d.-]+ (V|H) /)
    const so = mountKb(['delphi'], true)
    expect(so.findAll('.combo-pill').length).toBe(
      store.state.f.combos.filter((c) => c.group === 'delphi').length)
  })

  it('modo números mostra a posição física', async () => {
    const store = useStore()
    store.state.showNumbers = true
    const w = mountKb()
    expect(w.findAll('.key-number').length).toBe(42)
    expect(w.find('[data-pos="39"] .key-number').text()).toBe('39')
  })

  it('combo em edição: pílulas alheias esmaecem e teclas do combo destacam', () => {
    const store = useStore()
    const c = store.state.f.combos.find((x) => x.group === 'delphi')!
    store.editCombo(c.id)
    const w = mountKb(null, true)
    expect(w.findAll('.combo-pill.dim').length).toBe(store.state.f.combos.length - 1)
    expect(w.find(`[data-pos="${c.keys[0]}"]`).classes()).not.toContain('dimmed')
    const other = [...Array(42).keys()].find((p) => !c.keys.includes(p))!
    expect(w.find(`[data-pos="${other}"]`).classes()).toContain('dimmed')
  })

  it('etiqueta com anchor bottom fica abaixo das teclas e expande o viewBox', () => {
    const store = useStore()
    const c = store.state.f.combos.find((x) => x.label === 'Mover ln↓')!
    store.setComboAnchor(c.id, 'bottom')
    const w = mount(KeyboardView, { props: { showCombos: true, groups: ['delphi'] } })
    const vb = w.find('svg').attributes('viewBox')!.split(' ').map(Number)
    expect(vb[1] + vb[3]).toBeGreaterThan(store.board.value.height) // alcança abaixo do board
  })
})

describe('MiniBoard / Catálogo', () => {
  it('destaca as teclas do combo', () => {
    const w = mount(MiniBoard, { props: { highlight: [30, 31], color: '#ff0000' } })
    const hl = w.findAll('rect').filter((r) => r.attributes('fill') === '#ff0000')
    expect(hl.map((r) => r.attributes('data-mini-pos')).sort()).toEqual(['30', '31'])
  })

  it('catálogo: cartões, grupos colapsáveis e edição de teclas no mini', async () => {
    const store = useStore()
    const w = mount(ComboCatalog)
    expect(w.findAll('.combo-card')).toHaveLength(store.state.f.combos.length)

    await w.find('[data-group-header="delphi"]').trigger('click') // colapsa
    const delphiCount = store.state.f.combos.filter((c) => c.group === 'delphi').length
    expect(w.findAll('.combo-card')).toHaveLength(store.state.f.combos.length - delphiCount)
    await w.find('[data-group-header="delphi"]').trigger('click') // expande

    const c = store.state.f.combos.find((x) => x.group === 'edição')!
    await w.find(`[data-edit-combo="${c.id}"]`).trigger('click')
    const card = w.find(`[data-combo="${c.id}"]`)
    await card.find('[data-mini-pos="40"]').trigger('click')
    expect(store.comboById(c.id)?.keys).toContain(40)
  })
})

describe('LayerSection', () => {
  it('um board por layer com a ação central', () => {
    const w = mount(LayerSection)
    const nav = w.find('[data-layer-board="nav"]')
    expect(nav.exists()).toBe(true)
    expect(nav.text()).toContain('PgUp')
    const q = w.find('[data-layer-board="qwerty"]')
    expect(q.text()).toContain('A')
  })
})

describe('SidePanel', () => {
  it('edita tap e notes inline', async () => {
    const store = useStore()
    store.selectKey(1)
    const w = mount(SidePanel)
    await w.find('[data-bind="qwerty-tap"]').setValue('Ω')
    await w.find('[data-bind="qwerty-tap"]').trigger('change')
    await w.find('[data-bind="qwerty-notes"]').setValue('hold = teste')
    await w.find('[data-bind="qwerty-notes"]').trigger('change')
    expect(store.getBinding(1, 'qwerty')).toEqual({ tap: 'Ω', notes: 'hold = teste' })
  })

  it('editor de slot inline: texto, tinta e reset', async () => {
    const store = useStore()
    store.selectKey(7)
    const w = mount(SidePanel)
    await w.find('[data-slot-cell="CR"]').trigger('click')
    await w.find('[data-slot-text]').setValue('XYZ')
    await w.find('[data-slot-text]').trigger('change')
    expect(store.resolveSlot(7, 'CR')?.text).toBe('XYZ')
    await w.find('[data-slot-tint]').setValue('prog')
    expect(store.resolveSlot(7, 'CR')?.color).toBe('#0ca678')
    await w.find('[data-slot-reset]').trigger('click')
    expect(store.resolveSlot(7, 'CR')).toBeNull()
  })
})

describe('ComboPanel', () => {
  it('cria combo pelo fluxo de seleção', async () => {
    const store = useStore()
    const before = store.state.f.combos.length
    const w = mount(ComboPanel)
    await w.find('[data-new-combo]').trigger('click')
    store.selectKey(30)
    store.selectKey(35)
    await w.find('[data-combo-label]').setValue('Teste')
    await w.find('[data-combo-action]').setValue('F24')
    await w.find('[data-confirm-combo]').trigger('click')
    expect(store.state.f.combos.length).toBe(before + 1)
    expect(store.state.f.combos.at(-1)).toMatchObject({ label: 'Teste', action: 'F24', keys: [30, 35] })
  })

  it('editor inline aparece logo abaixo do item em edição', async () => {
    const store = useStore()
    const c = store.state.f.combos.find((x) => x.group === 'edição')!
    const w = mount(ComboPanel)
    await w.find(`[data-edit-combo="${c.id}"]`).trigger('click')
    const editor = w.find(`[data-combo-editor="${c.id}"]`)
    expect(editor.exists()).toBe(true)
    const row = w.find(`[data-combo-row="${c.id}"]`)
    expect(row.element.nextElementSibling).toBe(editor.element)
    await editor.find('[data-combo-anchor]').setValue('top')
    expect(store.state.v.comboLabels[c.id]?.anchor).toBe('top')
  })
})

describe('LayerPanel', () => {
  it('adiciona layer nova com slot e troca a base exibida', async () => {
    const store = useStore()
    const w = mount(LayerPanel)
    await w.find('[data-new-layer-name]').setValue('MACRO')
    await w.find('[data-add-layer]').trigger('click')
    const l = store.state.f.layers.find((x) => x.name === 'MACRO')!
    expect(store.state.v.layerSlots[l.id]).toBeTruthy()
    await w.find('[data-base-select]').setValue('colemak')
    expect(store.activeBase.value?.id).toBe('colemak')
  })
})

describe('GlyphPalette', () => {
  it('clique insere no último campo focado', async () => {
    const store = useStore()
    store.selectKey(1)
    const w = mount(SidePanel, { attachTo: document.body })
    const p = mount(GlyphPalette, { attachTo: document.body })
    const input = w.find('[data-bind="qwerty-tap"]')
    ;(input.element as HTMLInputElement).focus()
    document.dispatchEvent(new FocusEvent('focusin', { bubbles: true }))
    // jsdom não propaga focusin no focus(); dispara manualmente no alvo:
    input.element.dispatchEvent(new FocusEvent('focusin', { bubbles: true }))
    await p.find('[data-glyph="⌫"]').trigger('click')
    expect((input.element as HTMLInputElement).value).toContain('⌫')
    w.unmount()
    p.unmount()
  })
})

describe('Toolbar / App', () => {
  it('permalink escreve o hash; abas alternam seções', async () => {
    const store = useStore()
    const w = mount(Toolbar)
    await w.find('[data-permalink]').trigger('click')
    expect(location.hash).toMatch(/^#d=/)
    await w.find('[data-tab-layers]').trigger('click')
    expect(store.state.activeTab).toBe('layers')
    await w.find('[data-tab-catalogo]').trigger('click')
    expect(store.state.activeTab).toBe('catalogo')
  })

  it('export/import por área de transferência (bundle)', async () => {
    const store = useStore()
    const w = mount(Toolbar)
    await w.find('[data-export-clip]').trigger('click')
    const ta = w.find('[data-clipboard-text]')
    const json = (ta.element as HTMLTextAreaElement).value
    expect(JSON.parse(json).functional.keyboard).toBe('corne42')

    store.setBinding(1, 'qwerty', { tap: 'MUDOU' })
    await w.find('[data-clipboard-modal] button').trigger('click') // fechar export? primeiro botão é copiar
    await w.find('[data-import-clip]').trigger('click')
    await w.find('[data-clipboard-text]').setValue(json)
    await w.find('[data-clipboard-import]').trigger('click')
    expect(store.getBinding(1, 'qwerty')?.tap).toBe('Q')
  })

  it('App monta seções: integrado, por layer e catálogo', async () => {
    const store = useStore()
    const w = mount(App)
    expect(w.findComponent(KeyboardView).exists()).toBe(true)
    expect(w.findComponent(SidePanel).exists()).toBe(true)
    store.state.activeTab = 'layers'
    await w.vm.$nextTick()
    expect(w.findComponent(LayerSection).exists()).toBe(true)
    store.state.activeTab = 'catalogo'
    await w.vm.$nextTick()
    expect(w.findComponent(ComboCatalog).exists()).toBe(true)
  })
})
