---
type: bug
impact: med
effort: med
site: packages/language-tools/src/extractors/script/index.ts › #writeTag
---

# Honor union type annotations on tag variables instead of collapsing to the initializer's type

A parenthesized union annotation on a tag variable parses, compiles, and runs, but `mtc` narrows the variable to the initializer's type instead of the declared union: `<let/e:(number | string) = 5>` then `e = "hi"` in a handler errors TS2322 "'string' is not assignable to type 'number'", and `<let/x:(number | undefined) = undefined>` types `x` as `undefined` so every later assignment errors. Non-union annotations are honored (`<let/d:string = 5>` correctly rejects the initializer), so the annotation is not ignored wholesale; the union is re-inferred against the initializer, unlike plain TS `let e: number | string = 5` which keeps the union. That defeats the main reason to annotate a tag variable, and the only working spelling today is casting the initializer, `<let/x=(undefined as number | undefined)>`. The tag variable is emitted where `tag.var` is copied in `#writeTag`; the annotation should become the `T` type argument of the `Input<T, K = T>` declared by marko-js/marko's `packages/runtime-tags/tags/let.d.marko`, rather than an inference site combined with the value.

Check: type-check a template containing `<let/e:(number | string) = 5>` plus an assignment of a string to `e`; `mtc` reports TS2322 today and should report nothing.
