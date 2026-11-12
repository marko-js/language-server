---
"@marko/language-tools": patch
"@marko/language-server": patch
"@marko/type-check": patch
---

Report a placeholder or attribute value that does not parse (eg `${count count}` or `data-x=#2`) where it is, without the errors it used to cause in the code around it: a placeholder is written in brackets and an attribute value unwrapped, which TypeScript recovers from within the placeholder or the attribute.
