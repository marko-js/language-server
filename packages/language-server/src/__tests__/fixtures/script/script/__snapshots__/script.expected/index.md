## Hovers
### Ln 9, Col 17
```marko
   7 |   <const/y="hi"/>
   8 |   <script>
>  9 |     console.log(x);
     |                 ^ const x: number
  10 | //              ^?
  11 |     console.log(y);
  12 | //              ^?
```

### Ln 11, Col 17
```marko
   9 |     console.log(x);
  10 | //              ^?
> 11 |     console.log(y);
     |                 ^ const y: string
  12 | //              ^?
  13 |     console.log(input.name);
  14 | //                    ^?
```

### Ln 13, Col 23
```marko
  11 |     console.log(y);
  12 | //              ^?
> 13 |     console.log(input.name);
     |                       ^ (property) Input<T>.name: T extends string
  14 | //                    ^?
  15 |     x = 2;
  16 |     y = "bye";
```

## Diagnostics
### Ln 16, Col 5
```marko
  14 | //                    ^?
  15 |     x = 2;
> 16 |     y = "bye";
     |     ^ Cannot assign to 'y' because it is a read-only property.
  17 |   </script>
  18 | </div>
  19 |
```

