---
"@marko/language-server": patch
---

Stop reading attribute definitions and tag metadata through the taglib lookup, which newer compilers no longer provide. Attribute names complete from TypeScript alone, Marko 5's `:scoped` and `:no-update` modifiers are no longer completed, and go to definition no longer jumps from an attribute name into taglib JSON. Tag name completion no longer shows taglib descriptions, snippets or deprecation marks: document a tag with a comment above its template's `Input` instead.
