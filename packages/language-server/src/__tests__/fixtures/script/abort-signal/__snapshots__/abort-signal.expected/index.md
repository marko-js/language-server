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

