## Hovers
### Ln 1, Col 28
```marko
> 1 | <test-tag/result <A>|data: A| data=1 as const>
    |                            ^ (type parameter) A in <A>(data: A): MarkoReturn<{
    value: {
        result: A;
    };
}>
  2 | //                         ^?
  3 |   <return={ result: data }/>
  4 | //                  ^?
```

### Ln 3, Col 21
```marko
  1 | <test-tag/result <A>|data: A| data=1 as const>
  2 | //                         ^?
> 3 |   <return={ result: data }/>
    |                     ^ (parameter) data: A
  4 | //                  ^?
  5 | </>
  6 |
```

### Ln 7, Col 6
```marko
  5 | </>
  6 |
> 7 | -- ${result}
    |      ^ const result: {
    value: {
        result: 1;
    };
}
  8 | //   ^?
```

