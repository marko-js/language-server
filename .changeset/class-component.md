---
"@marko/language-tools": patch
"@marko/language-server": patch
"@marko/type-check": patch
---

A Class API template's type has its `Component` (`Marko.Template<Input, void> & { Component: typeof Component }`), in the declaration `mtc` emits for it too, which tells it from one written in the Tags API. A tag's body is given by the key of its template's API (`renderBody` or `content`), as the compiler gives it, whatever the tag's input declares; a tag's value typed by hand (eg a dynamic tag's `Marko.Template<Input>`) takes it by the key its input declares.
