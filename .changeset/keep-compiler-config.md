---
"@marko/language-tools": patch
---

Stop calling `configure` on a project's `@marko/compiler`, which replaced the global config that bundler plugins such as `@marko/vite` compile with when they run in the same process.
