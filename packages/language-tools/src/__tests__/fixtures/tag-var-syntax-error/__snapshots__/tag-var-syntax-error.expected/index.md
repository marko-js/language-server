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
### Ln 21, Col 1
```ts
  19 | const { value:
  20 | { %x }
> 21 | } = Marko._.rendered.returns[1];
     | ^ Declaration or statement expected.
  22 | return;
  23 |
  24 | }
```

### Ln 21, Col 3
```ts
  19 | const { value:
  20 | { %x }
> 21 | } = Marko._.rendered.returns[1];
     |   ^ Declaration or statement expected.
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

