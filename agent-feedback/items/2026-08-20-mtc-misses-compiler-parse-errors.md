---
type: bug
impact: high
effort: med
site: packages/type-check/src/run.ts › run
---

# Report the Marko compiler's own diagnostics from `mtc` instead of exiting 0 on a template that cannot compile

`run` builds a TypeScript solution over the extracted script and never asks the Marko compiler for diagnostics, so every error the compiler raises that the extractor can still lower to valid TypeScript is invisible. `<if=a>x</if>` closed by `<else>y</if>`, a stray `</span>`, and a duplicate `<let/x>` each print nothing and exit 0, while `compileSync` on the same file throws `The closing "if" tag does not match the corresponding opening "else" tag`, `The closing "span" tag was not expected`, and ``Duplicate declaration of `x` ``. The language server already surfaces exactly these through `packages/language-server/src/service/marko/validate.ts` › `doValidate`, so `mtc` is the one surface that is silent and it is the one an agent's `npm run lint` runs; the build then fails with a diagnostic pointing at a generated file. Reuse `compilerConfig` and `getMarkoDiagnostics` from that validate path. Distinct from the `#writeTag` unresolved-custom-tag item: that is a tag that resolves to nothing, this is source the parser rejects outright.

Check: put `<if=a>x</if>` followed by `<else>y</if>` in a `.marko` file and run `mtc`; it prints an empty report and exits 0 today, and should report the compiler's `closing "if" tag does not match` error and exit 1, the way `marko-run build` fails on the same file.
