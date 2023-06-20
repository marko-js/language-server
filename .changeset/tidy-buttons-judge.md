---
"@marko/language-server": patch
"@marko/language-tools": patch
"@marko/type-check": patch
"marko-vscode": patch
---

Downgrade the strip-json-comments module to match the version used by Marko. The latest version does not work in commonjs environments.
