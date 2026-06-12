# Corne 42 — Layout Delphi + uso geral (ABNT2)

> Branch `layout-redesign` · SO alvo: **Windows em Português (Brasil) ABNT2**
> Fonte: [`config/corne.keymap`](../config/corne.keymap)

## Ferramentas de visualização

### keyboard-layout-editor.com (stickers)

Dois arquivos, um por layout base — são a arte para impressão dos stickers:

| Arquivo | Conteúdo |
|---------|----------|
| [`kle_qwerty.json`](kle_qwerty.json) | base QWERTY + as 6 layers nas legendas |
| [`kle_colemak.json`](kle_colemak.json) | base COLEMAK-DH + as 6 layers nas legendas |

**Permalinks:** <!-- KLE_LINKS -->[abrir QWERTY no KLE](https://www.keyboard-layout-editor.com/##@@_c=%23ffffff&fa@:2&:2&:2&:2&:0&:0&:2&:2&:2&:4&:2&:1%3B%3B&=*%0A%3Ci%20class%2F='kb%20kb-Multimedia-Play-Pause'%3E%3C%2F%2Fi%3E%0A%0A%0A%0A%0A%C2%BA%0A%0A%22%0A'%0A%0AStu&=%2F%2F%0A%0A%3Ci%20class%2F='kb%20kb-Arrows-Right'%3E%3C%2F%2Fi%3E%0A%3C%0A%0A%0A%C2%AA%0A%0A%0AQ&=9%0AF9%0A%3Ci%20class%2F='kb%20kb-Arrows-Top-4'%3E%3C%2F%2Fi%3E%0A%7B%0A%0A%0A%2F_%0A%0A%0AW%0A%0A%E2%86%92Q&=8%0AF8%0A%3Ci%20class%2F='kb%20kb-Arrows-Bottom-4'%3E%3C%2F%2Fi%3E%0A%5B%0A%0A%0A*%0A%0A%0AE%0A%0A%E2%86%92C&=7%0AF7%0A%3Ci%20class%2F='kb%20kb-Arrows-Left'%3E%3C%2F%2Fi%3E%0A(%0A%0A%0A%2F&%0A%0A%0AR&=%0AF12%0A%3Ci%20class%2F='kb%20kb-Arrows-Top-3'%3E%3C%2F%2Fi%3E%0A%2F%2F%0A%0A%0A%C2%A7%0A%0A%0AT&_x:1%3B&=%0AF12%0A%3Ci%20class%2F='kb%20kb-Arrows-Top-3'%3E%3C%2F%2Fi%3E%0A%2F%2F%0A%0A%0A%C2%A7%0A%0A%0AY&=7%0AF7%0A%3Ci%20class%2F='kb%20kb-Arrows-Left'%3E%3C%2F%2Fi%3E%0A(%0A%0A%0A%2F&%0A%0A%0AU%0A%0AUSB&=8%0AF8%0A%3Ci%20class%2F='kb%20kb-Arrows-Bottom-4'%3E%3C%2F%2Fi%3E%0A%5B%0A%0A%0A*%0A%0A%0AI%0A%0ABLE&=9%0AF9%0A%3Ci%20class%2F='kb%20kb-Arrows-Top-4'%3E%3C%2F%2Fi%3E%0A%7B%0A%0A%0A%2F_%0A%0A%0AO&=%2F%2F%0A%0A%3Ci%20class%2F='kb%20kb-Arrows-Right'%3E%3C%2F%2Fi%3E%0A%3C%0A%0A%0A%C2%AA%0A%0A%0AP&=*%0A%3Ci%20class%2F='kb%20kb-Multimedia-Play-Pause'%3E%3C%2F%2Fi%3E%0A%0A%0A%0A%0A%C2%BA%0A%0A%60%0A%C2%B4%0A%0ABOOT%3B&@=-%0A%3Ci%20class%2F='kb%20kb-Multimedia-Rewind-Start'%3E%3C%2F%2Fi%3E%0A%E2%87%A7%0A%0A%0A%0A%C2%AC%0A%0A%0A%E2%87%AA%0A%E2%87%A7&=.%0AMute%0A%3Ci%20class%2F='kb%20kb-Multimedia-Play'%3E%3C%2F%2Fi%3E%0A%3E%0A%0A%0A%C2%A3%0A%0A%0AA%0A%E2%8C%83&=6%0AF6%0A%3Ci%20class%2F='kb%20kb-Multimedia-Up'%3E%3C%2F%2Fi%3E%0A%7D%0A%0A%0A%C2%A8%0A%0A%0AS%0A%E2%87%A7&=5%0AF5%0A%3Ci%20class%2F='kb%20kb-Multimedia-Down'%3E%3C%2F%2Fi%3E%0A%5D%0A%0A%0A%25%0A%0A%0AD%0A%E2%8C%A5&=4%0AF4%0A%3Ci%20class%2F='kb%20kb-Multimedia-Back'%3E%3C%2F%2Fi%3E%0A)%0A%0A%0A$%0A%0A%0AF%0A%E2%9D%96&=%2F=%0AF11%0AI%E2%87%84M%0A%5C%0A%0A%0A%C2%B0%0A%0A%0AG&_x:1%3B&=%2F=%0AF11%0AI%E2%87%84M%0A%5C%0A%0A%0A%C2%B0%0A%0A%0AH&=4%0AF4%0A%3Ci%20class%2F='kb%20kb-Multimedia-Back'%3E%3C%2F%2Fi%3E%0A)%0A%0A%0A$%0A%0A%0AJ%0A%E2%9D%96&=5%0AF5%0A%3Ci%20class%2F='kb%20kb-Multimedia-Down'%3E%3C%2F%2Fi%3E%0A%5D%0A%0A%0A%25%0A%0A%0AK%0A%E2%8C%A5&=6%0AF6%0A%3Ci%20class%2F='kb%20kb-Multimedia-Up'%3E%3C%2F%2Fi%3E%0A%7D%0A%0A%0A%C2%A8%0A%0A%0AL%0A%E2%87%A7&=.%0AMute%0A%3Ci%20class%2F='kb%20kb-Multimedia-Play'%3E%3C%2F%2Fi%3E%0A%3E%0A%0A%0A%C2%A3%0A%0A%0A%C3%A7%0A%E2%8C%83&=-%0A%3Ci%20class%2F='kb%20kb-Multimedia-Rewind-Start'%3E%3C%2F%2Fi%3E%0A%E2%87%A7%0A%0A%0A%0A%C2%AC%0A%0A%5E%0A~%0A%0ARST%3B&@=+%0A%3Ci%20class%2F='kb%20kb-Multimedia-FastForward-End'%3E%3C%2F%2Fi%3E%0A%3Ci%20class%2F='kb%20kb-Arrows-Bottom-3'%3E%3C%2F%2Fi%3E%0A%2F:%2F=%0A%0A%0A%C2%B3%0A%0A%7C%0A%5C%0A%0ABT0&=,%0A%0A%3Ci%20class%2F='kb%20kb-Line-End'%3E%3C%2F%2Fi%3E%0A%2F:%0A%0A%0A%C2%B2%0A%0A%0AZ%0A%0ABT1&=3%0AF3%0A%3Ci%20class%2F='kb%20kb-Arrows-Up'%3E%3C%2F%2Fi%3E%0A%2F=%0A%0A%0A%23%0A%0A%0AX%0A%0ABT2&=2%0AF2%0A%3Ci%20class%2F='kb%20kb-Arrows-Down'%3E%3C%2F%2Fi%3E%0A'%0A%0A%0A%2F@%0A%0A%0AC%0A%0ABT3&=1%0AF1%0A%3Ci%20class%2F='kb%20kb-Line-Start'%3E%3C%2F%2Fi%3E%0A%22%0A%0A%0A!%0A%0A%0AV%0A%0ABT4&=0%0AF10%0A%E2%86%92imp%0A%7C%0A%0A%0A%C2%B9%0A%0A%0AB&_x:1%3B&=0%0AF10%0A%E2%86%92imp%0A%7C%0A%0A%0A%C2%B9%0A%0A%0AN&=1%0AF1%0A%3Ci%20class%2F='kb%20kb-Line-Start'%3E%3C%2F%2Fi%3E%0A%22%0A%0A%0A!%0A%0A%0AM&=2%0AF2%0A%3Ci%20class%2F='kb%20kb-Arrows-Down'%3E%3C%2F%2Fi%3E%0A'%0A%0A%0A%2F@%0A%0A%3C%0A,&=3%0AF3%0A%3Ci%20class%2F='kb%20kb-Arrows-Up'%3E%3C%2F%2Fi%3E%0A%2F=%0A%0A%0A%23%0A%0A%3E%0A.&=,%0A%0A%3Ci%20class%2F='kb%20kb-Line-End'%3E%3C%2F%2Fi%3E%0A%2F:%0A%0A%0A%C2%B2%0A%0A%2F:%0A%2F%3B&=+%0A%3Ci%20class%2F='kb%20kb-Multimedia-FastForward-End'%3E%3C%2F%2Fi%3E%0A%3Ci%20class%2F='kb%20kb-Arrows-Bottom-3'%3E%3C%2F%2Fi%3E%0A%2F:%2F=%0A%0A%0A%C2%B3%0A%0A%3F%0A%2F%2F%0A%0ABTCLR%3B&@_x:3%3B&=%0ANorm%0A%0A%0A%0A%0A%0A%0A%0ANum%0A%0Atap%20%2F=%20trava&_a:7%3B&=%E2%8E%B5&_a:4%3B&=%0A%0A%0AProg%0A%0A%0A%0A%0A%0ANav%0A%0Atap%20%2F=%20trava&_x:1%3B&=%0A%0A%0AProg%0A%0A%0A%0A%0A%0ANav%0A%0Atap%20%2F=%20trava&_a:7%3B&=%E2%8F%8E&_a:4%3B&=%0ANorm%0A%0A%0A%0A%0A%0A%0A%0ANum%0A%0Atap%20%2F=%20trava) · [abrir COLEMAK-DH no KLE](https://www.keyboard-layout-editor.com/##@@_c=%23ffffff&fa@:2&:2&:2&:2&:0&:0&:2&:2&:2&:4&:2&:1%3B%3B&=*%0A%3Ci%20class%2F='kb%20kb-Multimedia-Play-Pause'%3E%3C%2F%2Fi%3E%0A%0A%0A%0A%0A%C2%BA%0A%0A%22%0A'%0A%0AStu&=%2F%2F%0A%0A%3Ci%20class%2F='kb%20kb-Arrows-Right'%3E%3C%2F%2Fi%3E%0A%3C%0A%0A%0A%C2%AA%0A%0A%0AQ&=9%0AF9%0A%3Ci%20class%2F='kb%20kb-Arrows-Top-4'%3E%3C%2F%2Fi%3E%0A%7B%0A%0A%0A%2F_%0A%0A%0AW%0A%0A%E2%86%92Q&=8%0AF8%0A%3Ci%20class%2F='kb%20kb-Arrows-Bottom-4'%3E%3C%2F%2Fi%3E%0A%5B%0A%0A%0A*%0A%0A%0AF%0A%0A%E2%86%92C&=7%0AF7%0A%3Ci%20class%2F='kb%20kb-Arrows-Left'%3E%3C%2F%2Fi%3E%0A(%0A%0A%0A%2F&%0A%0A%0AP&=%0AF12%0A%3Ci%20class%2F='kb%20kb-Arrows-Top-3'%3E%3C%2F%2Fi%3E%0A%2F%2F%0A%0A%0A%C2%A7%0A%0A%0AB&_x:1%3B&=%0AF12%0A%3Ci%20class%2F='kb%20kb-Arrows-Top-3'%3E%3C%2F%2Fi%3E%0A%2F%2F%0A%0A%0A%C2%A7%0A%0A%0AJ&=7%0AF7%0A%3Ci%20class%2F='kb%20kb-Arrows-Left'%3E%3C%2F%2Fi%3E%0A(%0A%0A%0A%2F&%0A%0A%0AL%0A%0AUSB&=8%0AF8%0A%3Ci%20class%2F='kb%20kb-Arrows-Bottom-4'%3E%3C%2F%2Fi%3E%0A%5B%0A%0A%0A*%0A%0A%0AU%0A%0ABLE&=9%0AF9%0A%3Ci%20class%2F='kb%20kb-Arrows-Top-4'%3E%3C%2F%2Fi%3E%0A%7B%0A%0A%0A%2F_%0A%0A%0AY&=%2F%2F%0A%0A%3Ci%20class%2F='kb%20kb-Arrows-Right'%3E%3C%2F%2Fi%3E%0A%3C%0A%0A%0A%C2%AA%0A%0A%0A%C3%A7&=*%0A%3Ci%20class%2F='kb%20kb-Multimedia-Play-Pause'%3E%3C%2F%2Fi%3E%0A%0A%0A%0A%0A%C2%BA%0A%0A%60%0A%C2%B4%0A%0ABOOT%3B&@=-%0A%3Ci%20class%2F='kb%20kb-Multimedia-Rewind-Start'%3E%3C%2F%2Fi%3E%0A%E2%87%A7%0A%0A%0A%0A%C2%AC%0A%0A%0A%E2%87%AA%0A%E2%87%A7&=.%0AMute%0A%3Ci%20class%2F='kb%20kb-Multimedia-Play'%3E%3C%2F%2Fi%3E%0A%3E%0A%0A%0A%C2%A3%0A%0A%0AA%0A%E2%8C%83&=6%0AF6%0A%3Ci%20class%2F='kb%20kb-Multimedia-Up'%3E%3C%2F%2Fi%3E%0A%7D%0A%0A%0A%C2%A8%0A%0A%0AR%0A%E2%87%A7&=5%0AF5%0A%3Ci%20class%2F='kb%20kb-Multimedia-Down'%3E%3C%2F%2Fi%3E%0A%5D%0A%0A%0A%25%0A%0A%0AS%0A%E2%8C%A5&=4%0AF4%0A%3Ci%20class%2F='kb%20kb-Multimedia-Back'%3E%3C%2F%2Fi%3E%0A)%0A%0A%0A$%0A%0A%0AT%0A%E2%9D%96&=%2F=%0AF11%0AI%E2%87%84M%0A%5C%0A%0A%0A%C2%B0%0A%0A%0AG&_x:1%3B&=%2F=%0AF11%0AI%E2%87%84M%0A%5C%0A%0A%0A%C2%B0%0A%0A%0AM&=4%0AF4%0A%3Ci%20class%2F='kb%20kb-Multimedia-Back'%3E%3C%2F%2Fi%3E%0A)%0A%0A%0A$%0A%0A%0AN%0A%E2%9D%96&=5%0AF5%0A%3Ci%20class%2F='kb%20kb-Multimedia-Down'%3E%3C%2F%2Fi%3E%0A%5D%0A%0A%0A%25%0A%0A%0AE%0A%E2%8C%A5&=6%0AF6%0A%3Ci%20class%2F='kb%20kb-Multimedia-Up'%3E%3C%2F%2Fi%3E%0A%7D%0A%0A%0A%C2%A8%0A%0A%0AI%0A%E2%87%A7&=.%0AMute%0A%3Ci%20class%2F='kb%20kb-Multimedia-Play'%3E%3C%2F%2Fi%3E%0A%3E%0A%0A%0A%C2%A3%0A%0A%0AO%0A%E2%8C%83&=-%0A%3Ci%20class%2F='kb%20kb-Multimedia-Rewind-Start'%3E%3C%2F%2Fi%3E%0A%E2%87%A7%0A%0A%0A%0A%C2%AC%0A%0A%5E%0A~%0A%0ARST%3B&@=+%0A%3Ci%20class%2F='kb%20kb-Multimedia-FastForward-End'%3E%3C%2F%2Fi%3E%0A%3Ci%20class%2F='kb%20kb-Arrows-Bottom-3'%3E%3C%2F%2Fi%3E%0A%2F:%2F=%0A%0A%0A%C2%B3%0A%0A%7C%0A%5C%0A%0ABT0&=,%0A%0A%3Ci%20class%2F='kb%20kb-Line-End'%3E%3C%2F%2Fi%3E%0A%2F:%0A%0A%0A%C2%B2%0A%0A%0AZ%0A%0ABT1&=3%0AF3%0A%3Ci%20class%2F='kb%20kb-Arrows-Up'%3E%3C%2F%2Fi%3E%0A%2F=%0A%0A%0A%23%0A%0A%0AX%0A%0ABT2&=2%0AF2%0A%3Ci%20class%2F='kb%20kb-Arrows-Down'%3E%3C%2F%2Fi%3E%0A'%0A%0A%0A%2F@%0A%0A%0AC%0A%0ABT3&=1%0AF1%0A%3Ci%20class%2F='kb%20kb-Line-Start'%3E%3C%2F%2Fi%3E%0A%22%0A%0A%0A!%0A%0A%0AD%0A%0ABT4&=0%0AF10%0A%E2%86%92imp%0A%7C%0A%0A%0A%C2%B9%0A%0A%0AV&_x:1%3B&=0%0AF10%0A%E2%86%92imp%0A%7C%0A%0A%0A%C2%B9%0A%0A%0AK&=1%0AF1%0A%3Ci%20class%2F='kb%20kb-Line-Start'%3E%3C%2F%2Fi%3E%0A%22%0A%0A%0A!%0A%0A%0AH&=2%0AF2%0A%3Ci%20class%2F='kb%20kb-Arrows-Down'%3E%3C%2F%2Fi%3E%0A'%0A%0A%0A%2F@%0A%0A%3C%0A,&=3%0AF3%0A%3Ci%20class%2F='kb%20kb-Arrows-Up'%3E%3C%2F%2Fi%3E%0A%2F=%0A%0A%0A%23%0A%0A%3E%0A.&=,%0A%0A%3Ci%20class%2F='kb%20kb-Line-End'%3E%3C%2F%2Fi%3E%0A%2F:%0A%0A%0A%C2%B2%0A%0A%2F:%0A%2F%3B&=+%0A%3Ci%20class%2F='kb%20kb-Multimedia-FastForward-End'%3E%3C%2F%2Fi%3E%0A%3Ci%20class%2F='kb%20kb-Arrows-Bottom-3'%3E%3C%2F%2Fi%3E%0A%2F:%2F=%0A%0A%0A%C2%B3%0A%0A%3F%0A%2F%2F%0A%0ABTCLR%3B&@_x:3%3B&=%0ANorm%0A%0A%0A%0A%0A%0A%0A%0ANum%0A%0Atap%20%2F=%20trava&_a:7%3B&=%E2%8E%B5&_a:4%3B&=%0A%0A%0AProg%0A%0A%0A%0A%0A%0ANav%0A%0Atap%20%2F=%20trava&_x:1%3B&=%0A%0A%0AProg%0A%0A%0A%0A%0A%0ANav%0A%0Atap%20%2F=%20trava&_a:7%3B&=%E2%8F%8E&_a:4%3B&=%0ANorm%0A%0A%0A%0A%0A%0A%0A%0ANum%0A%0Atap%20%2F=%20trava)<!-- /KLE_LINKS -->
**Importar manualmente:** <https://www.keyboard-layout-editor.com/> → ☰ → *Import* → *JSON* (arquivo inteiro).
**Convenção por tecla:** centro = base · centro-baixo = hold (HRM/polegar) · topo-centro = shift ·
frente da tecla = CONFIG (nos polegares, a dica "tap = trava") ·
cantos/laterais: **TL**=NUM **BL**=FN **TR**=NAV **BR**=PROG_SYM **CL**=NORM_SYM (**CR** livre).
**Glifos de mods:** ⌃ Ctrl · ⇧ Shift · ⌥ Alt · ❖ Win.
**Regenerar** após mudar o keymap: `python .claude/skills/kle-stickers/scripts/gen_kle.py`
(edite as tabelas no topo do script — ver skill `kle-stickers`).

### keymap-drawer (diagrama de referência)

| Arquivo | Conteúdo |
|---------|----------|
| [`keymap.svg`](keymap.svg) | diagrama completo: 8 layers + combos (sem thumb-chords) |
| [`keymap_combos.svg`](keymap_combos.svg) | guia de combos: um mini-teclado por combo (teclas coloridas + ação) |
| [`keymap.yaml`](keymap.yaml) / [`keymap_combos.yaml`](keymap_combos.yaml) | fontes dos diagramas (edite e redesenhe) |
| [`keymap_drawer_config.yaml`](keymap_drawer_config.yaml) | legendas ABNT2/Delphi |

**Permalink:** <!-- DRAWER_LINK -->[abrir completo no keymap-drawer](https://caksoylar.github.io/keymap-drawer?keymap_yaml=H4sIAAAAAAAC_-VaS3MbRRC-pyr_YQgBJZA43l1ZL5KALK8Ux3pFjzx4ibW1NipLWrFaO2UIXKiyLykICcWNE4QQHlUUcIGj_U_0S7LS9MzszM5Ia1s3-9K9Pf1198x-M9u7ctfac3a8zPlzCH3e225t23vrjuW2M2jDcfv2-XNda892h5PxO_fMWuPBRL2KYv4f1u5gcQ8LE4saFg0sHmDRxGIViwoWVSy8DDr8d6wiNMyg2Ccxas5lq3U88GkGFeu38g06lGX2XKNWpHaV_wqzZ4vMnGfmQhOqK2Bxizrdpk416uSb15g5GLLIzFwFRy_YAFdy7KsYnf3H1PohW5FHsCLvY3EfixwWd7FYxqKMRQnu1BVALtCw77CwGbbQ15j1XWYtN0u0ZM8a3PBca9fCo6MnPzG37F2V2_TR0bffzM6VqxTNUnYtw5YL6IeQtzewfW_X6g9lfMxzLIMFuo1FkaMlkBTfIQUhJemUDJX7qihbU1C2LqdsQ03ZEltOOWVNOWVXFZStRGWsfMIhCkvcpJxe4ai9Ju5HoLU86YJ6KMR9uVtoM8jdlIyVu8OOUcRSbZK5uMM-O-00_Kz0CQAb-PHXo_2naGB1rV0XNnW1gJpVqq6UA55PeM9O_-jPjY6DLPezBZVFhguEDSST1ULqDOyr2mrhFqgEuVK5B-GKJnHr9L3N0f73nd6gqzAwX4YnEQNJAhtqs9MLzMwsA8t7Ry89p-2g0f53ouEZML9Sgmdrx0WDa2hcxILCwHxDYUKJaAl8ZWeS280S4fZbQJprcJ2G61iKKMkYT69YaIC6poVgJHjsKv9kjiXIwBJR4kS5EVLiIeeEEI6Ef1toBGIGUXSiaERZDClayJnCr_AJziJn8mWgTLXK8yCfBpkCmQSp6aKSFDzTfCQSuVoz79IKS82GKWsl8gmQSyDjJJsmKOPGNy7vEDA43CLg4JIegasm0Cawksvm_YawQAZIuh5ELoYUwdPgI7HYZ5GBuUo5v1oAFta9nXbHER7Q-0_xqxu9hHZacYCBbNahW14umnKP5UqlMT3GaWXNrJvs1i6zrpceT4JZk5t1udmQm-MnrHa5gXLFGm-bSjExwFRSYKdqrVJo1R-UhCbsOlx-QSJ-AMqlGa93EuslIQQNel0x_ZtE-ZIoH4FyedqbrNx6WQjBgt4U8mZuwHUm9GykHydiF4jyKKRcCHvTABkhx5lshyq1UoBqh_-D_A3LltjNvAnK4Qte0gHq2uIj0ch_gITPCoe_Au4NwF0E-1-8vCi4ERyNQ-L-A_JvALxOCnuPKK-REP_xkg4wVwIm0Uj0s0eVDae37oy_EV5FAyCLBm2HNukYtv3zNVufPEW64EAfQQEM9D26Fh0DHUEcEFDxFAD0WunIAB0aKj1FIHiFp0AM6FcMIzoEiyUCqO_1ZiCgrFR0hAYtoZYETDUCBnpSfTE6Roc11ski58uzZg-NnqFHRQBAI1TJ5QtSBEJWt7PV96nqDMZXzubm0PapvbiwxE3TCNLWjzc6eB6MR_qnwCThHut6VATdEuQmjx7_MiPHorAhZiLoLU5QxO8zEGnhBs9GJAQajQ5-noFIBXNFQYhMNYcb0wGJYKYoAPF8goNQDUiKc5gFiPNbevTjDwJFMMlV_NQl00vOI5bBH5njT2YHL4RwcCxGipfkD6JTx9MDZZJ4Jw6W4o_70wXTFQv4_Bg3Q1tYVC1esMxThNRTwvG7Yq_vbFkuN-vxA0ly_mrRISlFtpzTG3S6PJa8tATmsO54ntPjp8HTNK2obV4J6GOKMLfu2QPk7NpTp60JT6pIoJQiY9Y7eolc2_N_anVOMJ20dL3ECueZhDZDyeD0_c_izrTp60I7FAmUUmTM7vrFCtSEF5UT0Ussbk7x9aVg_X7c1f5wYPu_a_Snbys4XIz48WApRdZsu412hvbwBNORs0usb14J9HhwBn7gmt13evb0WQPGOA4moeBVabyJUbcPP4ywTnL8de04dz6uKZg1twxGQnGesAzPjp0hLZ2DeJicMkPbtR62Npz-ZmdrgvT_3aT1MIMScXLhv2kmJgf-5J1yPGYELv1RfN_6fpDuTq_vfziaVDi0B5ZreXYL-7U71pZr9fzRTas7tMcebcvdbvWctv_Wau2MT55Xws90NvkiAAA%3D) · [abrir guia de combos](https://caksoylar.github.io/keymap-drawer?keymap_yaml=H4sIAAAAAAAC_-VZW3PbRBR-z0z-w1IKaqG5SHJ8oyk4juyk8a2-JA03o9hK8MS2jCynEyi8MJO8dKC0DG88QQnlMsMAL_CY_BP_EmTv2V3tatdhKG_Jyzk659tvz66-lY6Vrn3sjvz0_BxCH_cOm4fO8Z5re-00arle35mf69rHjjec5u_tWNX67tRdQFrwh7172OxgY2FTxaaOzS42DWw2sSljU8HGT6PzPycuQsM00j7QaDibqdRw4sM0KtQ2cnWayrB4tl4t0LgKv87imQIL51g434Dq8thsUNBdCqpSUBDeYuEwZYGFuQouzliCK1n7TKOrf59G32U78hB25G1s7mOTxWYbmzVsStgU4U7dgpGLlPYNRptmG73Eom-yaKlRpCX79mDV9-wjG2fHj79jsMy2CjY7O_7yi8vnypYLVjGzlWbbBfJDyD8eOAHas_tDmR5znMpgg-5iU-BkCSLFd0ghSMl0SoXKsSrJVhWSrcklW1dLtsi2Uy5ZSy7ZTYVky_9WsfIFRyQsgUk1vc5Je0s8jyBr-aSL6lRE-3JY5DDIYUrFyuFwYhRcqkPyv8DhnL3oMoJZ6RsADvCjz8cnT9DA7tpHHhzqSh41KtRdL4WQj3lkp3_xa6vjItv7aFEVkY0L0YYmk9VC6gydq-pmfgNcMnK9vAN0BYvAOn1_f3zydac36CoCDMvGE8bQJKEDtd_phVZmlUDlvYvnvtt20fjkKzHwFJRfLsK7teOhwRKaFLGoCDBshCYyES2Br-xKartRJNp-DUSzBNcpuNaSxElovLy0SIJCUwIZIdcW-DezFieJFeLEiLMacWIRcFygI_SvC42AZhLHII5OnOWIo0fAdPgtfoKrqJlcCSRTqfA6yKXAJsEmwOqG6CQEZIpnIsyVqrVNKyw26paslcjFwa6AjZHZdMGZNL4xeYeAB0dbBEwu6RG4akJtAiu5ZN2vCxtkgqX7QexyxBGQJs_EuK-iArPlUm4zDyqs-aN2xxVe0CdP8E83egnttOIBBrZRg255rWDJEWvlcn02x4vaqlWz2K1dY10vfTwJYV0eNuRhUx6O_cdq1-ooW6jysZkSEwlmigKDKtVyvlnbLQpN2G24_IQwvgPOjUt-3kmiNwQKSnpbsfw7xPmUOO-Bc3PWL1l59KZAwUjvCPOmV-E6HXk30o8T2jXiPIw416JoSpAW5riS7VC5WgxJ7fxvsD9h2xS7mVfBOT_jLU1QaJNnosy_gIXPCuc_wrhXYNx1iP_G2-sCjIyjPIT3D7C_w4CXSWFvEeclQvEXb2mCQclgwkbYr55UWm5vz518I1xAAxCLDm2HPu0YDoPna6ZmcQBocgxdAYB3fQzS01pYFlqmlDxrQBNkJEl-sissb0JDYZqKPDYrJFs77oXTwJ5UpHVovfQEACoiABo9Y1kBMGB5BllfrsSVB32RaUjTkNXJzmZzeW52M3yLgvz49Bk3OWyOYcjz9NaS7Rk_-oEbvyzcWSFPtydO8z9LlbGsyMeF7R2ffi_bXT0lz4t3xxq2JDdXT8rToq6nByiiSzY3n47xwhp_-42wufEQjRRg8sdi8sHj9EzAJHh9SjFGiI5gOECSP2FRgKEo6NmMasJ8Is5ICqJfd_ZGB7YnVb4-A5NU8GXd3qDTFcApBbEMTI8l2dma7wyQe-R40oeLMROVVHBm_IvnyHP84N8vrrRSkV41gD4EE-E6gk9YPK0hPArlqKSCM3NkdzuKLRWZJVhjJcwbYDb7w4ETfP3rC5ygMjN2CS6p4M2022g0dIbSQkVyGdiIhZkDUNXpuz1HmB5A5kxQXLGXxYlGULc__TQXemboiv1U4M24QlkM_1TKLwqLw7c9-0Gz5fb3OwfTccE_CpsP0igeIxdBjxCfHqJpNzDJmaHLIIvX2w9IuqNeP2j5p_MNnYHt2b7TxLh2xz7w7N5w0luMnAmgbXuHzZ7bDtoNe-S7jJJAm8OW3Q2yxvzcP6zmcyTNHAAA)<!-- /DRAWER_LINK -->
**No site** <https://keymap-drawer.streamlit.app/>: use o permalink acima, ou cole o
[`keymap.yaml`](keymap.yaml) na aba principal e o [`keymap_drawer_config.yaml`](keymap_drawer_config.yaml)
na aba *Configuration*.
Cada grupo de combos é desenhado em **um diagrama próprio** (evita sobreposição de linhas):
QWERTY = edição · COLEMAK = troca de layer · NUM = abas · FN = janelas · NAV = Delphi base ·
PROG_SYM = compilar/até retorno · NORM_SYM = avaliar/uses · CONFIG = mover linha.
Combos Delphi exibem o **nome da função** (Compilar, Debugar…), não o atalho.
Os thumb-chords de símbolos não são desenhados (espelham as layers PROG_SYM/NORM_SYM).
Teclas herdadas da base aparecem **esmaecidas com a tecla efetiva** (sem ▽).
**Regenerar** após mudar o keymap: `python .claude/skills/keymap-diagram/scripts/gen_drawer.py`
(requer `pip install keymap-drawer` — ver skill `keymap-diagram`).

---

## Mapa de posições

```
 0  1  2  3  4  5      6  7  8  9 10 11
12 13 14 15 16 17     18 19 20 21 22 23
24 25 26 27 28 29     30 31 32 33 34 35
         36 37 38     39 40 41
```

## Arquitetura

| # | Layer | Acesso | Observação |
|---|-------|--------|------------|
| 0 | QWERTY | base default | |
| 1 | COLEMAK-DH | GoTo na CONFIG | toggle *por cima* do QWERTY; só as letras mudam |
| 2 | NAV | polegar **interno** (hold/tap) · combo 26+28 / 31+33 | espelhada; setas seguram/repetem |
| 3 | NUM | polegar **externo** (hold/tap) · combo 2+4 / 7+9 | numpad espelhado por dedo |
| 4 | FN | combo 27+29 / 30+32 | F-keys nas posições dos números |
| 5 | CONFIG | combo 0+11 | BT, reset, bootloader, Studio, troca de base |
| 6 | PROG_SYM | combo 15+17 / 18+20 · thumb-chord **interno** | símbolos de programação |
| 7 | NORM_SYM | combo 3+5 / 6+8 · thumb-chord **externo** | shift-número + AltGr |

**Polegares:** `38/39` (internos) = **NAV** · `36/41` (externos) = **NUM** (hold = momentâneo, tap = trava).
`37` = Space, `40` = Enter (puros, seguram/repetem).
**Voltar à base:** combo `14+16` / `19+21` (`base_reset`) — desliga todas as funções e cai na base setada
(QWERTY **ou** COLEMAK), de qualquer estado.

---

## Layers

### 0 — QWERTY

```
 '       Q      W      E      R      T        Y      U      I      O      P      ´` ✝
Caps/⇧   A/Ctl  S/Sft  D/Alt  F/Gui  G        H      J/Gui  K/Alt  L/Sft  ç/Ctl  ~^ ✝
 \       Z      X      C      V      B        N      M      ,      .      ;:     /?
                [NUM]  [Spc]  [NAV]           [NAV]  [Ent]  [NUM]
```
✝ = tecla morta (compõe acento com a próxima letra). `X/Y` = tap/hold (home row mods).

### 1 — COLEMAK-DH (só letras mudam; resto herdado do QWERTY)

```
 '       Q      W      F      P      B        J      L      U      Y      ç      ´` ✝
Caps/⇧   A/Ctl  R/Sft  S/Alt  T/Gui  G        M      N/Gui  E/Alt  I/Sft  O/Ctl  ~^ ✝
 \       Z      X      C      D      V        K      H      ,      .      ;:     /?
```

### 2 — NAV (espelhada; coluna = direção, linha = alcance)

```
  —      ⌃→     PgUp   PgDn   ⌃←     ⌃Home      ⌃Home   ⌃←     PgDn   PgUp   ⌃→     —
 Shift   →      ↑      ↓      ←      intf⇄      intf⇄   ←      ↓      ↑      →     Shift
 ⌃End    End    mét.↑  mét.↓  Home   →impl      →impl   Home   mét.↓  mét.↑  End   ⌃End
```
- `⌃←/⌃→` palavra · `⌃Home/⌃End` início/fim do arquivo · `intf⇄` = interface↔implementation (Ctrl+Shift+↑)
- `mét.↑/↓` = método anterior/próximo (Ctrl+Alt+↑/↓) · `→impl` = ir p/ implementação (Alt+↑)
- Shift nas pontas da home = seleção com setas usando uma mão só

### 3 — NUM (espelhada por dedo: "1" sempre no indicador, etc.)

```
 *    /    9    8    7    —         —    7    8    9    /    *
 -    .    6    5    4    =         =    4    5    6    .    -
 +    ,    3    2    1    0         0    1    2    3    ,    +
```

### 4 — FN (F-keys nas posições dos números do NUM)

```
 ⏯    —    F9   F8   F7   F12       F12  F7   F8   F9   —    ⏯
 ⏮   Mute/Ctl F6/⇧ F5/Alt F4/Gui F11   F11  F4/Gui F5/Alt F6/⇧ Mute/Ctl ⏮
 ⏭    —    F3   F2   F1   F10       F10  F1   F2   F3   —    ⏭
```
Home row tem mod-tap (hold = mod) → `Ctrl+F9`, `Shift+F8` etc. **com uma mão**.

### 5 — CONFIG

```
Studio  —     →QWE  →CLM  —    —        —    USB  BLE  —    —    BOOT
 —      —     —     —     —    —        —    —    —    —    —    RESET
BT0    BT1   BT2   BT3   BT4   —        —    —    —    —    —    BT CLR
```
`BT CLR` isolado no canto oposto aos canais. GoTo de base sempre **forçam** a base escolhida.

### 6 — PROG_SYM (abre em cima, fecha embaixo; `/ \ |` na coluna interna)

```
 —    <    {    [    (    /         /    (    [    {    <    —
 —    >    }    ]    )    \         \    )    ]    }    >    —
 :=   :    =    '    "    |         |    "    '    =    :    :=
```

### 7 — NORM_SYM (shift-números nas posições do NUM + AltGr)

```
 º    ª    _    *    &    §         §    &    *    _    ª    º
 ¬    £    ¨    %    $    °         °    $    %    ¨    £    ¬
 ³    ²    #    @    !    ¹         ¹    !    @    #    ²    ³
```
`¢` ficou sem slot (raro) — pode substituir algum símbolo após validação em hardware.

---

## Combos

Parâmetros: `timeout-ms` 30–50 (quase-simultâneo) · `require-prior-idle-ms` 100–150 (não dispara em digitação corrida).

> Os combos valem em **qualquer layer/base** (são posicionais). A coluna "diagrama" indica apenas
> onde cada grupo é desenhado no [`keymap.svg`](keymap.svg).

### Acesso a layers *(diagrama: COLEMAK)*

| Esquerda | Direita | Ação |
|----------|---------|------|
| 14+16 (S+F) | 19+21 (J+L) | **BASE** — desliga todas as funções, preserva QWERTY/COLEMAK |
| 2+4 (W+R) | 7+9 (U+O) | NUM ⇄ |
| 26+28 (X+V) | 31+33 (M+.) | NAV ⇄ |
| 3+5 (E+T) | 6+8 (Y+I) | NORM_SYM ⇄ |
| 15+17 (D+G) | 18+20 (H+K) | PROG_SYM ⇄ |
| 27+29 (C+B) | 30+32 (N+,) | FN ⇄ |
| 0+11 (canto a canto, duas mãos) | | CONFIG ⇄ |

### Edição (home row + verticais do indicador) *(diagrama: QWERTY)*

| Esquerda | Direita | Ação |
|----------|---------|------|
| 13+14 (A+S) | 21+22 (L+ç) | Tab |
| 14+15 (S+D) | 20+21 (K+L) | Del |
| 15+16 (D+F) | 19+20 (J+K) | Backspace |
| 16+17 (F+G) | 18+19 (H+J) | Shift+Tab (des-indenta) |
| 5+17 (T+G) | 6+18 (Y+H) | Esc |
| 4+16 (R+F) | 7+19 (U+J) | Enter |

### Janelas / abas (row superior) *(diagramas: FN = janelas · NUM = abas)*

| Esquerda | Direita | Ação |
|----------|---------|------|
| 4+5 | 6+7 | Win+Tab |
| 3+4 | 7+8 | aba anterior (Ctrl+Shift+Tab) |
| 2+3 | 8+9 | próxima aba (Ctrl+Tab) |
| 2+3+4 | 7+8+9 | Alt+Tab |

### Delphi — tudo na row inferior + polegares *(diagramas: NAV = base · PROG_SYM = compilar/até retorno · NORM_SYM = avaliar/uses · CONFIG = mover linha)*

Par adjacente = comando base · **par + polegar interno** (38/39) = variante com modificador ·
**par + polegar externo** (36/41) = mover linha.

| Função | Atalho | Esquerda | Direita |
|--------|--------|----------|---------|
| **Debugar** / continuar | F9 | 28+29 (V+B) | 30+31 (N+M) |
| **Compilar** | Ctrl+F9 | 38+28+29 | 39+30+31 |
| **Step over** | F8 | 27+28 (C+V) | 31+32 (M+,) |
| **Até retorno** | Shift+F8 | 38+27+28 | 39+31+32 |
| **Step into** | F7 | 26+27 (X+C) | 32+33 (,+.) |
| **Avaliar** / modificar | Ctrl+F7 | 38+26+27 | 39+32+33 |
| **Inspecionar** | Alt+F5 | 25+26 (Z+X) | 33+34 (.+;) |
| **Add uses** | Ctrl+Shift+A | 38+25+26 | 39+33+34 |
| **Renomear** (CnPack) | Ctrl+Alt+L | 24+25 (\+Z) | 34+35 (;+/) |
| **Mover linha ↑** | Shift+Alt+↑ | 36+26+27 | 41+32+33 |
| **Mover linha ↓** | Shift+Alt+↓ | 36+27+28 | 41+31+32 |

### Thumb-chords de símbolos (polegar + tecla, quase-simultâneo)

- **Polegar INTERNO (38/39) + tecla da mesma metade** → símbolo de **PROG_SYM** naquela posição
- **Polegar EXTERNO (36/41) + tecla da mesma metade** → símbolo de **NORM_SYM** naquela posição
- Segurar o polegar (>40 ms antes da tecla) = layer momentânea normal; o chord só dispara em pressão quase-simultânea

---

## Home row mods (resumo do tuning)

| Parâmetro | Valor | Efeito |
|-----------|-------|--------|
| flavor | `balanced` | hold só se outra tecla for pressionada **e solta** durante o hold |
| tapping-term-ms | 250 | tempo p/ virar hold por timeout |
| quick-tap-ms | 175 | tap-tap-segura = repete a letra |
| require-prior-idle-ms | 150 | digitação corrida nunca vira mod |
| hold-trigger-key-positions | allowlist | direita: só metade oposta; **esquerda: metade oposta + W R T S D F G Z X C V B** → Ctrl/Gui+C/V/X etc. com uma mão |
| hold-trigger-on-release | on | permite encadear mods (Ctrl+Shift+A, Ctrl+Alt+L) |
