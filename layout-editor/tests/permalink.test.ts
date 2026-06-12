import { describe, expect, it } from 'vitest'
import { decodePermalink, encodePermalink } from '../src/model/permalink'
import { defaultBundle } from '../src/model/defaults'

describe('permalink', () => {
  it('roundtrip do bundle completo', () => {
    const b = defaultBundle()
    const hash = encodePermalink(b)
    expect(hash).toMatch(/^#d=[A-Za-z0-9_-]+$/)
    const back = decodePermalink(hash)
    expect(back).toEqual(b)
  })

  it('é determinístico (mtime fixo)', () => {
    const b = defaultBundle()
    expect(encodePermalink(b)).toBe(encodePermalink(b))
  })

  it('hash sem dados retorna null', () => {
    expect(decodePermalink('')).toBeNull()
    expect(decodePermalink('#outracoisa')).toBeNull()
  })

  it('conteúdo corrompido lança erro', () => {
    expect(() => decodePermalink('#d=AAAA')).toThrow()
  })

  it('tamanho razoável para URL (< 8 KB para o seed completo)', () => {
    expect(encodePermalink(defaultBundle()).length).toBeLessThan(8192)
  })
})
