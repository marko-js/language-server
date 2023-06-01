## Hovers
### Ln 3, Col 6
```marko
  1 | <let/a = 1/>
  2 |
> 3 | <let/b := a/>
    |      ^ const b: number
  4 | //   ^?   ^?
  5 | <div onClick() {
  6 |   a++;
```

### Ln 3, Col 11
```marko
  1 | <let/a = 1/>
  2 |
> 3 | <let/b := a/>
    |           ^ const a: number
  4 | //   ^?   ^?
  5 | <div onClick() {
  6 |   a++;
```

