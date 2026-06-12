/**
 * Import/export — sempre o BUNDLE completo {functional, visual}.
 * O agente de IA lê o bloco "functional" e ignora o "visual".
 */
import type { Bundle, FunctionalDoc, VisualDoc } from './types'
import { SLOTS, emptyVisual } from './types'
import { KEY_COUNT } from './geometry'

export class ImportError extends Error {}

function fail(msg: string): never {
  throw new ImportError(msg)
}

export function validateFunctional(f: unknown): FunctionalDoc {
  const d = f as FunctionalDoc
  if (!d || typeof d !== 'object') fail('functional: documento inválido')
  if (d.version !== 2)
    fail(`functional: versão não suportada (${(d as { version?: unknown }).version}) — esperado 2`)
  if (typeof d.keyboard !== 'string') fail('functional: campo "keyboard" ausente')
  if (!Array.isArray(d.layers)) fail('functional: "layers" deve ser uma lista')
  const ids = new Set<string>()
  for (const l of d.layers) {
    if (!l.id || !l.name) fail('functional: layer sem id/name')
    if (ids.has(l.id)) fail(`functional: layer duplicada "${l.id}"`)
    if (!['base', 'overlay', 'virtual'].includes(l.kind)) fail(`functional: kind inválido em "${l.id}"`)
    ids.add(l.id)
  }
  if (!d.layers.some((l) => l.kind === 'base')) fail('functional: precisa de ao menos uma layer base')
  if (!d.keys || typeof d.keys !== 'object') fail('functional: "keys" ausente')
  for (const [pos, layers] of Object.entries(d.keys)) {
    const p = Number(pos)
    if (!Number.isInteger(p) || p < 0 || p >= KEY_COUNT) fail(`functional: posição inválida "${pos}"`)
    for (const layer of Object.keys(layers)) {
      if (!ids.has(layer)) fail(`functional: binding na tecla ${pos} referencia layer inexistente "${layer}"`)
    }
  }
  if (!Array.isArray(d.combos)) fail('functional: "combos" deve ser uma lista')
  const comboIds = new Set<string>()
  for (const c of d.combos) {
    if (!c.id || !c.label || !c.action) fail('functional: combo sem id/label/action')
    if (comboIds.has(c.id)) fail(`functional: combo duplicado "${c.id}"`)
    comboIds.add(c.id)
    if (!Array.isArray(c.keys) || c.keys.length < 2) fail(`functional: combo "${c.label}" precisa de 2+ teclas`)
    for (const k of c.keys)
      if (!Number.isInteger(k) || k < 0 || k >= KEY_COUNT) fail(`functional: combo "${c.label}" tem tecla inválida ${k}`)
  }
  return d
}

export function validateVisual(v: unknown): VisualDoc {
  const d = v as VisualDoc
  if (!d || typeof d !== 'object') fail('visual: documento inválido')
  if (d.version !== 2) fail('visual: versão não suportada — esperado 2')
  const out: VisualDoc = { ...emptyVisual(), ...d }
  const okSlot = (s: string) => (SLOTS as readonly string[]).includes(s)
  for (const [layer, slot] of Object.entries(out.layerSlots))
    if (!okSlot(slot)) fail(`visual: slot inválido "${slot}" para layer "${layer}"`)
  for (const [pos, slots] of Object.entries(out.keySlots)) {
    const p = Number(pos)
    if (!Number.isInteger(p) || p < 0 || p >= KEY_COUNT) fail(`visual: override em posição inválida "${pos}"`)
    for (const slot of Object.keys(slots)) if (!okSlot(slot)) fail(`visual: slot inválido "${slot}" na tecla ${pos}`)
  }
  for (const pos of Object.entries(out.comboLabels)) {
    const a = pos[1].anchor
    if (a && !['auto', 'left', 'right', 'top', 'bottom'].includes(a))
      fail(`visual: anchor inválido "${a}"`)
  }
  return out
}

export function validateBundle(data: unknown): Bundle {
  const o = data as Record<string, unknown>
  if (!o || typeof o !== 'object' || !o.functional || !o.visual)
    fail('esperado o bundle completo: {"functional": …, "visual": …}')
  return {
    functional: validateFunctional(o.functional),
    visual: validateVisual(o.visual),
  }
}

export function exportBundle(b: Bundle): string {
  return JSON.stringify(b, null, 2)
}

export function importBundle(text: string): Bundle {
  let data: unknown
  try {
    data = JSON.parse(text)
  } catch {
    fail('o texto não é JSON válido')
  }
  return validateBundle(data)
}
