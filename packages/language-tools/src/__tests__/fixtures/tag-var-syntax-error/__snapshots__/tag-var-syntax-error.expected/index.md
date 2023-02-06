## Source Diagnostics
### Ln 2, Col 8
```marko
  1 | // Should be resistant to syntax errors.
> 2 | <let/{ %x } = 1/>
    |        ^ Property destructuring pattern expected.
  3 |
  4 |
```

### Ln 1, Col 3
```marko
> 1 | // Should be resistant to syntax errors.
    |   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 2 | <let/{ %x } = 1/>
    | ^^^^^^^^^^^^ This expression is not callable.
  Type '(Anonymous class)' has no call signatures.
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
### Ln 29, Col 1
```ts
  27 | const { value:
  28 | { %x }
> 29 | } = Marko.ᜭ.rendered.returns[1];
     | ^ ')' expected.
  30 | return;
  31 |
  32 | })();
```

### Ln 29, Col 3
```ts
  27 | const { value:
  28 | { %x }
> 29 | } = Marko.ᜭ.rendered.returns[1];
     |   ^ Declaration or statement expected. This '=' follows a block of statements, so if you intended to write a destructuring assignment, you might need to wrap the the whole assignment in parentheses.
  30 | return;
  31 |
  32 | })();
```

### Ln 29, Col 5
```ts
  27 | const { value:
  28 | { %x }
> 29 | } = Marko.ᜭ.rendered.returns[1];
     |     ^^^^^ Unexpected keyword or identifier.
  30 | return;
  31 |
  32 | })();
```

### Ln 29, Col 5
```ts
  27 | const { value:
  28 | { %x }
> 29 | } = Marko.ᜭ.rendered.returns[1];
     |     ^^^^^ Member 'Marko' implicitly has an 'any' type.
  30 | return;
  31 |
  32 | })();
```

### Ln 29, Col 10
```ts
  27 | const { value:
  28 | { %x }
> 29 | } = Marko.ᜭ.rendered.returns[1];
     |          ^ Unexpected token. A constructor, method, accessor, or property was expected.
  30 | return;
  31 |
  32 | })();
```

### Ln 29, Col 11
```ts
  27 | const { value:
  28 | { %x }
> 29 | } = Marko.ᜭ.rendered.returns[1];
     |           ^ Unexpected keyword or identifier.
  30 | return;
  31 |
  32 | })();
```

### Ln 29, Col 11
```ts
  27 | const { value:
  28 | { %x }
> 29 | } = Marko.ᜭ.rendered.returns[1];
     |           ^ Duplicate identifier 'ᜭ'.
  30 | return;
  31 |
  32 | })();
```

### Ln 29, Col 11
```ts
  27 | const { value:
  28 | { %x }
> 29 | } = Marko.ᜭ.rendered.returns[1];
     |           ^ Property 'ᜭ' has no initializer and is not definitely assigned in the constructor.
  30 | return;
  31 |
  32 | })();
```

### Ln 29, Col 11
```ts
  27 | const { value:
  28 | { %x }
> 29 | } = Marko.ᜭ.rendered.returns[1];
     |           ^ Subsequent property declarations must have the same type.  Property 'ᜭ' must be of type '<ᜭ = unknown>(input: Relate<Input, ᜭ>) => ReturnWithScope<Scopes<ᜭ>, (this: void) => void>', but here has type 'any'.
  30 | return;
  31 |
  32 | })();
```

### Ln 29, Col 12
```ts
  27 | const { value:
  28 | { %x }
> 29 | } = Marko.ᜭ.rendered.returns[1];
     |            ^ Unexpected token. A constructor, method, accessor, or property was expected.
  30 | return;
  31 |
  32 | })();
```

### Ln 29, Col 13
```ts
  27 | const { value:
  28 | { %x }
> 29 | } = Marko.ᜭ.rendered.returns[1];
     |             ^^^^^^^^ Unexpected keyword or identifier.
  30 | return;
  31 |
  32 | })();
```

### Ln 29, Col 13
```ts
  27 | const { value:
  28 | { %x }
> 29 | } = Marko.ᜭ.rendered.returns[1];
     |             ^^^^^^^^ Member 'rendered' implicitly has an 'any' type.
  30 | return;
  31 |
  32 | })();
```

### Ln 29, Col 21
```ts
  27 | const { value:
  28 | { %x }
> 29 | } = Marko.ᜭ.rendered.returns[1];
     |                     ^ Unexpected token. A constructor, method, accessor, or property was expected.
  30 | return;
  31 |
  32 | })();
```

### Ln 29, Col 22
```ts
  27 | const { value:
  28 | { %x }
> 29 | } = Marko.ᜭ.rendered.returns[1];
     |                      ^^^^^^^ Unknown keyword or identifier. Did you mean 'return'?
  30 | return;
  31 |
  32 | })();
```

### Ln 29, Col 22
```ts
  27 | const { value:
  28 | { %x }
> 29 | } = Marko.ᜭ.rendered.returns[1];
     |                      ^^^^^^^ Member 'returns' implicitly has an 'any' type.
  30 | return;
  31 |
  32 | })();
```

### Ln 29, Col 29
```ts
  27 | const { value:
  28 | { %x }
> 29 | } = Marko.ᜭ.rendered.returns[1];
     |                             ^^^ Member '[1]' implicitly has an 'any' type.
  30 | return;
  31 |
  32 | })();
```

### Ln 30, Col 1
```ts
  28 | { %x }
  29 | } = Marko.ᜭ.rendered.returns[1];
> 30 | return;
     | ^^^^^^ Member 'return' implicitly has an 'any' type.
  31 |
  32 | })();
  33 | }});
```

### Ln 33, Col 1
```ts
  31 |
  32 | })();
> 33 | }});
     | ^ Declaration or statement expected.
  34 |
```

### Ln 33, Col 2
```ts
  31 |
  32 | })();
> 33 | }});
     |  ^ Declaration or statement expected.
  34 |
```

### Ln 33, Col 3
```ts
  31 |
  32 | })();
> 33 | }});
     |   ^ Declaration or statement expected.
  34 |
```

