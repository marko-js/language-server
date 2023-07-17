---
"@marko/language-server": patch
"@marko/language-tools": patch
"@marko/type-check": patch
"marko-vscode": patch
---

Move @marko/compiler to a peerDependency of @marko/type-check to avoid conflicts.
