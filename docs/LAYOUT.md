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

**Permalinks:** <!-- KLE_LINKS -->[abrir QWERTY no KLE](https://www.keyboard-layout-editor.com/##@@_c=%23ffffff&fa@:1&:1&:2&:2&:0&:0&:2&:2&:2&:4&:2&:1%3B%3B&=*%0A%3Ci%20class%2F='kb%20kb-Multimedia-Play-Pause'%3E%3C%2F%2Fi%3E%0A%0A%0A%0A%0A%C2%BA%0A%0A%22%0A'%0A%0AStu&=%2F%2F%0A%0A%3Ci%20class%2F='kb%20kb-Arrows-Right'%3E%3C%2F%2Fi%3E%0A%3C%0A%0A%0A%C2%AA%0A%0A%0AQ&=9%0AF9%0A%3Ci%20class%2F='kb%20kb-Arrows-Top-4'%3E%3C%2F%2Fi%3E%0A%7B%0A%0A%0A%2F_%0A%0A%0AW%0A%0A%E2%86%92Q&=8%0AF8%0A%3Ci%20class%2F='kb%20kb-Arrows-Bottom-4'%3E%3C%2F%2Fi%3E%0A%5B%0A%0A%0A*%0A%0A%0AE%0A%0A%E2%86%92C&=7%0AF7%0A%3Ci%20class%2F='kb%20kb-Arrows-Left'%3E%3C%2F%2Fi%3E%0A(%0A%0A%0A%2F&%0A%0A%0AR&=%0AF12%0A%3Ci%20class%2F='kb%20kb-Arrows-Top-3'%3E%3C%2F%2Fi%3E%0A%2F%2F%0A%0A%0A%C2%A7%0A%0A%0AT&_x:1%3B&=%0AF12%0A%3Ci%20class%2F='kb%20kb-Arrows-Top-3'%3E%3C%2F%2Fi%3E%0A%2F%2F%0A%0A%0A%C2%A7%0A%0A%0AY&=7%0AF7%0A%3Ci%20class%2F='kb%20kb-Arrows-Left'%3E%3C%2F%2Fi%3E%0A(%0A%0A%0A%2F&%0A%0A%0AU%0A%0AUSB&=8%0AF8%0A%3Ci%20class%2F='kb%20kb-Arrows-Bottom-4'%3E%3C%2F%2Fi%3E%0A%5B%0A%0A%0A*%0A%0A%0AI%0A%0ABLE&=9%0AF9%0A%3Ci%20class%2F='kb%20kb-Arrows-Top-4'%3E%3C%2F%2Fi%3E%0A%7B%0A%0A%0A%2F_%0A%0A%0AO&=%2F%2F%0A%0A%3Ci%20class%2F='kb%20kb-Arrows-Right'%3E%3C%2F%2Fi%3E%0A%3C%0A%0A%0A%C2%AA%0A%0A%0AP&=*%0A%3Ci%20class%2F='kb%20kb-Multimedia-Play-Pause'%3E%3C%2F%2Fi%3E%0A%0A%0A%0A%0A%C2%BA%0A%0A%60%0A%C2%B4%0A%0ABOOT%3B&@=-%0A%3Ci%20class%2F='kb%20kb-Multimedia-Rewind-Start'%3E%3C%2F%2Fi%3E%0A%E2%87%A7%0A%0A%0A%0A%C2%AC%0A%0A%0A%E2%87%AA%0A%E2%87%A7&=.%0AMute%0A%3Ci%20class%2F='kb%20kb-Multimedia-Play'%3E%3C%2F%2Fi%3E%0A%3E%0A%0A%0A%C2%A3%0A%0A%0AA%0A%E2%8C%83&=6%0AF6%0A%3Ci%20class%2F='kb%20kb-Multimedia-Up'%3E%3C%2F%2Fi%3E%0A%7D%0A%0A%0A%C2%A8%0A%0A%0AS%0A%E2%87%A7&=5%0AF5%0A%3Ci%20class%2F='kb%20kb-Multimedia-Down'%3E%3C%2F%2Fi%3E%0A%5D%0A%0A%0A%25%0A%0A%0AD%0A%E2%8C%A5&=4%0AF4%0A%3Ci%20class%2F='kb%20kb-Multimedia-Back'%3E%3C%2F%2Fi%3E%0A)%0A%0A%0A$%0A%0A%0AF%0A%E2%9D%96&=%2F=%0AF11%0AI%E2%87%84M%0A%5C%0A%0A%0A%C2%B0%0A%0A%0AG&_x:1%3B&=%2F=%0AF11%0AI%E2%87%84M%0A%5C%0A%0A%0A%C2%B0%0A%0A%0AH&=4%0AF4%0A%3Ci%20class%2F='kb%20kb-Multimedia-Back'%3E%3C%2F%2Fi%3E%0A)%0A%0A%0A$%0A%0A%0AJ%0A%E2%9D%96&=5%0AF5%0A%3Ci%20class%2F='kb%20kb-Multimedia-Down'%3E%3C%2F%2Fi%3E%0A%5D%0A%0A%0A%25%0A%0A%0AK%0A%E2%8C%A5&=6%0AF6%0A%3Ci%20class%2F='kb%20kb-Multimedia-Up'%3E%3C%2F%2Fi%3E%0A%7D%0A%0A%0A%C2%A8%0A%0A%0AL%0A%E2%87%A7&=.%0AMute%0A%3Ci%20class%2F='kb%20kb-Multimedia-Play'%3E%3C%2F%2Fi%3E%0A%3E%0A%0A%0A%C2%A3%0A%0A%0A%C3%A7%0A%E2%8C%83&=-%0A%3Ci%20class%2F='kb%20kb-Multimedia-Rewind-Start'%3E%3C%2F%2Fi%3E%0A%E2%87%A7%0A%0A%0A%0A%C2%AC%0A%0A%5E%0A~%0A%0ARST%3B&@=+%0A%3Ci%20class%2F='kb%20kb-Multimedia-FastForward-End'%3E%3C%2F%2Fi%3E%0A%3Ci%20class%2F='kb%20kb-Arrows-Bottom-3'%3E%3C%2F%2Fi%3E%0A%2F:%2F=%0A%0A%0A%C2%B3%0A%0A%7C%0A%5C%0A%0ABT0&=,%0A%0A%3Ci%20class%2F='kb%20kb-Line-End'%3E%3C%2F%2Fi%3E%0A%2F:%0A%0A%0A%C2%B2%0A%0A%0AZ%0A%0ABT1&=3%0AF3%0A%3Ci%20class%2F='kb%20kb-Arrows-Up'%3E%3C%2F%2Fi%3E%0A%2F=%0A%0A%0A%23%0A%0A%0AX%0A%0ABT2&=2%0AF2%0A%3Ci%20class%2F='kb%20kb-Arrows-Down'%3E%3C%2F%2Fi%3E%0A'%0A%0A%0A%2F@%0A%0A%0AC%0A%0ABT3&=1%0AF1%0A%3Ci%20class%2F='kb%20kb-Line-Start'%3E%3C%2F%2Fi%3E%0A%22%0A%0A%0A!%0A%0A%0AV%0A%0ABT4&=0%0AF10%0A%E2%86%92imp%0A%7C%0A%0A%0A%C2%B9%0A%0A%0AB&_x:1%3B&=0%0AF10%0A%E2%86%92imp%0A%7C%0A%0A%0A%C2%B9%0A%0A%0AN&=1%0AF1%0A%3Ci%20class%2F='kb%20kb-Line-Start'%3E%3C%2F%2Fi%3E%0A%22%0A%0A%0A!%0A%0A%0AM&=2%0AF2%0A%3Ci%20class%2F='kb%20kb-Arrows-Down'%3E%3C%2F%2Fi%3E%0A'%0A%0A%0A%2F@%0A%0A%3C%0A,&=3%0AF3%0A%3Ci%20class%2F='kb%20kb-Arrows-Up'%3E%3C%2F%2Fi%3E%0A%2F=%0A%0A%0A%23%0A%0A%3E%0A.&=,%0A%0A%3Ci%20class%2F='kb%20kb-Line-End'%3E%3C%2F%2Fi%3E%0A%2F:%0A%0A%0A%C2%B2%0A%0A%2F:%0A%2F%3B&=+%0A%3Ci%20class%2F='kb%20kb-Multimedia-FastForward-End'%3E%3C%2F%2Fi%3E%0A%3Ci%20class%2F='kb%20kb-Arrows-Bottom-3'%3E%3C%2F%2Fi%3E%0A%2F:%2F=%0A%0A%0A%C2%B3%0A%0A%3F%0A%2F%2F%0A%0ABTCLR%3B&@_x:3%3B&=%0ANorm%0A%0A%0A%0A%0A%0A%0A%0ANum%0A%0Atap%20%2F=%20trava&_a:7%3B&=%E2%8E%B5&_a:4%3B&=%0A%0A%0AProg%0A%0A%0A%0A%0A%0ANav%0A%0Atap%20%2F=%20trava&_x:1%3B&=%0A%0A%0AProg%0A%0A%0A%0A%0A%0ANav%0A%0Atap%20%2F=%20trava&_a:7%3B&=%E2%8F%8E&_a:4%3B&=%0ANorm%0A%0A%0A%0A%0A%0A%0A%0ANum%0A%0Atap%20%2F=%20trava) · [abrir COLEMAK-DH no KLE](https://www.keyboard-layout-editor.com/##@@_c=%23ffffff&fa@:1&:1&:2&:2&:0&:0&:2&:2&:2&:4&:2&:1%3B%3B&=*%0A%3Ci%20class%2F='kb%20kb-Multimedia-Play-Pause'%3E%3C%2F%2Fi%3E%0A%0A%0A%0A%0A%C2%BA%0A%0A%22%0A'%0A%0AStu&=%2F%2F%0A%0A%3Ci%20class%2F='kb%20kb-Arrows-Right'%3E%3C%2F%2Fi%3E%0A%3C%0A%0A%0A%C2%AA%0A%0A%0AQ&=9%0AF9%0A%3Ci%20class%2F='kb%20kb-Arrows-Top-4'%3E%3C%2F%2Fi%3E%0A%7B%0A%0A%0A%2F_%0A%0A%0AW%0A%0A%E2%86%92Q&=8%0AF8%0A%3Ci%20class%2F='kb%20kb-Arrows-Bottom-4'%3E%3C%2F%2Fi%3E%0A%5B%0A%0A%0A*%0A%0A%0AF%0A%0A%E2%86%92C&=7%0AF7%0A%3Ci%20class%2F='kb%20kb-Arrows-Left'%3E%3C%2F%2Fi%3E%0A(%0A%0A%0A%2F&%0A%0A%0AP&=%0AF12%0A%3Ci%20class%2F='kb%20kb-Arrows-Top-3'%3E%3C%2F%2Fi%3E%0A%2F%2F%0A%0A%0A%C2%A7%0A%0A%0AB&_x:1%3B&=%0AF12%0A%3Ci%20class%2F='kb%20kb-Arrows-Top-3'%3E%3C%2F%2Fi%3E%0A%2F%2F%0A%0A%0A%C2%A7%0A%0A%0AJ&=7%0AF7%0A%3Ci%20class%2F='kb%20kb-Arrows-Left'%3E%3C%2F%2Fi%3E%0A(%0A%0A%0A%2F&%0A%0A%0AL%0A%0AUSB&=8%0AF8%0A%3Ci%20class%2F='kb%20kb-Arrows-Bottom-4'%3E%3C%2F%2Fi%3E%0A%5B%0A%0A%0A*%0A%0A%0AU%0A%0ABLE&=9%0AF9%0A%3Ci%20class%2F='kb%20kb-Arrows-Top-4'%3E%3C%2F%2Fi%3E%0A%7B%0A%0A%0A%2F_%0A%0A%0AY&=%2F%2F%0A%0A%3Ci%20class%2F='kb%20kb-Arrows-Right'%3E%3C%2F%2Fi%3E%0A%3C%0A%0A%0A%C2%AA%0A%0A%0A%C3%A7&=*%0A%3Ci%20class%2F='kb%20kb-Multimedia-Play-Pause'%3E%3C%2F%2Fi%3E%0A%0A%0A%0A%0A%C2%BA%0A%0A%60%0A%C2%B4%0A%0ABOOT%3B&@=-%0A%3Ci%20class%2F='kb%20kb-Multimedia-Rewind-Start'%3E%3C%2F%2Fi%3E%0A%E2%87%A7%0A%0A%0A%0A%C2%AC%0A%0A%0A%E2%87%AA%0A%E2%87%A7&=.%0AMute%0A%3Ci%20class%2F='kb%20kb-Multimedia-Play'%3E%3C%2F%2Fi%3E%0A%3E%0A%0A%0A%C2%A3%0A%0A%0AA%0A%E2%8C%83&=6%0AF6%0A%3Ci%20class%2F='kb%20kb-Multimedia-Up'%3E%3C%2F%2Fi%3E%0A%7D%0A%0A%0A%C2%A8%0A%0A%0AR%0A%E2%87%A7&=5%0AF5%0A%3Ci%20class%2F='kb%20kb-Multimedia-Down'%3E%3C%2F%2Fi%3E%0A%5D%0A%0A%0A%25%0A%0A%0AS%0A%E2%8C%A5&=4%0AF4%0A%3Ci%20class%2F='kb%20kb-Multimedia-Back'%3E%3C%2F%2Fi%3E%0A)%0A%0A%0A$%0A%0A%0AT%0A%E2%9D%96&=%2F=%0AF11%0AI%E2%87%84M%0A%5C%0A%0A%0A%C2%B0%0A%0A%0AG&_x:1%3B&=%2F=%0AF11%0AI%E2%87%84M%0A%5C%0A%0A%0A%C2%B0%0A%0A%0AM&=4%0AF4%0A%3Ci%20class%2F='kb%20kb-Multimedia-Back'%3E%3C%2F%2Fi%3E%0A)%0A%0A%0A$%0A%0A%0AN%0A%E2%9D%96&=5%0AF5%0A%3Ci%20class%2F='kb%20kb-Multimedia-Down'%3E%3C%2F%2Fi%3E%0A%5D%0A%0A%0A%25%0A%0A%0AE%0A%E2%8C%A5&=6%0AF6%0A%3Ci%20class%2F='kb%20kb-Multimedia-Up'%3E%3C%2F%2Fi%3E%0A%7D%0A%0A%0A%C2%A8%0A%0A%0AI%0A%E2%87%A7&=.%0AMute%0A%3Ci%20class%2F='kb%20kb-Multimedia-Play'%3E%3C%2F%2Fi%3E%0A%3E%0A%0A%0A%C2%A3%0A%0A%0AO%0A%E2%8C%83&=-%0A%3Ci%20class%2F='kb%20kb-Multimedia-Rewind-Start'%3E%3C%2F%2Fi%3E%0A%E2%87%A7%0A%0A%0A%0A%C2%AC%0A%0A%5E%0A~%0A%0ARST%3B&@=+%0A%3Ci%20class%2F='kb%20kb-Multimedia-FastForward-End'%3E%3C%2F%2Fi%3E%0A%3Ci%20class%2F='kb%20kb-Arrows-Bottom-3'%3E%3C%2F%2Fi%3E%0A%2F:%2F=%0A%0A%0A%C2%B3%0A%0A%7C%0A%5C%0A%0ABT0&=,%0A%0A%3Ci%20class%2F='kb%20kb-Line-End'%3E%3C%2F%2Fi%3E%0A%2F:%0A%0A%0A%C2%B2%0A%0A%0AZ%0A%0ABT1&=3%0AF3%0A%3Ci%20class%2F='kb%20kb-Arrows-Up'%3E%3C%2F%2Fi%3E%0A%2F=%0A%0A%0A%23%0A%0A%0AX%0A%0ABT2&=2%0AF2%0A%3Ci%20class%2F='kb%20kb-Arrows-Down'%3E%3C%2F%2Fi%3E%0A'%0A%0A%0A%2F@%0A%0A%0AC%0A%0ABT3&=1%0AF1%0A%3Ci%20class%2F='kb%20kb-Line-Start'%3E%3C%2F%2Fi%3E%0A%22%0A%0A%0A!%0A%0A%0AD%0A%0ABT4&=0%0AF10%0A%E2%86%92imp%0A%7C%0A%0A%0A%C2%B9%0A%0A%0AV&_x:1%3B&=0%0AF10%0A%E2%86%92imp%0A%7C%0A%0A%0A%C2%B9%0A%0A%0AK&=1%0AF1%0A%3Ci%20class%2F='kb%20kb-Line-Start'%3E%3C%2F%2Fi%3E%0A%22%0A%0A%0A!%0A%0A%0AH&=2%0AF2%0A%3Ci%20class%2F='kb%20kb-Arrows-Down'%3E%3C%2F%2Fi%3E%0A'%0A%0A%0A%2F@%0A%0A%3C%0A,&=3%0AF3%0A%3Ci%20class%2F='kb%20kb-Arrows-Up'%3E%3C%2F%2Fi%3E%0A%2F=%0A%0A%0A%23%0A%0A%3E%0A.&=,%0A%0A%3Ci%20class%2F='kb%20kb-Line-End'%3E%3C%2F%2Fi%3E%0A%2F:%0A%0A%0A%C2%B2%0A%0A%2F:%0A%2F%3B&=+%0A%3Ci%20class%2F='kb%20kb-Multimedia-FastForward-End'%3E%3C%2F%2Fi%3E%0A%3Ci%20class%2F='kb%20kb-Arrows-Bottom-3'%3E%3C%2F%2Fi%3E%0A%2F:%2F=%0A%0A%0A%C2%B3%0A%0A%3F%0A%2F%2F%0A%0ABTCLR%3B&@_x:3%3B&=%0ANorm%0A%0A%0A%0A%0A%0A%0A%0ANum%0A%0Atap%20%2F=%20trava&_a:7%3B&=%E2%8E%B5&_a:4%3B&=%0A%0A%0AProg%0A%0A%0A%0A%0A%0ANav%0A%0Atap%20%2F=%20trava&_x:1%3B&=%0A%0A%0AProg%0A%0A%0A%0A%0A%0ANav%0A%0Atap%20%2F=%20trava&_a:7%3B&=%E2%8F%8E&_a:4%3B&=%0ANorm%0A%0A%0A%0A%0A%0A%0A%0ANum%0A%0Atap%20%2F=%20trava)<!-- /KLE_LINKS -->
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

**Permalink:** <!-- DRAWER_LINK -->[abrir completo no keymap-drawer](https://caksoylar.github.io/keymap-drawer?keymap_yaml=H4sIAAAAAAAC_-VaW3PbRBR-70z_gygFt7R1I8nxjbbgOLKb1rf60rRAMUqsBE9sychKOoHCCzPpSwdKyz_gUsplhgFe4DH5J_4lyN6zu9rVrq1WfkteztHZc749u_vt7pGcgXno7Hv5s2cU5fPhXnfPOtxyTLeXV7Yd17bOnhmYh5Y7nrXf2TSa7fsz9YqS8P-QdgeJTSQMJJpItJG4j0QHiQ0k6kg0kPDyyvE_U1VRxnkl8UmCmIuFRgs1fJpXKq2bpTZpKlB7sd2sELvMf53aCxVqLlFzuQPZlZG4SZxuEacmcfLNt6k5CFmhZiaDkxe0gUk58VWCjP5jYv2IzsgjmJEPkLiHRBGJu0isIVFDogordRkikwT2XQqbpxN9lVrfo9Zap0pS9szRdc81D0zUOnn6A3Ur3JW5zW-dfPvN4r6K9YpRLdzO0-kC-imKdziyfG_XtMciPpYYlsEE3UKiwtASSIpWSEJIQXdShop9ZZRtSijbElO2LadslU6nmLKGmLIbEsrWozJWPOAQhQVuQk6vM9S-ze9HoLW406S8KcR9sVtoM4jdpIwVu8OOkWDJNslS3GGfxR2G3yu5AWADP_l6cvRMGZkD88CFTd0oK50GUddrAc-nrGffPvlju-8opvtZUmYRxQVgA52JcsF5BvZVc6N8E1QcuV7fBLiKgd36trczOfq-PxwNJAbqS-MxYqCTwIba6Q8DIzNqwPLhyUvP6TnK5Og73vAcmF-vwt3ad5XRVWWaRFJioL4hmFBHJAU2s1PJ7U4Vc_sdIM1VeM7BcyKLlUyCpVci1EBccxwYBk9cYW_mRBo3rGIlhZXrISUVck5zcBj-ElcIJHSsaFhRsbISUtSQMwm_zHZwGjlTqgFlGg2WB6UcyCzIDEhV45UM55ljkTByo2ncJRlWO21DVEqU0iBXQaZwbyqnTAvflLhCQMHhEgGBC2oEJptAmUBTrhn32twE6SDJfGC5ElI4T51FotinkYHFeq20UQYWtrz9Xt_hLuijZ-jVjTxCOS05wEB2WlAtr1UMscdavd6ejxFXNo2WQZd2jVa95HjizKrYrInNutices1s19pKsdJkbXMpxgPMJQVyajTr5W7rfpUrwq7B4xcY8UNQLix4vRNYL3AQBPSaZPg3sPIlVh6AcnHem6zYepGDoKA3uH7z1-E5H7obyceJxDmsPAop58LeBCDP9XEqy6F6sxqg2vF_IH9FsstXM2-DcvyClaSBuHZZJIL8O0j4rHD8C8S9BXHnwf4nK89zbjiO4GDcv0H-BQFv4sTex8obGOJfVpIG6oqDMRpGP31U2XaGW870G-EVZQRkUaHsUGcVw55_vhZas1tkAA7kCgrEQN2jqdFjoCJIQQRkPCcAaq1c5AANCioti0PQDM8J0aFe0fXoIUis4oDW4XBBBKSVjR6hQkmoZiCmESEGalJtJXqMBnOs4Uku1RaNHgo9XYsaAQEqpkqxVBZGKIo56O_aPlWd0fTJ2dkZWz61V5KrzDD1IG19vMnjn4J4uH4KDBLWWNOiRpAtgRd58uTnBX2scBtiYQRZ4jSJ-G1BRI5b4MURaY5Gk8c_LojIBvuKEsEz1Rhvzw9IB3uKEsCfT3AQygMy_BgWBaTYLb3Zty-1za1gDGK5jKCaYHyZpYDp7KFpbpn-S8HTIBgci5HQMuxBFBNNC6RI0J69LlqWPe1jomnC6SsMvFdZCzW5Ips9mmg8TC3LHcDr1tb-ruky40ZXEuBtOZ7nDFnItPCEVpcHmZVkW3SGo_5gHvYCeuckOccFJhcb5nrLs0aKc2C90jRoSV1YLGjLBM1KMi54Jy8V1_L8H3edyNPA0YvML5_5MsBJuZUJTof_4d2JQzWNK8iWApqVZFw48CGWQF8-6Zi42mowXx9vwx6PLP-XFtuMRTU4DvXUcmGzkqwLvZ6yP7bGsdnL5x0XWEsFM_YBm5btDK14ZyRg6svETEt4W50eOsrAhp-GaC09_b44j2YppuxRJfRdDryelpxsFP75XPjw_MgGwB9vMXvouebD7rZj7_R3Z5H-v9p0H-aVdAo_-G_Z6dmVNXufnrbpgUe_Fa2Y7YMM9oe2_9FsluHYGpmu6Vld5Nfrm7uuOfRbd8zB2Jp69Ex3rzt0ev4bu7k_PfP-Bx0_w_v1IwAA) · [abrir guia de combos](https://caksoylar.github.io/keymap-drawer?keymap_yaml=H4sIAAAAAAAC_-VZW3PbRBR-70z-gygFtbS5SHJs2TQFx5GdNL5VtpOGm1FiJXhiS0aW0wkUXphJXzoQUv4Bl1IuMwzwAo_JP_EvQfae3dWudh2G8pa8nKNzvv327Opb6VjpOcf-KMzNXVOUT_qH7UP3eNd3gk5O2fMDz5271nOO3WA4zT_YtuzmztSdV9ToD3kPkNlGxkLGRqaJzA4yLWQ2kKkhU0cmzCnnf05cRRnmFPVDlYQL-XoDJT7KKeXGerFJUnkaLzTtMonL8Gs0ni_TcJGGSy2oroTMOgHdJyCbgKLwJg3HKcs0zFRw8ZwmmJLVz1Wy-g9I9D26I49hR95B5iEyBWS2kFlFpopMBe7UHRi5QGjfpLQ5utGLNPoWjVZbFVJy6AxWwsA5clB2fPotheW3ZLDZ2fFXX14-V6FWtir5zRzdLpCfooTHAzdCB443FOmxyKgMNug-MmVGliBSdIckghRMJ1WoGCuTrC2RbEMs2aZcshW6nWLJWmLJbkgkW_u3ihUvOCFhAUyo6TVG2pv8eQRZiyddkKcS2hfDEodBDJMqVgyHEyPhkh2S_wUO5-xllxHNSt4AcICffjE-OVMGTs85CuBQ10tKq07ctWoMecoiu97Fr3tdX3GCjxdkEdG4GG1sMlEtuM7YubI3Suvg4pFrtW2gK1sY1vXC_fHJN93-oCcJUCwdjxljk8QO1H63H1uZVQWV9y9ehH7HV8YnX_OBZ6D8WgXerd1AGSwqkyIWJAGKTdAkJiIlsJVdSW23Kljbb4BoFuE6C9eqiZ2MyspLTSQINMuRYXJ1nn0zq2mcWMZOCjsrCSeVAKc5Okx_m2sEVAM7OnY07CwlHC0BJsPvsBNcRc0UqyCZep3VQTEL1gSbAavpvJPhkFmWCTPXbWuLVFhpNS1RK1FMg10Gm8KzaZwzaXxT4g4BDU62CIhc0CMw1cTaBFpy1XrY5DbIAEv2A9ulhMMhDZaJcl9FBRZq1eJGCVTYCEedrs-9oE_O0E83cgnttOQBBrbVgG55tWyJEau1WnM2x8ta22pY9Nau0q6XPJ64sCYO6-KwIQ6n_mO1q02lULbZ2EyJ8QQzRYFAdbtWajd2KlwTdhcuP8WM74Jz85Kfd4LoTY6CkN6VLP8edj7Dzvvg3Jr1S1YcvcVRUNJ73Ly5FbjOJd6N5OOEeh07jxPO9SSaEOS4Oa5kO1SzKzGpnf8N9idk23w38zo4589ZSxIE2maZCPMvYOGzwvmPMO41GHcD4r-x9gYHw-MID-b9A-zvMOBVXNjb2HkFU_zFWpKgUDwYs2H2qyeVPb-_60--Ec4rAxCLBm2HNu0YDqPna75hMQBocnRNAoB3fQrS01poFlqmrDirQxOkmzg_2RWaN6ChMAxJHpllnG0c9-NpYDclaQ1aLy0DgDoPgEZPX5IAdFiejtdXrDLlQV9k6MI0ZDW8s4ViiZndiN-iKD9-8j0zOWyOrovz5Nbi7Rk__YEZv8TdWS5PtidN8j8LlbEkyae57R0_-U60u1pWnOfvjjXcE9xczRSneV1PD1BCl3RuNp1ihbXd9W43nV3B9Bk5wmAPhrPrRC3dqaAIU47QY1QEcRZHmOwBEyB0YTn5XsgXnBEyCoC6ycl-zd0dHTiBUPvaDIwp4Sv4_UG3x4GzEmIRmBxMvLeN0B0o_pEbCB8v-kyUKeHMhxcvlMANo3_A-MJKeXrZAPIYzMTriD5isbQ69zAUo0wJZ_7I6XUlW8ozC7D6cpw3wmx4w4Ebff_zOE7QmZG6BGdKePOdjjIaukNhoTy5CKyn4swRyHY9v-9y0wPImAlKS_ayMtGI0vOmH-diTw1Nsp8SvJGWKIvinwn5eWEx-E7gPGrv-d5-92A6LvpXYftRTkmn8EXUJaSnh2jaD0xyRuwyyqL1ehFJb9T3oqZ_Ot_QHTiBE7pthOt0nYPA6Q8n3cXInQA6TnDY7vudqOFwRqFPKTG0PdxzelFWn7v2D-PDCybPHAAA)<!-- /DRAWER_LINK -->
**No site** <https://keymap-drawer.streamlit.app/>: use o permalink acima, ou cole o
[`keymap.yaml`](keymap.yaml) na aba principal e o [`keymap_drawer_config.yaml`](keymap_drawer_config.yaml)
na aba *Configuration*.
Cada grupo de combos é desenhado em **um diagrama próprio** (evita sobreposição de linhas):
QWERTY = edição · COLEMAK = troca de layer · NUM = abas · FN = janelas ·
NAV = Delphi (pares embaixo, acordes com modificador em cima) · CONFIG = mover linha.
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

### Delphi — tudo na row inferior + polegares *(diagrama: NAV — pares embaixo, acordes em cima; mover linha no CONFIG)*

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
