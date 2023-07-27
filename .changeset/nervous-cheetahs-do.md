---
"@marko/language-server": patch
"@marko/language-tools": patch
"@marko/type-check": patch
"marko-vscode": patch
---

Fix issue where directory names instead of file names were being passed to `createRequire` causing some lookups to be one directory too high and missing resolving installed modules.
