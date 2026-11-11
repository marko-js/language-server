---
"@marko/language-tools": patch
---

Check a body whose only param is its input (eg a `<define>` with attributes, or an `input.content: Marko.Body<[{ … }]>`) as a template's input is checked, rather than by its arguments tuple, which TypeScript related member by member on every call: 60 such calls go from 70,158 to 422 type instantiations.
