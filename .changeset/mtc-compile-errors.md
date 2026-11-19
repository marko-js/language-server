---
"@marko/type-check": patch
---

Report the Marko compiler's errors, and like `tsc` with a syntax error, stop before type checking when there are any. A template the compiler rejects (eg a mismatched closing tag, `<if(cond)>`, a bare top-level `function`, or `key=` on a Tags API element) type checked clean, so `mtc` passed a project that failed to build, and a project that emits JavaScript crashed on a template that failed to parse. A template that compiled cleanly is only compiled again once it or a file its compile read changes, tracked in a `.marko.tsbuildinfo` beside the project's `.tsbuildinfo`.
