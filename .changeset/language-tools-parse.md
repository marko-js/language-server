---
"@marko/language-tools": major
---

The parser now lives in (and is re-exported from) the new `@marko/parse` package. Breaking changes for consumers of the parser API: `NodeType` values are now strings rather than numbers, `program.body` now includes comment and static statement nodes in document order (`Node.ChildNode` includes `Comment`, and `program.body` is typed as `Node.RootBodyNode[]`), `Comment` nodes carry a `commentType`, and `Static` nodes carry `target`/`name`. Additions: `parse` accepts an options argument with a `getTagType` hook, the parse result exposes `errors` and a flat `comments` list, and the full `htmljs-parser` surface is re-exported.
