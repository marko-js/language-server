---
"@marko/language-server": patch
"@marko/language-tools": patch
"@marko/ts-plugin": patch
"@marko/type-check": patch
"marko-vscode": patch
---

Keep the template-specific `render`/`mount` overloads when templates using more than one Marko runtime or version are checked in the same process (eg Marko 6 after Marko 5). After the first runtime's types were read, another runtime's overloads could be missed and cached as empty.
