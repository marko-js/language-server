---
"@marko/language-server": patch
"marko-vscode": patch
---

Format with Prettier 3.10, so the scripts in a template are printed as it prints them: eg a union type after `as` or `=` that fits on the next line stays on it instead of being broken onto lines that start with `|`, and a JSDoc comment before an immediately invoked function moves inside its parentheses.
