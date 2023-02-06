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
### Ln 24, Col 29
```ts
  22 | /*custom*/
  23 | [/*custom*/
> 24 | "renderBody"]: Marko.ᜭ.body(function *(
     |                             ^^^^^^^^ The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
  25 | a, %b
  26 | ) {
  27 | return;
```

### Ln 26, Col 3
```ts
  24 | "renderBody"]: Marko.ᜭ.body(function *(
  25 | a, %b
> 26 | ) {
     |   ^ ',' expected.
  27 | return;
  28 |
  29 | })
```

### Ln 26, Col 3
```ts
  24 | "renderBody"]: Marko.ᜭ.body(function *(
  25 | a, %b
> 26 | ) {
     |   ^
> 27 | return;
     | ^^^^^^^
> 28 |
     | ^^^^^^^
> 29 | })
     | ^^ Expected 1 arguments, but got 2.
  30 | });
  31 | return;
  32 |
```

### Ln 27, Col 7
```ts
  25 | a, %b
  26 | ) {
> 27 | return;
     |       ^ ':' expected.
  28 |
  29 | })
  30 | });
```

### Ln 31, Col 1
```ts
  29 | })
  30 | });
> 31 | return;
     | ^^^^^^^ Unreachable code detected.
  32 |
  33 | })();
  34 | }});
```

### Ln 33, Col 2
```ts
  31 | return;
  32 |
> 33 | })();
     |  ^ Unexpected token. A constructor, method, accessor, or property was expected.
  34 | }});
  35 |
```

### Ln 34, Col 1
```ts
  32 |
  33 | })();
> 34 | }});
     | ^ Declaration or statement expected.
  35 |
```

### Ln 34, Col 2
```ts
  32 |
  33 | })();
> 34 | }});
     |  ^ Declaration or statement expected.
  35 |
```

### Ln 34, Col 3
```ts
  32 |
  33 | })();
> 34 | }});
     |   ^ Declaration or statement expected.
  35 |
```

