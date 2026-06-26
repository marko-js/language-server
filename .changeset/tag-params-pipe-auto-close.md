---
"@marko/language-server": patch
"marko-vscode": patch
---

Stop auto-closing the `|` pair while the cursor is inside a tag's TS-type regions (its params, type params or type args), where a `|` is a union operator (eg `<my-tag|value: A | B|>`) rather than the start of tag params. The `|` pair still auto-closes everywhere else, so typing the start of tag params keeps inserting the matching pipe.
