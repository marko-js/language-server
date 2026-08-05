# Cleanup

Duplication, dead code, inconsistencies, refactor opportunities. Format and rules: [README.md](README.md).

## Port the ts-plugin host patcher onto the shared `createModuleResolver`

`packages/language-server/src/ts-plugin/host.ts` › `patch` | 2026-08-05 | impact:med | effort:med

`patch` carries its own copy of the processor module-resolution logic (tag imports, definition-file preference, external-package resolution) that `@marko/language-tools` now exports as `createModuleResolver` (added when `@marko/type-check` was refactored onto it). The copies have already drifted: the ts-plugin version skips CSS modules imported from non-Marko files and always reports `isExternalLibraryImport: false`, while the shared version (matching type-check) has no CSS-module guard and reports `true` for node_modules resolutions. Unifying means deciding whether those differences are intentional per-consumer behavior (then `createModuleResolver` needs options for them) or accidental drift. Re-verify by diffing `patch`'s `resolveModuleNameLiterals` body against `createModuleResolver` in `packages/language-tools/src/util/module-resolver.ts`.
