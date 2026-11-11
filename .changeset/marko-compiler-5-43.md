---
"@marko/language-tools": patch
"@marko/language-server": patch
"@marko/type-check": patch
"@marko/ts-plugin": patch
"marko-vscode": patch
---

Build against `@marko/compiler` 5.43 and `marko` 5.40, whose taglib discovery reads only what is used. A project without Marko installed is read with them, and the bundled Marko types read a template's input and return types from `Marko.Template` alone. A tag whose `marko.json` entry or `marko-tag.json` fails to load is reported on the tags that use it.
