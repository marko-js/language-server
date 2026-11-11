---
"@marko/language-tools": patch
---

Check a dynamic tag named by a value typed `Marko.Template<Input>` (eg `<${Tag}>` with `const Tag: Marko.Template<{ value: string }>`) by its input, as a template found by its tag name is: an attribute or attribute tag its input does not have is reported. A value typed `Marko.Template` alone still takes any input, and one of several templates is still checked against any of their inputs.
