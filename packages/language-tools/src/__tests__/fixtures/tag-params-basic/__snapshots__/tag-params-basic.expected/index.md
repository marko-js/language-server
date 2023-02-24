## Hovers
### Ln 1, Col 11
```marko
> 1 | <test-tag|a, b|>
    |           ^ (parameter) a: "a"
  2 |   ${a} ${b}
  3 | </test-tag>
  4 |
```

### Ln 1, Col 14
```marko
> 1 | <test-tag|a, b|>
    |              ^ (parameter) b: "b"
  2 |   ${a} ${b}
  3 | </test-tag>
  4 |
```

### Ln 2, Col 5
```marko
  1 | <test-tag|a, b|>
> 2 |   ${a} ${b}
    |     ^ (parameter) a: "a"
  3 | </test-tag>
  4 |
  5 | <test-tag|a|>
```

### Ln 2, Col 10
```marko
  1 | <test-tag|a, b|>
> 2 |   ${a} ${b}
    |          ^ (parameter) b: "b"
  3 | </test-tag>
  4 |
  5 | <test-tag|a|>
```

### Ln 5, Col 11
```marko
  3 | </test-tag>
  4 |
> 5 | <test-tag|a|>
    |           ^ (parameter) a: "a"
  6 |   <const/hoistedFromTestTag = a/>
  7 | </test-tag>
  8 |
```

### Ln 10, Col 3
```marko
   8 |
   9 | -- ${() => {
> 10 |   hoistedFromTestTag
     |   ^ const hoistedFromTestTag: "a"
  11 | }}
  12 |
```

