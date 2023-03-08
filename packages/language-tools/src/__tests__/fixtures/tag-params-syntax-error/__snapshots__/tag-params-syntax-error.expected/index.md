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
### Ln 17, Col 3
```ts
  15 | ["renderBody"/*custom*/]: ((
  16 | a, %b
> 17 | ) => {
     |   ^^ ')' expected.
  18 | return Marko._.voidReturn;
  19 | })
  20 | });
```

### Ln 17, Col 6
```ts
  15 | ["renderBody"/*custom*/]: ((
  16 | a, %b
> 17 | ) => {
     |      ^ Property assignment expected.
  18 | return Marko._.voidReturn;
  19 | })
  20 | });
```

### Ln 17, Col 6
```ts
  15 | ["renderBody"/*custom*/]: ((
  16 | a, %b
> 17 | ) => {
     |      ^
> 18 | return Marko._.voidReturn;
     | ^^^^^^^^^^^^^^^^^^^^^^^^^^
> 19 | })
     | ^^ Expected 1 arguments, but got 2.
  20 | });
  21 | return;
  22 | })();
```

### Ln 18, Col 8
```ts
  16 | a, %b
  17 | ) => {
> 18 | return Marko._.voidReturn;
     |        ^^^^^ ':' expected.
  19 | })
  20 | });
  21 | return;
```

### Ln 18, Col 26
```ts
  16 | a, %b
  17 | ) => {
> 18 | return Marko._.voidReturn;
     |                          ^ ',' expected.
  19 | })
  20 | });
  21 | return;
```

### Ln 22, Col 1
```ts
  20 | });
  21 | return;
> 22 | })();
     | ^ Declaration or statement expected.
  23 | export default new (
  24 |   class Template extends Marko._.Template<{
  25 |     
```

### Ln 22, Col 2
```ts
  20 | });
  21 | return;
> 22 | })();
     |  ^ Declaration or statement expected.
  23 | export default new (
  24 |   class Template extends Marko._.Template<{
  25 |     
```

### Ln 22, Col 3
```ts
  20 | });
  21 | return;
> 22 | })();
     |   ^^^ Unreachable code detected.
  23 | export default new (
  24 |   class Template extends Marko._.Template<{
  25 |     
```

### Ln 22, Col 4
```ts
  20 | });
  21 | return;
> 22 | })();
     |    ^ Expression expected.
  23 | export default new (
  24 |   class Template extends Marko._.Template<{
  25 |     
```

