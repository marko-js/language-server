---
type: bug
impact: med
effort: low
site: packages/language-tools/marko.internal.d.ts › forOfTag
---

# Widen `<for by>`'s typed return to `string | number` so numeric keys type-check

The runtime accepts a string or a number loop key: `assertValidLoopKey` throws only when the key is neither, the key is used directly as a `Map` key with no string coercion, and the runtime `by` callback is typed `=> unknown`. But the type surface consumed by `mtc` and the IDE narrows every `by` to `=> string`: `forOfTag`, `forInTag`, `forToTag`, `forUntilTag`, and the merged `forTag` type `by` as `((item, index) => string) | string`. So `by=(todo) => todo.id` where `id: number | string` fails TS2322, while the string shorthand `by="id"` returns the same numeric key at runtime and type-checks, an internal inconsistency. The 5-to-6 migration guide recommends the failing spelling, so porting the flagship TodoMVC keyed off a numeric `id` hits a type error out of the box and forces `String(todo.id)`. Change the `=> string` returns to `=> string | number`, not `PropertyKey`, since the runtime rejects symbols. The runtime authority for the contract is marko-js/marko's `common/errors.ts` › `assertValidLoopKey`.

Check: type-check a template with `<for|todo| of=todos by=(todo) => todo.id>` where `id` is `number`; `mtc` reports TS2322 today.
