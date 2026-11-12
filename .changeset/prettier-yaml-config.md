---
"@marko/language-server": patch
"marko-vscode": patch
---

Format with the project's prettier config in VS Code when it is a `.prettierrc` without an extension, a `.prettierrc.yaml`/`.yml` or a `package.yaml` key: the extension's bundle left out the YAML parser prettier reads them with, so they were ignored and the defaults used. A prettier config that cannot be loaded is now reported in a warning rather than silently formatted without.
