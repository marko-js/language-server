## Diagnostics
### Ln 2, Col 4
```marko
  1 | <map name="Map">
> 2 |   <area shape="rect" href="image-map">
    |    ^^^^ Fix any of the following:
  Element has no alt attribute
  aria-label attribute does not exist or is empty
  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
  Element has no title attribute
  3 | </map>
  4 |
  5 | <img src="source">
```

### Ln 5, Col 2
```marko
  3 | </map>
  4 |
> 5 | <img src="source">
    |  ^^^ Fix any of the following:
  Element does not have an alt attribute
  aria-label attribute does not exist or is empty
  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
  Element has no title attribute
  Element's default semantics were not overridden with role="none" or role="presentation"
  6 |
  7 | <a href="ebay.com">
  8 |   <img src="ebay-logo.png" alt="eBay">
```

### Ln 8, Col 4
```marko
   6 |
   7 | <a href="ebay.com">
>  8 |   <img src="ebay-logo.png" alt="eBay">
     |    ^^^ Fix all of the following:
  Element contains <img> element with alt text that duplicates existing text
   9 |   eBay
  10 | </a>
  11 |
```

### Ln 12, Col 2
```marko
  10 | </a>
  11 |
> 12 | <input type="image">
     |  ^^^^^ Fix any of the following:
  Element has no alt attribute
  aria-label attribute does not exist or is empty
  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
  Element has no title attribute
  Element does not have an implicit (wrapped) <label>
  Element does not have an explicit <label>
  13 |
  14 | <object id="object"></object>
  15 |
```

### Ln 16, Col 2
```marko
  14 | <object id="object"></object>
  15 |
> 16 | <div role="img"></div>
     |  ^^^ Fix any of the following:
  aria-label attribute does not exist or is empty
  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
  Element has no title attribute
  17 |
  18 | <svg role="img"></svg>
  19 |
```

### Ln 18, Col 2
```marko
  16 | <div role="img"></div>
  17 |
> 18 | <svg role="img"></svg>
     |  ^^^ Fix any of the following:
  Element has no child that is a title
  aria-label attribute does not exist or is empty
  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
  Element has no title attribute
  19 |
  20 | <img alt:no-update="test" />
```

