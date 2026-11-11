---
"@marko/language-tools": patch
---

Type check templates faster: the variables a tag's body hoists are now resolved only where something reads them, rather than for every tag. On 9,000 tags this cuts TypeScript's type instantiations by four fifths and check time by about a third.
