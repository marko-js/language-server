---
"@marko/language-tools": patch
---

Load the shipped `marko.internal.d.ts` from the installed `@marko/language-tools` rather than resolving it from the project being checked, so `mtc` no longer fails with "Could not resolve marko type files." in pnpm projects where `@marko/language-tools` is only a transitive dependency.
