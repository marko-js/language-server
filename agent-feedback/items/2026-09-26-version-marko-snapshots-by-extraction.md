---
type: perf
impact: med
effort: med
site: packages/language-server/src/ts-plugin/host.ts › patch
---

# Version a processed file's snapshot by its extraction, not by the project version

`patch` makes `getScriptVersion` return `host.getProjectVersion()` for every processor file (`.marko`, CSS modules), so every project version bump (each edit, open or close in the language server) tells TypeScript that every Marko file in the program changed, and the next query re-parses and re-binds all of them even though `extractCache` still holds the same snapshot. In the language server that is the open files and their imports on each keystroke, and every Marko file the tsconfig includes on the first references or rename query after an edit (`TSProject.searchService` in `packages/language-server/src/service/script/index.ts`). A version that changes only when a new extraction is cached (eg a `WeakMap` from the cached snapshot to a counter) would keep unchanged files; the TS plugin under tsserver shares this code, so check what relies on the project version there before changing it.

Check: in a directory with its own `tsconfig.json`, `format.ts` exporting `plural` and 500 Marko files each importing and calling it, `didOpen` one and ask `textDocument/references` at its `plural(` twice, then make an unrelated edit to it and ask again; the query after the edit takes about twice as long as the repeat (about 600ms against 250ms), and with the processor branch of `getScriptVersion` in `patch` returning a per-snapshot version it drops to about 300ms.
