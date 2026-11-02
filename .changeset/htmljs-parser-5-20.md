---
"@marko/language-tools": patch
"@marko/language-server": patch
---

Require htmljs-parser 5.20.0, which names an open tag that ends before its name (eg a concise line of just `,`, as while typing) instead of leaving it nameless, which failed the whole template's analysis. It also ignores concise lines starting with `;`, reads a concise line starting with `[` as an attribute group, reads concise tag names starting with `-` (eg `-if`), and reports code after a `;` line's html comment.
