/** Quebra de linha manual: usa-se "\n" (escape) ou newline literal. */
export function splitLines(text: string): string[] {
  return text.split(/\\n|\n/)
}

/** Formata um KeyboardEvent como atalho legível ("Ctrl+Shift+F9"). */
export function formatShortcut(ev: KeyboardEvent): string {
  const parts: string[] = []
  if (ev.ctrlKey) parts.push('Ctrl')
  if (ev.altKey) parts.push('Alt')
  if (ev.shiftKey) parts.push('Shift')
  if (ev.metaKey) parts.push('Win')
  const k = ev.key
  const MAP: Record<string, string> = {
    ' ': 'Space', ArrowLeft: '←', ArrowRight: '→', ArrowUp: '↑', ArrowDown: '↓',
    Escape: 'Esc', Backspace: '⌫', Delete: '⌦', Enter: '⏎', Tab: '⇥',
    PageUp: 'PgUp', PageDown: 'PgDn',
  }
  if (!['Control', 'Alt', 'Shift', 'Meta'].includes(k))
    parts.push(MAP[k] ?? (k.length === 1 ? k.toUpperCase() : k))
  return parts.join('+')
}
