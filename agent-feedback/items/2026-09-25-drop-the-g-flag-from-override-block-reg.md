---
type: bug
impact: med
effort: low
site: packages/language-tools/src/extractors/script/util/runtime-overrides.ts › overrideBlockReg
---

# Drop the `g` flag from `overrideBlockReg` so a second runtime's overloads are not cached as empty

`getRuntimeOverrides` runs the module-level `/g` regexp `overrideBlockReg` with `exec` once for each distinct `runtimeTypes` string. A match leaves `lastIndex` at the end of the block, so the next distinct string is scanned from that offset. When the first runtime's block ends past the point where the second's starts, `exec` misses and `RuntimeOverloads` caches `[]` for the second runtime for the life of the process. Marko 5's `index.d.ts` ends its `@marko-overload-*` block near offset 12260, while `@marko/runtime-tags` starts its block near 3370. A language server or `mtc` run that sees a Marko 5 project before a Marko 6 one therefore drops the template-specific `render`/`mount` overloads from every Marko 6 template. Drop the `g` flag; the function only reads the first block.

Check: in this repo, write a `.tmp.mts` that imports `getRuntimeOverrides` and `RuntimeAPI` from `packages/language-tools/src/extractors/script/util/`, then calls `getRuntimeOverrides(RuntimeAPI.class, <node_modules/marko/index.d.ts text>, "", "", "Return")` followed by `getRuntimeOverrides(RuntimeAPI.tags, <node_modules/@marko/runtime-tags/index.d.ts text>, "", "", "Return")`, and run it with `pnpm exec tsx`. With marko 5.39.43 and @marko/runtime-tags 6.3.53 the results are 938 characters, then `""`. In the reverse order both are non-empty (323 and 938 characters).
