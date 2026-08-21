---
type: bug
impact: med
effort: low
site: packages/language-server/src/index.ts › connection.onHover
---

# Answer a request for a document the server is not tracking with `null` instead of throwing

Every request handler passes `documents.get(params.textDocument.uri)!` straight into the service, and `get` returns `undefined` whenever the URI is not open and cannot be read off disk -- a non-`file:` scheme, or a path that no longer exists. `hover`, `definition`, `references`, `rename`, `documentHighlight`, `documentSymbol`, `documentColor` and `codeAction` then reject the request with a JSON-RPC internal error carrying a raw JS message: `Request textDocument/hover failed with message: Cannot read properties of undefined (reading 'uri')` for a deleted path, and the same for any `untitled:` document, which `doClose` deliberately drops from the cache. Clients race `didOpen`/`didClose` and fire requests against documents they have just closed, and the spec answer for a document the server does not have is a `null` result, not an error the user sees in the LSP output channel. Guard once at the top of each handler (or add a `documents.require` helper that returns `null`) rather than asserting with `!`.

Check: after `initialize`, send `textDocument/hover` for a `.marko` URI that was never opened and does not exist on disk; today the response is a JSON-RPC error whose message is `Cannot read properties of undefined (reading 'uri')`, and it should be `"result": null`.
