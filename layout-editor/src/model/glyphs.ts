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
    name: 'Setas especiais',
    glyphs: [
      { ch: '↶', hint: 'desfazer' }, { ch: '↷', hint: 'refazer' },
      { ch: '⟲', hint: 'girar ←' }, { ch: '⟳', hint: 'girar →' },
      { ch: '⤺', hint: 'voltar' }, { ch: '⤻', hint: 'avançar' },
      { ch: '⇈', hint: 'duplo ↑' }, { ch: '⇊', hint: 'duplo ↓' },
      { ch: '⇇', hint: 'duplo ←' }, { ch: '⇉', hint: 'duplo →' },
      { ch: '⇆', hint: 'trocar h' }, { ch: '⇅', hint: 'trocar v' },
      { ch: '↹', hint: 'tab (alternar)' }, { ch: '⮐', hint: 'retorno' },
      { ch: '↵', hint: 'enter' }, { ch: '⎆', hint: 'inserir' },
    ],
  },
  {
    name: 'Comandos',
    glyphs: [
      { ch: '⌘', hint: 'command' }, { ch: '⎈', hint: 'control (leme)' },
      { ch: '⎇', hint: 'alternate' }, { ch: '⊞', hint: 'win' },
      { ch: '✂', hint: 'recortar' }, { ch: '⎘', hint: 'copiar' },
      { ch: '⎗', hint: 'colar' }, { ch: '⎙', hint: 'imprimir' },
      { ch: '🔍', hint: 'buscar' }, { ch: '🔎', hint: 'buscar+' },
      { ch: '✔', hint: 'ok' }, { ch: '✖', hint: 'cancelar' },
      { ch: '➕', hint: 'mais' }, { ch: '➖', hint: 'menos' },
      { ch: '⏏', hint: 'ejetar' }, { ch: '⏻', hint: 'power' },
      { ch: '⌧', hint: 'limpar' }, { ch: '⌦', hint: 'apagar →' },
    ],
  },
  {
    name: 'Status',
    glyphs: [
      { ch: '⚠', hint: 'atenção' }, { ch: '☠', hint: 'perigo' },
      { ch: '☢', hint: 'radioativo' }, { ch: '☣', hint: 'biohazard' },
      { ch: '☮', hint: 'paz' }, { ch: '☯', hint: 'yin-yang' },
      { ch: '★', hint: 'estrela' }, { ch: '☆', hint: 'estrela vazia' },
      { ch: '☀', hint: 'brilho +' }, { ch: '☾', hint: 'noite' },
      { ch: '⌛', hint: 'aguarde' }, { ch: '⏳', hint: 'tempo' },
      { ch: '⏰', hint: 'alarme' }, { ch: '⏱', hint: 'cronômetro' },
      { ch: '✉', hint: 'e-mail' }, { ch: '☎', hint: 'telefone' },
      { ch: '♻', hint: 'reciclar' }, { ch: '⚛', hint: 'átomo' },
    ],
  },
  {
    name: 'Numerados',
    glyphs: [
      { ch: '①', hint: '1' }, { ch: '②', hint: '2' }, { ch: '③', hint: '3' },
      { ch: '④', hint: '4' }, { ch: '⑤', hint: '5' }, { ch: '⑥', hint: '6' },
      { ch: '⑦', hint: '7' }, { ch: '⑧', hint: '8' }, { ch: '⑨', hint: '9' },
      { ch: '⓪', hint: '0' }, { ch: 'Ⓐ', hint: 'A' }, { ch: 'Ⓑ', hint: 'B' },
      { ch: 'Ⓒ', hint: 'C' }, { ch: '🅰', hint: 'A cheio' }, { ch: '🅱', hint: 'B cheio' },
    ],
  },
  {
    name: 'Diversos',
    glyphs: [
      { ch: '🖱️', hint: 'mouse' }, { ch: '⚙', hint: 'config' },
      { ch: '🔒', hint: 'trava' }, { ch: '🔓', hint: 'destrava' },
      { ch: '⚡', hint: 'boot/flash' }, { ch: '🔄', hint: 'reset' },
      { ch: '📶', hint: 'bluetooth/rf' }, { ch: '🖥', hint: 'USB/host' },
      { ch: '⌂', hint: 'home' }, { ch: '⌗', hint: 'grade' },
      { ch: '⎚', hint: 'tela limpa' }, { ch: '☰', hint: 'menu' },
      { ch: '👍', hint: 'ok!' }, { ch: '⚓', hint: 'âncora' },
      { ch: '☂', hint: 'guarda-chuva' }, { ch: '⚑', hint: 'bandeira' },
    ],
  },
]
