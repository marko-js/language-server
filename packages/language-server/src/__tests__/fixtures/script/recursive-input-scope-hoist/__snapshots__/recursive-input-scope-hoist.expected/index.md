## Hovers
### Ln 3, Col 7
```marko
  1 | <comments>
  2 |   <@comment#a>
> 3 |     <@comment#b>
    |       ^ (property) "@comment": Marko.AttrTag<Comment> | undefined
  4 | //    ^?
  5 |       <let/b = () => "b" as const/>
  6 |     </@comment>
```

### Ln 15, Col 3
```marko
  13 |
  14 | <effect() {
> 15 |   a;
     |   ^ const a: (() => "a") & Iterable<"a">
  16 | //^?
  17 |   b;
  18 | //^?
```

### Ln 17, Col 3
```marko
  15 |   a;
  16 | //^?
> 17 |   b;
     |   ^ const b: (() => "b") & Iterable<"b">
  18 | //^?
  19 |   c;
  20 | //^?
```

### Ln 19, Col 3
```marko
  17 |   b;
  18 | //^?
> 19 |   c;
     |   ^ const c: (() => "c") & Iterable<"c">
  20 | //^?
  21 | }/>
```

## Diagnostics
### Ln 14, Col 1
```marko
  12 | </comments>
  13 |
> 14 | <effect() {
     | ^^^^^^^^^^^
> 15 |   a;
     | ^^^^
> 16 | //^?
     | ^^^^
> 17 |   b;
     | ^^^^
> 18 | //^?
     | ^^^^
> 19 |   c;
     | ^^^^
> 20 | //^?
     | ^^^^
> 21 | }/>
     | ^^^^ The 'effect' tag has been replaced by the 'script' tag.
```

## Code Actions
### The 'effect' tag has been replaced by the 'script' tag.
```marko
<comments>
  <@comment id="a">
    <@comment id="b">
      <!--    ^?-->
      <let/b=(() => "b" as const)/>
    </@comment>
    <let/a=(() => "a" as const)/>
  </@comment>
  <@comment id="c">
    <let/c=(() => "c" as const)/>
  </@comment>
</comments>
<script >
  a;
  //^?
  b;
  //^?
  c;
  //^?
</script>
```

### Fix all auto-fixable Marko issues
```marko
<comments>
  <@comment id="a">
    <@comment id="b">
      <!--    ^?-->
      <let/b=(() => "b" as const)/>
    </@comment>
    <let/a=(() => "a" as const)/>
  </@comment>
  <@comment id="c">
    <let/c=(() => "c" as const)/>
  </@comment>
</comments>
<script >
  a;
  //^?
  b;
  //^?
  c;
  //^?
</script>
```

