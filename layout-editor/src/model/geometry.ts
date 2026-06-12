/**
 * Geometria física dos teclados. Hoje só o Corne 42, mas o registro permite
 * carregar outras geometrias no futuro sem mudar o resto do app.
 *
 * Mapa de posições do Corne:
 *    0  1  2  3  4  5      6  7  8  9 10 11
 *   12 13 14 15 16 17     18 19 20 21 22 23
 *   24 25 26 27 28 29     30 31 32 33 34 35
 *            36 37 38     39 40 41
 */

export interface KeyGeom {
  /** índice físico */
  pos: number
  x: number
  y: number
  w: number
  h: number
  /** rotação em graus (polegares) */
  r: number
  /** 'L' | 'R' — metade do split */
  half: 'L' | 'R'
}

export interface BoardGeom {
  id: string
  name: string
  keys: KeyGeom[]
  /** espelho por dedo: mirror[i] = posição equivalente na outra metade */
  mirror: number[]
  width: number
  height: number
}

const U = 58 // tamanho de 1u em px
const GAP = 6
const SPLIT = 40 // vão entre metades

/** stagger de coluna do Corne (deslocamento Y por coluna, em u) */
const STAGGER = [0.35, 0.35, 0.1, 0, 0.1, 0.2]

function buildCorne42(): BoardGeom {
  const keys: KeyGeom[] = []
  const step = U + GAP
  const rightX0 = 6 * step + SPLIT

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 6; col++) {
      // metade esquerda
      keys.push({
        pos: row * 12 + col,
        x: col * step,
        y: (row + STAGGER[col]) * step,
        w: U, h: U, r: 0, half: 'L',
      })
    }
    for (let col = 0; col < 6; col++) {
      // metade direita (stagger espelhado: coluna interna primeiro)
      keys.push({
        pos: row * 12 + 6 + col,
        x: rightX0 + col * step,
        y: (row + STAGGER[5 - col]) * step,
        w: U, h: U, r: 0, half: 'R',
      })
    }
  }

  // polegares (3 + 3), com rotação progressiva
  const ty = 3.45 * step
  const thumb = (pos: number, x: number, r: number, half: 'L' | 'R'): KeyGeom =>
    ({ pos, x, y: ty, w: U, h: U * 1.15, r, half })
  keys.push(thumb(36, 2.6 * step, -8, 'L'))
  keys.push(thumb(37, 3.65 * step, 0, 'L'))
  keys.push(thumb(38, 4.7 * step, 8, 'L'))
  keys.push(thumb(39, rightX0 + 1.3 * step, -8, 'R'))
  keys.push(thumb(40, rightX0 + 2.35 * step, 0, 'R'))
  keys.push(thumb(41, rightX0 + 3.4 * step, 8, 'R'))

  keys.sort((a, b) => a.pos - b.pos)

  // espelho por dedo: cada linha de 12 inverte; polegares 36↔41, 37↔40, 38↔39
  const mirror: number[] = []
  for (let row = 0; row < 3; row++)
    for (let col = 0; col < 12; col++) mirror[row * 12 + col] = row * 12 + (11 - col)
  mirror[36] = 41; mirror[37] = 40; mirror[38] = 39
  mirror[39] = 38; mirror[40] = 37; mirror[41] = 36

  return {
    id: 'corne42',
    name: 'Corne 42',
    keys,
    mirror,
    width: rightX0 + 6 * step,
    height: 4.85 * step,
  }
}

const BOARDS: Record<string, BoardGeom> = { corne42: buildCorne42() }

export function getBoard(id: string): BoardGeom {
  const b = BOARDS[id]
  if (!b) throw new Error(`Geometria desconhecida: ${id}`)
  return b
}

export const KEY_COUNT = 42
