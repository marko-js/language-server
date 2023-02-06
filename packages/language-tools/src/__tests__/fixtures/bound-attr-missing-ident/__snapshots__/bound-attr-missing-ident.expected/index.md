## Hovers
### Ln 1, Col 6
```marko
> 1 | <let/b := a/>
    |      ^ const b: any
  2 |
```

### Ln 1, Col 11
```marko
> 1 | <let/b := a/>
    |           ^ any
  2 |
```

## Source Diagnostics
### Ln 1, Col 6
```marko
> 1 | <let/b := a/>
    |      ^ 'b' is declared but its value is never read.
  2 |
```

### Ln 1, Col 11
```marko
> 1 | <let/b := a/>
    |           ^ Cannot find name 'a'.
  2 |
```

### Ln 1, Col 11
```marko
> 1 | <let/b := a/>
    |           ^ Cannot find name 'a'.
  2 |
```

### Ln 1, Col 11
```marko
> 1 | <let/b := a/>
    |           ^ Cannot find name 'a'.
  2 |
```

