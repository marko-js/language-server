---
"@marko/language-tools": minor
"@marko/language-server": minor
---

Improve the axe-core accessibility linter's awareness of child templates:

- Custom tags that resolve to a `.marko` template now inline that template's extracted HTML at the usage site (with cycle, depth, and size guards), so rules can evaluate a tag's rendered output in context — eg `<a href><my-icon/></a>` now reports `link-name` when the icon renders `aria-hidden` content, and diagnostics for a template's top-level elements are re-anchored to the tag usage (`<my-item/>` inside `<div>` reports `listitem`).
- Control flow tags (`<if>`, `<else>`, `<for>`, `<while>`) no longer fabricate `<div>` wrappers around their body, so structural rules see true parent/child relationships.
- The `listitem` and `dlitem` rules are now enabled, gated so they only report when the parent chain axe consults is fully known (never for a template's own top-level elements, whose parent comes from the usage site).
- Duplicate-detection rules (`accesskeys`, `landmark-unique`, `identical-links-same-purpose`, ...) are suppressed for elements inside control flow branches, since only one branch renders at a time.
