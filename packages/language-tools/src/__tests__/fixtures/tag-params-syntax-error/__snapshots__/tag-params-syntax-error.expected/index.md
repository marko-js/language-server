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
### Ln 13, Col 29
```ts
  11 | /*custom*/
  12 | [/*custom*/
> 13 | "renderBody"]: Marko._.body(function *(
     |                             ^^^^^^^^ The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
  14 | a, %b
  15 | ) {
  16 | return;
```

### Ln 15, Col 3
```ts
  13 | "renderBody"]: Marko._.body(function *(
  14 | a, %b
> 15 | ) {
     |   ^ ',' expected.
  16 | return;
  17 |
  18 | })
```

### Ln 15, Col 3
```ts
  13 | "renderBody"]: Marko._.body(function *(
  14 | a, %b
> 15 | ) {
     |   ^
> 16 | return;
     | ^^^^^^^
> 17 |
     | ^^^^^^^
> 18 | })
     | ^^ Expected 1 arguments, but got 2.
  19 | });
  20 | return;
  21 |
```

### Ln 16, Col 7
```ts
  14 | a, %b
  15 | ) {
> 16 | return;
     |       ^ ':' expected.
  17 |
  18 | })
  19 | });
```

### Ln 19, Col 2
```ts
  17 |
  18 | })
> 19 | });
     |  ^ Declaration or statement expected.
  20 | return;
  21 |
  22 | }
```

### Ln 22, Col 1
```ts
  20 | return;
  21 |
> 22 | }
     | ^ Declaration or statement expected.
  23 | export default new (
  24 |   class Template extends Marko._.Template<{
  25 |     
```

