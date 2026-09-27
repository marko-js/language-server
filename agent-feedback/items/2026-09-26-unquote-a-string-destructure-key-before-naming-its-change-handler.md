---
type: bug
impact: low
effort: low
site: packages/language-tools/src/extractors/script/util/attach-scopes.ts › getVarIdentifiers
---

# Unquote a string-literal destructure key before naming its change handler

For a non-identifier key, `getVarIdentifiers` sets `sourceName` to the raw source of the key, quotes included, so `<child/{ "a-b": x }/>` records `sourceName` `"a-b"` and `#writeTag` emits `Marko._.change("x", "\"a-b\"", ...)`, which looks for a `"a-b"Change` property that cannot exist. The editor then types `x` as read-only and reports `Cannot assign to 'x' because it is a read-only property` on `x = 2`, while the compiler reads `$pattern["a-bChange"]` and the template works. Direction: take `prop.key.value` for a `StringLiteral` key as `sourceName` and keep the raw source only for the accessor.

Check: add a language-server fixture with `tags/child.marko` (`<let/a=1/>` and `<return={ "a-b": a, "a-bChange"(v: number) { a = v; } }/>`) and `index.marko` (`<child/{ "a-b": x }/>` and `<button onClick() { x = 2; }>${x}</button>`); `pnpm run test:server` writes the read-only diagnostic. Compiling the same pair with `@marko/runtime-tags` 6.3.53 (`output: "dom"`) emits `$abChange2($scope, $pattern["a-bChange"])`.
