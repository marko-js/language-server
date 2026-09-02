---
"@marko/parse": minor
---

New package: the Marko CST parser previously embedded in `@marko/language-tools`, extracted so it can be shared by other tooling. Node types are strings, syntax errors and comments are exposed on the parse result, comments and static statements are part of `program.body`, the filename is returned verbatim, and a `getTagType` option allows overriding how tag bodies parse (the built in statement and attribute tag node kinds are decided first; the hook only overrides a tag's body type or forces a generic `Static` statement).
