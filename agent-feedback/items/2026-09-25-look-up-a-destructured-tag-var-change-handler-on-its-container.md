---
type: bug
impact: med
effort: low
site: packages/language-tools/src/extractors/script/index.ts › ScriptExtractor#writeTag
---

# Look up a destructured tag variable's change handler on its container, not on the property

For `<child/{ a }/>`, `getVarIdentifiers` in `util/attach-scopes.ts` records `objectPath: ".a"`, and `#writeTag` emits `Marko._.change("a", <rendered>.return.a)`. That makes `change` look for `aChange` on the property's value. The compiler reads it from the object being destructured: `a = 2` compiles to a call of `$pattern.aChange` on the child's return value. So when the child returns `{ a, aChange(v: number) { ... } }`, the editor types the assignment target as `any` and accepts `a = "x"`. Direction: pass `change` the path of the object that holds the property (the `objectPath` without its last accessor), with the property name as `sourceName`, so it checks `<sourceName>Change` where the compiler reads it.

Check: add a language-server fixture `script/<name>/` with `tags/child.marko` (`<let/a=1/>` and `<return={ a, aChange(v: number) { a = v; } }/>`) and `index.marko` (`<child/{ a }/>` and `<button onClick() { a = "x"; }>${a}</button>`, with a `^?` under the assigned `a`). `pnpm run test:server` writes a hover of `any` and no diagnostic. In marko-js/marko, compiling the same pair with `pnpm run compile -- -o dom -d` emits `$aChange2($scope, $pattern.aChange)` for the tag variable.
