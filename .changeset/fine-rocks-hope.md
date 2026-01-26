---
"@marko/language-server": patch
"@marko/language-tools": patch
"@marko/type-check": patch
"marko-vscode": patch
---

Improve tag var mutation codegen to be separate from scope handling which fixes an issue where some tags change handlers were not being output.
