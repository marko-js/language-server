## Hovers
### Ln 4, Col 12
```marko
  2 |
  3 | <${custom}>
> 4 |   <while(++i < 10)>
    |            ^ let i: number
  5 |     <@a>
  6 |       ${i}
  7 |     </@a>
```

### Ln 6, Col 9
```marko
  4 |   <while(++i < 10)>
  5 |     <@a>
> 6 |       ${i}
    |         ^ let i: number
  7 |     </@a>
  8 |   </while>
  9 | </>
```

### Ln 15, Col 11
```marko
  13 |
  14 | <${custom}>
> 15 |   <while(!done)>
     |           ^ let done: false
  16 |     <@a>
  17 |       ${done}
  18 |       <if(++i === 5)>
```

### Ln 17, Col 9
```marko
  15 |   <while(!done)>
  16 |     <@a>
> 17 |       ${done}
     |         ^ let done: false
  18 |       <if(++i === 5)>
  19 |         $ done = true;
  20 |       </if>
```

## Source Diagnostics
### Ln 3, Col 4
```marko
  1 | $ let i = 0;
  2 |
> 3 | <${custom}>
    |    ^^^^^^ Cannot find name 'custom'.
  4 |   <while(++i < 10)>
  5 |     <@a>
  6 |       ${i}
```

### Ln 14, Col 4
```marko
  12 | $ i = 0;
  13 |
> 14 | <${custom}>
     |    ^^^^^^ Cannot find name 'custom'.
  15 |   <while(!done)>
  16 |     <@a>
  17 |       ${done}
```

### Ln 25, Col 4
```marko
  23 | </>
  24 |
> 25 | <${custom}>
     |    ^^^^^^ Cannot find name 'custom'.
  26 |   <while>
  27 |     <@a>
  28 |       No Condition.
```

## Generated Diagnostics
### Ln 13, Col 12
```ts
  11 | Marko._.renderDynamicTag(custom)({
  12 | /*custom*/
> 13 | ...Marko._..mergeAttrTags((
     |            ^ Identifier expected.
  14 | ++i < 10
  15 | ) ? [{
  16 | "a": {
```

### Ln 31, Col 12
```ts
  29 | Marko._.renderDynamicTag(custom)({
  30 | /*custom*/
> 31 | ...Marko._..mergeAttrTags((
     |            ^ Identifier expected.
  32 | !done
  33 | ) ? [{
  34 | "a": {
```

### Ln 51, Col 12
```ts
  49 | Marko._.renderDynamicTag(custom)({
  50 | /*custom*/
> 51 | ...Marko._..mergeAttrTags((
     |            ^ Identifier expected.
  52 | undefined
  53 | ) ? [{
  54 | "a": {
```

