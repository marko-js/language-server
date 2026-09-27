---
type: bug
impact: med
effort: med
site: packages/language-server/src/service/script/index.ts › getTSProject
---

# Reach closed Marko files outside the asking file's tsconfig in references and rename

`TSProject.searchService` adds only the `.marko` files that `parseJsonConfigFileContent` lists for the asking file's own config, so two setups still miss uses in closed templates. With no `tsconfig.json` or `jsconfig.json` the project parses `defaultTSConfig`, whose `include: []` lists no files, so a JavaScript project without a config searches only the open files and what they import. And a Marko file under a sibling config (eg a monorepo package that imports the same shared helper) belongs to another `TSProject`, which the query never consults. For the first, the search service could list the `.marko` files under the client's workspace folders (skipping `node_modules`) when there is no config; for the second, the query could also run in the other projects that include the definition's file, as tsserver does across projects.

Check: in a directory with no `tsconfig.json`/`jsconfig.json` above it, `format.ts` (`export function plural(count: number, noun: string) { return noun; }`), `index.marko` and `other.marko` (each `import { plural } from "./format";` then `<p>${plural(1, "x")}</p>`), `didOpen` only `index.marko` and ask `textDocument/references` (or `textDocument/rename`) at its `plural(`; the answer has `format.ts` and `index.marko` but nothing in `other.marko`. The same happens with `shared/format.ts`, `a/tsconfig.json` + `a/index.marko` and `b/tsconfig.json` + `b/other.marko` (both importing `../shared/format`): nothing in `b/other.marko`.
