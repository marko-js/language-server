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
### Ln 55, Col 1
```ts
  53 | const { value:
  54 | { %x }
> 55 | } = Marko.ᜭ.rendered.returns[1];
     | ^ ')' expected.
  56 | return;
  57 |
  58 | })();
```

### Ln 55, Col 3
```ts
  53 | const { value:
  54 | { %x }
> 55 | } = Marko.ᜭ.rendered.returns[1];
     |   ^ Declaration or statement expected. This '=' follows a block of statements, so if you intended to write a destructuring assignment, you might need to wrap the the whole assignment in parentheses.
  56 | return;
  57 |
  58 | })();
```

### Ln 55, Col 5
```ts
  53 | const { value:
  54 | { %x }
> 55 | } = Marko.ᜭ.rendered.returns[1];
     |     ^^^^^ Unexpected keyword or identifier.
  56 | return;
  57 |
  58 | })();
```

### Ln 55, Col 5
```ts
  53 | const { value:
  54 | { %x }
> 55 | } = Marko.ᜭ.rendered.returns[1];
     |     ^^^^^ Member 'Marko' implicitly has an 'any' type.
  56 | return;
  57 |
  58 | })();
```

### Ln 55, Col 10
```ts
  53 | const { value:
  54 | { %x }
> 55 | } = Marko.ᜭ.rendered.returns[1];
     |          ^ Unexpected token. A constructor, method, accessor, or property was expected.
  56 | return;
  57 |
  58 | })();
```

### Ln 55, Col 11
```ts
  53 | const { value:
  54 | { %x }
> 55 | } = Marko.ᜭ.rendered.returns[1];
     |           ^ Unexpected keyword or identifier.
  56 | return;
  57 |
  58 | })();
```

### Ln 55, Col 11
```ts
  53 | const { value:
  54 | { %x }
> 55 | } = Marko.ᜭ.rendered.returns[1];
     |           ^ Duplicate identifier 'ᜭ'.
  56 | return;
  57 |
  58 | })();
```

### Ln 55, Col 11
```ts
  53 | const { value:
  54 | { %x }
> 55 | } = Marko.ᜭ.rendered.returns[1];
     |           ^ Property 'ᜭ' has no initializer and is not definitely assigned in the constructor.
  56 | return;
  57 |
  58 | })();
```

### Ln 55, Col 11
```ts
  53 | const { value:
  54 | { %x }
> 55 | } = Marko.ᜭ.rendered.returns[1];
     |           ^ Subsequent property declarations must have the same type.  Property 'ᜭ' must be of type '<ᜭ = unknown>(input: Relate<Input, ᜭ>) => ReturnAndScope<Scopes<ᜭ>, (this: void) => void>', but here has type 'any'.
  56 | return;
  57 |
  58 | })();
```

### Ln 55, Col 12
```ts
  53 | const { value:
  54 | { %x }
> 55 | } = Marko.ᜭ.rendered.returns[1];
     |            ^ Unexpected token. A constructor, method, accessor, or property was expected.
  56 | return;
  57 |
  58 | })();
```

### Ln 55, Col 13
```ts
  53 | const { value:
  54 | { %x }
> 55 | } = Marko.ᜭ.rendered.returns[1];
     |             ^^^^^^^^ Unexpected keyword or identifier.
  56 | return;
  57 |
  58 | })();
```

### Ln 55, Col 13
```ts
  53 | const { value:
  54 | { %x }
> 55 | } = Marko.ᜭ.rendered.returns[1];
     |             ^^^^^^^^ Member 'rendered' implicitly has an 'any' type.
  56 | return;
  57 |
  58 | })();
```

### Ln 55, Col 21
```ts
  53 | const { value:
  54 | { %x }
> 55 | } = Marko.ᜭ.rendered.returns[1];
     |                     ^ Unexpected token. A constructor, method, accessor, or property was expected.
  56 | return;
  57 |
  58 | })();
```

### Ln 55, Col 22
```ts
  53 | const { value:
  54 | { %x }
> 55 | } = Marko.ᜭ.rendered.returns[1];
     |                      ^^^^^^^ Unknown keyword or identifier. Did you mean 'return'?
  56 | return;
  57 |
  58 | })();
```

### Ln 55, Col 22
```ts
  53 | const { value:
  54 | { %x }
> 55 | } = Marko.ᜭ.rendered.returns[1];
     |                      ^^^^^^^ Member 'returns' implicitly has an 'any' type.
  56 | return;
  57 |
  58 | })();
```

### Ln 55, Col 29
```ts
  53 | const { value:
  54 | { %x }
> 55 | } = Marko.ᜭ.rendered.returns[1];
     |                             ^^^ Member '[1]' implicitly has an 'any' type.
  56 | return;
  57 |
  58 | })();
```

### Ln 56, Col 1
```ts
  54 | { %x }
  55 | } = Marko.ᜭ.rendered.returns[1];
> 56 | return;
     | ^^^^^^ Member 'return' implicitly has an 'any' type.
  57 |
  58 | })();
  59 | }});
```

### Ln 59, Col 1
```ts
  57 |
  58 | })();
> 59 | }});
     | ^ Declaration or statement expected.
  60 |
```

### Ln 59, Col 2
```ts
  57 |
  58 | })();
> 59 | }});
     |  ^ Declaration or statement expected.
  60 |
```

### Ln 59, Col 3
```ts
  57 |
  58 | })();
> 59 | }});
     |   ^ Declaration or statement expected.
  60 |
```

