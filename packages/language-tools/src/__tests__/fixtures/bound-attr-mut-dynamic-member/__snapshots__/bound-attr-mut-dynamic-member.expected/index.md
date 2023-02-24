## Hovers
### Ln 3, Col 6
```marko
  1 | <let/a = { b: 1, bChange(value: number) {} }/>
  2 |
> 3 | <let/b := a["b"]/>
    |      ^ const b: number
  4 |
```

### Ln 3, Col 11
```marko
  1 | <let/a = { b: 1, bChange(value: number) {} }/>
  2 |
> 3 | <let/b := a["b"]/>
    |           ^ const a: {
    b: number;
    bChange(value: number): void;
}
  4 |
```

## Source Diagnostics
### Ln 1, Col 26
```marko
> 1 | <let/a = { b: 1, bChange(value: number) {} }/>
    |                          ^^^^^ 'value' is declared but its value is never read.
  2 |
  3 | <let/b := a["b"]/>
  4 |
```

### Ln 3, Col 6
```marko
  1 | <let/a = { b: 1, bChange(value: number) {} }/>
  2 |
> 3 | <let/b := a["b"]/>
    |      ^ 'b' is declared but its value is never read.
  4 |
```

