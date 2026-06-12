import { describe, expect, it } from 'vitest'
import { createStore } from '../src/model/store'
import { defaultBundle } from '../src/model/defaults'

describe('store: seed', () => {
  it('carrega o layout Delphi/ABNT2 por padrão', () => {
    const s = createStore()
    expect(s.state.f.keyboard).toBe('corne42')
    expect(s.state.f.layers.map((l) => l.id)).toContain('nav')
    expect(s.getBinding(22, 'qwerty')?.tap).toBe('ç')
    expect(s.getBinding(22, 'qwerty')?.hold).toBe('⌃')
    expect(s.getBinding(22, 'colemak')?.tap).toBe('O')
    expect(s.state.f.combos.length).toBeGreaterThan(30)
  })
})

describe('store: resolução de slots', () => {
  const s = createStore()

  it('centro = base, TC = shift, BC = hold', () => {
    expect(s.resolveSlot(13, 'C')).toEqual({ text: 'A', source: 'base' })
    expect(s.resolveSlot(34, 'TC')).toEqual({ text: ':', source: 'shift' })
    expect(s.resolveSlot(13, 'BC')).toEqual({ text: '⌃', source: 'hold' })
  })

  it('slots laterais vêm do mapeamento layer→slot', () => {
    expect(s.resolveSlot(7, 'TL')).toEqual({ text: '7', source: 'num' })
    expect(s.resolveSlot(7, 'BL')).toEqual({ text: 'F7', source: 'fn' })
    expect(s.resolveSlot(7, 'TR')).toEqual({ text: '⌃←', source: 'nav' })
    expect(s.resolveSlot(7, 'BR')).toEqual({ text: '(', source: 'prog' })
    expect(s.resolveSlot(7, 'CL')).toEqual({ text: '&', source: 'norm' })
    expect(s.resolveSlot(11, 'F')).toEqual({ text: 'BOOT', source: 'config' })
  })

  it('override de texto e hidden têm prioridade', () => {
    s.setSlotOverride(7, 'TL', { text: 'X!' })
    expect(s.resolveSlot(7, 'TL')).toEqual({ text: 'X!', source: 'custom' })
    s.setSlotOverride(7, 'TL', { hidden: true })
    expect(s.resolveSlot(7, 'TL')).toBeNull()
    s.setSlotOverride(7, 'TL', undefined)
    expect(s.resolveSlot(7, 'TL')?.source).toBe('num')
  })

  it('resolveKey devolve só slots preenchidos', () => {
    const r = s.resolveKey(37) // Space
    expect(r.C?.text).toBe('␣')
    expect(r.TL).toBeUndefined()
  })
})

describe('store: bindings e undo', () => {
  it('edita, desfaz e refaz', () => {
    const s = createStore()
    s.setBinding(1, 'qwerty', { tap: 'Ω' })
    expect(s.getBinding(1, 'qwerty')?.tap).toBe('Ω')
    s.undo()
    expect(s.getBinding(1, 'qwerty')?.tap).toBe('Q')
    s.redo()
    expect(s.getBinding(1, 'qwerty')?.tap).toBe('Ω')
  })

  it('binding vazio remove a entrada', () => {
    const s = createStore()
    s.setBinding(1, 'nav', { tap: 'x' })
    expect(s.getBinding(1, 'nav')).toBeTruthy()
    s.setBinding(1, 'nav', { tap: '' })
    expect(s.getBinding(1, 'nav')).toBeUndefined()
  })
})

describe('store: drag de legendas', () => {
  it('mesma tecla: move conteúdo de layer p/ outro slot', () => {
    const s = createStore()
    s.state.drag = { fromKey: 7, fromSlot: 'TL', text: '7', x: 0, y: 0 }
    s.dropLegend(7, 'CR', false)
    expect(s.resolveSlot(7, 'CR')).toEqual({ text: '7', source: 'num' })
    expect(s.resolveSlot(7, 'TL')).toBeNull() // origem escondida
  })

  it('mesma tecla + shift: copia mantendo a origem', () => {
    const s = createStore()
    s.state.drag = { fromKey: 7, fromSlot: 'TL', text: '7', x: 0, y: 0 }
    s.dropLegend(7, 'CR', true)
    expect(s.resolveSlot(7, 'CR')?.text).toBe('7')
    expect(s.resolveSlot(7, 'TL')?.text).toBe('7')
  })

  it('entre teclas: move o binding da layer', () => {
    const s = createStore()
    s.state.drag = { fromKey: 7, fromSlot: 'TL', text: '7', x: 0, y: 0 }
    s.dropLegend(6, 'TL', false)
    expect(s.getBinding(6, 'num')?.tap).toBe('7')
    expect(s.getBinding(7, 'num')).toBeUndefined()
  })

  it('entre teclas + shift: copia o binding', () => {
    const s = createStore()
    s.state.drag = { fromKey: 7, fromSlot: 'TL', text: '7', x: 0, y: 0 }
    s.dropLegend(6, 'TL', true)
    expect(s.getBinding(6, 'num')?.tap).toBe('7')
    expect(s.getBinding(7, 'num')?.tap).toBe('7')
  })
})

