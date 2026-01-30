---
"@marko/language-server": patch
"@marko/language-tools": patch
"@marko/type-check": patch
"marko-vscode": patch
---

Hoist types from control flow now do not cause the return type of the hoist to be undefined.
