## Diagnostics
### Ln 3, Col 10
```marko
  1 | <test-tag("hello!")/>
  2 | <test-tag("hello!", 1)/>
> 3 | <test-tag("hello!", 1, 2)/>
    |          ^^^^^^^^^^^^^^^^ Type of computed property's value is '[string, number, number]', which is not assignable to type '[string, (number | undefined)?]'.
  Source has 3 element(s) but target allows only 2.
  4 |
```

