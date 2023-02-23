## Hovers
### Ln 14, Col 3
```marko
  12 |
  13 | <effect() {
> 14 |   a;
     |   ^ const a: "a"
  15 |   b;
  16 |   c;
  17 | }/>
```

### Ln 15, Col 3
```marko
  13 | <effect() {
  14 |   a;
> 15 |   b;
     |   ^ const b: "b"
  16 |   c;
  17 | }/>
```

### Ln 16, Col 3
```marko
  14 |   a;
  15 |   b;
> 16 |   c;
     |   ^ const c: "c"
  17 | }/>
```

## Source Diagnostics
### Ln 8, Col 5
```marko
   6 |     <let/a = "a" as const/>
   7 |   </@comment>
>  8 |   <@comment>
     |     ^^^^^^^^
>  9 |     <let/c = "c" as const/>
     | ^^^^^^^^^^^ Property 'id' is missing in type '{ renderBody: () => MarkoReturn<void>; }' but required in type 'Comment'.
  10 |   </@comment>
  11 | </comments>
  12 |
```

### Ln 13, Col 2
```marko
  11 | </comments>
  12 |
> 13 | <effect() {
     |  ^^^^^^ Cannot find name 'effect'.
  14 |   a;
  15 |   b;
  16 |   c;
```

