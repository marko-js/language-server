## Hovers
### Ln 4, Col 9
```marko
  2 | <${custom}>
  3 |     <@header>...</@header>
> 4 |    <if(someCondition)>
    |         ^ const someCondition: boolean
  5 |       //^?
  6 |       <@footer>...</@footer>
  7 |     </if>
```

### Ln 8, Col 22
```marko
   6 |       <@footer>...</@footer>
   7 |     </if>
>  8 |     <for|x| of=[1]>${x}</for>
     |                      ^ (parameter) x: number
   9 |     //               ^?
  10 | </>
  11 |
```

## Diagnostics
### Ln 2, Col 4
```marko
  1 | <let/someCondition=false/>
> 2 | <${custom}>
    |    ^^^^^^ Cannot find name 'custom'.
  3 |     <@header>...</@header>
  4 |    <if(someCondition)>
  5 |       //^?
```

