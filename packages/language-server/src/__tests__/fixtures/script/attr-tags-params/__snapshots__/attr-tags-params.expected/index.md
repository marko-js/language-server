## Hovers
### Ln 6, Col 7
```marko
  4 |   <@foo bar/>
  5 |   <@foo|data|>
> 6 |     ${data}
    |       ^ (parameter) data: {
    a: string;
    b: number;
}
  7 |     //^?
  8 |   </@foo>
  9 | </child>
```

### Ln 14, Col 7
```marko
  12 |   <@foo bar/>
  13 |   <@foo|data|>
> 14 |     ${data}
     |       ^ (parameter) data: {
    a: string;
    b: number;
}
  15 |     //^?
  16 |   </@foo>
  17 | </Child>
```

### Ln 23, Col 7
```marko
  21 |   <@foo bar/>
  22 |   <@foo|data|>
> 23 |     ${data}
     |       ^ (parameter) data: any
  24 |     //^?
  25 |   </@foo>
  26 | </>
```

## Diagnostics
### Ln 22, Col 9
```marko
  20 | <${true && Child}>
  21 |   <@foo bar/>
> 22 |   <@foo|data|>
     |         ^^^^ Parameter 'data' implicitly has an 'any' type.
  23 |     ${data}
  24 |     //^?
  25 |   </@foo>
```

