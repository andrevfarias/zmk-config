/**
 * Mapa de glifos/ícones (como a fonte do KLE, mas em Unicode): clicar insere
 * no último campo focado; arrastar solta em slots/etiquetas.
 */
export interface GlyphGroup {
  name: string
  glyphs: { ch: string; hint: string }[]
}

export const GLYPHS: GlyphGroup[] = [
  {
    name: 'Edição',
    glyphs: [
      { ch: '⌫', hint: 'Backspace' }, { ch: '⌦', hint: 'Delete' },
      { ch: '⇥', hint: 'Tab' }, { ch: '⇤', hint: 'Shift+Tab' },
      { ch: '⏎', hint: 'Enter' }, { ch: '␣', hint: 'Espaço' },
      { ch: '⎋', hint: 'Esc' }, { ch: '⇪', hint: 'Caps Lock' },
    ],
  },
  {
    name: 'Modificadores',
    glyphs: [
      { ch: '⇧', hint: 'Shift' }, { ch: '⌃', hint: 'Ctrl' },
      { ch: '⌥', hint: 'Alt' }, { ch: '❖', hint: 'Win/GUI' },
      { ch: '⎇', hint: 'AltGr' }, { ch: 'ⓕ', hint: 'Função' },
    ],
  },
  {
    name: 'Setas',
    glyphs: [
      { ch: '←', hint: 'esquerda' }, { ch: '↓', hint: 'baixo' },
      { ch: '↑', hint: 'cima' }, { ch: '→', hint: 'direita' },
      { ch: '⇠', hint: 'palavra ←' }, { ch: '⇢', hint: 'palavra →' },
      { ch: '⇞', hint: 'PgUp' }, { ch: '⇟', hint: 'PgDn' },
      { ch: '↖', hint: 'início (Home/arquivo)' }, { ch: '↘', hint: 'fim (End/arquivo)' },
      { ch: '⇱', hint: 'Home' }, { ch: '⇲', hint: 'End' },
      { ch: '⇄', hint: 'alternar' }, { ch: '⇋', hint: 'espelhar/trocar' },
    ],
  },
  {
    name: 'Mídia',
    glyphs: [
      { ch: '⏯', hint: 'play/pause' }, { ch: '⏮', hint: 'anterior' },
      { ch: '⏭', hint: 'próxima' }, { ch: '🔇', hint: 'mudo' },
      { ch: '🔉', hint: 'volume -' }, { ch: '🔊', hint: 'volume +' },
    ],
  },
  {
    name: 'Símbolos',
    glyphs: [
      { ch: '´', hint: 'acento agudo (morta)' }, { ch: '`', hint: 'crase (morta)' },
      { ch: '~', hint: 'til (morta)' }, { ch: '^', hint: 'circunflexo (morta)' },
      { ch: '¨', hint: 'trema (morta)' }, { ch: 'ç', hint: 'cedilha' },
      { ch: '§', hint: 'parágrafo' }, { ch: 'ª', hint: 'ordinal fem.' },
      { ch: 'º', hint: 'ordinal masc.' }, { ch: '°', hint: 'grau' },
      { ch: '¹', hint: '¹' }, { ch: '²', hint: '²' }, { ch: '³', hint: '³' },
      { ch: '£', hint: 'libra' }, { ch: '¢', hint: 'centavo' }, { ch: '¬', hint: 'negação' },
    ],
  },
  {
    name: 'Diversos',
    glyphs: [
      { ch: '🖱️', hint: 'mouse' }, { ch: '⚙', hint: 'config' },
      { ch: '🔒', hint: 'trava' }, { ch: '🔓', hint: 'destrava' },
      { ch: '⚡', hint: 'boot/flash' }, { ch: '🔄', hint: 'reset' },
      { ch: '📶', hint: 'bluetooth/rf' }, { ch: '🖥', hint: 'USB/host' },
    ],
  },
]
