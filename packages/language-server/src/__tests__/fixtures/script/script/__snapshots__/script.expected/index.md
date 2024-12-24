## Hovers
### Ln 10, Col 17
```marko
   8 |   <const/promise=Promise.resolve("world")/>
   9 |   <script>
> 10 |     console.log(x);
     |                 ^ const x: number
  11 | //              ^?
  12 |     console.log(y);
  13 | //              ^?
```

### Ln 12, Col 17
```marko
  10 |     console.log(x);
  11 | //              ^?
> 12 |     console.log(y);
     |                 ^ const y: string
  13 | //              ^?
  14 |     console.log(input.name);
  15 | //                    ^?
```

### Ln 14, Col 23
```marko
  12 |     console.log(y);
  13 | //              ^?
> 14 |     console.log(input.name);
     |                       ^ (property) Input<T>.name: T extends string
  15 | //                    ^?
  16 |
  17 |     const resolved = await promise;
```

### Ln 18, Col 17
```marko
  16 |
  17 |     const resolved = await promise;
> 18 |     console.log(resolved);
     |                 ^ const resolved: string
  19 |     //          ^?
  20 |     x = 2;
  21 |     y = "bye";
```

## Diagnostics
### Ln 21, Col 5
```marko
  19 |     //          ^?
  20 |     x = 2;
> 21 |     y = "bye";
     |     ^ Cannot assign to 'y' because it is a read-only property.
  22 |   </script>
  23 | </div>
  24 |
```

