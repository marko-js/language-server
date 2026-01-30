## Hovers
### Ln 1, Col 11
```marko
> 1 | <test-tag|a, b|>
    |           ^ (parameter) a: "a"
  2 | //        ^? ^?
  3 |   ${a} ${b}
  4 | //  ^?   ^?
```

### Ln 1, Col 14
```marko
> 1 | <test-tag|a, b|>
    |              ^ (parameter) b: "b"
  2 | //        ^? ^?
  3 |   ${a} ${b}
  4 | //  ^?   ^?
```

### Ln 3, Col 5
```marko
  1 | <test-tag|a, b|>
  2 | //        ^? ^?
> 3 |   ${a} ${b}
    |     ^ (parameter) a: "a"
  4 | //  ^?   ^?
  5 | </test-tag>
  6 |
```

### Ln 3, Col 10
```marko
  1 | <test-tag|a, b|>
  2 | //        ^? ^?
> 3 |   ${a} ${b}
    |          ^ (parameter) b: "b"
  4 | //  ^?   ^?
  5 | </test-tag>
  6 |
```

### Ln 7, Col 11
```marko
   5 | </test-tag>
   6 |
>  7 | <test-tag|a|>
     |           ^ (parameter) a: "a"
   8 | //        ^?
   9 |   <const/hoistedFromTestTag = () => a/>
  10 | </test-tag>
```

### Ln 13, Col 3
```marko
  11 |
  12 | -- ${() => {
> 13 |   hoistedFromTestTag
     |   ^ const hoistedFromTestTag: (() => "a") & Iterable<"a">
  14 | //^?
  15 | }}
  16 |
```

