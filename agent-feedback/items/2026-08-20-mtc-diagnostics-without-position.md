---
type: bug
impact: med
effort: low
site: packages/type-check/src/run.ts › reportDiagnostic
---

<!-- cspell:ignore bogusattr notanumber -->

# Drop or re-anchor a diagnostic whose generated span does not map back into the `.marko` source

When `extracted.sourceLocationAt` returns nothing, `reportDiagnostic` falls through to a branch that still prints the diagnostic but without a line, a column or a code frame, so one run mixes `src/routes/tx/+page.marko:5:20 - error TS2345` with a bare `src/routes/tx/+page.marko - error TS2873`. A reader cannot act on the second kind and learns to skip the channel: a location-less "This kind of expression is always falsy" was the only signal `mtc` gave for a template broken by `<if=data.page > 1>`, where the compiler's own message is `Ambiguous ">" in attribute`. `convertDiag` in `packages/language-server/src/service/script/index.ts` drops these instead of printing them, so the editor and `mtc` already disagree about which errors exist. Either drop them the same way, or anchor them at the top of the file so there is somewhere to look. One reproducible source of these is the program-level hoist read in `packages/language-tools/src/extractors/script/index.ts` › `ScriptExtractor#writeProgram`: when a tag's attributes object fails to type-check, TypeScript stops inferring the scope type from the body, and the `var {rowId: __marko_internal_hoist__rowId} = Marko._.readScope(...)` line the extractor `write()`s rather than `copy()`s from source reports `TS2339 Property 'rowId' does not exist on type 'MergeScopes<never>'` with no mapping, so it prints bare and names a tag variable the reader can see declared just above it. That one reaches both `<for>` (through `forOfTag`/`forInTag`/`forToTag`) and custom tags (through `renderDynamicTag`), and it is pure cascade noise that clears once the attribute is fixed, so `copy()`ing the tag-variable name range into that destructure would both give it a position and make it droppable as a cascade.

Check: type-check a `.marko` file containing `<const/data = { page: 2 }/>` and `<if=data.page > 1>`; `mtc` prints `src/x.marko - error TS2873` and `This kind of expression is always falsy.` with no line, column or frame today, and should either omit it or give it a `file:line:col` header and a frame like every other diagnostic in the run.

Check: with `@marko/type-check` 3.2.0, type-check a file containing only `export interface Input { rows: { id: number }[] }`, `<for|row| of=input.rows bogusattr=1>`, `  <const/rowId=String(row.id)>`, `</for>`; `mtc` prints the expected TS2353 on `bogusattr` with a code frame and then a second, position-less `src/for-bad-attr.marko - error TS2339 Property 'rowId' does not exist on type 'MergeScopes<never>'`, and removing `bogusattr` clears both. A custom tag does the same: `<Box n="notanumber"><const/rowId=1></Box>` against `export interface Input { n: number; content: Marko.Body }` reports its TS2322 plus the same unanchored TS2339.
