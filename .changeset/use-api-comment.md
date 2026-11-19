---
"@marko/language-tools": patch
"@marko/language-server": patch
"@marko/type-check": patch
---

Read a `<!-- use tags -->` or `<!-- use class -->` comment at the start of a template: it was never found (the parser gives a comment to the node after it), so a template that says its API only by one was typed as the Class API.
