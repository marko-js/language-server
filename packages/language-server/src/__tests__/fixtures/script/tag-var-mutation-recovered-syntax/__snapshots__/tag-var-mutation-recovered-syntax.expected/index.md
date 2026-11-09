## Diagnostics
### Ln 6, Col 7
```marko
  4 | <let/x=1/>
  5 | <button onClick() {
> 6 |   tion update(y: number) {
    |       ^ Missing semicolon.
  7 |     x = y;
  8 |   }
  9 | }>Save</button>
```

### Ln 6, Col 3
```marko
  4 | <let/x=1/>
  5 | <button onClick() {
> 6 |   tion update(y: number) {
    |   ^^^^ Unexpected keyword or identifier.
  7 |     x = y;
  8 |   }
  9 | }>Save</button>
```

### Ln 6, Col 3
```marko
  4 | <let/x=1/>
  5 | <button onClick() {
> 6 |   tion update(y: number) {
    |   ^^^^ Cannot find name 'tion'.
  7 |     x = y;
  8 |   }
  9 | }>Save</button>
```

### Ln 6, Col 8
```marko
  4 | <let/x=1/>
  5 | <button onClick() {
> 6 |   tion update(y: number) {
    |        ^^^^^^ Cannot find name 'update'. Did you mean 'Date'?
  7 |     x = y;
  8 |   }
  9 | }>Save</button>
```

### Ln 6, Col 15
```marko
  4 | <let/x=1/>
  5 | <button onClick() {
> 6 |   tion update(y: number) {
    |               ^ Cannot find name 'y'.
  7 |     x = y;
  8 |   }
  9 | }>Save</button>
```

### Ln 6, Col 18
```marko
  4 | <let/x=1/>
  5 | <button onClick() {
> 6 |   tion update(y: number) {
    |                  ^^^^^^ 'number' only refers to a type, but is being used as a value here.
  7 |     x = y;
  8 |   }
  9 | }>Save</button>
```

### Ln 7, Col 9
```marko
   5 | <button onClick() {
   6 |   tion update(y: number) {
>  7 |     x = y;
     |         ^ Cannot find name 'y'.
   8 |   }
   9 | }>Save</button>
  10 |
```

