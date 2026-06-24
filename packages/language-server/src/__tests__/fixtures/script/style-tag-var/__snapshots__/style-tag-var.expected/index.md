## Hovers
### Ln 13, Col 35
```marko
  11 | </style>
  12 |
> 13 | <main id=styles.main class=styles.button/>
     |                                   ^ (property) "button": string
  14 | //                                ^?
  15 | <div class=styles.missing/>
  16 |
```

## Diagnostics
### Ln 15, Col 19
```marko
  13 | <main id=styles.main class=styles.button/>
  14 | //                                ^?
> 15 | <div class=styles.missing/>
     |                   ^^^^^^^ Property 'missing' does not exist on type '{ button: string; main: string; }'.
  16 |
```

