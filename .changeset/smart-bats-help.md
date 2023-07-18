---
"@marko/language-server": patch
"marko-vscode": patch
---

Ensure consistent ordering of results returned from merged language server plugins. Previously response order was determined by the order in which individual plugins (css, typescript, marko and html) responded asynchronously, now it is always in a preset order.
