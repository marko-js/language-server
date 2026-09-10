---
"@marko/language-tools": patch
---

Prefer the TypeScript a web component library ships over manifest-derived types: manifest attributes with a `fieldName` are typed from the element class via `HTMLElementTagNameMap`, with the manifest type as fallback, and the tag's registration module is referenced so its global augmentation joins the program.
