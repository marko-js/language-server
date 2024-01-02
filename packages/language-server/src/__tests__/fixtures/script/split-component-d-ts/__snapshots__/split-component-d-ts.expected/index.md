## Hovers
### Ln 1, Col 15
```marko
> 1 | <fancy-button color="red" fanciness=5/>
    |               ^ (property) Input.color?: string | undefined
  2 | //            ^?          ^?
  3 |
  4 | <regular-button size="large">body</regular-button>
```

### Ln 1, Col 27
```marko
> 1 | <fancy-button color="red" fanciness=5/>
    |                           ^ (property) Input.fanciness?: number | undefined
  2 | //            ^?          ^?
  3 |
  4 | <regular-button size="large">body</regular-button>
```

### Ln 4, Col 17
```marko
  2 | //            ^?          ^?
  3 |
> 4 | <regular-button size="large">body</regular-button>
    |                 ^ (property) Input.size?: "large" | "small" | undefined
  5 | //              ^?
  6 |
```

