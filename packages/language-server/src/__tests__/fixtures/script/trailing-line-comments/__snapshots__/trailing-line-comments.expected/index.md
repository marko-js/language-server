## Diagnostics
### Ln 7, Col 16
```marko
   5 | div
   6 |   if=count // a condition ending in a comment
>  7 |     -- ${count.missingInIf}
     |                ^^^^^^^^^^^ Property 'missingInIf' does not exist on type 'number'.
   8 |
   9 | script --
  10 |   count.missingInScript;
```

### Ln 10, Col 9
```marko
   8 |
   9 | script --
> 10 |   count.missingInScript;
     |         ^^^^^^^^^^^^^^^ Property 'missingInScript' does not exist on type 'number'.
  11 |   // a script ending in a comment
  12 |
  13 | <script>count.missingInInlineScript // also inline</script>
```

### Ln 13, Col 15
```marko
  11 |   // a script ending in a comment
  12 |
> 13 | <script>count.missingInInlineScript // also inline</script>
     |               ^^^^^^^^^^^^^^^^^^^^^ Property 'missingInInlineScript' does not exist on type 'number'.
  14 |
  15 | <div data-x=count // an attribute ending in a comment
  16 | />
```

### Ln 18, Col 14
```marko
  16 | />
  17 |
> 18 | <div>${count.missingAfter}</div>
     |              ^^^^^^^^^^^^ Property 'missingAfter' does not exist on type 'number'.
  19 |
```

