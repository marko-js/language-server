## Diagnostics
### Ln 4, Col 8
```marko
  2 |   name?: string;
  3 | }
> 4 | <div>${input.name++}</div>
    |        ^^^^^^^^^^ An arithmetic operand must be of type 'any', 'number', 'bigint' or an enum type.
  5 | $ input.name++;
  6 | <my-title/>
  7 | <div>${input.name++}</div>
```

### Ln 4, Col 8
```marko
  2 |   name?: string;
  3 | }
> 4 | <div>${input.name++}</div>
    |        ^^^^^^^^^^ 'input.name' is possibly 'undefined'.
  5 | $ input.name++;
  6 | <my-title/>
  7 | <div>${input.name++}</div>
```

### Ln 5, Col 3
```marko
  3 | }
  4 | <div>${input.name++}</div>
> 5 | $ input.name++;
    |   ^^^^^^^^^^ An arithmetic operand must be of type 'any', 'number', 'bigint' or an enum type.
  6 | <my-title/>
  7 | <div>${input.name++}</div>
  8 |
```

### Ln 5, Col 3
```marko
  3 | }
  4 | <div>${input.name++}</div>
> 5 | $ input.name++;
    |   ^^^^^^^^^^ 'input.name' is possibly 'undefined'.
  6 | <my-title/>
  7 | <div>${input.name++}</div>
  8 |
```

### Ln 7, Col 8
```marko
  5 | $ input.name++;
  6 | <my-title/>
> 7 | <div>${input.name++}</div>
    |        ^^^^^^^^^^ An arithmetic operand must be of type 'any', 'number', 'bigint' or an enum type.
  8 |
```

### Ln 7, Col 8
```marko
  5 | $ input.name++;
  6 | <my-title/>
> 7 | <div>${input.name++}</div>
    |        ^^^^^^^^^^ 'input.name' is possibly 'undefined'.
  8 |
```

