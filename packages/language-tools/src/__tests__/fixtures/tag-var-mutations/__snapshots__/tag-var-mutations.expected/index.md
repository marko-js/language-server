## Source Diagnostics
### Ln 3, Col 6
```marko
  1 | <let/x=1/>
  2 |
> 3 | <div data-function() {
    |      ^^^^^^^^^^^^^ Type '() => void' is not assignable to type 'string | number | true | AttrMissing'.
  4 |   x++;
  5 | }/>
  6 |
```

### Ln 7, Col 6
```marko
   5 | }/>
   6 |
>  7 | <div data-function(y = x++) {
     |      ^^^^^^^^^^^^^ Type '(y?: number) => void' is not assignable to type 'string | number | true | AttrMissing'.
   8 |   y;
   9 | }/>
  10 |
```

### Ln 11, Col 6
```marko
   9 | }/>
  10 |
> 11 | <div data-function=() => {
     |      ^^^^^^^^^^^^^ Type '() => void' is not assignable to type 'string | number | true | AttrMissing'.
  12 |   x++;
  13 | }/>
  14 |
```

### Ln 15, Col 6
```marko
  13 | }/>
  14 |
> 15 | <div data-function=(y = x++) => {
     |      ^^^^^^^^^^^^^ Type '(y?: number) => void' is not assignable to type 'string | number | true | AttrMissing'.
  16 |   y;
  17 | }/>
  18 |
```

### Ln 19, Col 6
```marko
  17 | }/>
  18 |
> 19 | <div data-function=function () {
     |      ^^^^^^^^^^^^^ Type '() => void' is not assignable to type 'string | number | true | AttrMissing'.
  20 |   x++;
  21 | }/>
  22 |
```

### Ln 23, Col 6
```marko
  21 | }/>
  22 |
> 23 | <div data-function=function (y = x++) {
     |      ^^^^^^^^^^^^^ Type '(y?: number) => void' is not assignable to type 'string | number | true | AttrMissing'.
  24 |   y;
  25 | }/>
  26 |
```

### Ln 27, Col 6
```marko
  25 | }/>
  26 |
> 27 | <div data-function() {
     |      ^^^^^^^^^^^^^ Type '() => void' is not assignable to type 'string | number | true | AttrMissing'.
  28 |   function testA() {
  29 |     x++;
  30 |   }
```

