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
### Ln 21, Col 14
```ts
  19 |
  20 | }));
> 21 | const { %x } = Marko._.rendered.returns[1].value;
     |              ^ Declaration or statement expected. This '=' follows a block of statements, so if you intended to write a destructuring assignment, you might need to wrap the the whole assignment in parentheses.
  22 | return;
  23 | })();
  24 | export default new (
```

### Ln 21, Col 16
```ts
  19 |
  20 | }));
> 21 | const { %x } = Marko._.rendered.returns[1].value;
     |                ^^^^^ ')' expected.
  22 | return;
  23 | })();
  24 | export default new (
```

### Ln 21, Col 44
```ts
  19 |
  20 | }));
> 21 | const { %x } = Marko._.rendered.returns[1].value;
     |                                            ^^^^^ Property 'value' does not exist on type 'never'.
  22 | return;
  23 | })();
  24 | export default new (
```

### Ln 23, Col 1
```ts
  21 | const { %x } = Marko._.rendered.returns[1].value;
  22 | return;
> 23 | })();
     | ^ Declaration or statement expected.
  24 | export default new (
  25 |   class Template extends Marko._.Template<{
  26 |     
```

### Ln 23, Col 2
```ts
  21 | const { %x } = Marko._.rendered.returns[1].value;
  22 | return;
> 23 | })();
     |  ^ Declaration or statement expected.
  24 | export default new (
  25 |   class Template extends Marko._.Template<{
  26 |     
```

### Ln 23, Col 3
```ts
  21 | const { %x } = Marko._.rendered.returns[1].value;
  22 | return;
> 23 | })();
     |   ^^^ Unreachable code detected.
  24 | export default new (
  25 |   class Template extends Marko._.Template<{
  26 |     
```

### Ln 23, Col 4
```ts
  21 | const { %x } = Marko._.rendered.returns[1].value;
  22 | return;
> 23 | })();
     |    ^ Expression expected.
  24 | export default new (
  25 |   class Template extends Marko._.Template<{
  26 |     
```

