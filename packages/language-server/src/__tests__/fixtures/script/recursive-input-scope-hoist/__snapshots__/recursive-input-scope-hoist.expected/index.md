## Hovers
### Ln 3, Col 7
```marko
  1 | <comments>
  2 |   <@comment#a>
> 3 |     <@comment#b>
    |       ^ (property) comment?: Marko.RepeatableAttrTag<Comment> | undefined
  4 | //    ^?
  5 |       <let/b = "b" as const/>
  6 |     </@comment>
```

### Ln 15, Col 3
```marko
  13 |
  14 | <effect() {
> 15 |   a;
     |   ^ const a: "a"
  16 | //^?
  17 |   b;
  18 | //^?
```

### Ln 17, Col 3
```marko
  15 |   a;
  16 | //^?
> 17 |   b;
     |   ^ const b: "b"
  18 | //^?
  19 |   c;
  20 | //^?
```

### Ln 19, Col 3
```marko
  17 |   b;
  18 | //^?
> 19 |   c;
     |   ^ const c: "c"
  20 | //^?
  21 | }/>
```

## Diagnostics
### Ln 9, Col 4
```marko
   7 |     <let/a = "a" as const/>
   8 |   </@comment>
>  9 |   <@comment>
     |    ^^^^^^^^^
> 10 |     <let/c = "c" as const/>
     | ^^^^^^^^^^^ Type '{ renderBody: () => MarkoReturn<void>; [Symbol.iterator]: any; }' is not assignable to type 'AttrTag<Comment>'.
  Property 'id' is missing in type '{ renderBody: () => MarkoReturn<void>; [Symbol.iterator]: any; }' but required in type 'Comment'.
  11 |   </@comment>
  12 | </comments>
  13 |
```

### Ln 14, Col 2
```marko
  12 | </comments>
  13 |
> 14 | <effect() {
     |  ^^^^^^ Cannot find name 'effect'.
  15 |   a;
  16 | //^?
  17 |   b;
```

