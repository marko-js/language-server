---
type: bug
impact: med
effort: low
site: packages/language-tools/src/processors/marko.ts › print
---

# Report a template's parse error when emitting instead of crashing `mtc`

When a project emits JavaScript (no `noEmit` or `emitDeclarationOnly`), `print` compiles each template with `output: "source"` and does not catch the compiler's `CompileError`, so a parse error escapes the TypeScript build and `mtc` exits with an uncaught exception and a Node stack instead of a report, skipping every other diagnostic in the run. Catch it in `print` (or around `builderEmit` in `packages/type-check/src/run.ts`) and leave the error to the report, where `run` already prints it with a code frame after the build.

Check: in a Marko 6 project whose `tsconfig.json` has `outDir` and neither `noEmit` nor `emitDeclarationOnly`, add `src/a.marko` containing `<const/data={ page: 2 }/>` and `<if=data.page > 1>x</if>`; `mtc` prints `[CompileError: … Ambiguous ">" in attribute` from `typescript.js` and exits 1 without a report. With `"noEmit": true` it reports the error as `src/a.marko:2:5 - error marko`.
