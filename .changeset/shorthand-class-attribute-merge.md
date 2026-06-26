---
"@marko/language-tools": patch
---

Merge a tag's shorthand class names (`.foo`) with a literal `class` attribute (eg `<button.btn class="foo"/>`) the same way Marko does at compile time, instead of emitting two `class` keys. This removes the spurious "An object literal cannot have multiple properties with the same name" TypeScript error while still type-checking the `class` attribute value against the tag's `class` type.
