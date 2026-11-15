---
"@marko/language-tools": patch
"@marko/language-server": patch
"@marko/type-check": patch
---

Require htmljs-parser 5.22.2 and @marko/compiler 5.43.4: a line comment in a text tag's open tag (`<script// a</script>`) no longer throws, and templates parse faster.
