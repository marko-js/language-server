---
type: dx
impact: low
effort: low
site: packages/language-server/build.mts › distDir
---

# Create `dist/` before `packages/language-server/build.mts` copies type files into it

The language-server build copies `marko.internal.d.ts` and `marko.runtime.d.ts` into `dist/` alongside the esbuild calls, before anything creates `dist/`. The build only works when `dist/` already exists, which happens when `tsc -b` in the root `pnpm run build` has emitted declarations first. In a fresh checkout, the documented guard-test shortcut `pnpm run test:server` skips `tsc -b` and fails with `ENOENT: no such file or directory, copyfile '.../language-tools/marko.internal.d.ts' -> '.../language-server/dist/marko.internal.d.ts'`. That error points at the tracked source file rather than the missing directory. Call `fs.mkdir(distDir, { recursive: true })` before the copies.

Check: `rm -rf packages/language-server/dist && pnpm --filter @marko/language-tools --filter @marko/language-server run build` fails with the ENOENT above; `mkdir -p packages/language-server/dist` and rerun, and it succeeds.
