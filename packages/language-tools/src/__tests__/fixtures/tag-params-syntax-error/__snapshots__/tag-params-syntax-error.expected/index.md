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
    |            ^ Cannot find name 'a'.
  2 |   Hi
  3 | </>
  4 |
```

### Ln 1, Col 12
```marko
> 1 | <${custom}|a, %b|>
    |            ^ Left side of comma operator is unused and has no side effects.
  2 |   Hi
  3 | </>
  4 |
```

### Ln 1, Col 15
```marko
> 1 | <${custom}|a, %b|>
    |               ^ Expression expected.
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
### Ln 15, Col 3
```ts
  13 | "renderBody"]: ((
  14 | a, %b
> 15 | ) => {
     |   ^^ ')' expected.
  16 | return Marko._.voidReturn;
  17 |
  18 | })
```

### Ln 15, Col 6
```ts
  13 | "renderBody"]: ((
  14 | a, %b
> 15 | ) => {
     |      ^ Property assignment expected.
  16 | return Marko._.voidReturn;
  17 |
  18 | })
```

### Ln 15, Col 6
```ts
  13 | "renderBody"]: ((
  14 | a, %b
> 15 | ) => {
     |      ^
> 16 | return Marko._.voidReturn;
     | ^^^^^^^^^^^^^^^^^^^^^^^^^^
> 17 |
     | ^^^^^^^^^^^^^^^^^^^^^^^^^^
> 18 | })
     | ^^ Expected 1 arguments, but got 2.
  19 | });
  20 | return;
  21 |
```

### Ln 16, Col 8
```ts
  14 | a, %b
  15 | ) => {
> 16 | return Marko._.voidReturn;
     |        ^^^^^ ':' expected.
  17 |
  18 | })
  19 | });
```

### Ln 16, Col 26
```ts
  14 | a, %b
  15 | ) => {
> 16 | return Marko._.voidReturn;
     |                          ^ ',' expected.
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

