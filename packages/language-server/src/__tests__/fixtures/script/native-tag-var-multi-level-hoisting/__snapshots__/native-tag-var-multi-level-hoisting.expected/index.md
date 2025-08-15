## Hovers
### Ln 3, Col 8
```marko
  1 | <div>
  2 |   <div onClick() {
> 3 |     searchInput().focus();
    |        ^ const searchInput: never
  4 |     // ^?
  5 |   }>
  6 |     text
```

## Diagnostics
### Ln 3, Col 5
```marko
  1 | <div>
  2 |   <div onClick() {
> 3 |     searchInput().focus();
    |     ^^^^^^^^^^^ This expression is not callable.
  Type 'never' has no call signatures.
  4 |     // ^?
  5 |   }>
  6 |     text
```

