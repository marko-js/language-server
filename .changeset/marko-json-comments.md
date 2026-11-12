---
"@marko/language-tools": patch
"@marko/language-server": patch
"@marko/type-check": patch
"marko-vscode": patch
---

Read the comments in `marko.json` with the comment stripper Marko's compiler uses, instead of `@luxass/strip-json-comments`, which these packages no longer depend on. It accepts what the compiler accepts: a `/*` left unclosed at the end of the file now leaves `script-lang` unread, as the compiler fails to read that file, and a comment holding whitespace JSON does not allow (eg a non-breaking space) no longer does.
