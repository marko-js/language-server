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
### Ln 11, Col 1
```ts
   9 | "data-x": (
  10 | #2
> 11 | )
     | ^ ':' expected.
  12 | });
  13 | ˍ.tags["div"]({
  14 | /*div*/
```

### Ln 12, Col 2
```ts
  10 | #2
  11 | )
> 12 | });
     |  ^ Declaration or statement expected.
  13 | ˍ.tags["div"]({
  14 | /*div*/
  15 | "onClick"(a, %b){
```

### Ln 18, Col 1
```ts
  16 |   console.log(#hello!);
  17 | }
> 18 | });
     | ^ Declaration or statement expected.
  19 | return;
  20 |
  21 | }
```

### Ln 18, Col 2
```ts
  16 |   console.log(#hello!);
  17 | }
> 18 | });
     |  ^ Declaration or statement expected.
  19 | return;
  20 |
  21 | }
```

### Ln 21, Col 1
```ts
  19 | return;
  20 |
> 21 | }
     | ^ Declaration or statement expected.
  22 | class ட extends Marko.Component<Input>{};
  23 |
  24 | declare namespace ˍ {const tags: {
```

### Ln 22, Col 1
```ts
  20 |
  21 | }
> 22 | class ட extends Marko.Component<Input>{};
     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Unreachable code detected.
  23 |
  24 | declare namespace ˍ {const tags: {
  25 | "div": Marko.ட.NativeTagRenderer<"div">;
```

