---
"@marko/language-tools": patch
"@marko/type-check": patch
"@marko/language-server": patch
"marko-vscode": patch
---

When considering if a Marko file should be parsed as typescript, it will now default to typescript for any file containing `tsconfig`. Previously this would exclusively match `tsconfig.json` which would fail with files like `tsconfig.build.json`.
