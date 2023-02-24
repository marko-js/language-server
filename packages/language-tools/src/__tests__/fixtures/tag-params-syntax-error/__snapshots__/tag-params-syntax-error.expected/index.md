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
### Ln 13, Col 3
```ts
  11 | ["renderBody"/*custom*/]: ((
  12 | a, %b
> 13 | ) => {
     |   ^^ ')' expected.
  14 | return Marko._.voidReturn;
  15 | })
  16 | });
```

### Ln 13, Col 6
```ts
  11 | ["renderBody"/*custom*/]: ((
  12 | a, %b
> 13 | ) => {
     |      ^ Property assignment expected.
  14 | return Marko._.voidReturn;
  15 | })
  16 | });
```

### Ln 13, Col 6
```ts
  11 | ["renderBody"/*custom*/]: ((
  12 | a, %b
> 13 | ) => {
     |      ^
> 14 | return Marko._.voidReturn;
     | ^^^^^^^^^^^^^^^^^^^^^^^^^^
> 15 | })
     | ^^ Expected 1 arguments, but got 2.
  16 | });
  17 | return;
  18 | }
```

### Ln 14, Col 8
```ts
  12 | a, %b
  13 | ) => {
> 14 | return Marko._.voidReturn;
     |        ^^^^^ ':' expected.
  15 | })
  16 | });
  17 | return;
```

### Ln 14, Col 26
```ts
  12 | a, %b
  13 | ) => {
> 14 | return Marko._.voidReturn;
     |                          ^ ',' expected.
  15 | })
  16 | });
  17 | return;
```

### Ln 16, Col 2
```ts
  14 | return Marko._.voidReturn;
  15 | })
> 16 | });
     |  ^ Declaration or statement expected.
  17 | return;
  18 | }
  19 | export default new (
```

### Ln 18, Col 1
```ts
  16 | });
  17 | return;
> 18 | }
     | ^ Declaration or statement expected.
  19 | export default new (
  20 |   class Template extends Marko._.Template<{
  21 |     
```

