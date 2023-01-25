## Source Diagnostics
### Ln 1, Col 4
```marko
> 1 | <${custom}|a, %b|>
    |    ^^^^^^ Cannot find name 'custom'.
  2 |   Hi
  3 | </>
  4 |
```

### Ln 1, Col 12
```marko
> 1 | <${custom}|a, %b|>
    |            ^ 'a' is declared but its value is never read.
  2 |   Hi
  3 | </>
  4 |
```

### Ln 1, Col 12
```marko
> 1 | <${custom}|a, %b|>
    |            ^ Parameter 'a' implicitly has an 'any' type.
  2 |   Hi
  3 | </>
  4 |
```

### Ln 1, Col 15
```marko
> 1 | <${custom}|a, %b|>
    |               ^ Parameter declaration expected.
  2 |   Hi
  3 | </>
  4 |
```

### Ln 1, Col 12
```marko
> 1 | <${custom}|a, %b|>
    |            ^^^^^ Argument of type 'number' is not assignable to parameter of type 'Body<readonly any[], unknown, unknown>'.
  2 |   Hi
  3 | </>
  4 |
```

### Ln 1, Col 16
```marko
> 1 | <${custom}|a, %b|>
    |                ^ Cannot find name 'b'.
  2 |   Hi
  3 | </>
  4 |
```

## Generated Diagnostics
### Ln 10, Col 29
```ts
   8 | /*custom*/
   9 | [/*custom*/
> 10 | "renderBody"]: Marko.ட.body(function *(
     |                             ^^^^^^^^ The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
  11 | a, %b
  12 | ) {
  13 | return;
```

### Ln 12, Col 3
```ts
  10 | "renderBody"]: Marko.ட.body(function *(
  11 | a, %b
> 12 | ) {
     |   ^ ',' expected.
  13 | return;
  14 |
  15 | })
```

### Ln 12, Col 3
```ts
  10 | "renderBody"]: Marko.ட.body(function *(
  11 | a, %b
> 12 | ) {
     |   ^
> 13 | return;
     | ^^^^^^^
> 14 |
     | ^^^^^^^
> 15 | })
     | ^^ Expected 1 arguments, but got 2.
  16 | });
  17 | return;
  18 |
```

### Ln 13, Col 7
```ts
  11 | a, %b
  12 | ) {
> 13 | return;
     |       ^ ':' expected.
  14 |
  15 | })
  16 | });
```

### Ln 16, Col 2
```ts
  14 |
  15 | })
> 16 | });
     |  ^ Declaration or statement expected.
  17 | return;
  18 |
  19 | }
```

### Ln 19, Col 1
```ts
  17 | return;
  18 |
> 19 | }
     | ^ Declaration or statement expected.
  20 | class ட extends Marko.Component<Input>{};
  21 | declare namespace ˍ {
  22 | const id: unique symbol;
```

### Ln 20, Col 1
```ts
  18 |
  19 | }
> 20 | class ட extends Marko.Component<Input>{};
     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Unreachable code detected.
  21 | declare namespace ˍ {
  22 | const id: unique symbol;
  23 | const template: Marko.Template<typeof id>;
```

