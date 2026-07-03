---
"@marko/language-server": patch
"@marko/language-tools": patch
"@marko/ts-plugin": patch
"@marko/type-check": patch
"marko-vscode": patch
---

Upgrade `htmljs-parser` to `^5.12.1`, which fixes a parse error where a `<`/`>` comparison inside a `static`/`server`/`client` function with a return-type annotation was treated as a generic bracket, swallowing the rest of the template (e.g. breaking "Show Extracted Script Output").
