## Source Diagnostics
### Ln 1, Col 13
```marko
> 1 | <div data-x=#2/>
    |             ^ Invalid character.
  2 |
  3 | <div onClick(a, %b) {
  4 |   console.log(#hello!);
```

### Ln 1, Col 14
```marko
> 1 | <div data-x=#2/>
    |              ^ ')' expected.
  2 |
  3 | <div onClick(a, %b) {
  4 |   console.log(#hello!);
```

### Ln 3, Col 14
```marko
  1 | <div data-x=#2/>
  2 |
> 3 | <div onClick(a, %b) {
    |              ^ 'a' is declared but its value is never read.
  4 |   console.log(#hello!);
  5 | }/>
  6 |
```

### Ln 3, Col 14
```marko
  1 | <div data-x=#2/>
  2 |
> 3 | <div onClick(a, %b) {
    |              ^ Parameter 'a' implicitly has an 'any' type.
  4 |   console.log(#hello!);
  5 | }/>
  6 |
```

### Ln 3, Col 17
```marko
  1 | <div data-x=#2/>
  2 |
> 3 | <div onClick(a, %b) {
    |                 ^ Parameter declaration expected.
  4 |   console.log(#hello!);
  5 | }/>
  6 |
```

### Ln 3, Col 21
```marko
  1 | <div data-x=#2/>
  2 |
> 3 | <div onClick(a, %b) {
    |                     ^ ';' expected.
  4 |   console.log(#hello!);
  5 | }/>
  6 |
```

### Ln 3, Col 2
```marko
  1 | <div data-x=#2/>
  2 |
> 3 | <div onClick(a, %b) {
    |  ^^^^^^^^^^^ The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
  4 |   console.log(#hello!);
  5 | }/>
  6 |
```

### Ln 3, Col 2
```marko
  1 | <div data-x=#2/>
  2 |
> 3 | <div onClick(a, %b) {
    |  ^^^^^^^^^^^ Argument of type 'number' is not assignable to parameter of type '{ [x: string]: unknown; onClick?(event: MouseEvent, element: HTMLDivElement): void; }'.
  4 |   console.log(#hello!);
  5 | }/>
  6 |
```

### Ln 3, Col 18
```marko
  1 | <div data-x=#2/>
  2 |
> 3 | <div onClick(a, %b) {
    |                  ^ Cannot find name 'b'.
  4 |   console.log(#hello!);
  5 | }/>
  6 |
```

## Generated Diagnostics
### Ln 16, Col 1
```ts
  14 | "data-x": (
  15 | #2
> 16 | )
     | ^ ':' expected.
  17 | });
  18 | Marko.ᜭ.renderNativeTag("div")({
  19 | /*div*/
```

### Ln 17, Col 2
```ts
  15 | #2
  16 | )
> 17 | });
     |  ^ Declaration or statement expected.
  18 | Marko.ᜭ.renderNativeTag("div")({
  19 | /*div*/
  20 | "onClick"(a, %b){
```

### Ln 23, Col 1
```ts
  21 |   console.log(#hello!);
  22 | }
> 23 | });
     | ^ Declaration or statement expected.
  24 | return;
  25 |
  26 | }
```

### Ln 23, Col 2
```ts
  21 |   console.log(#hello!);
  22 | }
> 23 | });
     |  ^ Declaration or statement expected.
  24 | return;
  25 |
  26 | }
```

### Ln 26, Col 1
```ts
  24 | return;
  25 |
> 26 | }
     | ^ Declaration or statement expected.
  27 | export default new (
  28 |   class Template extends Marko.ᜭ.Template<{
  29 |       /** Asynchronously render the template. */
```

