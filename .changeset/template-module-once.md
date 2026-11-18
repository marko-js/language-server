---
"@marko/language-tools": patch
"@marko/language-server": patch
"@marko/type-check": patch
---

Read a discovered template's module once per template that uses it, by its type, rather than at each of its tags: a tag whose taglib names a file that does not exist is reported ("Cannot find module") at the first tag naming it, and no longer also as an `unknown` object at each tag. An installed JavaScript template that ships no declaration is treated as TypeScript treats an untyped JavaScript package: it is not read, so `strict` reports its module once ("Could not find a declaration file") and nothing else, and its tag takes any input, where each of its tags was also reported as an `unknown` object (or, without `strict`, as not callable).
