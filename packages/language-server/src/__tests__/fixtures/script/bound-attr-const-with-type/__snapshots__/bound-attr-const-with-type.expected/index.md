## Hovers
### Ln 3, Col 6
```marko
  1 | <let/a = { b: 1, bChange(v: 1) {} }/>
  2 |
> 3 | <let/b := a["b"] as 1/>
    |      ^ const b: 1
  4 | //   ^?   ^?
  5 |
```

### Ln 3, Col 11
```marko
  1 | <let/a = { b: 1, bChange(v: 1) {} }/>
  2 |
> 3 | <let/b := a["b"] as 1/>
    |           ^ const a: {
    b: number;
    bChange(v: 1): void;
}
  4 | //   ^?   ^?
  5 |
```

## Diagnostics
### Ln 1, Col 26
```marko
> 1 | <let/a = { b: 1, bChange(v: 1) {} }/>
    |                          ^ 'v' is declared but its value is never read.
  2 |
  3 | <let/b := a["b"] as 1/>
  4 | //   ^?   ^?
```

### Ln 3, Col 6
```marko
  1 | <let/a = { b: 1, bChange(v: 1) {} }/>
  2 |
> 3 | <let/b := a["b"] as 1/>
    |      ^ 'b' is declared but its value is never read.
  4 | //   ^?   ^?
  5 |
```

