---
"@marko/language-tools": patch
"@marko/language-server": patch
"@marko/type-check": patch
---

In a Class API template, check Marko 5's directives on a tag (`key`, `no-update`, …) as Marko's directives, apart from the tag's input: where a tag's input declares an attribute of the same name (eg `key`), the directive was checked (and hovered) as that attribute. A tag's input is then checked against what the tag declares alone, which is faster for every tag, and an error that named `Directives & Input` names `Input`. In a Tags API template, which has no directives, such a name is an attribute like any other: one the tag does not declare is reported.
