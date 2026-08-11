## Hovers
### Ln 93, Col 3
```marko
  91 |
  92 | <effect() {
> 93 |   hoistedFromStaticMember;
     |   ^ const hoistedFromStaticMember: (() => 1) & Iterable<1>
  94 | //^?
  95 |   hoistedFromDynamicMember; // TODO: this should be better and include `undefined` as a possible value
  96 | //^?
```

### Ln 95, Col 3
```marko
  93 |   hoistedFromStaticMember;
  94 | //^?
> 95 |   hoistedFromDynamicMember; // TODO: this should be better and include `undefined` as a possible value
     |   ^ const hoistedFromDynamicMember: (() => 2) & Iterable<2>
  96 | //^?
  97 | }/>
  98 |
```

## Diagnostics
### Ln 92, Col 1
```marko
  90 | </>
  91 |
> 92 | <effect() {
     | ^^^^^^^^^^^
> 93 |   hoistedFromStaticMember;
     | ^^^^^^^^^^^^^^^^^^^^^^^^^^
> 94 | //^?
     | ^^^^^^^^^^^^^^^^^^^^^^^^^^
> 95 |   hoistedFromDynamicMember; // TODO: this should be better and include `undefined` as a possible value
     | ^^^^^^^^^^^^^^^^^^^^^^^^^^
> 96 | //^?
     | ^^^^^^^^^^^^^^^^^^^^^^^^^^
> 97 | }/>
     | ^^^^ The 'effect' tag has been replaced by the 'script' tag.
  98 |
```

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
  75 |     <const/hoistedFromStaticMember = () => 1 as const/>
```

## Code Actions
### The 'effect' tag has been replaced by the 'script' tag.
```marko
static const x = 1;
static const y = 2;
<${custom} x=1>
  <if=x>
    <@a/>
  </if>
</>
<${custom} x=1>
  <if=x/>
  <else>
    <@a/>
  </else>
</>
<${custom} x=1>
  <if=x>
    <@a/>
  </if>
  <else>
    <@b/>
  </else>
</>
<${custom} x=1>
  <if=x>
    <@a/>
  </if>
  <else if=y>
    <@b/>
  </else>
  <else-if=!y>
    <@c/>
  </else-if>
  <else>
    <@d/>
  </else>
</>
<${custom} x=1>
  <if=x>
    <@a/>
  </if>
  <else-if>
    <@b/>
  </else-if>
</>
<${custom} x=1>
  <if(x)>
    <@a/>
  </if>
</>
<${custom} x=1>
  <if>
    <@a/>
  </if>
</>
<${custom} x=1>
  <if=x>
    <@a/>
  </if>
  <if=y>
    <@b/>
  </if>
</>
<${custom} x=1>
  <!-- hi-->
  <@a b=1>
    <const/hoistedFromStaticMember=(() => 1 as const)/>
     hi!
  </@a>
  <@b/>
  <if=x>
    <@b>
      <const/hoistedFromDynamicMember=(() => 2 as const)/>
    </@b>
  </if>
  <if=y>
    <@a/>
  </if>
</>
<script >
  hoistedFromStaticMember;
  //^?
  hoistedFromDynamicMember; // TODO: this should be better and include `undefined` as a possible value
  //^?
</script>
```

### Fix all auto-fixable Marko issues
```marko
static const x = 1;
static const y = 2;
<${custom} x=1>
  <if=x>
    <@a/>
  </if>
</>
<${custom} x=1>
  <if=x/>
  <else>
    <@a/>
  </else>
</>
<${custom} x=1>
  <if=x>
    <@a/>
  </if>
  <else>
    <@b/>
  </else>
</>
<${custom} x=1>
  <if=x>
    <@a/>
  </if>
  <else if=y>
    <@b/>
  </else>
  <else-if=!y>
    <@c/>
  </else-if>
  <else>
    <@d/>
  </else>
</>
<${custom} x=1>
  <if=x>
    <@a/>
  </if>
  <else-if>
    <@b/>
  </else-if>
</>
<${custom} x=1>
  <if(x)>
    <@a/>
  </if>
</>
<${custom} x=1>
  <if>
    <@a/>
  </if>
</>
<${custom} x=1>
  <if=x>
    <@a/>
  </if>
  <if=y>
    <@b/>
  </if>
</>
<${custom} x=1>
  <!-- hi-->
  <@a b=1>
    <const/hoistedFromStaticMember=(() => 1 as const)/>
     hi!
  </@a>
  <@b/>
  <if=x>
    <@b>
      <const/hoistedFromDynamicMember=(() => 2 as const)/>
    </@b>
  </if>
  <if=y>
    <@a/>
  </if>
</>
<script >
  hoistedFromStaticMember;
  //^?
  hoistedFromDynamicMember; // TODO: this should be better and include `undefined` as a possible value
  //^?
</script>
```

