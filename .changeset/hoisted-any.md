---
"@marko/language-tools": patch
---

Keep `mtc` from reporting `Property 'x' does not exist on type 'MergeScopes<never>'` with no location for a variable a template hoists whose type was lost, eg out of a tag whose input has an error (beside the error itself): the variable is `any` instead.
