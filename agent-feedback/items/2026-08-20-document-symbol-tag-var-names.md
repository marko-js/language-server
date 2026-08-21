---
type: dx
impact: med
effort: low
site: packages/language-server/src/service/marko/document-symbols.ts › extractDocumentSymbols
---

# Name a Marko variable tag after its variable, and return a nested `DocumentSymbol[]`

`extractDocumentSymbols` names every symbol by `node.nameText`, so a file's outline shows `let`, `let`, `const` -- the tag names, not the variables they declare -- and a template with six `<let/...>` tags is six identical `let` rows that no one can navigate or filter. The declared variable is a `var` range on the same `Tag` node, so `parsed.read(node.var)` makes `<let/count=0>` read `count` and `<const/label=x>` read `label`. The function also builds a nested walk and then flattens it into `SymbolInformation` with a `location`, ignoring the client's `hierarchicalDocumentSymbolSupport`, so the outline of a nested template has no structure and the response uses the type LSP deprecated in favour of `DocumentSymbol`. Emitting `DocumentSymbol[]` with `children` from that same `visit` recursion is close to free.

Check: request `textDocument/documentSymbol` on a file containing `<let/count=0>`, `<const/label="x">` and a `<div>` wrapping a `<span>`, from a client that advertises `hierarchicalDocumentSymbolSupport: true`; today the response is a flat list named `["let","const","div","span"]`, and it should be a nested `DocumentSymbol[]` named `["count","label","div"]` with `span` as `div`'s child.
