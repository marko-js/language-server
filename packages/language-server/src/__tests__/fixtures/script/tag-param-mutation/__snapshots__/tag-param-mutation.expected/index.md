## Hovers
### Ln 1, Col 7
```marko
> 1 | <let/string="bar"/>
    |       ^ const string: string
  2 |   //  ^?
  3 | <test-tag|val|>
  4 |   <button onClick() { string = val }>
```

### Ln 4, Col 24
```marko
  2 |   //  ^?
  3 | <test-tag|val|>
> 4 |   <button onClick() { string = val }>
    |                        ^ (property) string: string
  5 |                   //   ^?      ^?
  6 |     ${val}
  7 |   </button>
```

### Ln 4, Col 32
```marko
  2 |   //  ^?
  3 | <test-tag|val|>
> 4 |   <button onClick() { string = val }>
    |                                ^ (parameter) val: string
  5 |                   //   ^?      ^?
  6 |     ${val}
  7 |   </button>
```

### Ln 16, Col 6
```marko
  14 |
  15 | <button onClick() {
> 16 |   inputId;
     |      ^ const inputId: never
  17 |   // ^?
  18 | }>Body to prevent a11y error</button>
```

