## Hovers
### Ln 13, Col 3
```marko
  11 |
  12 | <effect() {
> 13 |   hoistedFromStaticMember;
     |   ^ const hoistedFromStaticMember: (() => 1) & Iterable<1>
  14 | //^?
  15 | }/>
  16 |
```

## Diagnostics
### Ln 12, Col 1
```marko
  10 | </>
  11 |
> 12 | <effect() {
     | ^^^^^^^^^^^
> 13 |   hoistedFromStaticMember;
     | ^^^^^^^^^^^^^^^^^^^^^^^^^^
> 14 | //^?
     | ^^^^^^^^^^^^^^^^^^^^^^^^^^
> 15 | }/>
     | ^^^^ The 'effect' tag has been replaced by the 'script' tag.
  16 |
```

### Ln 1, Col 4
```marko
> 1 | <${custom}>
    |    ^^^^^^ Cannot find name 'custom'.
  2 |   <@b/>
  3 |
  4 |   <@a b=1>
```

## Code Actions
### The 'effect' tag has been replaced by the 'script' tag.
```marko
<${custom}>
  <@b/>
  <@a b=1>
    <const/hoistedFromStaticMember=(() => 1 as const)/>
     hi!
  </@a>
  <@b c=2/>
</>
<script >
  hoistedFromStaticMember;
  //^?
</script>
```

### Fix all auto-fixable Marko issues
```marko
<${custom}>
  <@b/>
  <@a b=1>
    <const/hoistedFromStaticMember=(() => 1 as const)/>
     hi!
  </@a>
  <@b c=2/>
</>
<script >
  hoistedFromStaticMember;
  //^?
</script>
```

