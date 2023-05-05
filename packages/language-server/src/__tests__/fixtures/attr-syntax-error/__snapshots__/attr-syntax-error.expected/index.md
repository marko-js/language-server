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

### Ln 1, Col 14
```marko
> 1 | <div data-x=#2/>
    |              ^ Argument of type '{ "data-x": any; 2: any; }' is not assignable to parameter of type 'Directives & Marko·Inputᐸʺdivʺᐳ'.
  Object literal may only specify known properties, and '2' does not exist in type 'Directives & Marko·Inputᐸʺdivʺᐳ'.
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

### Ln 5, Col 2
```marko
  3 | <div onClick(a, %b) {
  4 |   console.log(#hello!);
> 5 | }/>
    |  ^ Declaration or statement expected.
  6 |
```

### Ln 3, Col 5
```marko
  1 | <div data-x=#2/>
  2 |
> 3 | <div onClick(a, %b) {
    |     ^^^^^^^^ The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
  4 |   console.log(#hello!);
  5 | }/>
  6 |
```

### Ln 3, Col 5
```marko
  1 | <div data-x=#2/>
  2 |
> 3 | <div onClick(a, %b) {
    |     ^^^^^^^^ Argument of type 'number' is not assignable to parameter of type 'Directives & Marko·Inputᐸʺdivʺᐳ'.
  Type 'number' is not assignable to type 'Marko·Inputᐸʺdivʺᐳ'.
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
### Ln 17, Col 1
```ts
  15 |  "data-x": (
  16 | #2
> 17 | ),
     | ^ ':' expected.
  18 |
  19 | });
  20 | Marko._.renderNativeTag("div")()()({
```

### Ln 19, Col 1
```ts
  17 | ),
  18 |
> 19 | });
     | ^ Expression expected.
  20 | Marko._.renderNativeTag("div")()()({
  21 |  "onClick"(a, %b){
  22 |   console.log(#hello!);
```

### Ln 25, Col 1
```ts
  23 | },
  24 |
> 25 | });
     | ^ Declaration or statement expected.
  26 | return;
  27 | })();
  28 | export default new (
```

### Ln 25, Col 2
```ts
  23 | },
  24 |
> 25 | });
     |  ^ Declaration or statement expected.
  26 | return;
  27 | })();
  28 | export default new (
```

### Ln 27, Col 1
```ts
  25 | });
  26 | return;
> 27 | })();
     | ^ Declaration or statement expected.
  28 | export default new (
  29 |   class Template extends Marko._.Template<{
  30 |       
```

### Ln 27, Col 2
```ts
  25 | });
  26 | return;
> 27 | })();
     |  ^ Declaration or statement expected.
  28 | export default new (
  29 |   class Template extends Marko._.Template<{
  30 |       
```

### Ln 27, Col 3
```ts
  25 | });
  26 | return;
> 27 | })();
     |   ^^^ Unreachable code detected.
  28 | export default new (
  29 |   class Template extends Marko._.Template<{
  30 |       
```

### Ln 27, Col 4
```ts
  25 | });
  26 | return;
> 27 | })();
     |    ^ Expression expected.
  28 | export default new (
  29 |   class Template extends Marko._.Template<{
  30 |       
```

