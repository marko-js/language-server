## Hovers
### Ln 3, Col 4
```marko
  1 | <!-- use tags -->
  2 | <effect() {
> 3 |   $signal.onabort = () => {
    |    ^ const $signal: AbortSignal
  4 | // ^?
  5 |     console.log('aborted');
  6 |   };
```

## Diagnostics
### Ln 2, Col 1
```marko
  1 | <!-- use tags -->
> 2 | <effect() {
    | ^^^^^^^^^^^
> 3 |   $signal.onabort = () => {
    | ^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 4 | // ^?
    | ^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 5 |     console.log('aborted');
    | ^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 6 |   };
    | ^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 7 | }/>
    | ^^^^ The 'effect' tag has been replaced by the 'script' tag.
  8 |
```

## Code Actions
### The 'effect' tag has been replaced by the 'script' tag.
```marko
<!-- use tags -->
<script>
  $signal.onabort = () => {
    // ^?
    console.log("aborted");
  };
</script>

```

### Fix all auto-fixable Marko issues
```marko
<!-- use tags -->
<script>
  $signal.onabort = () => {
    // ^?
    console.log("aborted");
  };
</script>

```

