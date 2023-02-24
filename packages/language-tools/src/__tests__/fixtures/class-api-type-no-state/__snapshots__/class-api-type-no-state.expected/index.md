## Hovers
### Ln 6, Col 6
```marko
  4 | }
  5 |
> 6 | -- ${state.name}
    |      ^ const state: never
  7 |
```

## Source Diagnostics
### Ln 6, Col 12
```marko
  4 | }
  5 |
> 6 | -- ${state.name}
    |            ^^^^ Property 'name' does not exist on type 'never'.
  7 |
```

## Generated Diagnostics
### Ln 1, Col 13
```ts
> 1 | export type Input = Component["input"];
    |             ^^^^^ Type alias 'Input' circularly references itself.
  2 | abstract class Component extends Marko.Component<Input> {
  3 |   onMount() {
  4 |   }
```

### Ln 1, Col 31
```ts
> 1 | export type Input = Component["input"];
    |                               ^^^^^^^ Property 'input' does not exist on type 'Component'.
  2 | abstract class Component extends Marko.Component<Input> {
  3 |   onMount() {
  4 |   }
```

### Ln 2, Col 16
```ts
  1 | export type Input = Component["input"];
> 2 | abstract class Component extends Marko.Component<Input> {
    |                ^^^^^^^^^ Type 'Component' recursively references itself as a base type.
  3 |   onMount() {
  4 |   }
  5 | }
```

