---
"@marko/language-server": patch
"marko-vscode": patch
---

Avoid using ts.sys.readDirectory for component file scanning (it was extremely slow).
