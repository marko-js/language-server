---
"@marko/language-server": patch
"marko-vscode": patch
---

Format with a prettier or editorconfig config as it is on disk: one created, edited or deleted since the server started was ignored until it restarted, as prettier keeps the configs it loads. The server now has clients watch `.prettierrc*`, `prettier.config.*`, `.editorconfig` and `package.yaml` along with `package.json`, and forgets prettier's configs when one changes. A JS or TS config's edits still need a restart, since Node keeps the module prettier imported.
