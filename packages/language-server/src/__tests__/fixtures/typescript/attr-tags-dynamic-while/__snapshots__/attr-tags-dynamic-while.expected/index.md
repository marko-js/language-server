## Hovers
### Ln 4, Col 12
```marko
  2 |
  3 | <${custom}>
> 4 |   <while(++i < 10)>
    |            ^ let i: number
  5 | //         ^?
  6 |     <@a>
  7 |       ${i}
```

### Ln 7, Col 9
```marko
   5 | //         ^?
   6 |     <@a>
>  7 |       ${i}
     |         ^ let i: number
   8 | //      ^?
   9 |     </@a>
  10 |   </while>
```

### Ln 17, Col 11
```marko
  15 |
  16 | <${custom}>
> 17 |   <while(!done)>
     |           ^ let done: false
  18 | //        ^?
  19 |     <@a>
  20 |       ${done}
```

### Ln 20, Col 9
```marko
  18 | //        ^?
  19 |     <@a>
> 20 |       ${done}
     |         ^ let done: false
  21 | //      ^?
  22 |       <if(++i === 5)>
  23 |         $ done = true;
```

## Diagnostics
### Ln 3, Col 4
```marko
  1 | $ let i = 0;
  2 |
> 3 | <${custom}>
    |    ^^^^^^ Cannot find name 'custom'.
  4 |   <while(++i < 10)>
  5 | //         ^?
  6 |     <@a>
```

### Ln 16, Col 4
```marko
  14 | $ i = 0;
  15 |
> 16 | <${custom}>
     |    ^^^^^^ Cannot find name 'custom'.
  17 |   <while(!done)>
  18 | //        ^?
  19 |     <@a>
```

### Ln 29, Col 4
```marko
  27 | </>
  28 |
> 29 | <${custom}>
     |    ^^^^^^ Cannot find name 'custom'.
  30 |   <while>
  31 |     <@a>
  32 |       No Condition.
```

