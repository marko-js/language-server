---
"@marko/language-tools": patch
---

Keep an `if` condition or a `<script>` body that ends in a `//` comment from commenting out the generated code after it, which broke type checking for the rest of the template and made `mtc` report syntax errors with no location.
