---
type: bug
impact: low
effort: med
site: packages/type-check/src/run.ts › resolveModuleNameLiterals
---

Imports resolving to a `.d.marko` are now always marked
`isExternalLibraryImport: true` (needed so composite projects don't report
TS6307/TS6059 for pre-built dependency declarations). TypeScript exempts
external-library files from emit (`sourceFileMayBeEmitted`), so a hand-written
`.d.marko` that lives _inside_ the project's own `rootDir` and is imported by a
sibling file may no longer be copied to `outDir` by the definition-file emit
branch in `builderProgram.emit`. Scoping the flag to files outside the config
file's directory would avoid this.

Check: add a fixture with `src/foo.d.marko` imported from `src/bar.marko` (both
under `include`), run the emit test, and compare `dist/` contents before and
after the external-marking change.
