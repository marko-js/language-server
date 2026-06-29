---
"@marko/language-server": patch
"marko-vscode": patch
---

Only auto-close the `|` pair when typing the start of a tag's params (eg `<for█>` becomes `<for|item|>`). It no longer auto-closes anywhere else — inside the params themselves (where a `|` is a TS union operator, eg `<my-tag|x: A | B|>`), in type args, attributes or tag bodies — so a stray `|` is no longer inserted while writing those.
