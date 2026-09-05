## Hovers
### Ln 1, Col 10
```marko
> 1 | <context/theme from="./theme-provider.marko"/>
    |          ^ const theme: string
  2 | //       ^?
  3 | <button onClick() { theme = "dark" }>${theme}</button>
  4 |
```

