---
type: bug
impact: high
effort: med
site: packages/language-tools/marko.internal.d.ts › DynamicRenderer
---

# Match `DynamicRenderer` against an optional body attribute instead of falling back to `DefaultRenderer`

`DynamicRenderer` tests `[Name] extends [AnyMarkoBody]`, which is false for the `Marko.Body<...> | undefined` that an optional `content?: Marko.Body<[A, B]>` yields, so `<${input.content}(a, b)/>` resolves to `DefaultRenderer` -- `<Input>(input: Input) => ...`, a single unconstrained parameter. Two things break at once: a multi-parameter body reports `TS2554 Expected 1 arguments, but got 2` even though marko-js/marko's `packages/runtime-tags/cheatsheet.md` documents `<${input.content}(x, y)/>` and the runtime renders it, and a single-parameter body silently accepts an argument of the wrong type, so `content?: Marko.Body<[string]>` invoked as `(123)` type-checks clean. The same interface declared non-optional (`content: Marko.Body<[A, B]>`) is correct in both directions, which is why the docs' own required-`content` example never exposed it. Strip `undefined` before the `AnyMarkoBody` test in both the direct branch and the `DefaultBodyContentKey` branch below it.

Check: type-check `export interface Input { content?: Marko.Body<[string, number]> }` with `<${input.content}("a", 1)/>`; `mtc` reports TS2554 today and should report nothing. The same file with `content?: Marko.Body<[string]>` invoked as `<${input.content}(123)/>` reports nothing today and should report TS2345.
