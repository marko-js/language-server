## Hovers
### Ln 7, Col 11
```marko
   5 | class {
   6 |   declare state: {
>  7 |     name: T;
     |           ^ (type parameter) T in Component<T extends string>
   8 |   }
   9 |   onCreate(input: Input<T>) {
  10 |     this.state = { name: input.name };
```

### Ln 10, Col 32
```marko
   8 |   }
   9 |   onCreate(input: Input<T>) {
> 10 |     this.state = { name: input.name };
     |                                ^ (property) Input<T>.name: T extends string
  11 |   }
  12 |   onMount() {
  13 |     this.state.name;
```

### Ln 13, Col 16
```marko
  11 |   }
  12 |   onMount() {
> 13 |     this.state.name;
     |                ^ (property) name: T extends string
  14 |   }
  15 | }
  16 |
```

### Ln 17, Col 12
```marko
  15 | }
  16 |
> 17 | -- ${state.name}
     |            ^ (property) name: T extends string
  18 |
```

