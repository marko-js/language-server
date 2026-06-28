---
"marko-vscode": minor
---

Highlight native HTML tags with a distinct scope (`support.type.builtin.marko`) so they can be themed apart from custom/component tags, which keep `entity.name.tag.marko`. The element list mirrors `@marko/language-tools`' `isHTMLTag`, the same source of truth the language tools use to tell native and custom tags apart.
