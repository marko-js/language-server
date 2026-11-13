---
"@marko/language-tools": patch
"@marko/language-server": patch
"@marko/type-check": patch
---

Require htmljs-parser 5.22.1, @marko/compiler 5.43.3 and prettier-plugin-marko 4.1.4, which all build on it: it fixes several misparses, reports unfinished concise constructs at EOF, and names what was unfinished in EOF diagnostics (eg "EOF reached while parsing scriptlet").
