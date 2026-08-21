---
type: bug
impact: med
effort: low
site: packages/type-check/src/run.ts › reportDiagnostic
---

# Drop or re-anchor a diagnostic whose generated span does not map back into the `.marko` source

When `extracted.sourceLocationAt` returns nothing, `reportDiagnostic` falls through to a branch that still prints the diagnostic but without a line, a column or a code frame, so one run mixes `src/routes/tx/+page.marko:5:20 - error TS2345` with a bare `src/routes/tx/+page.marko - error TS2873`. A reader cannot act on the second kind and learns to skip the channel: a location-less "This kind of expression is always falsy" was the only signal `mtc` gave for a template broken by `<if=data.page > 1>`, where the compiler's own message is `Ambiguous ">" in attribute`. `convertDiag` in `packages/language-server/src/service/script/index.ts` drops these instead of printing them, so the editor and `mtc` already disagree about which errors exist. Either drop them the same way, or anchor them at the top of the file so there is somewhere to look.

Check: type-check a `.marko` file containing `<const/data = { page: 2 }/>` and `<if=data.page > 1>`; `mtc` prints `src/x.marko - error TS2873` and `This kind of expression is always falsy.` with no line, column or frame today, and should either omit it or give it a `file:line:col` header and a frame like every other diagnostic in the run.
