## Hovers
### Ln 14, Col 15
```marko
  12 |
  13 | <effect() {
> 14 |   console.log(el())
     |               ^ const el: any
  15 | }/>
  16 |
  17 | -- ${x}
```

### Ln 17, Col 6
```marko
  15 | }/>
  16 |
> 17 | -- ${x}
     |      ^ const x: number
  18 |
```

## Source Diagnostics
### Ln 13, Col 2
```marko
  11 | </div>
  12 |
> 13 | <effect() {
     |  ^^^^^^ Cannot find name 'effect'.
  14 |   console.log(el())
  15 | }/>
  16 |
```

### Ln 17, Col 6
```marko
  15 | }/>
  16 |
> 17 | -- ${x}
     |      ^ Block-scoped variable 'x' used before its declaration.
  18 |
```

### Ln 17, Col 6
```marko
  15 | }/>
  16 |
> 17 | -- ${x}
     |      ^ Variable 'x' is used before being assigned.
  18 |
```

## Generated Diagnostics
### Ln 37, Col 40
```ts
  35 |
  36 | }));
> 37 | const el = Marko._.rendered.returns[3].value;
     |                                        ^^^^^ Property 'value' does not exist on type '() => HTMLButtonElement'.
  38 | const __marko_internal_return = {
  39 | mutate: Marko._.mutable([
  40 | ["x", "value", Marko._.rendered.returns[2]],
```

