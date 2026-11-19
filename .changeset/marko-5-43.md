---
"@marko/language-tools": patch
"@marko/language-server": patch
"@marko/type-check": patch
---

Update Marko to 5.43, whose types declare `Marko.ComponentInput` and `Marko.ComponentOf`. A split component's template now takes its input and names its component by them (`Marko.ComponentInput<typeof import("./x.component")>`, `Marko.ComponentOf<…>`), where it used internal types.
