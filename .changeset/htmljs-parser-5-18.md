---
"@marko/language-tools": patch
"@marko/language-server": patch
---

Require htmljs-parser 5.18.0, which ends a type at a trailing `void`, reads a TypeScript `!` after an operand as a non-null assertion, reads `delete` as an operator, and reads types in scriptlets, so templates using them are no longer misparsed.
