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
  15 | )
  16 | }));
> 17 | const { %x } = Marko._.rendered.returns[1].value;
     |              ^ Declaration or statement expected. This '=' follows a block of statements, so if you intended to write a destructuring assignment, you might need to wrap the the whole assignment in parentheses.
  18 | return;
  19 |
  20 | }
```

### Ln 17, Col 44
```ts
  15 | )
  16 | }));
> 17 | const { %x } = Marko._.rendered.returns[1].value;
     |                                            ^^^^^ Property 'value' does not exist on type 'never'.
  18 | return;
  19 |
  20 | }
```

### Ln 20, Col 1
```ts
  18 | return;
  19 |
> 20 | }
     | ^ Declaration or statement expected.
  21 | export default new (
  22 |   class Template extends Marko._.Template<{
  23 |     
```

