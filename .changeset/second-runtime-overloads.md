---
"@marko/language-tools": patch
---

Read the `Marko.Template` overloads of every Marko types file a process loads, not only the first. A project whose types differed from an earlier one's (another runtime, another Marko version, or Marko upgraded while the language server ran) could miss them, leaving its generic templates' `render`/`mount` without their type parameters.
