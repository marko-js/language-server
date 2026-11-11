---
"@marko/language-tools": patch
"@marko/language-server": patch
"marko-vscode": patch
---

Show a core tag's doc comment when its name is hovered (eg `<id>`, `<await>`, or the deprecated `<effect>`), now that Marko documents each core tag above the `Input` of its types, as a template is documented. Hovering a tag whose template or types TypeScript cannot find (eg a core tag where Marko is not installed) no longer shows `any`.
