## Hovers
### Ln 3, Col 6
```marko
  1 | <let/a = { b: 1 }/>
  2 |
> 3 | <let/b := a.b/>
    |      ^ const b: number
  4 | //   ^?   ^?
```

### Ln 3, Col 11
```marko
  1 | <let/a = { b: 1 }/>
  2 |
> 3 | <let/b := a.b/>
    |           ^ const a: {
    b: number;
}
  4 | //   ^?   ^?
```

## Diagnostics
### Ln 3, Col 13
```marko
  1 | <let/a = { b: 1 }/>
  2 |
> 3 | <let/b := a.b/>
    |             ^ Property 'bChange' does not exist on type '{ b: number; }'.
  4 | //   ^?   ^?
```

### Ln 3, Col 6
```marko
  1 | <let/a = { b: 1 }/>
  2 |
> 3 | <let/b := a.b/>
    |      ^ 'b' is declared but its value is never read.
  4 | //   ^?   ^?
```

