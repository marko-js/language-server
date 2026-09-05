## Hovers
### Ln 1, Col 10
```marko
> 1 | <context/settings from="<mode-provider>"/>
    |          ^ const settings: {
    readonly mode: "detailed";
    readonly level: 2;
}
  2 | //       ^?
  3 | <span>${settings.mode}</span>
  4 |
```

