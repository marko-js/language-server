## Hovers
### Ln 7, Col 11
```marko
   5 | class {
   6 |   declare state: {
>  7 |     name: T;
     |           ^ (type parameter) T in Component<T extends string>
   8 | //        ^?
   9 |   }
  10 |   onCreate(input: Input<T>) {
```

### Ln 11, Col 32
```marko
   9 |   }
  10 |   onCreate(input: Input<T>) {
> 11 |     this.state = { name: input.name };
     |                                ^ (property) Input<T>.name: T extends string
  12 | //                             ^?
  13 |   }
  14 |   onMount() {
```

### Ln 15, Col 16
```marko
  13 |   }
  14 |   onMount() {
> 15 |     this.state.name;
     |                ^ (property) name: T extends string
  16 | //             ^?
  17 |   }
  18 | }
```

### Ln 20, Col 12
```marko
  18 | }
  19 |
> 20 | -- ${state.name}
     |            ^ (property) name: T extends string
  21 | //         ^?
```

