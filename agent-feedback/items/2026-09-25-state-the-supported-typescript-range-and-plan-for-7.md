---
type: dx
impact: low
effort: high
site: packages/type-check/package.json › dependencies
---

# State the TypeScript range `mtc` supports, and plan for TypeScript 7

`@marko/type-check` and `@marko/language-server` depend on `typescript ^6.0.3` and drive its in-process compiler API, which TypeScript 7 no longer exports: `typescript@7.0.2`, now npm `latest`, maps `.` to `./lib/version.cjs` and offers only an `./unstable/*` API client. A project that moves to TypeScript 7 therefore still has its `.marko` files checked by `mtc`'s private TypeScript 6, with TS 6 lib files and semantics and nothing saying so, or it holds TypeScript back just for `mtc` (one real app pins it through pnpm `updateConfig.ignoreDependencies`). The editor side is worse off: `packages/language-server/src/service/script/index.ts` › `getTSProject` takes its default lib file from the project's own `typescript/package.json` directory, and TypeScript 7 ships its `lib.*.d.ts` files in the platform package (`@typescript/typescript-<platform>/lib`), so that path does not exist. Nothing in the repo says which range is supported or whether TS 7 is planned. A supported-range line in `packages/type-check/README.md`, plus an `mtc` warning when the project's own `typescript` has a different major than the one it runs, would stop users guessing; porting the language tools onto the TS 7 API is the longer-term work.

Check: `npm view typescript@latest version exports` prints `7.0.2` with `".": "./lib/version.cjs"`; on main, `grep -n '"typescript"' packages/*/package.json` shows only `^6.0.3`, and `packages/type-check/README.md` names no supported range. In a directory with `typescript@7.0.2` installed and a `tsconfig.json` targeting `es2022`, the path `getTSProject` computes (`ts.resolveModuleName("typescript/package.json", …)` then `../lib/` + `ts.getDefaultLibFileName(options)`) is `node_modules/typescript/lib/lib.es2022.full.d.ts`, which does not exist.
