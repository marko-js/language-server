## Diagnostics
### Ln 2, Col 11
```marko
  1 | <test-tag({ value: "hello!" })/>
> 2 | <test-tag("hello!")/>
    |           ^^^^^^^^ Argument of type 'string' is not assignable to parameter of type 'Directives & Input'.
  Type 'string' is not assignable to type 'Input'.
  3 | <test-tag("hello!", 1, 2)/>
  4 |
```

### Ln 3, Col 21
```marko
  1 | <test-tag({ value: "hello!" })/>
  2 | <test-tag("hello!")/>
> 3 | <test-tag("hello!", 1, 2)/>
    |                     ^^^^ Expected 1 arguments, but got 3.
  4 |
```

