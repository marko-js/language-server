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
### Ln 15, Col 1
```ts
  13 | const { value:
  14 | { %x }
> 15 | } = Marko.ட.rendered.returns[1];
     | ^ Declaration or statement expected.
  16 | return;
  17 |
  18 | }
```

### Ln 15, Col 3
```ts
  13 | const { value:
  14 | { %x }
> 15 | } = Marko.ட.rendered.returns[1];
     |   ^ Declaration or statement expected.
  16 | return;
  17 |
  18 | }
```

### Ln 18, Col 1
```ts
  16 | return;
  17 |
> 18 | }
     | ^ Declaration or statement expected.
  19 | class ட extends Marko.Component<Input>{};
  20 | declare namespace ˍ {
  21 | const id: "@language-tools/src/__tests__/fixtures/tag-var-syntax-error/index.marko";
```

### Ln 19, Col 1
```ts
  17 |
  18 | }
> 19 | class ட extends Marko.Component<Input>{};
     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Unreachable code detected.
  20 | declare namespace ˍ {
  21 | const id: "@language-tools/src/__tests__/fixtures/tag-var-syntax-error/index.marko";
  22 | const template: Marko.Template<typeof id>;
```

