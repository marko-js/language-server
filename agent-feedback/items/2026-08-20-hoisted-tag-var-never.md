---
type: bug
impact: med
effort: low
site: packages/language-tools/marko.internal.d.ts › hoist
---

<!-- cspell:ignore feild -->

# Type a tag variable read above its declaring tag instead of collapsing it to `never`

`#writeProgram` emits `const x = Marko._.hoist(() => __marko_internal_hoist__x)` for every program-level tag variable, and `hoist` is declared `<T>(value: () => T) => T extends () => infer R ? T & Iterable<R> : never`, so every hoisted variable whose value is not itself a function types as `never`; only reads below the declaring tag pick up the shadowing `const` with the real type. `<div class=styles.field>` written above `<style/styles>.field{...}</style>` therefore reports `Property 'field' does not exist on type 'never'` on markup the compiler lowers to the same `_attr_class(styles.field)` it emits for the working order, and the typo `styles.feild` reports the identical message, so the check cannot separate right from wrong -- put the `<style>` tag first and the correct name passes while the typo becomes a `TS2551` naming `field`. The same collapse rejects the legal handler spelling `<button onClick() { n() }>` above `<let/n=1>`, which compiles to `$n_getter($scope)()`, with `Type 'never' has no call signatures`. A hoisted tag variable's runtime binding is a getter, so its type is `() => T`; a `<style/name>` var is a plain module binding the bundler injects and should not go through `hoist` at all.

Check: type-check `<div class=styles.field>x</div>` followed by `<style/styles>.field{color:red}</style>`; `mtc` reports `TS2339 Property 'field' does not exist on type 'never'` today and should report nothing, as it already does when the `<style>` tag is written first.
