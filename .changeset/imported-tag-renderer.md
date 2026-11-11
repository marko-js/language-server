---
"@marko/language-tools": patch
---

Check a template rendered by an identifier (`import Card from "./card.marko"` and `<Card>`, the `import Card from "<card>"` shorthand, or `<${Card}>`) by its own renderer, as when it is rendered by its tag name: an attribute or attribute tag it does not have is reported, a generic template infers its type parameters (and accepts type arguments), and a recursive attribute tag type no longer reports `Type instantiation is excessively deep`. A name that is one of several templates or strings is still checked against any of their inputs.
