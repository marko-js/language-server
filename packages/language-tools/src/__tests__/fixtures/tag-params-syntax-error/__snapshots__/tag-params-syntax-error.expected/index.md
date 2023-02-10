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
### Ln 15, Col 29
```ts
  13 | /*custom*/
  14 | [/*custom*/
> 15 | "renderBody"]: Marko._.body(function *(
     |                             ^^^^^^^^ The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
  16 | a, %b
  17 | ) {
  18 | return;
```

### Ln 17, Col 3
```ts
  15 | "renderBody"]: Marko._.body(function *(
  16 | a, %b
> 17 | ) {
     |   ^ ',' expected.
  18 | return;
  19 |
  20 | })
```

### Ln 17, Col 3
```ts
  15 | "renderBody"]: Marko._.body(function *(
  16 | a, %b
> 17 | ) {
     |   ^
> 18 | return;
     | ^^^^^^^
> 19 |
     | ^^^^^^^
> 20 | })
     | ^^ Expected 1 arguments, but got 2.
  21 | });
  22 | return;
  23 |
```

### Ln 18, Col 7
```ts
  16 | a, %b
  17 | ) {
> 18 | return;
     |       ^ ':' expected.
  19 |
  20 | })
  21 | });
```

### Ln 21, Col 2
```ts
  19 |
  20 | })
> 21 | });
     |  ^ Declaration or statement expected.
  22 | return;
  23 |
  24 | }
```

### Ln 24, Col 1
```ts
  22 | return;
  23 |
> 24 | }
     | ^ Declaration or statement expected.
  25 | export default new (
  26 |   class Template extends Marko._.Template<{
  27 |       
```

