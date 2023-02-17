## Hovers
### Ln 2, Col 5
```marko
  1 | <test-tag|a|>
> 2 |   ${a}
    |     ^ (parameter) a: "a"
  3 | </test-tag>
  4 |
  5 | <test-tag|a|>
```

### Ln 23, Col 3
```marko
  21 |
  22 | -- ${() => {
> 23 |   hoisted;
     |   ^ const hoisted: 1
  24 | }}
  25 |
```

## Source Diagnostics
### Ln 1, Col 2
```marko
> 1 | <test-tag|a|>
    |  ^^^^^^^^ Type '(a: "a") => MarkoReturn<void>' is not assignable to type 'Body<["a"], { value: "a" | "b"; }>'.
  Type 'MarkoReturn<void>' is not assignable to type 'MarkoReturn<{ value: "a" | "b"; }>'.
    Type 'void' is not assignable to type '{ value: "a" | "b"; }'.
  2 |   ${a}
  3 | </test-tag>
  4 |
```

### Ln 13, Col 2
```marko
  11 | </test-tag>
  12 |
> 13 | <test-tag>
     |  ^^^^^^^^ Type '() => MarkoReturn<{ value: "c"; }>' is not assignable to type 'Body<["a"], { value: "a" | "b"; }>'.
  Call signature return types 'MarkoReturn<{ value: "c"; }>' and 'MarkoReturn<{ value: "a" | "b"; }>' are incompatible.
    The types of 'return.value' are incompatible between these types.
      Type '"c"' is not assignable to type '"a" | "b"'.
  14 |   <return="c" as const/>
  15 | </test-tag>
  16 |
```

