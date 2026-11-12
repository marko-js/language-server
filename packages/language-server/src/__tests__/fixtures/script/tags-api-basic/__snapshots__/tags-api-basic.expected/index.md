## Hovers
### Ln 12, Col 8
```marko
  10 | }
  11 |
> 12 | <const/buttonTemplate: (typeof import("<fancy-button>"))["default"]=FancyButton/>
     |        ^ const buttonTemplate: Template
  13 | //     ^?
  14 |
  15 | static {
```

### Ln 34, Col 29
```marko
  32 |     <span class="sub-note">phoneType: ${type}</span>
  33 |
> 34 |     <for|mobile, i, all| of=mobileList>
     |                             ^ const mobileList: Mobile[]
  35 | //                          ^?
  36 |       <span id=i>${mobile} ${i} ${all.length}</span>
  37 | //                 ^?        ^?
```

### Ln 36, Col 20
```marko
  34 |     <for|mobile, i, all| of=mobileList>
  35 | //                          ^?
> 36 |       <span id=i>${mobile} ${i} ${all.length}</span>
     |                    ^ (parameter) mobile: Mobile
  37 | //                 ^?        ^?
  38 |     </for>
  39 |
```

### Ln 36, Col 30
```marko
  34 |     <for|mobile, i, all| of=mobileList>
  35 | //                          ^?
> 36 |       <span id=i>${mobile} ${i} ${all.length}</span>
     |                              ^ (parameter) i: number
  37 | //                 ^?        ^?
  38 |     </for>
  39 |
```

## Diagnostics
### Ln 2, Col 1
```marko
  1 | import FancyButton from "<fancy-button>";
> 2 | import { get } from "@ebay/retriever";
    | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ 'get' is declared but its value is never read.
  3 | /** Hi */
  4 | export interface Input {
  5 |   year: number,
```

### Ln 2, Col 21
```marko
  1 | import FancyButton from "<fancy-button>";
> 2 | import { get } from "@ebay/retriever";
    |                     ^^^^^^^^^^^^^^^^^ Cannot find module '@ebay/retriever' or its corresponding type declarations.
  3 | /** Hi */
  4 | export interface Input {
  5 |   year: number,
```

### Ln 8, Col 21
```marko
   6 |   isSmartOnly: boolean,
   7 |   type: string,
>  8 |   mobileList: Array<Mobile>,
     |                     ^^^^^^ Cannot find name 'Mobile'.
   9 |   renderBody: Marko.Body
  10 | }
  11 |
```

### Ln 16, Col 14
```marko
  14 |
  15 | static {
> 16 |     function greet() {
     |              ^^^^^ 'greet' is declared but its value is never read.
  17 |         return "hello world";
  18 |     }
  19 | }
```

### Ln 21, Col 12
```marko
  19 | }
  20 |
> 21 | static var useA = true;
     |            ^^^^ 'useA' is declared but its value is never read.
  22 |
  23 | <const/{ year, isSmartOnly, type, mobileList, renderBody } = input/>
  24 |
```

### Ln 36, Col 13
```marko
  34 |     <for|mobile, i, all| of=mobileList>
  35 | //                          ^?
> 36 |       <span id=i>${mobile} ${i} ${all.length}</span>
     |             ^^ Type 'number' is not assignable to type 'AttrString'.
  37 | //                 ^?        ^?
  38 |     </for>
  39 |
```

### Ln 43, Col 28
```marko
  41 |         <${renderBody}/>
  42 |     </div>
> 43 |     <FancyButton no-update something=true>${type}</FancyButton>
     |                            ^^^^^^^^^ Object literal may only specify known properties, and '"something"' does not exist in type 'Directives & Input'.
  44 |     <div>Hello $!{"<b>World</b>"}</div>
  45 |     <div>Placeholder example: <code>\${someValue}</code></div>
  46 | </div>
```

