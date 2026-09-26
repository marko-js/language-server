---
type: bug
impact: med
effort: low
site: packages/language-tools/marko.internal.d.ts › forInTag
---

# Type `<for in>`'s `by` as `(key, value)` and drop the `all` body param for Tags API templates

`forInTag` types `by?: (value: Value[keyof Value], key: keyof Value) => string`, but the Marko 6 runtime passes the key first: `forInBy` in marko-js/marko's `packages/runtime-tags/src/html/for.ts` calls `by(name, value)`, and `_for_in` in `dom/control-flow.ts` calls `by(key, value)`. The editor therefore swaps the two parameter types, so `by=(key) => key` is typed as returning the value. `forOfTag` also types a third `all` body parameter, which Marko 6 rejects at compile time, so `<for|item, index, all| of=list>` type-checks and then fails the build. Direction: Marko 5 only allow-lists `by` (`runtime-class/src/translator/taglib/core/translate-for.js`) and never calls it, so fix the `by` order for both APIs. `all` is valid in the Class API, so drop it only when the extractor's `#api` is `tags`, for example with a Tags-specific `forOfTag` signature. The `script/for-tag` language-server fixture pins both wrong forms, so regenerate its snapshot.

Check: `packages/language-server/src/__tests__/fixtures/script/for-tag/__snapshots__/for-tag.expected/index.md` hovers `(parameter) all: readonly [...]` in `<for|item, index, all| of=list>` and `(parameter) value: 1 | 2` on the first parameter of `<for in=record by=(value, key) => ...>`. In marko-js/marko, `pnpm run compile -- -o dom -d x.marko` on `<for|item, index, all| of=[1]>${all}</for>` fails with an error saying the `<for>` tag "only provides `|item, index|` with `of=`".
