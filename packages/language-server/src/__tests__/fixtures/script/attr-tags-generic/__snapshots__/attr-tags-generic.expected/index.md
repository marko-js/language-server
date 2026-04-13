## Hovers
### Ln 2, Col 10
```marko
  1 | <foo value=1 as const>
> 2 |   <@then|foo|>
    |          ^ (parameter) foo: 1
  3 |     //   ^?
  4 |     ${foo}
  5 |   </@then>
```

### Ln 10, Col 12
```marko
   8 | <foo value=1 as const>
   9 |   <for|i| of=[1]>
> 10 |     <@then|foo|>
     |            ^ (parameter) foo: unknown
  11 |       //   ^?
  12 |       ${i}
  13 |       //^?
```

### Ln 12, Col 9
```marko
  10 |     <@then|foo|>
  11 |       //   ^?
> 12 |       ${i}
     |         ^ (parameter) i: number
  13 |       //^?
  14 |       ${foo}
  15 |       //^?
```

### Ln 14, Col 9
```marko
  12 |       ${i}
  13 |       //^?
> 14 |       ${foo}
     |         ^ (parameter) foo: unknown
  15 |       //^?
  16 |     </@then>
  17 |   </for>
```

