---
"@marko/language-tools": minor
"@marko/language-server": minor
"@marko/ts-plugin": minor
"@marko/type-check": minor
"marko-vscode": minor
---

A template with a `x.d.marko.ts` beside it is typed by that declaration in the editor and in `mtc`, as a `.js` file is by its `.d.ts`, and as TypeScript itself reads one for an import of `x.marko`. A legacy Marko syntax `x.d.marko` is read as before, where there is no `x.d.marko.ts`. `@marko/language-tools` adds `getTemplateDeclaration`, which finds a template's declaration as they do.
