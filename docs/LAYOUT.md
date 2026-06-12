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

**Permalinks:** <!-- KLE_LINKS -->[abrir QWERTY no KLE](https://www.keyboard-layout-editor.com/##@@_c=%23ffffff&fa@:1&:1&:2&:2&:0&:0&:2&:2&:2&:4&:2&:1%3B%3B&=*%0A%3Ci%20class%2F='kb%20kb-Multimedia-Play-Pause'%3E%3C%2F%2Fi%3E%0A%0A%0A%0A%0A%C2%BA%0A%0A%22%0A'%0A%0AStu&=%2F%2F%0A%0A%3Ci%20class%2F='kb%20kb-Arrows-Left'%3E%3C%2F%2Fi%3E%0A%3C%0A%0A%0A%C2%AA%0A%0A%0AQ&=9%0AF9%0A%3Ci%20class%2F='kb%20kb-Arrows-Bottom-4'%3E%3C%2F%2Fi%3E%0A%7B%0A%0A%0A%2F_%0A%0A%0AW%0A%0A%E2%86%92Q&=8%0AF8%0A%3Ci%20class%2F='kb%20kb-Arrows-Top-4'%3E%3C%2F%2Fi%3E%0A%5B%0A%0A%0A*%0A%0A%0AE%0A%0A%E2%86%92C&=7%0AF7%0A%3Ci%20class%2F='kb%20kb-Arrows-Right'%3E%3C%2F%2Fi%3E%0A(%0A%0A%0A%2F&%0A%0A%0AR&=%0AF12%0A%3Ci%20class%2F='kb%20kb-Arrows-Top-3'%3E%3C%2F%2Fi%3E%0A%2F%2F%0A%0A%0A%C2%A7%0A%0A%0AT&_x:1%3B&=%0AF12%0A%3Ci%20class%2F='kb%20kb-Arrows-Top-3'%3E%3C%2F%2Fi%3E%0A%2F%2F%0A%0A%0A%C2%A7%0A%0A%0AY&=7%0AF7%0A%3Ci%20class%2F='kb%20kb-Arrows-Left'%3E%3C%2F%2Fi%3E%0A(%0A%0A%0A%2F&%0A%0A%0AU%0A%0AUSB&=8%0AF8%0A%3Ci%20class%2F='kb%20kb-Arrows-Bottom-4'%3E%3C%2F%2Fi%3E%0A%5B%0A%0A%0A*%0A%0A%0AI%0A%0ABLE&=9%0AF9%0A%3Ci%20class%2F='kb%20kb-Arrows-Top-4'%3E%3C%2F%2Fi%3E%0A%7B%0A%0A%0A%2F_%0A%0A%0AO&=%2F%2F%0A%0A%3Ci%20class%2F='kb%20kb-Arrows-Right'%3E%3C%2F%2Fi%3E%0A%3C%0A%0A%0A%C2%AA%0A%0A%0AP&=*%0A%3Ci%20class%2F='kb%20kb-Multimedia-Play-Pause'%3E%3C%2F%2Fi%3E%0A%0A%0A%0A%0A%C2%BA%0A%0A%60%0A%C2%B4%0A%0ABOOT%3B&@=-%0A%3Ci%20class%2F='kb%20kb-Multimedia-Rewind-Start'%3E%3C%2F%2Fi%3E%0A%E2%87%A7%0A%0A%0A%0A%C2%AC%0A%0A%0A%E2%87%AA%0A%E2%87%A7&=.%0AMute%0A%3Ci%20class%2F='kb%20kb-Multimedia-Back'%3E%3C%2F%2Fi%3E%0A%3E%0A%0A%0A%C2%A3%0A%0A%0AA%0A%E2%8C%83&=6%0AF6%0A%3Ci%20class%2F='kb%20kb-Multimedia-Down'%3E%3C%2F%2Fi%3E%0A%7D%0A%0A%0A%C2%A8%0A%0A%0AS%0A%E2%87%A7&=5%0AF5%0A%3Ci%20class%2F='kb%20kb-Multimedia-Up'%3E%3C%2F%2Fi%3E%0A%5D%0A%0A%0A%25%0A%0A%0AD%0A%E2%8C%A5&=4%0AF4%0A%3Ci%20class%2F='kb%20kb-Multimedia-Play'%3E%3C%2F%2Fi%3E%0A)%0A%0A%0A$%0A%0A%0AF%0A%E2%9D%96&=%2F=%0AF11%0AI%E2%87%84M%0A%5C%0A%0A%0A%C2%B0%0A%0A%0AG&_x:1%3B&=%2F=%0AF11%0AI%E2%87%84M%0A%5C%0A%0A%0A%C2%B0%0A%0A%0AH&=4%0AF4%0A%3Ci%20class%2F='kb%20kb-Multimedia-Back'%3E%3C%2F%2Fi%3E%0A)%0A%0A%0A$%0A%0A%0AJ%0A%E2%9D%96&=5%0AF5%0A%3Ci%20class%2F='kb%20kb-Multimedia-Down'%3E%3C%2F%2Fi%3E%0A%5D%0A%0A%0A%25%0A%0A%0AK%0A%E2%8C%A5&=6%0AF6%0A%3Ci%20class%2F='kb%20kb-Multimedia-Up'%3E%3C%2F%2Fi%3E%0A%7D%0A%0A%0A%C2%A8%0A%0A%0AL%0A%E2%87%A7&=.%0AMute%0A%3Ci%20class%2F='kb%20kb-Multimedia-Play'%3E%3C%2F%2Fi%3E%0A%3E%0A%0A%0A%C2%A3%0A%0A%0A%C3%A7%0A%E2%8C%83&=-%0A%3Ci%20class%2F='kb%20kb-Multimedia-Rewind-Start'%3E%3C%2F%2Fi%3E%0A%E2%87%A7%0A%0A%0A%0A%C2%AC%0A%0A%5E%0A~%0A%0ARST%3B&@=+%0A%3Ci%20class%2F='kb%20kb-Multimedia-FastForward-End'%3E%3C%2F%2Fi%3E%0A%3Ci%20class%2F='kb%20kb-Arrows-Bottom-3'%3E%3C%2F%2Fi%3E%0A%2F:%2F=%0A%0A%0A%C2%B3%0A%0A%7C%0A%5C%0A%0ABT0&=,%0A%0A%3Ci%20class%2F='kb%20kb-Line-Start'%3E%3C%2F%2Fi%3E%0A%2F:%0A%0A%0A%C2%B2%0A%0A%0AZ%0A%0ABT1&=3%0AF3%0A%3Ci%20class%2F='kb%20kb-Arrows-Down'%3E%3C%2F%2Fi%3E%0A%2F=%0A%0A%0A%23%0A%0A%0AX%0A%0ABT2&=2%0AF2%0A%3Ci%20class%2F='kb%20kb-Arrows-Up'%3E%3C%2F%2Fi%3E%0A'%0A%0A%0A%2F@%0A%0A%0AC%0A%0ABT3&=1%0AF1%0A%3Ci%20class%2F='kb%20kb-Line-End'%3E%3C%2F%2Fi%3E%0A%22%0A%0A%0A!%0A%0A%0AV%0A%0ABT4&=0%0AF10%0A%E2%86%92imp%0A%7C%0A%0A%0A%C2%B9%0A%0A%0AB&_x:1%3B&=0%0AF10%0A%E2%86%92imp%0A%7C%0A%0A%0A%C2%B9%0A%0A%0AN&=1%0AF1%0A%3Ci%20class%2F='kb%20kb-Line-Start'%3E%3C%2F%2Fi%3E%0A%22%0A%0A%0A!%0A%0A%0AM&=2%0AF2%0A%3Ci%20class%2F='kb%20kb-Arrows-Down'%3E%3C%2F%2Fi%3E%0A'%0A%0A%0A%2F@%0A%0A%3C%0A,&=3%0AF3%0A%3Ci%20class%2F='kb%20kb-Arrows-Up'%3E%3C%2F%2Fi%3E%0A%2F=%0A%0A%0A%23%0A%0A%3E%0A.&=,%0A%0A%3Ci%20class%2F='kb%20kb-Line-End'%3E%3C%2F%2Fi%3E%0A%2F:%0A%0A%0A%C2%B2%0A%0A%2F:%0A%2F%3B&=+%0A%3Ci%20class%2F='kb%20kb-Multimedia-FastForward-End'%3E%3C%2F%2Fi%3E%0A%3Ci%20class%2F='kb%20kb-Arrows-Bottom-3'%3E%3C%2F%2Fi%3E%0A%2F:%2F=%0A%0A%0A%C2%B3%0A%0A%3F%0A%2F%2F%0A%0ABTCLR%3B&@_x:3%3B&=%0ANorm%0A%0A%0A%0A%0A%0A%0A%0ANum%0A%0Atap%20%2F=%20trava&_a:7%3B&=%E2%8E%B5&_a:4%3B&=%0A%0A%0AProg%0A%0A%0A%0A%0A%0ANav%0A%0Atap%20%2F=%20trava&_x:1%3B&=%0A%0A%0AProg%0A%0A%0A%0A%0A%0ANav%0A%0Atap%20%2F=%20trava&_a:7%3B&=%E2%8F%8E&_a:4%3B&=%0ANorm%0A%0A%0A%0A%0A%0A%0A%0ANum%0A%0Atap%20%2F=%20trava) · [abrir COLEMAK-DH no KLE](https://www.keyboard-layout-editor.com/##@@_c=%23ffffff&fa@:1&:1&:2&:2&:0&:0&:2&:2&:2&:4&:2&:1%3B%3B&=*%0A%3Ci%20class%2F='kb%20kb-Multimedia-Play-Pause'%3E%3C%2F%2Fi%3E%0A%0A%0A%0A%0A%C2%BA%0A%0A%22%0A'%0A%0AStu&=%2F%2F%0A%0A%3Ci%20class%2F='kb%20kb-Arrows-Left'%3E%3C%2F%2Fi%3E%0A%3C%0A%0A%0A%C2%AA%0A%0A%0AQ&=9%0AF9%0A%3Ci%20class%2F='kb%20kb-Arrows-Bottom-4'%3E%3C%2F%2Fi%3E%0A%7B%0A%0A%0A%2F_%0A%0A%0AW%0A%0A%E2%86%92Q&=8%0AF8%0A%3Ci%20class%2F='kb%20kb-Arrows-Top-4'%3E%3C%2F%2Fi%3E%0A%5B%0A%0A%0A*%0A%0A%0AF%0A%0A%E2%86%92C&=7%0AF7%0A%3Ci%20class%2F='kb%20kb-Arrows-Right'%3E%3C%2F%2Fi%3E%0A(%0A%0A%0A%2F&%0A%0A%0AP&=%0AF12%0A%3Ci%20class%2F='kb%20kb-Arrows-Top-3'%3E%3C%2F%2Fi%3E%0A%2F%2F%0A%0A%0A%C2%A7%0A%0A%0AB&_x:1%3B&=%0AF12%0A%3Ci%20class%2F='kb%20kb-Arrows-Top-3'%3E%3C%2F%2Fi%3E%0A%2F%2F%0A%0A%0A%C2%A7%0A%0A%0AJ&=7%0AF7%0A%3Ci%20class%2F='kb%20kb-Arrows-Left'%3E%3C%2F%2Fi%3E%0A(%0A%0A%0A%2F&%0A%0A%0AL%0A%0AUSB&=8%0AF8%0A%3Ci%20class%2F='kb%20kb-Arrows-Bottom-4'%3E%3C%2F%2Fi%3E%0A%5B%0A%0A%0A*%0A%0A%0AU%0A%0ABLE&=9%0AF9%0A%3Ci%20class%2F='kb%20kb-Arrows-Top-4'%3E%3C%2F%2Fi%3E%0A%7B%0A%0A%0A%2F_%0A%0A%0AY&=%2F%2F%0A%0A%3Ci%20class%2F='kb%20kb-Arrows-Right'%3E%3C%2F%2Fi%3E%0A%3C%0A%0A%0A%C2%AA%0A%0A%0A%C3%A7&=*%0A%3Ci%20class%2F='kb%20kb-Multimedia-Play-Pause'%3E%3C%2F%2Fi%3E%0A%0A%0A%0A%0A%C2%BA%0A%0A%60%0A%C2%B4%0A%0ABOOT%3B&@=-%0A%3Ci%20class%2F='kb%20kb-Multimedia-Rewind-Start'%3E%3C%2F%2Fi%3E%0A%E2%87%A7%0A%0A%0A%0A%C2%AC%0A%0A%0A%E2%87%AA%0A%E2%87%A7&=.%0AMute%0A%3Ci%20class%2F='kb%20kb-Multimedia-Back'%3E%3C%2F%2Fi%3E%0A%3E%0A%0A%0A%C2%A3%0A%0A%0AA%0A%E2%8C%83&=6%0AF6%0A%3Ci%20class%2F='kb%20kb-Multimedia-Down'%3E%3C%2F%2Fi%3E%0A%7D%0A%0A%0A%C2%A8%0A%0A%0AR%0A%E2%87%A7&=5%0AF5%0A%3Ci%20class%2F='kb%20kb-Multimedia-Up'%3E%3C%2F%2Fi%3E%0A%5D%0A%0A%0A%25%0A%0A%0AS%0A%E2%8C%A5&=4%0AF4%0A%3Ci%20class%2F='kb%20kb-Multimedia-Play'%3E%3C%2F%2Fi%3E%0A)%0A%0A%0A$%0A%0A%0AT%0A%E2%9D%96&=%2F=%0AF11%0AI%E2%87%84M%0A%5C%0A%0A%0A%C2%B0%0A%0A%0AG&_x:1%3B&=%2F=%0AF11%0AI%E2%87%84M%0A%5C%0A%0A%0A%C2%B0%0A%0A%0AM&=4%0AF4%0A%3Ci%20class%2F='kb%20kb-Multimedia-Back'%3E%3C%2F%2Fi%3E%0A)%0A%0A%0A$%0A%0A%0AN%0A%E2%9D%96&=5%0AF5%0A%3Ci%20class%2F='kb%20kb-Multimedia-Down'%3E%3C%2F%2Fi%3E%0A%5D%0A%0A%0A%25%0A%0A%0AE%0A%E2%8C%A5&=6%0AF6%0A%3Ci%20class%2F='kb%20kb-Multimedia-Up'%3E%3C%2F%2Fi%3E%0A%7D%0A%0A%0A%C2%A8%0A%0A%0AI%0A%E2%87%A7&=.%0AMute%0A%3Ci%20class%2F='kb%20kb-Multimedia-Play'%3E%3C%2F%2Fi%3E%0A%3E%0A%0A%0A%C2%A3%0A%0A%0AO%0A%E2%8C%83&=-%0A%3Ci%20class%2F='kb%20kb-Multimedia-Rewind-Start'%3E%3C%2F%2Fi%3E%0A%E2%87%A7%0A%0A%0A%0A%C2%AC%0A%0A%5E%0A~%0A%0ARST%3B&@=+%0A%3Ci%20class%2F='kb%20kb-Multimedia-FastForward-End'%3E%3C%2F%2Fi%3E%0A%3Ci%20class%2F='kb%20kb-Arrows-Bottom-3'%3E%3C%2F%2Fi%3E%0A%2F:%2F=%0A%0A%0A%C2%B3%0A%0A%7C%0A%5C%0A%0ABT0&=,%0A%0A%3Ci%20class%2F='kb%20kb-Line-Start'%3E%3C%2F%2Fi%3E%0A%2F:%0A%0A%0A%C2%B2%0A%0A%0AZ%0A%0ABT1&=3%0AF3%0A%3Ci%20class%2F='kb%20kb-Arrows-Down'%3E%3C%2F%2Fi%3E%0A%2F=%0A%0A%0A%23%0A%0A%0AX%0A%0ABT2&=2%0AF2%0A%3Ci%20class%2F='kb%20kb-Arrows-Up'%3E%3C%2F%2Fi%3E%0A'%0A%0A%0A%2F@%0A%0A%0AC%0A%0ABT3&=1%0AF1%0A%3Ci%20class%2F='kb%20kb-Line-End'%3E%3C%2F%2Fi%3E%0A%22%0A%0A%0A!%0A%0A%0AD%0A%0ABT4&=0%0AF10%0A%E2%86%92imp%0A%7C%0A%0A%0A%C2%B9%0A%0A%0AV&_x:1%3B&=0%0AF10%0A%E2%86%92imp%0A%7C%0A%0A%0A%C2%B9%0A%0A%0AK&=1%0AF1%0A%3Ci%20class%2F='kb%20kb-Line-Start'%3E%3C%2F%2Fi%3E%0A%22%0A%0A%0A!%0A%0A%0AH&=2%0AF2%0A%3Ci%20class%2F='kb%20kb-Arrows-Down'%3E%3C%2F%2Fi%3E%0A'%0A%0A%0A%2F@%0A%0A%3C%0A,&=3%0AF3%0A%3Ci%20class%2F='kb%20kb-Arrows-Up'%3E%3C%2F%2Fi%3E%0A%2F=%0A%0A%0A%23%0A%0A%3E%0A.&=,%0A%0A%3Ci%20class%2F='kb%20kb-Line-End'%3E%3C%2F%2Fi%3E%0A%2F:%0A%0A%0A%C2%B2%0A%0A%2F:%0A%2F%3B&=+%0A%3Ci%20class%2F='kb%20kb-Multimedia-FastForward-End'%3E%3C%2F%2Fi%3E%0A%3Ci%20class%2F='kb%20kb-Arrows-Bottom-3'%3E%3C%2F%2Fi%3E%0A%2F:%2F=%0A%0A%0A%C2%B3%0A%0A%3F%0A%2F%2F%0A%0ABTCLR%3B&@_x:3%3B&=%0ANorm%0A%0A%0A%0A%0A%0A%0A%0ANum%0A%0Atap%20%2F=%20trava&_a:7%3B&=%E2%8E%B5&_a:4%3B&=%0A%0A%0AProg%0A%0A%0A%0A%0A%0ANav%0A%0Atap%20%2F=%20trava&_x:1%3B&=%0A%0A%0AProg%0A%0A%0A%0A%0A%0ANav%0A%0Atap%20%2F=%20trava&_a:7%3B&=%E2%8F%8E&_a:4%3B&=%0ANorm%0A%0A%0A%0A%0A%0A%0A%0ANum%0A%0Atap%20%2F=%20trava)<!-- /KLE_LINKS -->
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

**Permalink:** <!-- DRAWER_LINK -->[abrir completo no keymap-drawer](https://caksoylar.github.io/keymap-drawer?keymap_yaml=H4sIAAAAAAAC_-VZSXPjRBS-T9X8h2Y1MMSxJMcbBHAc2cnE28h2MsNm2rEcVLEkI8uZCgxcqMpcpiDM8A9YhmGpooALHJN_4l-C5H6tpdOyNYlvyeV7ev2WXr73WlaG-Nic2IWbNxD6XD_sHqrHPRNb_QLaNy1DvXljiI9Vazwbv7MnK-17M3EFJZw_It0hsEdAJqAQaBO4R6BDYJtAg0CTgF1AZ_-4IkLjAkp8kvDUpWKzRQY-LaBqa6vc9oaKvr7UVqqePsp-09cXq7667KsrHZhdhcCWZ3TbM1I8I0e946uDIau-OjSD86f-QGjKia8S3uo_9rQf-jvyAHbkfQJ3CZQI7BLYIFAnUIOTehM8k17Yt_ywBX-jV33tu7623ql5U7bxaN228BEmo9PTH3yz4m6U2fzR6bffLM5ValTlWnGn4G8X0A8h-3ikOtYWNsY8PpZDLIMNuk2gGqIlkJScUAQhOekiGcq3jaKsEkHZFp-y7WjK1vzt5FNW5lN2O4KyjbiM5S_4AoU5ZlxOb4aovcPWI9CanzQZPXSB-3yzC8XAN4tkLN8cKiYiVlSRLMUc6uyqy2gqjUq3da-GHrgT8C4Dgm_D4xfwnPgAhNfmNRnNOP9jXzMRtj6DFjV99PX05BSN8BAfWdAnmhW0WffETjNg-ThsSWfj4TtU-JIKH4Hw-rxOqxn2YHryvaaPhtAvZFoWm409mAudiLJd2YLBQPkU1iEhbbOJ9QR7fyZepIKX2EKjVeTmhf3YatTgXtXPn9lm30TTkyes4ju4gOtQOANND2zpdeRqvaHUKFc7NeDq2X-AvxLswua_QU_hVRDOnjI0ylIhR4U8CKtMjLPfAeF-PPsFDF4Bg5dB_yfLijQV1qiQCd_eiRWa42_Av2DgJerxHhVeoKb_giJFRwQqiFSQEszbwq3ry5tyHbjSbIYpUM4D5gCzgILIClnGMh-ORCM3FXnXm2Gt05Z5rwflDOAaYJpmExjBfZlN82994nzx2ifBOfd-aDaBq9-fcl2-22Y2SAL09oNi6oLAWErhSH7s68jAUqNe3q4AC1v2pK-Z4e1xLj3yc8x7hFfkiCsQsNOCN-CNqsy32Gg02vNjXBUVuSX7R7vhv8l67YlRC3y1yFdLfHX6krPdaKNSVQnr5lKMDTCXFK7Rvqn3TPcX9goawYkLUODCrDYPnZUUW7PzGoKBd9gBH-gwohDfB2ovDR7AzzkO0NXysR1EaF1ijrqQeprjIkFnkKT4LgTWqEPrWF_gAdPKxfcQoPkKWfBpxvCB7i-m4vuIsMci3eRyfdHqoaVKYlwPcBAoVUrlCtcDITzUDgyHsubIfTIHg7HqEDqVXAstUwrS1ok3ffhTMB7tVIFFwhmLYlwPryToIU8f_bwgR4opiIUe3hFnPI_fFnjkmQNe7JFhaDR9-OMCj1wwVxwPlqnyeH--QyaYKY4D25-gw0U7ZNk1LHJIh0t6TzNutXEv6ENYHkVQkbO-7FKCZcOtA_ewc_2eBoOFf3fEDpwLN1cS-PHlAuc5bV4Kd_vi0H6eXRCSqahd8Od8tZheI6MVu6n2JgfYCoYLf38IhO6Ztm3q4eiZUPR8RJaSqY-04RXS5LjXF21tLVsdIfNIvWx8MSlxl8HmKdrnz5Cl2s53e_PSqUJ9XRKZm3i2FOeziLnkE2HzFI-cEEs7EOC9RIm_bYxHqvPBycDLPhI2U7HfR5OxOl7ScUBPlGhTVFTD1NVl1Uc6FXEaNZe8aGjAJyb_LcH9jTI3QyqZ5mZgqetnePKcGYSkE6tv4fvdfdMYaAczT-efWN37BZRJ0wfnB0Bmlnv2ru2OSYFHZ5S8phpOkOFEN5yPgLMZjtURtrCtdoldX8MHFtad0QEejlXXoo-tw65u9p23ejxxy-J_cXRQfU8bAAA%3D) · [abrir guia de combos](https://caksoylar.github.io/keymap-drawer?keymap_yaml=H4sIAAAAAAAC_-VYy3LjRBTdpyr_0DwFDJlYkuMXBHAc2cnEr5HtZAIMpmMrQRVbMrKcqcDAhqrMZgrCwB_wGIZHFQVsYOn8ib8ESX1b7W63DMWwizfn6t6j263b53ZLHuBzd-IXVlcQ-mh42j21zo9c7PULqOd6jrW6MsDnljeO4rcPDLN9GJlrSAl-xLpN4ICAQcAk0CZwSKBDYJdAg0CTgF9A0z9CE6FxASnvK7G7VGy2SOCDAqq2dsrtOFRk_lLbrMb-JP428xerzF1m7koHZlchsBOTbsUkMyYF7j3mnk9ZZW5uBlePWYCbsvKpEj_9e7H3XVaR-1CRtwncIVAisE9gi0CdQA1W6lW482ac9jWWtsAKvc68bzJvvVOLp-zj0abv4TNMorPLbxituJ9EWx6dffH5P49ValSNWnGvwMoF8kPIPx9ZAdvDzlimxzKnMijQLQJVTpYgUrJCCYKUDJeoUDk3SbJmgmRbcsm2kyVbY-WUS9aQS3Y3QbKNf6tY-QMvSFhCk2p6m5P2ntiPIGv5oDeTQwval9MWmkFOS1SsnA4dk5ArqUn-Fzr02dM-RtNsVLqtwxq6H04gPgwIvg6XH8O18g4YLy3bZGzn6pee7SLsfQhb1OzhZ7OLSzTCA3zmwT7RrKDtemx2mnPMRzyTzibGN6jxCTXugvHysp3Wdvzj2cXX9nA0gP3CoG2x3TiAudCJmLuVHQjOtU9hEwak26yyqYjnp_IsNeKBPTRaR-G4UI-dRg3O1eHVE9_tu2h28ZXo-BIO4Do0zrE9nCvpddRqvWHWqFY7NdDq9C_AHwl2ofiv0FV4EYzpY0FGWWrkqJEHY13IMf0ZEM7H6Q9AeAEIz4P_V1EVaWpsUCPDn97KGh3jd8DfIPAcveMtajxDqX-CI0UjKjU0auiK8LZw4_rqplwHrTSbvATKecAcYBZQ1UQjKzDzfCaauWka-_EMa522IXs9KGcANwDTdDRVMMKX2bT81Cc3Lx77JLnk3OdmM3f0synXjTttoUA6YFwPiqkFQ2DqfCaW-zoqsNSol3croMKWP-nbLl-e4NAjn2PxJbwiJxyBgJ0WvAFvVQ05Y6vRaC_P8bRoGi2DLe0We5ONtyfBrcrdmtyty93p_zjbrTYqVU3et1RiYoKloghJPXd45IZf2GtoBCuuQoOrUW-eBk9SbBkcAbYTTU0gQFelIRwpj0Vhc8rLoxpsN1qOxsMeYHEdWlfXE-IENmi0dT6cD0P2XEJYhU1OzQKhKRJgS9VSCQQNHk-jz1euc9ODHUjXpGGIqrSypXKFG12fX6IgPnvwHTc4FEfT5PF4aWl5Zg-_5-5PCSsrxOPyZOL4T1JlpBLiGaG8swffyqqr5uVxcXWMcU-yuGpOHhZ1HXXGgi7Z2Hw4zQvrwHZutPGRZPhsMiPLqw8f4WDzvJxn5PjmIIxHkubS-R4rDvxlg7GMEmKsSbrq29bR5AR7HCefwC25w5E9EMiqIPKWb42Qe2bJU4rson_1BHmWH_wH6HI3aELrR2mDDyVXmlZkF8_wwBYmClXUaRl3nfHICj4HnYSnF_nFfh9NxtaYI4NSdCoV03LcocVnTKcSZlkLy4QGTvRJJeGLxWL84Jus7-F73Z7rHNsn0X3BH6rdewWUSdOL4DDKRJmifT-M6XOXQZRsv06QZDAZOsEHaTTe2BphD_tWl_D6Nj7x8HAcniYTKyT0sXfaHbr94IDBE99lKSm1O-7hQRDVVlf-Bo1pbQf1FQAA)<!-- /DRAWER_LINK -->
**No site** <https://keymap-drawer.streamlit.app/>: use o permalink acima, ou cole o
[`keymap.yaml`](keymap.yaml) na aba principal e o [`keymap_drawer_config.yaml`](keymap_drawer_config.yaml)
na aba *Configuration*.
Layers espelhadas são **mescladas num diagrama só** — metade esquerda mostra uma, direita a outra:
**PROG_SYM | NAV** e **NORM_SYM | NUM**. Combos espelhados aparecem **uma vez** (lado direito,
direção física). Cada grupo tem seu diagrama: QWERTY = edição · COLEMAK = troca de layer ·
NORM_SYM | NUM = abas · FN = janelas · PROG_SYM | NAV = Delphi (bandas abaixo do teclado) ·
CONFIG = mover linha.
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

### 2 — NAV (coluna = direção, linha = alcance; **direcionais mantêm o sentido físico**)

```
  —      ⌃←     PgDn   PgUp   ⌃→     ⌃Home      ⌃Home   ⌃←     PgDn   PgUp   ⌃→     —
 Shift   ←      ↓      ↑      →      intf⇄      intf⇄   ←      ↓      ↑      →     Shift
 ⌃End    Home   mét.↓  mét.↑  End    →impl      →impl   Home   mét.↓  mét.↑  End   ⌃End
```
As duas metades têm a **mesma ordem esquerda→direita** (← sempre mais à esquerda que →,
como nas arrow keys) — comandos direcionais não são espelhados por dedo.
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

### Janelas / abas (row superior) *(diagramas: FN = janelas · NORM_SYM | NUM = abas)*

| Esquerda | Direita | Ação |
|----------|---------|------|
| 4+5 | 6+7 | Win+Tab |
| 2+3 | 7+8 | aba ← (Ctrl+Shift+Tab) |
| 3+4 | 8+9 | aba → (Ctrl+Tab) |
| 2+3+4 | 7+8+9 | Alt+Tab |

Direcionais seguem a posição física: par mais à esquerda = aba ←.

### Delphi — tudo na row inferior + polegares *(diagrama: PROG_SYM | NAV — bandas abaixo; mover linha no CONFIG)*

Par adjacente = comando base · **par + polegar interno** (38/39) = variante com modificador ·
**par + Space/Enter** (37/40) = mover linha.

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
| **Mover linha ↑** | Shift+Alt+↑ | 37+26+27 | 40+32+33 |
| **Mover linha ↓** | Shift+Alt+↓ | 37+27+28 | 40+31+32 |

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
