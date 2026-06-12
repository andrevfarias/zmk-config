/**
 * Permalink: estado completo (bundle) comprimido no hash da URL —
 * mesma abordagem do keymap-drawer (gzip + base64url), via fflate.
 */
import { gunzipSync, gzipSync, strFromU8, strToU8 } from 'fflate'
import type { Bundle } from './types'
import { validateBundle } from './serialization'

function toBase64Url(bytes: Uint8Array): string {
  let bin = ''
  for (const b of bytes) bin += String.fromCharCode(b)
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function fromBase64Url(s: string): Uint8Array {
  const b64 = s.replace(/-/g, '+').replace(/_/g, '/')
  const bin = atob(b64)
  const out = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i)
  return out
}

export function encodePermalink(b: Bundle): string {
  const gz = gzipSync(strToU8(JSON.stringify(b)), { mtime: 0 })
  return '#d=' + toBase64Url(gz)
}

/** Lê o bundle do hash; retorna null se não houver/der erro de formato. */
export function decodePermalink(hash: string): Bundle | null {
  const m = /#d=([A-Za-z0-9_-]+)/.exec(hash)
  if (!m) return null
  const json = strFromU8(gunzipSync(fromBase64Url(m[1])))
  return validateBundle(JSON.parse(json))
}
