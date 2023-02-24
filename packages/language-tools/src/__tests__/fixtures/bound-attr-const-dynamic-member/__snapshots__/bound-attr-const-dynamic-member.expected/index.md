## Hovers
### Ln 3, Col 6
```marko
  1 | <let/a = { b: 1 }/>
  2 |
> 3 | <let/b := a["b"]/>
    |      ^ const b: number
  4 |
```

### Ln 3, Col 11
```marko
  1 | <let/a = { b: 1 }/>
  2 |
> 3 | <let/b := a["b"]/>
    |           ^ const a: {
    b: number;
}
  4 |
```

## Source Diagnostics
### Ln 3, Col 6
```marko
  1 | <let/a = { b: 1 }/>
  2 |
> 3 | <let/b := a["b"]/>
    |      ^ 'b' is declared but its value is never read.
  4 |
```

### Ln 3, Col 11
```marko
  1 | <let/a = { b: 1 }/>
  2 |
> 3 | <let/b := a["b"]/>
    |           ^^^^^^ Element implicitly has an 'any' type because expression of type '"bChange"' can't be used to index type '{ b: number; }'.
  Property 'bChange' does not exist on type '{ b: number; }'.
  4 |
```

