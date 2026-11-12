## Diagnostics
### Ln 3, Col 13
```marko
  1 | static const count = 1;
  2 |
> 3 | <div data-x=#2/>
    |             ^ Unexpected digit after hash token.
  4 |
```

### Ln 1, Col 14
```marko
> 1 | static const count = 1;
    |              ^^^^^ 'count' is declared but its value is never read.
  2 |
  3 | <div data-x=#2/>
  4 |
```

### Ln 3, Col 14
```marko
  1 | static const count = 1;
  2 |
> 3 | <div data-x=#2/>
    |              ^ Object literal may only specify known properties, and '2' does not exist in type 'Directives & Div'.
  4 |
```

