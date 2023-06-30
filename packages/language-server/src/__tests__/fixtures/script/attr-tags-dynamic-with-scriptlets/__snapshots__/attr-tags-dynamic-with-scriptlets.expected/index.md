## Hovers
### Ln 5, Col 11
```marko
  3 |
  4 | <${custom}>
> 5 |   <while(!done)>
    |           ^ let done: false
  6 | //        ^?
  7 |     $ i++;
  8 | //    ^?
```

### Ln 7, Col 7
```marko
   5 |   <while(!done)>
   6 | //        ^?
>  7 |     $ i++;
     |       ^ let i: number
   8 | //    ^?
   9 |     <@a>
  10 |       ${done}
```

### Ln 10, Col 9
```marko
   8 | //    ^?
   9 |     <@a>
> 10 |       ${done}
     |         ^ let done: false
  11 | //      ^?
  12 |       <if(i === 5)>
  13 |         $ done = true;
```

### Ln 21, Col 13
```marko
  19 | <${custom}>
  20 |   <for|index| from=1 to=10>
> 21 |     $ const doubleIndex = index * 2;
     |             ^ const doubleIndex: number
  22 | //          ^?
  23 |     <@a>
  24 |       ${doubleIndex}
```

### Ln 24, Col 9
```marko
  22 | //          ^?
  23 |     <@a>
> 24 |       ${doubleIndex}
     |         ^ const doubleIndex: number
  25 | //      ^?
  26 |     </@a>
  27 |   </for>
```

### Ln 32, Col 13
```marko
  30 | <${custom} x=1>
  31 |   <if=x>
> 32 |     $ const a = 1 as const;
     |             ^ const a: 1
  33 | //          ^?
  34 |     <@a a=a/>
  35 |   </if>
```

### Ln 37, Col 13
```marko
  35 |   </if>
  36 |   <else>
> 37 |     $ const b = 2 as const;
     |             ^ const b: 2
  38 | //          ^?
  39 |     <@b b=b/>
  40 |   </else>
```

## Diagnostics
### Ln 4, Col 4
```marko
  2 | $ let i = 0;
  3 |
> 4 | <${custom}>
    |    ^^^^^^ Cannot find name 'custom'.
  5 |   <while(!done)>
  6 | //        ^?
  7 |     $ i++;
```

### Ln 19, Col 4
```marko
  17 | </>
  18 |
> 19 | <${custom}>
     |    ^^^^^^ Cannot find name 'custom'.
  20 |   <for|index| from=1 to=10>
  21 |     $ const doubleIndex = index * 2;
  22 | //          ^?
```

### Ln 30, Col 4
```marko
  28 | </>
  29 |
> 30 | <${custom} x=1>
     |    ^^^^^^ Cannot find name 'custom'.
  31 |   <if=x>
  32 |     $ const a = 1 as const;
  33 | //          ^?
```

### Ln 31, Col 7
```marko
  29 |
  30 | <${custom} x=1>
> 31 |   <if=x>
     |       ^ Cannot find name 'x'.
  32 |     $ const a = 1 as const;
  33 | //          ^?
  34 |     <@a a=a/>
```

