## Hovers
### Ln 1, Col 9
```marko
> 1 | <.hello/$el/>
    |         ^ const $el: () => HTMLDivElement
  2 | //      ^?
  3 | <script>
  4 |   const el = $el();
```

### Ln 4, Col 9
```marko
  2 | //      ^?
  3 | <script>
> 4 |   const el = $el();
    |         ^ const el: HTMLDivElement
  5 |   //    ^?
  6 | </script>
  7 |
```

## Diagnostics
### Ln 4, Col 9
```marko
  2 | //      ^?
  3 | <script>
> 4 |   const el = $el();
    |         ^^ 'el' is declared but its value is never read.
  5 |   //    ^?
  6 | </script>
  7 |
```

