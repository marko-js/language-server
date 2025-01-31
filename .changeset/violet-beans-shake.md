---
"@marko/language-tools": patch
"@marko/language-server": patch
"@marko/type-check": patch
"marko-vscode": patch
---

Fix issue where tag var mutations at multiple levels were causing higher levels to be non writable.
