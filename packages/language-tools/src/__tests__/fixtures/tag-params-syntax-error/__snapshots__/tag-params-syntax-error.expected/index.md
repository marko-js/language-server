## Source Diagnostics
### Ln 1, Col 12
```marko
> 1 | <${custom}|a, %b|>
    |            ^ 'a' is declared but its value is never read.
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

### Ln 1, Col 4
```marko
> 1 | <${custom}|a, %b|>
    |    ^^^^^^^^^^^^^ This expression is not callable.
  Type '(Anonymous class)' has no call signatures.
  2 |   Hi
  3 | </>
  4 |
```

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
    |            ^^^^^ Argument of type 'number' is not assignable to parameter of type 'Body<readonly any[], unknown, unknown>'.
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

### Ln 1, Col 16
```marko
> 1 | <${custom}|a, %b|>
    |                ^ Cannot find name 'b'.
  2 |   Hi
  3 | </>
  4 |
```

## Generated Diagnostics
### Ln 50, Col 29
```ts
  48 | /*custom*/
  49 | [/*custom*/
> 50 | "renderBody"]: Marko.ᜭ.body(function *(
     |                             ^^^^^^^^ The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
  51 | a, %b
  52 | ) {
  53 | return;
```

### Ln 52, Col 3
```ts
  50 | "renderBody"]: Marko.ᜭ.body(function *(
  51 | a, %b
> 52 | ) {
     |   ^ ',' expected.
  53 | return;
  54 |
  55 | })
```

### Ln 52, Col 3
```ts
  50 | "renderBody"]: Marko.ᜭ.body(function *(
  51 | a, %b
> 52 | ) {
     |   ^
> 53 | return;
     | ^^^^^^^
> 54 |
     | ^^^^^^^
> 55 | })
     | ^^ Expected 1 arguments, but got 2.
  56 | });
  57 | return;
  58 |
```

### Ln 53, Col 7
```ts
  51 | a, %b
  52 | ) {
> 53 | return;
     |       ^ ':' expected.
  54 |
  55 | })
  56 | });
```

### Ln 57, Col 1
```ts
  55 | })
  56 | });
> 57 | return;
     | ^^^^^^^ Unreachable code detected.
  58 |
  59 | })();
  60 | }});
```

### Ln 59, Col 2
```ts
  57 | return;
  58 |
> 59 | })();
     |  ^ Unexpected token. A constructor, method, accessor, or property was expected.
  60 | }});
  61 |
```

### Ln 60, Col 1
```ts
  58 |
  59 | })();
> 60 | }});
     | ^ Declaration or statement expected.
  61 |
```

### Ln 60, Col 2
```ts
  58 |
  59 | })();
> 60 | }});
     |  ^ Declaration or statement expected.
  61 |
```

### Ln 60, Col 3
```ts
  58 |
  59 | })();
> 60 | }});
     |   ^ Declaration or statement expected.
  61 |
```

