---
"@marko/language-server": patch
"marko-vscode": patch
---

Update prettier-plugin-marko to 4.1.1, so formatting a template whose code does not parse yet keeps the `async` on shorthand methods and the `$` on scriptlets, and no longer lets a trailing line comment in an attribute value swallow the rest of the tag.
