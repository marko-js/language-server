## Diagnostics
### Ln 1, Col 12
```marko
> 1 | <div class=data.className>
    |            ^^^^ The 'data' variable is deprecated. Use 'input' instead.
  2 |   Hello ${data.name}!
  3 | </div>
  4 |
```

### Ln 2, Col 11
```marko
  1 | <div class=data.className>
> 2 |   Hello ${data.name}!
    |           ^^^^ The 'data' variable is deprecated. Use 'input' instead.
  3 | </div>
  4 |
```

### Ln 1, Col 12
```marko
> 1 | <div class=data.className>
    |            ^^^^ Cannot find name 'data'.
  2 |   Hello ${data.name}!
  3 | </div>
  4 |
```

### Ln 2, Col 11
```marko
  1 | <div class=data.className>
> 2 |   Hello ${data.name}!
    |           ^^^^ Cannot find name 'data'.
  3 | </div>
  4 |
```

## Code Actions
### The 'data' variable is deprecated. Use 'input' instead.
```marko
<div class=input.className>
  Hello ${data.name}!
</div>
```

### The 'data' variable is deprecated. Use 'input' instead.
```marko
<div class=data.className>
  Hello ${input.name}!
</div>
```

### Fix all auto-fixable Marko issues
```marko
<div class=input.className>
  Hello ${input.name}!
</div>
```

