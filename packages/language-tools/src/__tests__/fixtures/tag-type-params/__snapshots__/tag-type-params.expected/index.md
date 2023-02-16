## Hovers
### Ln 1, Col 28
```marko
> 1 | <test-tag/result <A>|data: A| data=1 as const>
    |                            ^ (type parameter) A in <A>(data: A): MarkoReturn<{
    value: {
        result: A;
    };
}>
  2 |   <return={ result: data }/>
  3 | </>
  4 |
```

### Ln 2, Col 21
```marko
  1 | <test-tag/result <A>|data: A| data=1 as const>
> 2 |   <return={ result: data }/>
    |                     ^ (parameter) data: A
  3 | </>
  4 |
  5 | -- ${result}
```

### Ln 5, Col 6
```marko
  3 | </>
  4 |
> 5 | -- ${result}
    |      ^ const result: {
    value: {
        result: 1;
    };
}
  6 |
```

