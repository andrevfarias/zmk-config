import { describe, expect, it } from 'vitest'
import { getBoard, KEY_COUNT } from '../src/model/geometry'

describe('geometria corne42', () => {
  const b = getBoard('corne42')

  it('tem 42 teclas com posições 0..41 ordenadas', () => {
    expect(b.keys).toHaveLength(KEY_COUNT)
    b.keys.forEach((k, i) => expect(k.pos).toBe(i))
  })

  it('divide as metades corretamente', () => {
    for (const k of b.keys) {
      const col = k.pos < 36 ? k.pos % 12 : k.pos - 36
      const expected = k.pos < 36 ? (col < 6 ? 'L' : 'R') : k.pos <= 38 ? 'L' : 'R'
      expect(k.half, `pos ${k.pos}`).toBe(expected)
    }
  })

  it('espelho por dedo é involutivo e cruza as metades', () => {
    for (let i = 0; i < KEY_COUNT; i++) {
      const m = b.mirror[i]
      expect(b.mirror[m], `mirror(mirror(${i}))`).toBe(i)
      expect(b.keys[i].half).not.toBe(b.keys[m].half)
    }
    expect(b.mirror[0]).toBe(11)
    expect(b.mirror[13]).toBe(22)
    expect(b.mirror[36]).toBe(41)
    expect(b.mirror[38]).toBe(39)
  })

  it('rejeita geometria desconhecida', () => {
    expect(() => getBoard('planck')).toThrow()
  })
})
