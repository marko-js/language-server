---
type: bug
impact: high
effort: med
site: packages/language-server/src/service/marko/complete/index.ts › doComplete
---

# Return tag and attribute completions when the typed prefix is still empty

`doComplete` dispatches on `NodeType[node.type]` and falls back to `|| []`, but at an empty prefix there is no `OpenTagName` or `AttrName` node to dispatch to: `parsed.nodeAt` returns `Program` for a document that is only `<`, and `Tag` for the caret in `<div |>` or `<user-card |/>`. So `textDocument/completion` answers zero items at exactly the positions the server itself nominates as `completionProvider.triggerCharacters` -- `<` and space -- while one more character works: `<le` returns 295 items, `<user-card u` returns the tag's two attributes, `<div class:s` returns the two modifiers. Typing `<` and expecting the tag list is the first gesture a new user makes, and listing a component's attributes without opening its source is the main reason to run the server at all; both silently return nothing at both `triggerKind` 1 and 2. `Tag` already handles a caret inside an unfinished tag for the closing-tag completion, so the dispatch can recognize these positions: when the caret sits immediately after `<`, or in the whitespace of an open tag, run `OpenTagName`/`AttrName` against an empty range at that offset.

Check: drive the built server over stdio, `didOpen` a document whose entire content is `<`, and request completion at 0:1; today the result is `{"items":[],"isIncomplete":true}` and it should be the tag list that `<le` already returns. Same for the caret in `<div |>hi</div>` and `<user-card |/>`, which should return those tags' attributes.
