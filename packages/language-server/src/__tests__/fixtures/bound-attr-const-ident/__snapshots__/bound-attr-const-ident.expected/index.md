## Hovers
### Ln 3, Col 6
```marko
  1 | <const/a = 1/>
  2 |
> 3 | <let/b := a/>
    |      ^ const b: number
  4 |
```

### Ln 3, Col 11
```marko
  1 | <const/a = 1/>
  2 |
> 3 | <let/b := a/>
    |           ^ const a: number
  4 |
```

## Source Diagnostics
### Ln 3, Col 6
```marko
  1 | <const/a = 1/>
  2 |
> 3 | <let/b := a/>
    |      ^ 'b' is declared but its value is never read.
  4 |
```

### Ln 3, Col 11
```marko
  1 | <const/a = 1/>
  2 |
> 3 | <let/b := a/>
    |           ^ Cannot assign to 'a' because it is a read-only property.
  4 |
```

