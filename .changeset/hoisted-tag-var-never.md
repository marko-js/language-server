---
"@marko/language-server": patch
"@marko/language-tools": patch
"@marko/ts-plugin": patch
"@marko/type-check": patch
"marko-vscode": patch
---

Fix tag variables being typed `never` when referenced before their declaration or hoisted out of control flow, since `Marko._.hoist` only preserved function-typed values. Most visibly, `<style/styles>` used above the style tag errored with "Property does not exist on type 'never'".
