## Source Diagnostics
### Ln 3, Col 2
```marko
  1 | <div data-x=#2/>
  2 |
> 3 | <div onClick(a, %b) {
    |  ^^^^^^^^^^^^^^^^^^^^
> 4 |   console.log(#hello!);
    | ^^^^^^^^^^^^^^^^^^^^^^^
> 5 | }/>
    | ^^ Unreachable code detected.
  6 |
```

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
### Ln 25, Col 1
```ts
  23 | "data-x": (
  24 | #2
> 25 | )
     | ^ ':' expected.
  26 | });
  27 | (1 as any as Marko.ᜭ.NativeTagRenderer<"div">)({
  28 | /*div*/
```

### Ln 32, Col 2
```ts
  30 |   console.log(#hello!);
  31 | }
> 32 | });
     |  ^ Unexpected token. A constructor, method, accessor, or property was expected.
  33 | return;
  34 |
  35 | })();
```

### Ln 35, Col 1
```ts
  33 | return;
  34 |
> 35 | })();
     | ^ Declaration or statement expected.
  36 | }});
  37 |
```

### Ln 35, Col 2
```ts
  33 | return;
  34 |
> 35 | })();
     |  ^ Declaration or statement expected.
  36 | }});
  37 |
```

### Ln 35, Col 3
```ts
  33 | return;
  34 |
> 35 | })();
     |   ^^^ Unreachable code detected.
  36 | }});
  37 |
```

### Ln 35, Col 4
```ts
  33 | return;
  34 |
> 35 | })();
     |    ^ Expression expected.
  36 | }});
  37 |
```

### Ln 36, Col 1
```ts
  34 |
  35 | })();
> 36 | }});
     | ^ Declaration or statement expected.
  37 |
```

### Ln 36, Col 2
```ts
  34 |
  35 | })();
> 36 | }});
     |  ^ Declaration or statement expected.
  37 |
```

### Ln 36, Col 3
```ts
  34 |
  35 | })();
> 36 | }});
     |   ^ Declaration or statement expected.
  37 |
```

