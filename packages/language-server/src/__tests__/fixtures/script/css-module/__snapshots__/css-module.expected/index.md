## Hovers
### Ln 3, Col 35
```marko
  1 | import styles from "./styles.module.css";
  2 |
> 3 | <main id=styles.main class=styles.primaryButton>
    |                                   ^ (property) "primaryButton": string
  4 | //                                ^?
  5 |   <div class=styles.button/>
  6 | //                  ^?
```

### Ln 5, Col 21
```marko
  3 | <main id=styles.main class=styles.primaryButton>
  4 | //                                ^?
> 5 |   <div class=styles.button/>
    |                     ^ (property) "button": string
  6 | //                  ^?
  7 |   <span class=styles.label/>
  8 | //                   ^?
```

### Ln 7, Col 22
```marko
   5 |   <div class=styles.button/>
   6 | //                  ^?
>  7 |   <span class=styles.label/>
     |                      ^ (property) "label": string
   8 | //                   ^?
   9 |   <span class=styles.notDefined/>
  10 | </main>
```

## Diagnostics
### Ln 9, Col 22
```marko
   7 |   <span class=styles.label/>
   8 | //                   ^?
>  9 |   <span class=styles.notDefined/>
     |                      ^^^^^^^^^^ Property 'notDefined' does not exist on type '{ button: string; primaryButton: string; label: string; main: string; }'.
  10 | </main>
  11 |
```

