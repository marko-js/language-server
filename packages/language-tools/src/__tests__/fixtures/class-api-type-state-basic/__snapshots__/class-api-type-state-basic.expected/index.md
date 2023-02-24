## Hovers
### Ln 6, Col 16
```marko
  4 |   }
  5 |   onMount() {
> 6 |     this.state.name;
    |                ^ (property) name: string
  7 |   }
  8 | }
  9 |
```

### Ln 10, Col 12
```marko
   8 | }
   9 |
> 10 | -- ${state.name}
     |            ^ (property) name: string
  11 |
```

## Generated Diagnostics
### Ln 1, Col 13
```ts
> 1 | export type Input = Component["input"];
    |             ^^^^^ Type alias 'Input' circularly references itself.
  2 | abstract class Component extends Marko.Component<Input> {
  3 |   declare state: {
  4 |     name: string;
```

### Ln 1, Col 31
```ts
> 1 | export type Input = Component["input"];
    |                               ^^^^^^^ Property 'input' does not exist on type 'Component'.
  2 | abstract class Component extends Marko.Component<Input> {
  3 |   declare state: {
  4 |     name: string;
```

### Ln 2, Col 16
```ts
  1 | export type Input = Component["input"];
> 2 | abstract class Component extends Marko.Component<Input> {
    |                ^^^^^^^^^ Type 'Component' recursively references itself as a base type.
  3 |   declare state: {
  4 |     name: string;
  5 |   }
```

