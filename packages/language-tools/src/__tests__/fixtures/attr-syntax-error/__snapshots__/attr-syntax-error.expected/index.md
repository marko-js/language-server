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
    |     ^^^^^^^^ Argument of type 'number' is not assignable to parameter of type 'Record<string, unknown>'.
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
### Ln 13, Col 1
```ts
  11 |  "data-x": (
  12 | #2
> 13 | ),
     | ^ ':' expected.
  14 |
  15 | });
  16 | Marko._.renderNativeTag("div")()()({
```

### Ln 15, Col 1
```ts
  13 | ),
  14 |
> 15 | });
     | ^ Expression expected.
  16 | Marko._.renderNativeTag("div")()()({
  17 |  "onClick"(a, %b){
  18 |   console.log(#hello!);
```

### Ln 21, Col 1
```ts
  19 | },
  20 |
> 21 | });
     | ^ Declaration or statement expected.
  22 | return;
  23 | })();
  24 | export default new (
```

### Ln 21, Col 2
```ts
  19 | },
  20 |
> 21 | });
     |  ^ Declaration or statement expected.
  22 | return;
  23 | })();
  24 | export default new (
```

### Ln 23, Col 1
```ts
  21 | });
  22 | return;
> 23 | })();
     | ^ Declaration or statement expected.
  24 | export default new (
  25 |   class Template extends Marko._.Template<{
  26 |     
```

### Ln 23, Col 2
```ts
  21 | });
  22 | return;
> 23 | })();
     |  ^ Declaration or statement expected.
  24 | export default new (
  25 |   class Template extends Marko._.Template<{
  26 |     
```

### Ln 23, Col 3
```ts
  21 | });
  22 | return;
> 23 | })();
     |   ^^^ Unreachable code detected.
  24 | export default new (
  25 |   class Template extends Marko._.Template<{
  26 |     
```

### Ln 23, Col 4
```ts
  21 | });
  22 | return;
> 23 | })();
     |    ^ Expression expected.
  24 | export default new (
  25 |   class Template extends Marko._.Template<{
  26 |     
```

