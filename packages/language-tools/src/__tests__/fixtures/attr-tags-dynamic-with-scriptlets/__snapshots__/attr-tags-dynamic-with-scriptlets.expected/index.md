## Hovers
### Ln 5, Col 11
```marko
  3 |
  4 | <${custom}>
> 5 |   <while(!done)>
    |           ^ let done: false
  6 |     $ i++;
  7 |     <@a>
  8 |       ${done}
```

### Ln 6, Col 7
```marko
  4 | <${custom}>
  5 |   <while(!done)>
> 6 |     $ i++;
    |       ^ let i: number
  7 |     <@a>
  8 |       ${done}
  9 |       <if(i === 5)>
```

### Ln 8, Col 9
```marko
   6 |     $ i++;
   7 |     <@a>
>  8 |       ${done}
     |         ^ let done: false
   9 |       <if(i === 5)>
  10 |         $ done = true;
  11 |       </if>
```

### Ln 18, Col 13
```marko
  16 | <${custom}>
  17 |   <for|index| from=1 to=10>
> 18 |     $ const doubleIndex = index * 2;
     |             ^ const doubleIndex: number
  19 |     <@a>
  20 |       ${doubleIndex}
  21 |     </@a>
```

### Ln 20, Col 9
```marko
  18 |     $ const doubleIndex = index * 2;
  19 |     <@a>
> 20 |       ${doubleIndex}
     |         ^ const doubleIndex: number
  21 |     </@a>
  22 |   </for>
  23 | </>
```

### Ln 27, Col 13
```marko
  25 | <${custom} x=1>
  26 |   <if=x>
> 27 |     $ const a = 1 as const;
     |             ^ const a: 1
  28 |     <@a a=a/>
  29 |   </if>
  30 |   <else>
```

### Ln 31, Col 13
```marko
  29 |   </if>
  30 |   <else>
> 31 |     $ const b = 2 as const;
     |             ^ const b: 2
  32 |     <@b b=b/>
  33 |   </else>
  34 | </>
```

## Source Diagnostics
### Ln 4, Col 4
```marko
  2 | $ let i = 0;
  3 |
> 4 | <${custom}>
    |    ^^^^^^ Cannot find name 'custom'.
  5 |   <while(!done)>
  6 |     $ i++;
  7 |     <@a>
```

### Ln 16, Col 4
```marko
  14 | </>
  15 |
> 16 | <${custom}>
     |    ^^^^^^ Cannot find name 'custom'.
  17 |   <for|index| from=1 to=10>
  18 |     $ const doubleIndex = index * 2;
  19 |     <@a>
```

### Ln 25, Col 4
```marko
  23 | </>
  24 |
> 25 | <${custom} x=1>
     |    ^^^^^^ Cannot find name 'custom'.
  26 |   <if=x>
  27 |     $ const a = 1 as const;
  28 |     <@a a=a/>
```

### Ln 26, Col 7
```marko
  24 |
  25 | <${custom} x=1>
> 26 |   <if=x>
     |       ^ Cannot find name 'x'.
  27 |     $ const a = 1 as const;
  28 |     <@a a=a/>
  29 |   </if>
```

