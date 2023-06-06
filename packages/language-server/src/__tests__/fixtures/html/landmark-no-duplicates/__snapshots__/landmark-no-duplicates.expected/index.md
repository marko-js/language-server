## Diagnostics
### Ln 1, Col 2
```marko
> 1 | <div title="banner 1" role="banner"/>
    |  ^^^ Fix any of the following:
  Document has more than one banner landmark
  2 | <div title="banner 2" role="banner"/>
  3 |
  4 | <div title="contentinfo 1" role="contentinfo"/>
```

### Ln 4, Col 2
```marko
  2 | <div title="banner 2" role="banner"/>
  3 |
> 4 | <div title="contentinfo 1" role="contentinfo"/>
    |  ^^^ Fix any of the following:
  Document has more than one contentinfo landmark
  5 | <div title="contentinfo 2" role="contentinfo"/>
  6 |
  7 | <div title="main 1" role="main"/>
```

### Ln 7, Col 2
```marko
  5 | <div title="contentinfo 2" role="contentinfo"/>
  6 |
> 7 | <div title="main 1" role="main"/>
    |  ^^^ Fix any of the following:
  Document has more than one main landmark
  8 | <div title="main 2" role="main"/>
  9 |
```

