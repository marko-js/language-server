---
"@marko/language-tools": patch
---

Decide that a template is in a `tags` directory as the compiler does, from the nearest taglib discovery directory, so a project under some folder named `tags` (`~/tags/my-app/`) is no longer typed as the Tags API while it compiles as the Class API.
