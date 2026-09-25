---
"@marko/language-server": patch
"marko-vscode": patch
---

Update prettier-plugin-marko to 4.1.3, so formatting keeps the comments inside an open tag, which it deleted before, and no longer doubles the backslashes in text. A line comment that ends a tag var is moved into a block comment, since it would otherwise swallow the rest of the tag.
