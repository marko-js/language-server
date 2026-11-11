---
"@marko/language-tools": patch
---

Check a dynamic tag named by a value of a type parameter's type (eg `<${input.as}>` with `as: S` and `S extends keyof Marko.NativeTags`, or `tag: T` with `T extends Marko.Template<…>`) by its constraint, with its attribute tags, instead of reporting `This expression is not callable`. One constrained to `Marko.Template` alone takes any input. An attribute tag on one named by a native tag's type parameter is reported, since a native tag has none.
