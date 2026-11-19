---
"@marko/type-check": patch
---

Report the Marko compiler's errors alongside TypeScript's. A template the compiler rejects (eg a mismatched closing tag, `<if(cond)>`, a bare top-level `function`, or `key=` on a Tags API element) type checked clean, so `mtc` passed a project that failed to build.
