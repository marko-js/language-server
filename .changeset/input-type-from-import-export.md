---
"@marko/language-tools": patch
"@marko/language-server": patch
"@marko/type-check": patch
"@marko/ts-plugin": patch
"marko-vscode": patch
---

Detect the `Input` type when it is imported into the module scope (eg `import { Input } from "..."` or `import type { Input } from "..."`) instead of only an inline `interface`/`type` declaration.
