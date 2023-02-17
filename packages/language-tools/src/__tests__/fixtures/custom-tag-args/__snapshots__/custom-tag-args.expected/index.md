## Generated Diagnostics
### Ln 22, Col 1
```ts
  20 | Marko._.renderTemplate(import("./components/test-tag.marko"))()()({
  21 | /*test-tag*/
> 22 | value: ["hello!", 1, 2],
     | ^^^^^ Type '[string, number, number]' is not assignable to type '[string, (number | undefined)?]'.
  Source has 3 element(s) but target allows only 2.
  23 |
  24 | });
  25 | return;
```

