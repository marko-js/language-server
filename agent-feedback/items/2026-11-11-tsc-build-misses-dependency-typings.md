---
type: dx
impact: med
effort: low
site: package.json › scripts.build
---

# Make a dependency upgrade re-run the type check that `pnpm run build` skips

`build` runs `tsc -b`, which decides a project is up to date from its own sources and `.tsbuildinfo`; typings that change under `node_modules` (an upgraded `@types/*`, a package's `.d.ts`, a pnpm override) do not invalidate it. After a dependency change the local build reports success with type errors that CI, building from a clean clone, then finds. Document `tsc -b --force` (or deleting `*.tsbuildinfo`) after changing dependencies in AGENTS.md's Build section, or add a `typecheck` script that forces it.

Check: change `pnpm-workspace.yaml`'s `vscode-css-languageservice@6>vscode-languageserver-types` override to `3.17.5` and `pnpm install`; `npx tsc -b` exits 0, `npx tsc -b --force` reports TS2345 in `packages/language-server/src/service/style/index.ts`.
