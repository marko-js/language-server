---
"@marko/ts-plugin": patch
"marko-vscode": patch
---

Run the bundles in strict mode as intended: the `import.meta.url` banner sat above esbuild's `"use strict"` directive, so it no longer counted.
