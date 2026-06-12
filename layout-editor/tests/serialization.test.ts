import { describe, expect, it } from 'vitest'
import { defaultBundle } from '../src/model/defaults'
import {
  exportBundle, importBundle, ImportError, validateFunctional, validateVisual,
} from '../src/model/serialization'

describe('serialização: roundtrip do bundle', () => {
  it('exporta e importa idêntico', () => {
    const b = defaultBundle()
    expect(importBundle(exportBundle(b))).toEqual(b)
  })
})

describe('serialização: validação', () => {
  const ok = () => defaultBundle().functional

  it('rejeita JSON inválido', () => {
    expect(() => importBundle('{oops')).toThrow(ImportError)
  })

  it('rejeita não-bundle (functional sozinho)', () => {
    expect(() => importBundle(JSON.stringify(ok()))).toThrow(/bundle completo/)
  })

  it('rejeita versão errada', () => {
    const f = ok() as unknown as { version: number }
    f.version = 1
    expect(() => validateFunctional(f)).toThrow(/versão/)
  })

  it('rejeita layer duplicada', () => {
    const f = ok()
    f.layers.push({ ...f.layers[0] })
    expect(() => validateFunctional(f)).toThrow(/duplicada/)
  })

  it('rejeita binding para layer inexistente', () => {
    const f = ok()
    f.keys['3'] = { fantasma: { tap: 'x' } }
    expect(() => validateFunctional(f)).toThrow(/inexistente/)
  })

  it('rejeita posição fora do teclado', () => {
    const f = ok()
    f.keys['99'] = { qwerty: { tap: 'x' } }
    expect(() => validateFunctional(f)).toThrow(/posição inválida/)
  })

  it('rejeita combo sem label/action ou com menos de 2 teclas', () => {
    const f1 = ok()
    f1.combos.push({ id: 'x', label: '', action: 'y', keys: [1, 2] })
    expect(() => validateFunctional(f1)).toThrow(/label/)
    const f2 = ok()
    f2.combos.push({ id: 'x', label: 'X', action: 'y', keys: [1] })
    expect(() => validateFunctional(f2)).toThrow(/2\+ teclas/)
  })

  it('rejeita doc sem layer base', () => {
    const f = ok()
    f.layers = f.layers.filter((l) => l.kind !== 'base')
    expect(() => validateFunctional(f)).toThrow(/base/)
  })

  it('visual: rejeita slot/anchor inválidos', () => {
    const v1 = defaultBundle().visual as unknown as { layerSlots: Record<string, string> }
    v1.layerSlots['nav'] = 'XX'
    expect(() => validateVisual(v1)).toThrow(/slot inválido/)
    const v2 = defaultBundle().visual
    v2.comboLabels['c0_l'] = { dx: 0, dy: 0, anchor: 'meio' as never }
    expect(() => validateVisual(v2)).toThrow(/anchor inválido/)
  })

  it('visual: completa campos ausentes com defaults', () => {
    const v = validateVisual({ version: 2, layerSlots: {} })
    expect(v.keySlots).toEqual({})
    expect(v.comboLabels).toEqual({})
  })
})
