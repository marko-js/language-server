---
type: bug
impact: med
effort: low
site: packages/type-check/src/run.ts › reportRelatedDiagnostics
---

# Nest a diagnostic's related information under its parent instead of re-reporting it as a top-level error

`reportRelatedDiagnostics` feeds every `diag.relatedInformation` entry back through `reportDiagnostic`, so each one prints as a standalone diagnostic with its own `file:line:col - <category> TS<code>` header and code frame, detached from the error it explains. Several of TypeScript's related-information codes carry category `Error` -- `TS6236` "Arguments for the rest parameter '...' were not provided" among them -- so one mistake in a `.marko` file prints two `error TS` lines, the second anchored in a file the user does not own: `Run.href("/venues/$venueId")` with the params argument omitted yields the user-file `TS2554` plus a top-level `node_modules/@marko/run/dist/runtime/types.d.ts - error TS6236`. `tsc --pretty` prints the same related information indented under its parent with no category and no code and then reports `Found 2 errors`, so a reader or a script counting `mtc`'s `error TS` lines over-counts and gets sent into `node_modules`. `--display condensed` skips related information entirely, so the two display modes disagree about how many diagnostics exist.

Check: type-check a `.marko` file that calls a dependency's rest-parameter function with the rest argument omitted; `mtc` prints `node_modules/<dep>/index.d.ts:N:M - error TS6236` as a top-level entry beside the user-file `TS2554` today, and should print it indented under the `TS2554` without an `error TS` header, the way `tsc --pretty` does.
