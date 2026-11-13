---
"@marko/language-tools": patch
"@marko/language-server": patch
"@marko/type-check": patch
---

Type a template's `render`, `mount` and other methods with the Marko runtime's own `Marko.Template` rather than a copy of its methods in every template, so hovers on them show the runtime's documentation and the generated code is smaller (by over a third for `marko@5` templates) and go to definition from one lands in the runtime's types. A template's class is declared rather than written as an expression, so `mtc` writes declarations without spelling out each template's members (a tenth faster on large projects). On `marko@5` a template's `render` and `renderSync` return the runtime's `Marko.Out` and `Marko.RenderResult` (whose `getComponent()` is a `Marko.Component`, rather than the template's own component), and a generic template's `render` takes what the runtime's does (with marko 5.40.3 or later, a stream or a callback). `extractScript`'s `runtimeTypesCode` option and `Project.getTypeLibs()`'s `markoTypesCode` are no longer used and are deprecated.
