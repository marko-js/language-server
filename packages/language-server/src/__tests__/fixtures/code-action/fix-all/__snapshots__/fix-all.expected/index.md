## Diagnostics
### Ln 1, Col 12
```marko
> 1 | <div class=data.theme>
    |            ^^^^ The 'data' variable is deprecated. Use 'input' instead.
  2 |   Showing ${data.title} and ${data.body}
  3 | </div>
  4 |
```

### Ln 2, Col 13
```marko
  1 | <div class=data.theme>
> 2 |   Showing ${data.title} and ${data.body}
    |             ^^^^ The 'data' variable is deprecated. Use 'input' instead.
  3 | </div>
  4 |
```

### Ln 2, Col 31
```marko
  1 | <div class=data.theme>
> 2 |   Showing ${data.title} and ${data.body}
    |                               ^^^^ The 'data' variable is deprecated. Use 'input' instead.
  3 | </div>
  4 |
```

### Ln 1, Col 12
```marko
> 1 | <div class=data.theme>
    |            ^^^^ Cannot find name 'data'.
  2 |   Showing ${data.title} and ${data.body}
  3 | </div>
  4 |
```

### Ln 2, Col 13
```marko
  1 | <div class=data.theme>
> 2 |   Showing ${data.title} and ${data.body}
    |             ^^^^ Cannot find name 'data'.
  3 | </div>
  4 |
```

### Ln 2, Col 31
```marko
  1 | <div class=data.theme>
> 2 |   Showing ${data.title} and ${data.body}
    |                               ^^^^ Cannot find name 'data'.
  3 | </div>
  4 |
```

## Code Actions
### The 'data' variable is deprecated. Use 'input' instead.
```marko
<div class=input.theme>
  Showing ${data.title} and ${data.body}
</div>
```

### The 'data' variable is deprecated. Use 'input' instead.
```marko
<div class=data.theme>
  Showing ${input.title} and ${data.body}
</div>
```

### The 'data' variable is deprecated. Use 'input' instead.
```marko
<div class=data.theme>
  Showing ${data.title} and ${input.body}
</div>
```

### Fix all auto-fixable Marko issues
```marko
<div class=input.theme>
  Showing ${input.title} and ${input.body}
</div>
```

