## Source Diagnostics
### Ln 2, Col 8
```marko
  1 | // Should be resistant to syntax errors.
> 2 | <let/{ %x } = 1/>
    |        ^ Property destructuring pattern expected.
  3 |
  4 |
```

### Ln 2, Col 9
```marko
  1 | // Should be resistant to syntax errors.
> 2 | <let/{ %x } = 1/>
    |         ^ Cannot find name 'x'.
  3 |
  4 |
```

## Generated Diagnostics
### Ln 17, Col 14
```ts
  15 |
  16 | }));
> 17 | const { %x } = Marko._.rendered.returns[1].value;
     |              ^ Declaration or statement expected. This '=' follows a block of statements, so if you intended to write a destructuring assignment, you might need to wrap the the whole assignment in parentheses.
  18 | return;
  19 | })();
  20 | export default new (
```

### Ln 17, Col 16
```ts
  15 |
  16 | }));
> 17 | const { %x } = Marko._.rendered.returns[1].value;
     |                ^^^^^ ')' expected.
  18 | return;
  19 | })();
  20 | export default new (
```

### Ln 17, Col 44
```ts
  15 |
  16 | }));
> 17 | const { %x } = Marko._.rendered.returns[1].value;
     |                                            ^^^^^ Property 'value' does not exist on type 'never'.
  18 | return;
  19 | })();
  20 | export default new (
```

### Ln 19, Col 1
```ts
  17 | const { %x } = Marko._.rendered.returns[1].value;
  18 | return;
> 19 | })();
     | ^ Declaration or statement expected.
  20 | export default new (
  21 |   class Template extends Marko._.Template<{
  22 |     
```

### Ln 19, Col 2
```ts
  17 | const { %x } = Marko._.rendered.returns[1].value;
  18 | return;
> 19 | })();
     |  ^ Declaration or statement expected.
  20 | export default new (
  21 |   class Template extends Marko._.Template<{
  22 |     
```

### Ln 19, Col 3
```ts
  17 | const { %x } = Marko._.rendered.returns[1].value;
  18 | return;
> 19 | })();
     |   ^^^ Unreachable code detected.
  20 | export default new (
  21 |   class Template extends Marko._.Template<{
  22 |     
```

### Ln 19, Col 4
```ts
  17 | const { %x } = Marko._.rendered.returns[1].value;
  18 | return;
> 19 | })();
     |    ^ Expression expected.
  20 | export default new (
  21 |   class Template extends Marko._.Template<{
  22 |     
```

