## Hovers
### Ln 3, Col 10
```marko
  1 | $ let i = 0;
  2 |
> 3 | <while(++i < 10)>
    |          ^ let i: number
  4 |   ${i}
  5 | </while>
  6 |
```

### Ln 4, Col 5
```marko
  2 |
  3 | <while(++i < 10)>
> 4 |   ${i}
    |     ^ let i: number
  5 | </while>
  6 |
  7 | $ i = 0;
```

### Ln 8, Col 10
```marko
   6 |
   7 | $ i = 0;
>  8 | <while(++i < 10)></while>
     |          ^ let i: number
   9 |
  10 | $ let done = false;
  11 | $ i = 0;
```

### Ln 12, Col 9
```marko
  10 | $ let done = false;
  11 | $ i = 0;
> 12 | <while(!done)>
     |         ^ let done: boolean
  13 |   ${done}
  14 |   <if(++i === 5)>
  15 |     $ done = true;
```

### Ln 13, Col 5
```marko
  11 | $ i = 0;
  12 | <while(!done)>
> 13 |   ${done}
     |     ^ let done: false
  14 |   <if(++i === 5)>
  15 |     $ done = true;
  16 |   </if>
```

