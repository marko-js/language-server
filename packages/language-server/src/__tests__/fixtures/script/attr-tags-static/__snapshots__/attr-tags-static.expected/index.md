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
### Ln 1, Col 4
```marko
> 1 | <${custom}>
    |    ^^^^^^ Cannot find name 'custom'.
  2 |   <@b/>
  3 |
  4 |   <@a b=1>
```

### Ln 2, Col 4
```marko
   1 | <${custom}>
>  2 |   <@b/>
     |    ^^^^
>  3 |
     | ^
>  4 |   <@a b=1>
     | ^
>  5 |     <const/hoistedFromStaticMember = () => 1 as const/>
     | ^
>  6 |     hi!
     | ^
>  7 |   </@a>
     | ^
>  8 |
     | ^
>  9 |   <@b c=2/>
     | ^^^^^^ Argument of type '[{ b: { [Symbol.iterator]: any; }; }, { b: { c: number; [Symbol.iterator]: any; }; }]' is not assignable to parameter of type 'Record<"b", { [Symbol.iterator](): Iterator<unknown, any, any>; }>'.
  Property 'b' is missing in type '[{ b: { [Symbol.iterator]: any; }; }, { b: { c: number; [Symbol.iterator]: any; }; }]' but required in type 'Record<"b", { [Symbol.iterator](): Iterator<unknown, any, any>; }>'.
  10 | </>
  11 |
  12 | <effect() {
```

