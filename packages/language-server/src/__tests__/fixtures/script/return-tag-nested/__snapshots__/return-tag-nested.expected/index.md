## Hovers
### Ln 2, Col 5
```marko
  1 | <test-tag|a|>
> 2 |   ${a}
    |     ^ (parameter) a: "a"
  3 | //  ^?
  4 | </test-tag>
  5 |
```

### Ln 24, Col 3
```marko
  22 |
  23 | -- ${() => {
> 24 |   hoisted;
     |   ^ const hoisted: (() => 1) & Iterable<() => 1>
  25 | //^?
  26 | }}
  27 |
```

## Diagnostics
### Ln 1, Col 2
```marko
> 1 | <test-tag|a|>
    |  ^^^^^^^^ Type of computed property's value is '(a: "a") => MarkoReturn<void>', which is not assignable to type 'Body<["a"], { value: "a" | "b"; }>'.
  Type 'MarkoReturn<void>' is not assignable to type 'MarkoReturn<{ value: "a" | "b"; }>'.
    Type 'void' is not assignable to type '{ value: "a" | "b"; }'.
  2 |   ${a}
  3 | //  ^?
  4 | </test-tag>
```

### Ln 14, Col 2
```marko
  12 | </test-tag>
  13 |
> 14 | <test-tag>
     |  ^^^^^^^^ Type of computed property's value is '() => MarkoReturn<{ value: "c"; }>', which is not assignable to type 'Body<["a"], { value: "a" | "b"; }>'.
  Call signature return types 'MarkoReturn<{ value: "c"; }>' and 'MarkoReturn<{ value: "a" | "b"; }>' are incompatible.
    The types of 'return.value' are incompatible between these types.
      Type '"c"' is not assignable to type '"a" | "b"'.
  15 |   <return="c" as const/>
  16 | </test-tag>
  17 |
```

