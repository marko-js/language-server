## Hovers
### Ln 8, Col 5
```marko
   6 | class {
   7 |   declare state: {
>  8 |     name: `${FirstName} ${LastName}`;
     |     ^ (property) name: `${FirstName} ${LastName}`
   9 |   }
  10 |   onCreate(input: Input<FirstName, LastName>) {
  11 |     this.state = { name: `${input.firstName} ${input.lastName}` };
```

### Ln 11, Col 35
```marko
   9 |   }
  10 |   onCreate(input: Input<FirstName, LastName>) {
> 11 |     this.state = { name: `${input.firstName} ${input.lastName}` };
     |                                   ^ (property) Input<FirstName, LastName>.firstName: FirstName extends string
  12 |   }
  13 |   onMount() {
  14 |     this.state.name;
```

### Ln 11, Col 54
```marko
   9 |   }
  10 |   onCreate(input: Input<FirstName, LastName>) {
> 11 |     this.state = { name: `${input.firstName} ${input.lastName}` };
     |                                                      ^ (property) Input<FirstName, LastName>.lastName: LastName extends string
  12 |   }
  13 |   onMount() {
  14 |     this.state.name;
```

### Ln 14, Col 16
```marko
  12 |   }
  13 |   onMount() {
> 14 |     this.state.name;
     |                ^ (property) name: `${FirstName} ${LastName}`
  15 |   }
  16 | }
  17 |
```

### Ln 18, Col 12
```marko
  16 | }
  17 |
> 18 | -- ${state.name}
     |            ^ (property) name: `${FirstName} ${LastName}`
  19 |
```

