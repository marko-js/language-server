---
type: dx
impact: med
effort: med
site: packages/type-check/src/cli.ts › args
---

# Let `mtc` scope a run to the files the caller named instead of always reporting the whole project

`args` accepts only `--project`, `--display`, `--generateTrace`, `--help` and `--version`, so there is no way to ask "does this file check". A path handed to the CLI is not rejected either: `arg` is `permissive: false` but leaves positionals in `args._`, and `run` never reads them, so `mtc src/clean.marko` silently type-checks everything and reports an unrelated file's error while exiting 1. That is the wrong shape for the loop `mtc` is used in -- an agent or a pre-commit hook checking one edited template gets a report about a file it did not touch and has to diff the run against a baseline to find its own errors. Accept one or more paths (or globs) and filter the reported diagnostics to them, or reject the positional with the usage text so the limitation is at least visible.

Check: in a project with a clean `src/clean.marko` and an unrelated `src/other.ts` that has an unused local, run `mtc src/clean.marko`; today it prints `src/other.ts:2:7 - error TS6133` and exits 1, and should either report nothing for the named file or refuse the argument.
