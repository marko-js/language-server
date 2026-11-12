---
"@marko/language-tools": patch
---

Find a template's mutated tag variables as they are found rather than by scanning every variable for each tag, which took quadratic time: a template with 3,000 of them now extracts in about 50ms instead of 600ms.
