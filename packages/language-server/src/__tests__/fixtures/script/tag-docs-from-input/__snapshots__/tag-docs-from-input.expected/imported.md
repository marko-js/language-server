## Hovers
### Ln 6, Col 32
```marko
  4 |
  5 | // A wrapper extending a deprecated tag's input.
> 6 | export interface Input extends FancyInput {}
    |                                ^ (alias) interface FancyInput
import FancyInput
---
A button with a fancy border, see {@link https://example.com/fancy the guide}.  

*@deprecated* — Use `<plain-button>` instead.  

*@see* — https://example.com/fancy-button
  7 | //                             ^?
  8 |
  9 | <FancyButton label="Go"/>
```

### Ln 9, Col 4
```marko
   7 | //                             ^?
   8 |
>  9 | <FancyButton label="Go"/>
     |    ^ (alias) const FancyButton: Template
import FancyButton
---
A button with a fancy border, see {@link https://example.com/fancy the guide}.  

*@deprecated* — Use `<plain-button>` instead.  

*@see* — https://example.com/fancy-button
  10 | // ^?
  11 | <${FancyButton} label="Go"/>
  12 | //  ^?
```

### Ln 11, Col 5
```marko
   9 | <FancyButton label="Go"/>
  10 | // ^?
> 11 | <${FancyButton} label="Go"/>
     |     ^ (alias) const FancyButton: Template
import FancyButton
---
A button with a fancy border, see {@link https://example.com/fancy the guide}.  

*@deprecated* — Use `<plain-button>` instead.  

*@see* — https://example.com/fancy-button
  12 | //  ^?
  13 | <const/Button=FancyButton/>
  14 | <Button label="Go"/>
```

### Ln 14, Col 4
```marko
  12 | //  ^?
  13 | <const/Button=FancyButton/>
> 14 | <Button label="Go"/>
     |    ^ const Button: Template
  15 | // ^?
  16 | <ShinyButton/>
  17 | // ^?
```

### Ln 16, Col 4
```marko
  14 | <Button label="Go"/>
  15 | // ^?
> 16 | <ShinyButton/>
     |    ^ Custom Marko tag discovered from:

[components/ShinyButton.marko](<fixture>/components/ShinyButton.marko)
(alias) const Input: Template
---
A button that shines.
  17 | // ^?
  18 |
```

## Diagnostics
### Ln 3, Col 15
```marko
  1 | import FancyButton from "./components/fancy-button.marko";
  2 | import ShinyButton from "./components/ShinyButton.marko";
> 3 | import type { Input as FancyInput } from "./components/fancy-button.marko";
    |               ^^^^^^^^^^^^^^^^^^^ 'Input' is deprecated. (struck through)
  4 |
  5 | // A wrapper extending a deprecated tag's input.
  6 | export interface Input extends FancyInput {}
```

### Ln 6, Col 32
```marko
  4 |
  5 | // A wrapper extending a deprecated tag's input.
> 6 | export interface Input extends FancyInput {}
    |                                ^^^^^^^^^^ 'Input' is deprecated. (struck through)
  7 | //                             ^?
  8 |
  9 | <FancyButton label="Go"/>
```

