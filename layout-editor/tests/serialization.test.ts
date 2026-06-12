import { describe, expect, it } from 'vitest'
import { defaultBundle } from '../src/model/defaults'
import {
  exportBundle, exportFunctional, exportVisual, importAny, ImportError,
  validateFunctional,
} from '../src/model/serialization'

describe('serialização: roundtrip', () => {
  const b = defaultBundle()

  it('functional.json exporta e importa idêntico', () => {
    const r = importAny(exportFunctional(b))
    expect(r.functional).toEqual(b.functional)
    expect(r.visual).toBeUndefined()
  })

  it('visual.json exporta e importa idêntico', () => {
    const r = importAny(exportVisual(b))
    expect(r.visual).toEqual(b.visual)
    expect(r.functional).toBeUndefined()
  })

  it('bundle exporta e importa idêntico', () => {
    const r = importAny(exportBundle(b))
    expect(r.functional).toEqual(b.functional)
    expect(r.visual).toEqual(b.visual)
  })
})

describe('serialização: validação', () => {
  const ok = () => defaultBundle().functional

  it('rejeita JSON inválido', () => {
    expect(() => importAny('{oops')).toThrow(ImportError)
  })

  it('rejeita arquivo irreconhecível', () => {
    expect(() => importAny('{"foo": 1}')).toThrow(/não reconheci/)
  })

  it('rejeita versão errada', () => {
    const f = ok() as unknown as { version: number }
    f.version = 99
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

  it('rejeita combo com menos de 2 teclas', () => {
    const f = ok()
    f.combos.push({ id: 'x', name: 'X', action: 'y', keys: [1] })
    expect(() => validateFunctional(f)).toThrow(/2\+ teclas/)
  })

  it('rejeita doc sem layer base', () => {
    const f = ok()
    f.layers = f.layers.filter((l) => l.kind !== 'base')
    expect(() => validateFunctional(f)).toThrow(/base/)
  })

  it('visual: rejeita slot inválido', () => {
    const v = defaultBundle().visual as unknown as { layerSlots: Record<string, string> }
    v.layerSlots['nav'] = 'XX'
    expect(() => importAny(JSON.stringify(v))).toThrow(/slot inválido/)
  })

  it('visual: completa campos ausentes com defaults', () => {
    const r = importAny('{"version":1,"holdSlot":"BC","layerSlots":{}}')
    expect(r.visual?.shiftSlot).toBe('TC')
    expect(r.visual?.comboLabels).toEqual({})
  })
})
