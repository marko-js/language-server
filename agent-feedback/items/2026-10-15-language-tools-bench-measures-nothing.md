---
type: dx
impact: med
effort: med
site: packages/language-tools/package.json › bench
---

# Give `@marko/language-tools` a bench that measures type-checking cost

`pnpm --filter @marko/language-tools run bench` runs `BENCH=1 mocha` over `src/**/__tests__`, which holds only the two `getTypeLibs` tests in `src/util/__tests__/project.test.ts`; `BENCH` is read only by commented-out code in `packages/language-server/src/__tests__/index.test.ts`. So a change to `marko.internal.d.ts`, whose types run on every tag, has no way to be measured, and the root `AGENTS.md` lists this script as the package's bench. Add a bench that type-checks the `packages/language-server/src/__tests__/fixtures/script` templates through `Processors` (resolving `.marko` imports from packages, eg `@marko/runtime-tags/tags/define.d.marko`) and reports `program.getInstantiationCount()`, type count and check time, or drop the script and the `AGENTS.md` line.

Check: `pnpm --filter @marko/language-tools run bench` prints `getTypeLibs` with two passing tests and no timing or type counts.
