## Hovers
### Ln 8, Col 5
```marko
   6 | class {
   7 |   declare state: {
>  8 |     name: `${FirstName} ${LastName}`;
     |     ^ (property) name: `${FirstName} ${LastName}`
   9 | //  ^?
  10 |   }
  11 |   onCreate(input: Input<FirstName, LastName>) {
```

### Ln 12, Col 35
```marko
  10 |   }
  11 |   onCreate(input: Input<FirstName, LastName>) {
> 12 |     this.state = { name: `${input.firstName} ${input.lastName}` };
     |                                   ^ (property) Input<FirstName, LastName>.firstName: FirstName extends string
  13 | //                                ^?                 ^?
  14 |   }
  15 |   onMount() {
```

### Ln 12, Col 54
```marko
  10 |   }
  11 |   onCreate(input: Input<FirstName, LastName>) {
> 12 |     this.state = { name: `${input.firstName} ${input.lastName}` };
     |                                                      ^ (property) Input<FirstName, LastName>.lastName: LastName extends string
  13 | //                                ^?                 ^?
  14 |   }
  15 |   onMount() {
```

### Ln 16, Col 16
```marko
  14 |   }
  15 |   onMount() {
> 16 |     this.state.name;
     |                ^ (property) name: `${FirstName} ${LastName}`
  17 | //             ^?
  18 |   }
  19 | }
```

### Ln 21, Col 12
```marko
  19 | }
  20 |
> 21 | -- ${state.name}
     |            ^ (property) name: `${FirstName} ${LastName}`
  22 | //         ^?
  23 |
```

