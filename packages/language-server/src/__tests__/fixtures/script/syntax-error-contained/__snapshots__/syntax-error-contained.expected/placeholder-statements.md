## Diagnostics
### Ln 3, Col 13
```marko
  1 | static const count = 1;
  2 |
> 3 | <div>${count; count}</div>
    |             ^ Expected a single expression, but found `;` after it.
  4 |
```

### Ln 3, Col 15
```marko
  1 | static const count = 1;
  2 |
> 3 | <div>${count; count}</div>
    |               ^^^^^ Unknown keyword or identifier. Did you mean 'const'?
  4 |
```

### Ln 3, Col 20
```marko
  1 | static const count = 1;
  2 |
> 3 | <div>${count; count}</div>
    |                    ^ Declaration or statement expected.
  4 |
```

