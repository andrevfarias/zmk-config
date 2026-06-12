import { describe, expect, it } from 'vitest'
import { createStore } from '../src/model/store'
import { defaultBundle } from '../src/model/defaults'

describe('store: seed', () => {
  it('carrega o layout Delphi/ABNT2 por padrão', () => {
    const s = createStore()
    expect(s.state.f.keyboard).toBe('corne42')
    expect(s.getBinding(22, 'qwerty')?.tap).toBe('ç')
    expect(s.getBinding(22, 'qwerty')?.notes).toContain('hold = Ctrl')
    expect(s.getBinding(22, 'colemak')?.tap).toBe('O')
    expect(s.state.f.combos.length).toBeGreaterThan(30)
  })
})

describe('store: resolução de slots (representação)', () => {
  const s = createStore()

  it('centro = base ativa; TC/BC vêm de keySlots (texto livre)', () => {
    expect(s.resolveSlot(13, 'C')?.text).toBe('A')
    expect(s.resolveSlot(34, 'TC')?.text).toBe(':')
    expect(s.resolveSlot(13, 'BC')?.text).toBe('⌃')
    expect(s.resolveSlot(13, 'BC')?.source).toBe('custom')
  })

  it('slots laterais vêm do gerador layer→slot, com a cor da layer', () => {
    const r = s.resolveSlot(7, 'TL')
    expect(r).toMatchObject({ text: '7', source: 'num' })
    expect(r?.color).toBe('#d6336c')
    expect(s.resolveSlot(7, 'BR')).toMatchObject({ text: '(', source: 'prog', color: '#0ca678' })
    expect(s.resolveSlot(11, 'F')?.text).toBe('BOOT')
  })

  it('texto representativo com tinta de outra layer (Norm no polegar)', () => {
    const r = s.resolveSlot(36, 'BL')
    expect(r?.text).toBe('Norm')
    expect(r?.source).toBe('custom')
    expect(r?.color).toBe('#7048e8') // cor da layer norm, sem vínculo
  })

  it('tinta no centro do polegar (Num com cor da layer num)', () => {
    expect(s.resolveSlot(36, 'C')).toMatchObject({ text: 'Num', color: '#d6336c' })
  })

  it('base ativa muda o centro (QWERTY ↔ COLEMAK)', () => {
    expect(s.resolveSlot(4, 'C')?.text).toBe('R')
    s.setBaseLayer('colemak')
    expect(s.resolveSlot(4, 'C')?.text).toBe('P')
    s.setBaseLayer('qwerty')
  })

  it('override de cor explícita vence a cor da layer', () => {
    s.setSlotOverride(7, 'TL', { color: '#111111' })
    expect(s.resolveSlot(7, 'TL')?.color).toBe('#111111')
    s.setSlotOverride(7, 'TL', undefined)
  })

  it('hidden esconde; reset volta ao gerador', () => {
    s.setSlotOverride(7, 'TL', { hidden: true })
    expect(s.resolveSlot(7, 'TL')).toBeNull()
    s.setSlotOverride(7, 'TL', undefined)
    expect(s.resolveSlot(7, 'TL')?.source).toBe('num')
  })

  it('slot pode referenciar outra layer (ref sem texto)', () => {
    s.setSlotOverride(5, 'CR', { layer: 'fn' })
    expect(s.resolveSlot(5, 'CR')).toMatchObject({ text: 'F12', source: 'fn' })
    s.setSlotOverride(5, 'CR', undefined)
  })
})

describe('store: bindings e undo', () => {
  it('edita tap/notes, desfaz e refaz', () => {
    const s = createStore()
    s.setBinding(1, 'qwerty', { tap: 'Ω', notes: 'teste' })
    expect(s.getBinding(1, 'qwerty')).toEqual({ tap: 'Ω', notes: 'teste' })
    s.undo()
    expect(s.getBinding(1, 'qwerty')?.tap).toBe('Q')
    s.redo()
    expect(s.getBinding(1, 'qwerty')?.tap).toBe('Ω')
  })

  it('binding vazio remove a entrada', () => {
    const s = createStore()
    s.setBinding(1, 'nav', { tap: 'x' })
    s.setBinding(1, 'nav', { tap: '' })
    expect(s.getBinding(1, 'nav')).toBeUndefined()
  })
})

