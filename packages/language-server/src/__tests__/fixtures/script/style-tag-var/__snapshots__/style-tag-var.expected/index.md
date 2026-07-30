## Hovers
### Ln 1, Col 23
```marko
> 1 | <section class=styles.button/>
    |                       ^ (property) "button": string
  2 | //                    ^?
  3 | <style/styles>
  4 |   .button {
```

### Ln 15, Col 35
```marko
  13 | </style>
  14 |
> 15 | <main id=styles.main class=styles.button/>
     |                                   ^ (property) "button": string
  16 | //                                ^?
  17 | <div class=styles.missing/>
  18 |
```

## Diagnostics
### Ln 17, Col 19
```marko
  15 | <main id=styles.main class=styles.button/>
  16 | //                                ^?
> 17 | <div class=styles.missing/>
     |                   ^^^^^^^ Property 'missing' does not exist on type '{ button: string; main: string; }'.
  18 |
```

