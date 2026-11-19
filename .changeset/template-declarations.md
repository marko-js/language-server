---
"@marko/language-tools": major
"@marko/language-server": minor
"@marko/ts-plugin": minor
"@marko/type-check": minor
"marko-vscode": minor
---

A template's declaration is now the one TypeScript emits for its script, which `mtc` writes as `x.d.marko.ts` (where it wrote a Marko syntax `x.d.marko`). It names only Marko's public types, as one written by hand would, so it is typed by whatever tools and runtime read it: `Marko.Template<Input, Return>`, or for a generic template `Marko.TemplateOf<<T>(input: Input<T>) => Return>`, its signature (which Marko's types declare as of `marko` 5.41 and 6.5, so a generic template is typed with at least those), from which a tag infers its type arguments. A generic template's own methods (`render`, `mount`, …) take its input for its type parameters' constraints, so a caller with a given input asserts it as a template of that input: `const numbers = List as Marko.Template<Input<number>>;`. A tag of a template is checked against the template's input alone, so its errors name that input, and Marko 5's directives (`key`, `no-update`, …), which a Class API template checks apart, are no longer offered among its attributes; a Tags API template has none, so they are attributes passed to its input. A legacy `x.d.marko` written by hand beside a template still stands in for it, and ships as it is written. A template no longer exports `"~api"`, the API it is written in: `@marko/run` reads that from a Class API template's `Component`.

A template's code is checked as the function the template's value is typed from: `input` is its parameter (its hover reads `(parameter) input: Input`) and `this` is the module's `undefined`, so reading a property of `this` reports that it is possibly undefined.

`Processors`' `printTypes`, the print context's `printer`, `typeChecker`, `sourceFile` and `formatSettings`, and the `INTERNAL_API_VAR` and `INTERNAL_API_EXPORT_NAME` exports are removed from `@marko/language-tools`: the declaration is TypeScript's own.
