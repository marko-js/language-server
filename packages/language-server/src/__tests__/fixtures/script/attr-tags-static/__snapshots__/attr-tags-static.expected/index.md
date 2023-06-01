## Hovers
### Ln 13, Col 3
```marko
  11 |
  12 | <effect() {
> 13 |   hoistedFromStaticMember;
     |   ^ const hoistedFromStaticMember: 1
  14 | //^?
  15 | }/>
  16 |
```

## Diagnostics
### Ln 1, Col 4
```marko
> 1 | <${custom}>
    |    ^^^^^^ Cannot find name 'custom'.
  2 |   <@b/>
  3 |
  4 |   <@a b=1>
```

### Ln 12, Col 2
```marko
  10 | </>
  11 |
> 12 | <effect() {
     |  ^^^^^^ Cannot find name 'effect'.
  13 |   hoistedFromStaticMember;
  14 | //^?
  15 | }/>
```

