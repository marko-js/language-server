---
"@marko/language-tools": patch
"@marko/type-check": patch
---

Report only the type arguments of a tag given type arguments it does not take. With repeated or conditional attribute tags, its input was also reported for having an internal `[Marko._.restAttrTags]` property, with no location in the template (`mtc` printed it; the editor dropped it).
