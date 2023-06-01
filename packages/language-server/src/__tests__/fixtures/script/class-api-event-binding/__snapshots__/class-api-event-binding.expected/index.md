## Hovers
### Ln 10, Col 24
```marko
   8 | }
   9 |
> 10 | <fancy-button onClick("handleClick")/>
     |                        ^ (method) Component.handleClick(ev: MouseEvent): void
  11 | //                     ^?
  12 |
  13 | <fancy-button onClick("specialClick", 1)/>
```

### Ln 13, Col 24
```marko
  11 | //                     ^?
  12 |
> 13 | <fancy-button onClick("specialClick", 1)/>
     |                        ^ (method) Component.specialClick(value: number, ev: MouseEvent): void
  14 | //                     ^?
  15 |
  16 | <fancy-button onClick((ev) => {
```

### Ln 16, Col 24
```marko
  14 | //                     ^?
  15 |
> 16 | <fancy-button onClick((ev) => {
     |                        ^ (parameter) ev: MouseEvent
  17 | //                     ^?
  18 |     console.log(ev);
  19 | //              ^?
```

### Ln 18, Col 17
```marko
  16 | <fancy-button onClick((ev) => {
  17 | //                     ^?
> 18 |     console.log(ev);
     |                 ^ (parameter) ev: MouseEvent
  19 | //              ^?
  20 | })/>
  21 |
```

