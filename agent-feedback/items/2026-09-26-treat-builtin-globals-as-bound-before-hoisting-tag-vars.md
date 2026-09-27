---
type: bug
impact: low
effort: low
site: packages/language-tools/src/extractors/script/util/attach-scopes.ts › crawlProgramScope
---

# Treat builtin globals as bound before hoisting tag vars

The compiler hoists a nested tag var only when a reference fails babel's `Scope#hasBinding`, which also answers true for the JavaScript builtins in babel's `Scope.globals` and `Scope.contextVariables` (`Map`, `Date`, `Error`, `undefined`, `NaN`, and so on). `crawlProgramScope` seeds only module bindings, so a nested `<const/Map=1/>` is hoisted to the program scope and a top-level `Map` read resolves to the tag var, typed `never`, while the compiled template reads the global. Direction: seed the program scope with the same builtin names babel treats as bound (the hoist check is the `hoistableTagVarsByScope` loop in `@marko/compiler`'s patched `Scope#crawl`).

Check: `<let/show=true/>` `<if=show><const/Map=1/></if>` `<span>${typeof Map}</span>` compiled with `@marko/runtime-tags` 6.3.53 (`output: "dom"`) emits `_text(..., typeof Map)` with no `_hoist_resume`; the same template as a language-server fixture writes `const Map = Marko._.hoist(...)` and hovers `Map` as `const Map: never`.
