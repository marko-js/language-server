## Diagnostics
### Ln 2, Col 9
```marko
  1 | <const/data = { a: 1 }/>
> 2 | <loader|data|>
    |         ^^^^ 'data' is declared but its value is never read.
  3 |   //  ^?
  4 | </loader>
  5 | <div>
```

### Ln 2, Col 9
```marko
  1 | <const/data = { a: 1 }/>
> 2 | <loader|data|>
    |         ^^^^ Parameter 'data' implicitly has an 'any' type.
  3 |   //  ^?
  4 | </loader>
  5 | <div>
```

### Ln 6, Col 4
```marko
  4 | </loader>
  5 | <div>
> 6 |   <@x/>
    |    ^^ Object literal may only specify known properties, and '["x"]' does not exist in type 'Directives & Div'.
  7 |   // ^?
  8 | </div>
  9 | <span>
```