describe('store: drag de legendas', () => {
  it('mesma tecla: move conteúdo de layer p/ outro slot', () => {
    const s = createStore()
    s.state.drag = { fromKey: 7, fromSlot: 'TL', text: '7', x: 0, y: 0 }
    s.dropLegend(7, 'CR', false)
    expect(s.resolveSlot(7, 'CR')).toMatchObject({ text: '7', source: 'num' })
    expect(s.resolveSlot(7, 'TL')).toBeNull()
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
    s.setBinding(1, 'qwerty', { tap: 'Ψ', notes: 'hold = ⌥' })
    s.selectKey(1)
    s.mirrorSelection()
    expect(s.getBinding(10, 'qwerty')).toEqual({ tap: 'Ψ', notes: 'hold = ⌥' })
  })

  it('espelha keySlots trocando slots laterais', () => {
    const s = createStore()
    s.setSlotOverride(1, 'TL', { text: 'x' })
    s.selectKey(1)
    s.mirrorSelection()
    expect(s.state.v.keySlots['10']?.TR).toEqual({ text: 'x' })
  })

  it('espelha múltiplas teclas, incluindo polegares', () => {
    const s = createStore()
    s.setBinding(13, 'nav', { tap: 'YY' })
    s.selectKey(36)
    s.selectKey(13, true)
    s.mirrorSelection()
    expect(s.getBinding(22, 'nav')?.tap).toBe('YY')
    expect(s.getBinding(41, 'qwerty')?.tap).toBe('Num')
  })
})

describe('store: layers', () => {
  it('adiciona/remove layer e limpa bindings/slots', () => {
    const s = createStore()
    s.addLayer({ id: 'macro', name: 'MACRO', kind: 'virtual' }, 'CR')
    s.setBinding(5, 'macro', { tap: 'M1' })
    expect(s.resolveSlot(5, 'CR')?.text).toBe('M1')
    s.removeLayer('macro')
    expect(s.resolveSlot(5, 'CR')).toBeNull()
    expect(s.getBinding(5, 'macro')).toBeUndefined()
  })
})

describe('store: combos', () => {
  it('fluxo de criação com seleção de teclas', () => {
    const s = createStore()
    s.startPickCombo(null)
    s.selectKey(30)
    s.selectKey(31)
    s.selectKey(31)
    s.selectKey(31)
    expect(s.state.pickedKeys).toEqual([30, 31])
    s.addCombo({ id: 'novo', label: 'Novo', action: 'F13', keys: [...s.state.pickedKeys], group: 'delphi' })
    expect(s.state.f.combos.at(-1)?.label).toBe('Novo')
    expect(s.state.pickingCombo).toBe(false)
  })

  it('editCombo destaca e pickedKeys reflete o combo', () => {
    const s = createStore()
    const c = s.state.f.combos[0]
    s.editCombo(c.id)
    expect(s.state.editingCombo).toBe(c.id)
    expect(s.state.pickedKeys).toEqual(c.keys)
    s.editCombo(null)
    expect(s.state.editingCombo).toBeNull()
  })

  it('toggleComboKey marca/desmarca teclas (catálogo)', () => {
    const s = createStore()
    const c = s.state.f.combos[0]
    const had = [...c.keys]
    s.toggleComboKey(c.id, 40)
    expect(s.comboById(c.id)?.keys).toContain(40)
    s.toggleComboKey(c.id, 40)
    expect(s.comboById(c.id)?.keys).toEqual(had)
  })

  it('anchor + offset da etiqueta', () => {
    const s = createStore()
    const c = s.state.f.combos[0]
    s.setComboAnchor(c.id, 'bottom')
    expect(s.state.v.comboLabels[c.id]).toMatchObject({ anchor: 'bottom', dx: 0, dy: 0 })
    s.setComboOffset(c.id, 5, 7)
    expect(s.state.v.comboLabels[c.id]).toMatchObject({ anchor: 'bottom', dx: 5, dy: 7 })
  })

  it('remove combo limpa etiqueta e edição', () => {
    const s = createStore()
    const c = s.state.f.combos[0]
    s.editCombo(c.id)
    s.removeCombo(c.id)
    expect(s.comboById(c.id)).toBeUndefined()
    expect(s.state.editingCombo).toBeNull()
  })
})

describe('store: boards (Integrado)', () => {
  it('adiciona, filtra e separa por grupo', () => {
    const s = createStore()
    expect(s.state.boards).toHaveLength(1)
    s.addBoard()
    expect(s.state.boards).toHaveLength(2)
    const b = s.state.boards[1]
    s.toggleBoardGroup(b, 'delphi')
    expect(b.groups).not.toBeNull()
    expect(b.groups).not.toContain('delphi')
    s.toggleBoardGroup(b, 'delphi')
    expect(b.groups).toBeNull()
    s.splitBoardsByGroup()
    expect(s.state.boards.length).toBe(s.comboGroups.value.length)
    expect(s.state.boards.every((x) => x.groups?.length === 1)).toBe(true)
    s.removeBoard(s.state.boards[0].id)
    expect(s.state.boards.length).toBe(s.comboGroups.value.length - 1)
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
