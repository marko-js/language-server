---
type: dx
impact: med
effort: low
site: packages/type-check/src/run.ts › run
---

# Close an `mtc` run with an error count and cap a code frame that spans a whole callback

`run` ends by `console.log`-ing the joined report and setting `process.exitCode`, with no closing count, so a reader who pipes the output (`mtc | tail -20`) sees one frame and cannot tell whether that was the only error or one of forty; `tsc` closes the same run with `Found N errors in M files`. The frame is `codeFrameColumns(code, loc, { message })`, which underlines every line of the span and appends the message after the last one, so a `TS2554` whose extra argument is a 20-line handler callback prints 18 caret rows -- blank lines and comments included -- before the one-line message, while `tsc --pretty` elides the middle with `...` and puts the message on the header line. Add the summary and cap the frame at a few lines from each end.

Check: run `mtc` over a project with several errors, one of them a wrong-arity call whose extra argument is a 20-line arrow function; today the output ends with that call's last caret row and no count, and should end with an `N errors` line while the frame is elided the way `tsc --pretty` elides it.
