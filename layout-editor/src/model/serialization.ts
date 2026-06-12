/**
 * Import/export dos documentos. Dois arquivos:
 *   - functional.json — contrato p/ o agente de IA gerar o keymap ZMK
 *   - visual.json     — aparência da página/stickers
 * O import aceita qualquer um dos dois ou o bundle {functional, visual}.
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
  if (d.version !== 1) fail(`functional: versão não suportada (${(d as { version?: unknown }).version})`)
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
    if (!c.id || !c.name || !c.action) fail(`functional: combo sem id/name/action`)
    if (comboIds.has(c.id)) fail(`functional: combo duplicado "${c.id}"`)
    comboIds.add(c.id)
    if (!Array.isArray(c.keys) || c.keys.length < 2) fail(`functional: combo "${c.name}" precisa de 2+ teclas`)
    for (const k of c.keys)
      if (!Number.isInteger(k) || k < 0 || k >= KEY_COUNT) fail(`functional: combo "${c.name}" tem tecla inválida ${k}`)
  }
  return d
}

export function validateVisual(v: unknown): VisualDoc {
  const d = v as VisualDoc
  if (!d || typeof d !== 'object') fail('visual: documento inválido')
  if (d.version !== 1) fail('visual: versão não suportada')
  const out: VisualDoc = { ...emptyVisual(), ...d }
  const okSlot = (s: string) => (SLOTS as readonly string[]).includes(s)
  if (!okSlot(out.holdSlot)) fail(`visual: holdSlot inválido "${out.holdSlot}"`)
  if (!okSlot(out.shiftSlot)) fail(`visual: shiftSlot inválido "${out.shiftSlot}"`)
  for (const [layer, slot] of Object.entries(out.layerSlots))
    if (!okSlot(slot)) fail(`visual: slot inválido "${slot}" para layer "${layer}"`)
  for (const [pos, slots] of Object.entries(out.keyOverrides)) {
    const p = Number(pos)
    if (!Number.isInteger(p) || p < 0 || p >= KEY_COUNT) fail(`visual: override em posição inválida "${pos}"`)
    for (const slot of Object.keys(slots)) if (!okSlot(slot)) fail(`visual: slot inválido "${slot}" na tecla ${pos}`)
  }
  return out
}

export function exportFunctional(b: Bundle): string {
  return JSON.stringify(b.functional, null, 2)
}
export function exportVisual(b: Bundle): string {
  return JSON.stringify(b.visual, null, 2)
}
export function exportBundle(b: Bundle): string {
  return JSON.stringify(b, null, 2)
}

export interface ImportResult {
  functional?: FunctionalDoc
  visual?: VisualDoc
}

/** Detecta e valida functional.json, visual.json ou bundle. */
export function importAny(text: string): ImportResult {
  let data: unknown
  try {
    data = JSON.parse(text)
  } catch {
    fail('arquivo não é JSON válido')
  }
  const o = data as Record<string, unknown>
  if (o.functional || o.visual) {
    const r: ImportResult = {}
    if (o.functional) r.functional = validateFunctional(o.functional)
    if (o.visual) r.visual = validateVisual(o.visual)
    return r
  }
  if (o.layers && o.keys) return { functional: validateFunctional(o) }
  if (o.layerSlots || o.keyOverrides || o.holdSlot) return { visual: validateVisual(o) }
  fail('não reconheci o arquivo: esperado functional.json, visual.json ou bundle')
}
