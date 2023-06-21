---
"@marko/language-server": patch
"@marko/language-tools": patch
"@marko/type-check": patch
"marko-vscode": patch
---

Fixes an issue where Marko files within node_modules without an explicit `marko.json` were not being loaded. Internally this switches to a new api that should not be tripped up by either export maps and / or a missing `marko.json` when trying to resolve Marko files.
