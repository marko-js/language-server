---
"@marko/language-tools": patch
"@marko/type-check": patch
"@marko/language-server": patch
"marko-vscode": patch
---

Fix issue where mtc was striping `Input` type if it was an empty interface with an extends clause.
