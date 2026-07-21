# AGENTS.md

## Repo overview

Monorepo for the Marko Language Server and related tooling. Four pnpm workspaces under `packages/`:

| Package           | Published as                                | Purpose                                                     |
| ----------------- | ------------------------------------------- | ----------------------------------------------------------- |
| `language-tools`  | `@marko/language-tools`                     | Core extraction/analysis of Marko files (leaf dependency)   |
| `language-server` | `@marko/language-server`                    | LSP implementation; depends on language-tools               |
| `type-check`      | `@marko/type-check`                         | CLI type-checker (`mtc`); depends on language-tools         |
| `vscode`          | `marko-vscode` (VS Code extension, private) | VS Code client; depends on language-server + language-tools |

## Build

TypeScript emits **only `.d.ts` files** (`emitDeclarationOnly: true`); esbuild (and package build scripts) produce the actual JS bundles.

**Build order matters** due to project references:

```
language-tools -> language-server -> vscode
language-tools -> type-check
```

Commands:

- `pnpm run build` -- production build of all packages (sets `NODE_ENV=production`)
- `pnpm run build:dev` -- builds only the vscode extension (inlines language-tools from source, self-contained for dev)

The vscode build is the most complex: it bundles 4 entry points (including tests), copies TypeScript `lib.*.d.ts` files into `dist/`, patches jsdom/prettier internals, and minifies in production.

## Test

**Build is always required before testing.** `pnpm test` at root runs `pnpm run build && pnpm -r --if-present run test`.

Only two packages have tests:

### language-server (mocha + mocha-snap)

```sh
# Run tests (build first)
pnpm --filter @marko/language-server run test

# Update snapshots
pnpm --filter @marko/language-server run test:update

# Shortcut: build deps + run with --update
pnpm run test:server
```

- Fixture-based: directories under `src/__tests__/fixtures/` contain `.marko` files
- `^?` markers in `.marko` files define hover-test positions
- Snapshots stored as individual files in `__snapshots__/` dirs (not a single snapshot file)
- `--update` flag overwrites snapshots instead of comparing
- `.mocharc.json` requires `tsx` and `mocha-snap`; timeout is 10s

### vscode (@vscode/test-electron)

```sh
pnpm --filter marko-vscode run test
```

- Launches VS Code Insiders (downloaded automatically)
- Tests run inside the Electron process with programmatic Mocha
- Uses `snap.inline()` for inline snapshot assertions
- The build runs automatically before tests (`test.mts` imports `build.mts`)

### language-tools (bench only)

```sh
pnpm --filter @marko/language-tools run bench   # BENCH=1 mocha ...
```

## Lint and format

`pnpm run lint` runs build first, then: eslint -> prettier (check) -> cspell.
`pnpm run format` runs build first, then: eslint --fix -> prettier --write.

Key lint rules:

- `eslint-plugin-simple-import-sort` enforces sorted imports/exports (auto-fixable)
- Prettier formats `.ts`, `.js`, `.json`, `.md`, `.yml`, `*rc` files

Pre-commit hook (husky + lint-staged): runs `eslint --fix` + `prettier --write` on staged `.ts` files, `prettier --write` on other file types.

## CI

GitHub Actions on `main` push and PRs:

- **lint** job: `pnpm install --frozen-lockfile && pnpm run lint`
- **test** job: `pnpm install --frozen-lockfile && xvfb-run -a pnpm test` (Node 22 + 24 matrix)
- **release** job: changesets-based, publishes to npm + VS Code marketplace + Open VSX

Note: CI tests run under `xvfb-run` because vscode tests need a display server.

## Changesets

Uses `@changesets/cli` for versioning and releases:

- `pnpm run change` -- add a changeset
- `pnpm run version` -- apply changesets and update lockfile
- Base branch: `main`

## Conventions

- ESM-first source code, but esbuild produces CJS (and ESM for library packages)
- `dist/` is the build output directory for all packages (gitignored)
- `pnpm-lock.yaml` is the lockfile (pnpm workspaces; see `pnpm-workspace.yaml`)
- Node 22+ required for development (CI tests on 22 and 24)

## Agent feedback

Anything actionable but out of scope for the current task — a suspected bug, cleanup, a perf/size win, tooling friction, or code that was confusing — must be recorded in [`agent-feedback/`](agent-feedback/README.md) before finishing. Don't silently drop it, and don't fix it inside an unrelated diff.