describe('store: espelhamento', () => {
  it('copia bindings por dedo para a outra metade', () => {
    const s = createStore()
    s.setBinding(1, 'qwerty', { tap: 'Ψ', hold: '⌥' })
    s.selectKey(1)
    s.mirrorSelection()
    expect(s.getBinding(10, 'qwerty')).toEqual({ tap: 'Ψ', hold: '⌥' })
  })

  it('espelha overrides trocando slots laterais', () => {
    const s = createStore()
    s.setSlotOverride(1, 'TL', { text: 'x' })
    s.selectKey(1)
    s.mirrorSelection()
    expect(s.state.v.keyOverrides['10']?.TR).toEqual({ text: 'x' })
  })

  it('espelha múltiplas teclas, incluindo polegares', () => {
    const s = createStore()
    s.setBinding(36, 'nav', { tap: 'XX' })
    s.setBinding(13, 'nav', { tap: 'YY' })
    s.selectKey(36)
    s.selectKey(13, true)
    s.mirrorSelection()
    expect(s.getBinding(41, 'nav')?.tap).toBe('XX')
    expect(s.getBinding(22, 'nav')?.tap).toBe('YY')
  })
})

describe('store: layers', () => {
  it('adiciona/remui layer e limpa bindings/slots', () => {
    const s = createStore()
    s.addLayer({ id: 'macro', name: 'MACRO', kind: 'virtual' }, 'CR')
    s.setBinding(5, 'macro', { tap: 'M1' })
    expect(s.resolveSlot(5, 'CR')?.text).toBe('M1')
    s.removeLayer('macro')
    expect(s.state.f.layers.find((l) => l.id === 'macro')).toBeUndefined()
    expect(s.resolveSlot(5, 'CR')).toBeNull()
    expect(s.getBinding(5, 'macro')).toBeUndefined()
  })
})

describe('store: combos', () => {
  it('fluxo de criação com seleção de teclas', () => {
    const s = createStore()
    s.startPickCombo()
    s.selectKey(30)
    s.selectKey(31)
    s.selectKey(31) // toggle remove
    s.selectKey(31)
    expect(s.state.pickedKeys).toEqual([30, 31])
    s.addCombo({ id: 'novo', name: 'Novo', action: 'F13', keys: [...s.state.pickedKeys], group: 'delphi' })
    expect(s.state.f.combos.at(-1)?.name).toBe('Novo')
    expect(s.state.pickingCombo).toBe(false)
  })

  it('atualiza, posiciona e remove', () => {
    const s = createStore()
    const c = s.state.f.combos[0]
    s.updateCombo(c.id, { name: 'Renomeado' })
    expect(s.state.f.combos[0].name).toBe('Renomeado')
    s.setComboOffset(c.id, 10, -20)
    expect(s.state.v.comboLabels[c.id]).toEqual({ dx: 10, dy: -20 })
    s.removeCombo(c.id)
    expect(s.state.f.combos.find((x) => x.id === c.id)).toBeUndefined()
    expect(s.state.v.comboLabels[c.id]).toBeUndefined()
  })

  it('cor vem do grupo', () => {
    const s = createStore()
    const delphi = s.state.f.combos.find((c) => c.group === 'delphi')!
    expect(s.comboColor(delphi)).toBe(s.state.v.groupColors['delphi'])
  })
})

describe('store: bundle', () => {
  it('currentBundle é um clone independente', () => {
    const s = createStore()
    const b = s.currentBundle()
    b.functional.layers.push({ id: 'zz', name: 'ZZ', kind: 'overlay' })
    expect(s.state.f.layers.find((l) => l.id === 'zz')).toBeUndefined()
  })

  it('loadBundle substitui o estado', () => {
    const s = createStore()
    const b = defaultBundle()
    b.functional.layers[0].name = 'BASE-X'
    s.loadBundle(b)
    expect(s.state.f.layers[0].name).toBe('BASE-X')
  })
})
