---
"@marko/language-tools": patch
---

Fix overlapping mappings in extractor now always leading to consistent tokens. This was a problem for eg default values which sometimes linked to the value attribute instead of the literal value expression.
