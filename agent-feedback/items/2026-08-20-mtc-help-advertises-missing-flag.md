---
type: dx
impact: low
effort: low
site: packages/type-check/src/cli.ts › args
---

# Stop advertising a `-e` flag `mtc` does not accept, and list `--generateTrace` that it does

The Examples block of `mtc --help` prints `mtc -p ./jsconfig.json -d condensed -e`, but `-e` is not in the `arg` spec, so a reader who copies the example gets an unhandled `ArgError: unknown or unexpected option: -e` with a raw Node stack trace instead of the usage text. `--generateTrace` is parsed and implemented but missing from the Options list, so the flag that exists is undocumented while the one that does not is the example. The footer also sends readers to `packages/marko-type-check`, a path that is not in this repo; `package.json` › `homepage` points at `packages/type-check`.

Check: `mtc -e` prints an `ArgError` stack trace and should print the usage text; `mtc --help` lists `-e` under Examples and omits `--generateTrace` from Options.
