## Hovers
### Ln 93, Col 3
```marko
  91 |
  92 | <effect() {
> 93 |   hoistedFromStaticMember;
     |   ^ const hoistedFromStaticMember: 1
  94 |   hoistedFromDynamicMember; // TODO: this should be better and include `undefined` as a possible value
  95 | }/>
  96 |
```

### Ln 94, Col 3
```marko
  92 | <effect() {
  93 |   hoistedFromStaticMember;
> 94 |   hoistedFromDynamicMember; // TODO: this should be better and include `undefined` as a possible value
     |   ^ const hoistedFromDynamicMember: 2
  95 | }/>
  96 |
```

## Source Diagnostics
### Ln 4, Col 4
```marko
  2 | static const y = 2;
  3 |
> 4 | <${custom} x=1>
    |    ^^^^^^ Cannot find name 'custom'.
  5 |   <if=x>
  6 |     <@a/>
  7 |   </if>
```

### Ln 10, Col 4
```marko
   8 | </>
   9 |
> 10 | <${custom} x=1>
     |    ^^^^^^ Cannot find name 'custom'.
  11 |   <if=x></if>
  12 |   <else>
  13 |     <@a/>
```

### Ln 17, Col 4
```marko
  15 | </>
  16 |
> 17 | <${custom} x=1>
     |    ^^^^^^ Cannot find name 'custom'.
  18 |   <if=x>
  19 |     <@a/>
  20 |   </if>
```

### Ln 26, Col 4
```marko
  24 | </>
  25 |
> 26 | <${custom} x=1>
     |    ^^^^^^ Cannot find name 'custom'.
  27 |   <if=x>
  28 |     <@a/>
  29 |   </if>
```

### Ln 41, Col 4
```marko
  39 | </>
  40 |
> 41 | <${custom} x=1>
     |    ^^^^^^ Cannot find name 'custom'.
  42 |   <if=x>
  43 |     <@a/>
  44 |   </if>
```

### Ln 50, Col 4
```marko
  48 | </>
  49 |
> 50 | <${custom} x=1>
     |    ^^^^^^ Cannot find name 'custom'.
  51 |   <if(x)>
  52 |     <@a/>
  53 |   </if>
```

### Ln 56, Col 4
```marko
  54 | </>
  55 |
> 56 | <${custom} x=1>
     |    ^^^^^^ Cannot find name 'custom'.
  57 |   <if>
  58 |     <@a/>
  59 |   </if>
```

### Ln 62, Col 4
```marko
  60 | </>
  61 |
> 62 | <${custom} x=1>
     |    ^^^^^^ Cannot find name 'custom'.
  63 |   <if=x>
  64 |     <@a/>
  65 |   </if>
```

### Ln 72, Col 4
```marko
  70 | </>
  71 |
> 72 | <${custom} x=1>
     |    ^^^^^^ Cannot find name 'custom'.
  73 |   // hi
  74 |   <@a b=1>
  75 |     <const/hoistedFromStaticMember = 1 as const/>
```

### Ln 92, Col 2
```marko
  90 | </>
  91 |
> 92 | <effect() {
     |  ^^^^^^ Cannot find name 'effect'.
  93 |   hoistedFromStaticMember;
  94 |   hoistedFromDynamicMember; // TODO: this should be better and include `undefined` as a possible value
  95 | }/>
```

