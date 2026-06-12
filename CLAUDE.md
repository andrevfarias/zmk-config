Este é um projeto de build de firmware configurado para o teclado corne.

A unica pasta que deve ser alterada é a pasta config, onde deve ser alterado o arquivo corne.keymap para a configuração do layout do teclado.

O arquivo a ser configurado é principalmente o corne.keymap (layout do teclado). O config/corne.conf também pode ser alterado quando tecnicamente necessário (ex.: limites de combos, features do firmware como ZMK Studio).

O build é feito exclusivamente pelo pipeline do GitHub Actions (push dispara o build) — não usar west/build local.

A referência de configuração está em https://zmk.dev/docs

Sempre que o layout mudar, atualize os layout contidos em docs/

Layouts do keyboard-layout-editor.com devem ser dois arquivos, um para QWERTY e outro para COLEMAK-DH. estes layouts é o que será impresso para os stickers do teclado.

Sempre gere o permalink do layout para o keyboard-layout-editor.com para que possa ser facilmente acessado e impresso.

Se os outros visualizadores também possuem algo como permalink, gere também.

Os demais layouts serão impressos como um guia de referência para o usuário. Dessa forma, crie dois layouts, um completo e outro simplificado, focando mais nos combos.

Pode criar um terceiro layout simplificado, renderizando um conjunto de teclas para cada combo existente(exceto os que já existem em NORM_SYM e PROG_SYM) colorindo as teclas que devem ser pressionadas para ativar o combo. colocando um texto embaixo indicando a ação do combo.

Coloque os links de acesso aos layouts gerados em LAYOUT.md.

Skills do projeto (.claude/skills/): `zmk-keymap` (editar corne.keymap/corne.conf), `kle-stickers` (stickers do KLE) e `keymap-diagram` (diagramas keymap-drawer). Use-as sempre que mexer no firmware ou nos layouts de docs/.