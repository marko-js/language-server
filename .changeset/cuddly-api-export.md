---
"@marko/language-tools": patch
---

Expose a template's resolved runtime api as a `"~api"` export so tooling can read whether a template uses the `tags` or `class` api (e.g. `import { "~api" as API } from "./template.marko"`) without importing `Input` and the circular dependencies that can cause.
