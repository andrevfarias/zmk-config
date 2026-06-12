/**
 * Exporta um <svg> renderizado para JPG. Como o canvas não aplica CSS
 * externo, os estilos computados são "inlinados" no clone antes do desenho.
 */
const STYLE_PROPS = [
  'fill', 'stroke', 'stroke-width', 'opacity', 'font-size', 'font-family',
  'font-weight', 'text-anchor', 'dominant-baseline',
] as const

function inlineStyles(src: SVGElement, dst: SVGElement) {
  const cs = getComputedStyle(src)
  for (const p of STYLE_PROPS) {
    const v = cs.getPropertyValue(p)
    if (v) dst.setAttribute(p, v)
  }
  const sk = Array.from(src.children) as SVGElement[]
  const dk = Array.from(dst.children) as SVGElement[]
  for (let i = 0; i < sk.length; i++) if (dk[i]) inlineStyles(sk[i], dk[i])
}

/**
 * @param svg   elemento na página (com CSS aplicado)
 * @param scale multiplicador de resolução (1 = tamanho do viewBox)
 */
export async function svgToJpeg(svg: SVGSVGElement, scale: number): Promise<Blob> {
  const clone = svg.cloneNode(true) as SVGSVGElement
  inlineStyles(svg, clone)

  const vb = svg.viewBox.baseVal
  const w = Math.round(vb.width * scale)
  const h = Math.round(vb.height * scale)
  clone.setAttribute('width', String(w))
  clone.setAttribute('height', String(h))
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')

  const url = URL.createObjectURL(
    new Blob([new XMLSerializer().serializeToString(clone)], { type: 'image/svg+xml' }))
  try {
    const img = new Image()
    await new Promise<void>((ok, err) => {
      img.onload = () => ok()
      img.onerror = () => err(new Error('falha ao rasterizar o SVG'))
      img.src = url
    })
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = '#ffffff' // JPG não tem alfa
    ctx.fillRect(0, 0, w, h)
    ctx.drawImage(img, 0, 0, w, h)
    return await new Promise<Blob>((ok, err) =>
      canvas.toBlob((b) => (b ? ok(b) : err(new Error('toBlob falhou'))), 'image/jpeg', 0.92))
  } finally {
    URL.revokeObjectURL(url)
  }
}

export function downloadBlob(blob: Blob, name: string) {
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = name
  a.click()
  URL.revokeObjectURL(a.href)
}
