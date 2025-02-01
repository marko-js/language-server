## Hovers
### Ln 4, Col 3
```marko
  2 |
  3 | <button onClick() {
> 4 |   x++;
    |   ^ (property) x: number
  5 | //^?
  6 | }>Click me</>
  7 |
```

### Ln 11, Col 5
```marko
   9 |   <let/y="hello"/>
  10 |   <button onClick() {
> 11 |     x++;
     |     ^ (property) x: number
  12 | //  ^?
  13 |     y = "goodbye";
  14 | //  ^?
```

### Ln 13, Col 5
```marko
  11 |     x++;
  12 | //  ^?
> 13 |     y = "goodbye";
     |     ^ (property) y: string
  14 | //  ^?
  15 |   }>Click me</>
  16 | </foo>
```

