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
### Ln 51, Col 1
```ts
  49 | "data-x": (
  50 | #2
> 51 | )
     | ^ ':' expected.
  52 | });
  53 | (1 as any as Marko.ᜭ.NativeTagRenderer<"div">)({
  54 | /*div*/
```

### Ln 58, Col 2
```ts
  56 |   console.log(#hello!);
  57 | }
> 58 | });
     |  ^ Unexpected token. A constructor, method, accessor, or property was expected.
  59 | return;
  60 |
  61 | })();
```

### Ln 61, Col 1
```ts
  59 | return;
  60 |
> 61 | })();
     | ^ Declaration or statement expected.
  62 | }});
  63 |
```

### Ln 61, Col 2
```ts
  59 | return;
  60 |
> 61 | })();
     |  ^ Declaration or statement expected.
  62 | }});
  63 |
```

### Ln 61, Col 3
```ts
  59 | return;
  60 |
> 61 | })();
     |   ^^^ Unreachable code detected.
  62 | }});
  63 |
```

### Ln 61, Col 4
```ts
  59 | return;
  60 |
> 61 | })();
     |    ^ Expression expected.
  62 | }});
  63 |
```

### Ln 62, Col 1
```ts
  60 |
  61 | })();
> 62 | }});
     | ^ Declaration or statement expected.
  63 |
```

### Ln 62, Col 2
```ts
  60 |
  61 | })();
> 62 | }});
     |  ^ Declaration or statement expected.
  63 |
```

### Ln 62, Col 3
```ts
  60 |
  61 | })();
> 62 | }});
     |   ^ Declaration or statement expected.
  63 |
```

