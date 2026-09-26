---
type: bug
impact: med
effort: low
site: packages/language-tools/src/extractors/script/util/attach-scopes.ts › crawlProgramScope
---

# Seed module bindings into the program scope before hoisting tag variables

`crawlProgramScope` seeds `programScope.bindings` with only `input`. A tag variable declared in a nested body (`<if=show><const/foo=1/></if>`) whose name matches an `import` or `static` binding therefore climbs to the program scope and is hoisted there. The compiler resolves a top-level `${foo}` to the module binding instead: its html output reads the import outside the `if` branch. The editor types that read as the hoisted tag variable (`never`) and reports the import as unused, so a correct template shows a false diagnostic and every use of the import gets the wrong type. Direction: before the hoist walk, add every name bound by `import`, `static`/`server`/`client` and `export` statements to `programScope.bindings`, so the walk stops at them the way it stops at `input`.

Check: add a language-server fixture `script/<name>/` with `foo.ts` (`export const foo = "module";`) and an `index.marko` of `import { foo } from "./foo"`, `<let/show=true/>`, `<if=show><const/foo=1/><div>${foo}</div></if>` and `<span>${foo}</span>`, with a `^?` under the last `foo`. `pnpm run test:server` writes a hover of `const foo: never` and the diagnostic `'foo' is declared but its value is never read` on the import. In marko-js/marko, `pnpm run compile -- -o html -d` on the same template emits `<span>${_escape(foo)}</span>` after the `if` block, reading the import.
