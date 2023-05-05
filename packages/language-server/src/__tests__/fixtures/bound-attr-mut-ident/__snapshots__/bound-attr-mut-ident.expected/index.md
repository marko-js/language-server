## Hovers
### Ln 3, Col 6
```marko
  1 | <let/a = 1/>
  2 |
> 3 | <let/b := a/>
    |      ^ const b: number
  4 | <div onClick() {
  5 |   a++;
  6 |   b++;
```

### Ln 3, Col 11
```marko
  1 | <let/a = 1/>
  2 |
> 3 | <let/b := a/>
    |           ^ const a: number
  4 | <div onClick() {
  5 |   a++;
  6 |   b++;
```

