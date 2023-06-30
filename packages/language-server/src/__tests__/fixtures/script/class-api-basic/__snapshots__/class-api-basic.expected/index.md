## Diagnostics
### Ln 2, Col 1
```marko
  1 | import fancyButton from "<fancy-button>";
> 2 | import { get } from "@ebay/retriever";
    | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ 'get' is declared but its value is never read.
  3 | /** Hi */
  4 | export interface Input {
  5 |   year: number,
```

### Ln 2, Col 21
```marko
  1 | import fancyButton from "<fancy-button>";
> 2 | import { get } from "@ebay/retriever";
    |                     ^^^^^^^^^^^^^^^^^ Cannot find module '@ebay/retriever' or its corresponding type declarations.
  3 | /** Hi */
  4 | export interface Input {
  5 |   year: number,
```

### Ln 30, Col 14
```marko
  28 |
  29 | static {
> 30 |     function greet() {
     |              ^^^^^ 'greet' is declared but its value is never read.
  31 |         return "hello world";
  32 |     }
  33 | }
```

### Ln 35, Col 12
```marko
  33 | }
  34 |
> 35 | static var useA = true;
     |            ^^^^ 'useA' is declared but its value is never read.
  36 |
  37 | static type Mobile = {
  38 |     brandName: string;
```

### Ln 19, Col 17
```marko
  17 |         console.log("mounted");
  18 |     }
> 19 |     handleClick(ev: MouseEvent) {
     |                 ^^ 'ev' is declared but its value is never read.
  20 |         console.log("clicked");
  21 |     }
  22 | }
```

### Ln 24, Col 9
```marko
  22 | }
  23 |
> 24 | $ const person = {
     |         ^^^^^^ 'person' is declared but its value is never read.
  25 |     name: "Frank",
  26 |     age: 32
  27 | };
```

### Ln 69, Col 13
```marko
  67 |
  68 |     <for|mobile, i, all| of=mobiles>
> 69 |       <span id=i>${mobile} ${i} ${all.length}</span>
     |             ^^ Type 'number' is not assignable to type 'AttrString'.
  70 |     </for>
  71 |
  72 |     <div.container>
```

### Ln 75, Col 18
```marko
  73 |         <${input.renderBody}/>
  74 |     </div>
> 75 |     <fancyButton something=true>${type}</fancyButton>
     |                  ^^^^^^^^^ Argument of type '{ something: boolean; renderBody: () => MarkoReturn<void>; }' is not assignable to parameter of type 'Directives & Input'.
  Object literal may only specify known properties, and '"something"' does not exist in type 'Directives & Input'.
  76 |     <div>Hello $!{"<b>World</b>"}</div>
  77 |     <div>Placeholder example: <code>\${someValue}</code></div>
  78 |
```

### Ln 79, Col 6
```marko
  77 |     <div>Placeholder example: <code>\${someValue}</code></div>
  78 |
> 79 |     <missing/>
     |      ^^^^^^^ Cannot find name 'missing'.
  80 |     <complex-missing/>
  81 | </div>
  82 |
```

