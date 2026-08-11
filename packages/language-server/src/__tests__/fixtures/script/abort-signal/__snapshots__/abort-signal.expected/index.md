## Hovers
### Ln 2, Col 4
```marko
  1 | <effect() {
> 2 |   $signal.onabort = () => {
    |    ^ const $signal: AbortSignal
  3 | // ^?
  4 |     console.log('aborted');
  5 |   };
```

## Diagnostics
### Ln 1, Col 1
```marko
> 1 | <effect() {
    | ^^^^^^^^^^^
> 2 |   $signal.onabort = () => {
    | ^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 3 | // ^?
    | ^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 4 |     console.log('aborted');
    | ^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 5 |   };
    | ^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 6 | }/>
    | ^^^^ The 'effect' tag has been replaced by the 'script' tag.
  7 |
```

## Code Actions
### The 'effect' tag has been replaced by the 'script' tag.
```marko
<script >
  $signal.onabort = () => {
    // ^?
    console.log('aborted');
  };
</script>
```

### Fix all auto-fixable Marko issues
```marko
<script >
  $signal.onabort = () => {
    // ^?
    console.log('aborted');
  };
</script>
```

