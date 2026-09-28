---
"marko-vscode": patch
---

Highlight attribute values the way the parser now reads them: a `!` directly after an operand (`x!`, `f()!`, `x!!`, `"s"!`) is a non-null assertion that ends the value, `void` in a tag variable's type no longer runs on into the next attribute, and `delete x` stays one value.
