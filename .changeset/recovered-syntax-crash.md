---
"@marko/language-tools": patch
---

Stop a template's analysis from throwing on script that Babel recovers into parser-only nodes (eg `tion update(y: number) {}` being typed in a handler that assigns a tag variable), which failed the language server's TypeScript features for the file and crashed `mtc`.
