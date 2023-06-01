## Hovers
### Ln 3, Col 10
```marko
  1 | $ let i = 0;
  2 |
> 3 | <while(++i < 10)>
    |          ^ let i: number
  4 | //       ^?
  5 |   ${i}
  6 | //  ^?
```

### Ln 5, Col 5
```marko
  3 | <while(++i < 10)>
  4 | //       ^?
> 5 |   ${i}
    |     ^ let i: number
  6 | //  ^?
  7 | </while>
  8 |
```

### Ln 10, Col 10
```marko
   8 |
   9 | $ i = 0;
> 10 | <while(++i < 10)></while>
     |          ^ let i: number
  11 | //       ^?
  12 |
  13 | $ let done = false;
```

### Ln 15, Col 9
```marko
  13 | $ let done = false;
  14 | $ i = 0;
> 15 | <while(!done)>
     |         ^ let done: boolean
  16 | //      ^?
  17 |   ${done}
  18 | //  ^?
```

### Ln 17, Col 5
```marko
  15 | <while(!done)>
  16 | //      ^?
> 17 |   ${done}
     |     ^ let done: false
  18 | //  ^?
  19 |   <if(++i === 5)>
  20 |     $ done = true;
```

