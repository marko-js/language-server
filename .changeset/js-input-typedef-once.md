---
"@marko/language-tools": patch
"@marko/type-check": patch
---

Bind a JavaScript template's `Input` typedef once: a template whose script declares nothing of its own (eg a split component's) was reported as declaring `Input` twice (TS2300, with no position), so `mtc` failed on a template with no error.
