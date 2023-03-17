## Hovers
### Ln 10, Col 24
```marko
   8 | }
   9 |
> 10 | <fancy-button onClick("handleClick")/>
     |                        ^ (method) Component.handleClick(ev: MouseEvent): void
  11 |
  12 | <fancy-button onClick("specialClick", 1)/>
  13 |
```

### Ln 12, Col 24
```marko
  10 | <fancy-button onClick("handleClick")/>
  11 |
> 12 | <fancy-button onClick("specialClick", 1)/>
     |                        ^ (method) Component.specialClick(value: number, ev: MouseEvent): void
  13 |
  14 | <fancy-button onClick((ev) => {
  15 |     console.log(ev);
```

### Ln 14, Col 24
```marko
  12 | <fancy-button onClick("specialClick", 1)/>
  13 |
> 14 | <fancy-button onClick((ev) => {
     |                        ^ (parameter) ev: MouseEvent
  15 |     console.log(ev);
  16 | })/>
  17 |
```

### Ln 15, Col 17
```marko
  13 |
  14 | <fancy-button onClick((ev) => {
> 15 |     console.log(ev);
     |                 ^ (parameter) ev: MouseEvent
  16 | })/>
  17 |
```

