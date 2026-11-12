---
"@marko/language-tools": patch
"@marko/type-check": patch
---

Report an `<if>`, `<else if>` or `<while>` that has no condition on the tag's name. TypeScript's error for it ("This kind of expression is always falsy") had no place in the template: the editor dropped it and `mtc` printed it with no location.
