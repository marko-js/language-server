---
"@marko/language-tools": patch
"@marko/language-server": patch
"@marko/type-check": patch
"marko-vscode": patch
---

A project's own template is typed from its source, whatever `x.d.marko.ts` sits beside it, as a `.ts` file is with a `.d.ts` beside it. The declaration types the template for other projects (eg in a package). A legacy `x.d.marko` still stands in for a template wherever it is.
