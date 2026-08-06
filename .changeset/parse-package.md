---
"@marko/parse": major
---

New package: the Marko CST parser previously embedded in `@marko/language-tools`, extracted so it can be shared by other tooling. Node types are strings, syntax errors and comments are exposed on the parse result, comments and static statements are part of `program.body`, and a `getTagType` option allows overriding how tag bodies parse.
