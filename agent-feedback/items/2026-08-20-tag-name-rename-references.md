---
type: bug
impact: med
effort: high
site: packages/language-server/src/service/marko/definition/OpenTagName.ts › OpenTagName
---

# Answer references and rename at a custom tag name, not just go-to-definition

`OpenTagName` resolves a tag name to its defining file for `textDocument/definition`, but the Marko plugin exposes no `findReferences`, `findDocumentHighlights`, `prepareRename` or `doRename`, so all four return `null` at a `<user-card` tag-name position -- VS Code reports "The element can't be renamed" and "no references found" on a name that go-to-definition resolves in the same keystroke. Every other identifier in the file refactors: `prepareRename` on the `user` attribute of the same tag returns a range and `textDocument/rename` rewrites the attribute across the consumer and `src/tags/user-card/index.marko`. A tag name is the identifier whose usages are hardest to find by hand, because the declaration is a directory name and the usages are kebab-case in markup, so it is the one that most needs the server. References and highlights are the cheap half and need only the existing `lookup` plus a scan of the project's `.marko` files; a rename additionally needs a `RenameFile` in `documentChanges` for the tag directory, which clients that advertise `resourceOperations` already accept.

Check: `didOpen` a template containing `<user-card user={ name: "a", age: 1 }/>` beside `src/tags/user-card/index.marko` and send `textDocument/prepareRename` at the tag-name offset and at the `user` attribute offset; today the tag name returns `null` while the attribute returns a range, and the tag name should return a range whose rename rewrites every `<user-card` usage.
