---
"@marko/language-tools": patch
---

Read the JSDoc `@typedef … Input` (and its `@template` type parameters) of a JavaScript template without TypeScript's parser, so `extractScript` finds it whether or not it is given `ts`. The `ts` option is no longer used and is deprecated.
