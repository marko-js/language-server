# Cleanup

Duplication, dead code, inconsistencies, refactor opportunities. Format and rules: [README.md](README.md).

## Delete the unused `__tests__/util/language-service.ts` helper

`packages/language-server/src/__tests__/util/language-service.ts` › (whole file) | 2026-07-27 | impact:low | effort:low

Nothing in the repo imports this file (`grep -rn "util/language-service" packages --include="*.ts"` returns zero hits); the fixture harness in `__tests__/index.test.ts` and the standalone tests import the service directly. Dead test scaffolding misleads new contributors into modeling work on it. Delete it; re-verify with the same grep before removal.

## Deduplicate the client/server watched-file globs (client lists `*.cts` twice, omits `*.cjs`)

`packages/vscode/src/index.ts` › `activate` | 2026-07-27 | impact:low | effort:low

The client-side `synchronize.fileEvents` glob repeats `*.cts` and is missing `*.cjs`, diverging from the server's `WATCHED_FILES_GLOB` in `packages/language-server/src/index.ts` which has both. On-disk changes to `.cjs` modules therefore don't invalidate caches for VS Code clients (the server-side dynamic registration covers other editors). Exporting the glob from the server package would give the two a single source of truth. Re-verify: `grep -o 'cts' packages/vscode/src/index.ts | wc -l` (currently 2 in one glob) and `grep -c 'cjs' packages/vscode/src/index.ts` (currently 0).

## Compute `resolveUrl` once per document link

`packages/language-server/src/service/marko/document-links.ts` › `findDocumentLinks` | 2026-07-27 | impact:low | effort:low

The `NodeType.Tag` branch calls `resolveUrl(read(attr.value.value).slice(1, -1), uri)` to test resolvability, then calls the identical expression a second time for the `target` property instead of reusing the `resolved` local it just bound, re-reading and re-resolving per link. Use `target: resolved`. Re-verify: both call sites are visible in the same `if` block in `findDocumentLinks`.

## Stop hardcoding `languageId: "css"` for scss/less virtual style documents

`packages/language-server/src/service/style/index.ts` › `processStyle` | 2026-07-27 | impact:low | effort:low

The virtual `TextDocument.create(uri, "css", ...)` always claims languageId `"css"` even when the extracted stylesheet is `.scss`/`.less` (the dialect is instead carried by which `vscode-css-languageservice` factory is chosen). Currently harmless because the language service ignores the id, but it is misleading and would break any future consumer that trusts `virtualDoc.languageId`. Pass the ext-appropriate id (`"scss"`/`"less"`), or add a comment stating why the id is intentionally unused. The virtual doc also deliberately reuses the source document's `uri`, and several downstream comparisons depend on that (e.g. the `symbol.location.uri === doc.uri` check in `findDocumentSymbols`), so the creation site deserves a comment about the uri as well. Re-verify: read the `TextDocument.create` call in `processStyle`.
