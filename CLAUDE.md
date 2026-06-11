Este é um projeto de build de firmware configurado para o teclado corne.

A unica pasta que deve ser alterada é a pasta config, onde deve ser alterado o arquivo corne.keymap para a configuração do layout do teclado.

O arquivo a ser configurado é principalmente o corne.keymap (layout do teclado). O config/corne.conf também pode ser alterado quando tecnicamente necessário (ex.: limites de combos, features do firmware como ZMK Studio).

O build é feito exclusivamente pelo pipeline do GitHub Actions (push dispara o build) — não usar west/build local.

A referência de configuração está em https://zmk.dev/docs