---
"@marko/language-tools": minor
---

Add `createLanguageService`, a factory for a `ts.LanguageService` over processor files: processor-aware script snapshots (a file that fails to extract checks as an empty file), modified-time based script versions, root names seeded from the processors (with `addRootName` for incremental additions), and config read from `tsconfig.json`/`jsconfig.json`. Also expose `createModuleResolver`, the underlying `resolveModuleNameLiterals` implementation (`<tag>` imports, adjacent definition-file preference, external-package `.marko` resolution) previously private to `@marko/type-check`.
