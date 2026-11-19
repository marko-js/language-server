---
"@marko/language-tools": patch
"@marko/language-server": patch
"@marko/type-check": patch
---

Type `$global` as `Run.Context` in a project with `@marko/run`'s types (a route's own, where `@marko/run` generates one) and as `Marko.Global` otherwise, decided from the project's installed types. It was `MarkoRun.Context`, a name `@marko/run` has deprecated, read under a suppressed error in every template. A project's type libraries are now resolved for that project, where every project was given the first one's.
