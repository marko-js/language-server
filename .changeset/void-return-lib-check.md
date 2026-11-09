---
"@marko/language-tools": patch
---

Declare `Marko._.voidReturn` in `marko.internal.d.ts` instead of initializing it, so the file type checks in a project without `skipLibCheck` (it reported TS1254, "A 'const' initializer in an ambient context must be a string or numeric literal").
