## Source Diagnostics
### Ln 4, Col 3
```marko
  2 |
  3 | <div onClick() {
> 4 |   x = "Hello!";
    |   ^ Cannot assign to 'x' because it is a read-only property.
  5 |
  6 |   {
  7 |     let x = 1;
```

### Ln 8, Col 5
```marko
   6 |   {
   7 |     let x = 1;
>  8 |     x = "Hello!";
     |     ^ Type 'string' is not assignable to type 'number'.
   9 |     console.log(x);
  10 |   }
  11 |
```

### Ln 14, Col 5
```marko
  12 |   {
  13 |     let { x } = { x: 1 };
> 14 |     x = "Hello!";
     |     ^ Type 'string' is not assignable to type 'number'.
  15 |     console.log(x);
  16 |   }
  17 |
```

### Ln 20, Col 5
```marko
  18 |   {
  19 |     let { y: x } = { y: 1 };
> 20 |     x = "Hello!";
     |     ^ Type 'string' is not assignable to type 'number'.
  21 |     console.log(x);
  22 |   }
  23 |
```

### Ln 26, Col 5
```marko
  24 |   {
  25 |     let { y: {}, ...x } = { y: 1, x: 2 };
> 26 |     x = "Hello!";
     |     ^ Type 'string' is not assignable to type '{ x: number; }'.
  27 |     console.log(x);
  28 |   }
  29 |
```

### Ln 32, Col 5
```marko
  30 |   {
  31 |     let [x] = [1];
> 32 |     x = "Hello!";
     |     ^ Type 'string' is not assignable to type 'number'.
  33 |     console.log(x);
  34 |   }
  35 |
```

### Ln 38, Col 5
```marko
  36 |   {
  37 |     let [,...x] = [1];
> 38 |     x = "Hello!";
     |     ^ Type 'string' is not assignable to type '[]'.
  39 |     console.log(x);
  40 |   }
  41 |
```

### Ln 45, Col 7
```marko
  43 |   {
  44 |     for (let x = 0; x < 10; x++) {
> 45 |       x = "Hello!";
     |       ^ Type 'string' is not assignable to type 'number'.
  46 |       console.log(x);
  47 |     }
  48 |   }
```

### Ln 52, Col 7
```marko
  50 |   {
  51 |     for (let x of [1, 2, 3]) {
> 52 |       x = "Hello!";
     |       ^ Type 'string' is not assignable to type 'number'.
  53 |       console.log(x);
  54 |     }
  55 |   }
```

### Ln 66, Col 5
```marko
  64 |   testA(1);
  65 |   function testA(x: number) {
> 66 |     x = "Hello!";
     |     ^ Type 'string' is not assignable to type 'number'.
  67 |     console.log(x);
  68 |   }
  69 |
```

### Ln 71, Col 5
```marko
  69 |
  70 |   (function testB(x: number) {
> 71 |     x = "Hello!";
     |     ^ Type 'string' is not assignable to type 'number'.
  72 |     console.log(x);
  73 |   })(1);
  74 |
```

### Ln 76, Col 5
```marko
  74 |
  75 |   ((x: number) => {
> 76 |     x = "Hello!";
     |     ^ Type 'string' is not assignable to type 'number'.
  77 |     console.log(x);
  78 |   })(1);
  79 |
```

### Ln 82, Col 7
```marko
  80 |   ({
  81 |     testC(x: number) {
> 82 |       x = "Hello!";
     |       ^ Type 'string' is not assignable to type 'number'.
  83 |       console.log(x);
  84 |     }
  85 |   });
```

### Ln 89, Col 7
```marko
  87 |   class TestD {
  88 |     testD(x: number) {
> 89 |       x = "Hello!";
     |       ^ Type 'string' is not assignable to type 'number'.
  90 |       this.#testE(1);
  91 |       console.log(x);
  92 |     }
```

### Ln 94, Col 7
```marko
  92 |     }
  93 |     #testE(x: number) {
> 94 |       x = "Hello!";
     |       ^ Type 'string' is not assignable to type 'number'.
  95 |       console.log(x);
  96 |     }
  97 |   }
```

### Ln 104, Col 9
```marko
  102 |     class x {
  103 |       constructor() {
> 104 |         x = "Hello!";
      |         ^ Cannot assign to 'x' because it is a class.
  105 |       }
  106 |     }
  107 |     new x();
```

### Ln 108, Col 5
```marko
  106 |     }
  107 |     new x();
> 108 |     x = "Hello!";
      |     ^ Cannot assign to 'x' because it is a class.
  109 |   }
  110 |
  111 |   (class x {
```

### Ln 113, Col 7
```marko
  111 |   (class x {
  112 |     constructor() {
> 113 |       x = "Hello!";
      |       ^ Cannot assign to 'x' because it is a class.
  114 |     }
  115 |   });
  116 |
```

### Ln 119, Col 7
```marko
  117 |   (class {
  118 |     constructor() {
> 119 |       x = "Hello!";
      |       ^ Cannot assign to 'x' because it is a read-only property.
  120 |     }
  121 |   });
  122 |
```

### Ln 125, Col 7
```marko
  123 |   (() => {
  124 |     function x() {
> 125 |       x = "Hello!";
      |       ^ Cannot assign to 'x' because it is a function.
  126 |     }
  127 |
  128 |     x = "Hello!";
```

### Ln 128, Col 5
```marko
  126 |     }
  127 |
> 128 |     x = "Hello!";
      |     ^ Cannot assign to 'x' because it is a function.
  129 |     x();
  130 |   })();
  131 |
```

### Ln 133, Col 5
```marko
  131 |
  132 |   try {
> 133 |     x = "Hello!";
      |     ^ Cannot assign to 'x' because it is a read-only property.
  134 |   } catch (x) {
  135 |     x = "Hello!";
  136 |     console.log(x);
```

### Ln 140, Col 5
```marko
  138 |
  139 |   try {
> 140 |     x = "Hello!";
      |     ^ Cannot assign to 'x' because it is a read-only property.
  141 |   } catch {
  142 |     x = "Hello!";
  143 |     console.log(x);
```

### Ln 142, Col 5
```marko
  140 |     x = "Hello!";
  141 |   } catch {
> 142 |     x = "Hello!";
      |     ^ Cannot assign to 'x' because it is a read-only property.
  143 |     console.log(x);
  144 |   }
  145 |
```

