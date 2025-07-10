## Diagnostics
### Ln 1, Col 10
```marko
> 1 | <test-tag({ value: "hello!" })/>
    |          ^^^^^^^^^^^^^^^^^^^^^ Type of computed property's value is '[{ value: string; }]', which is not assignable to type '[string, (number | undefined)?]'.
  Type at position 0 in source is not compatible with type at position 0 in target.
    Type '{ value: string; }' is not assignable to type 'string'.
  2 | <test-tag("hello!")/>
  3 | <test-tag("hello!", 1)/>
  4 | <test-tag("hello!", 1, 2)/>
```

### Ln 4, Col 10
```marko
  2 | <test-tag("hello!")/>
  3 | <test-tag("hello!", 1)/>
> 4 | <test-tag("hello!", 1, 2)/>
    |          ^^^^^^^^^^^^^^^^ Type of computed property's value is '[string, number, number]', which is not assignable to type '[string, (number | undefined)?]'.
  Source has 3 element(s) but target allows only 2.
  5 |
```

