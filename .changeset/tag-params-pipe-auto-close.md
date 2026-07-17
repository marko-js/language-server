---
"marko-vscode": patch
---

Stop auto-closing the `|` pair. It's a tag-params delimiter, but it more often shows up as an operator (eg a TS union `x: A | B` in tag params), where auto-closing inserted a stray `|`. Bracket matching and wrapping a selection in `|` are unaffected.
