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
### Ln 20, Col 1
```ts
  18 | const { value:
  19 | { %x }
> 20 | } = Marko.ᜭ.rendered.returns[1];
     | ^ Declaration or statement expected.
  21 | return;
  22 |
  23 | }
```

### Ln 20, Col 3
```ts
  18 | const { value:
  19 | { %x }
> 20 | } = Marko.ᜭ.rendered.returns[1];
     |   ^ Declaration or statement expected.
  21 | return;
  22 |
  23 | }
```

### Ln 23, Col 1
```ts
  21 | return;
  22 |
> 23 | }
     | ^ Declaration or statement expected.
  24 | export default new (
  25 |   class Template extends Marko.ᜭ.Template<{
  26 |       /** Asynchronously render the template. */
```

