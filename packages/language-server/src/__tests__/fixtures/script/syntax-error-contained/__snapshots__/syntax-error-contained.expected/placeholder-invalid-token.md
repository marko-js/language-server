## Diagnostics
### Ln 3, Col 8
```marko
  1 | static const count = 1;
  2 |
> 3 | <div>${#2}</div>
    |        ^ Unexpected digit after hash token.
  4 |
```

### Ln 1, Col 14
```marko
> 1 | static const count = 1;
    |              ^^^^^ 'count' is declared but its value is never read.
  2 |
  3 | <div>${#2}</div>
  4 |
```

