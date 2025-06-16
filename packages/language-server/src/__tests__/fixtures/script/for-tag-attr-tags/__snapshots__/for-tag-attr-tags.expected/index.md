## Hovers
### Ln 6, Col 8
```marko
  4 |     { foo: "c", bar: "d" },
  5 |   ]>
> 6 |     <@row>
    |        ^ (property) "@row": Marko.AttrTag<{
    cell?: Marko.AttrTag<{
        renderBody: Marko.Body;
    }>;
}> | undefined
  7 |     // ^?
  8 |       <@cell>${row.foo}</@cell>
  9 |       // ^?     ^?
```

### Ln 8, Col 10
```marko
   6 |     <@row>
   7 |     // ^?
>  8 |       <@cell>${row.foo}</@cell>
     |          ^ (property) "@cell": Marko.AttrTag<{
    renderBody: Marko.Body;
}> | undefined
   9 |       // ^?     ^?
  10 |       <@cell>${row.bar}</@cell>
  11 |     </@row>
```

### Ln 8, Col 17
```marko
   6 |     <@row>
   7 |     // ^?
>  8 |       <@cell>${row.foo}</@cell>
     |                 ^ (parameter) row: {
    foo: string;
    bar: string;
}
   9 |       // ^?     ^?
  10 |       <@cell>${row.bar}</@cell>
  11 |     </@row>
```

### Ln 20, Col 8
```marko
  18 |     { foo: "c", bar: "d" },
  19 |   ] as const>
> 20 |     <@row>
     |        ^ (property) "@row": Marko.AttrTag<{
    cell?: Marko.AttrTag<{
        renderBody: Marko.Body;
    }>;
}> | undefined
  21 |     // ^?
  22 |       <@cell>${row.foo}</@cell>
  23 |       // ^?     ^?
```

### Ln 22, Col 10
```marko
  20 |     <@row>
  21 |     // ^?
> 22 |       <@cell>${row.foo}</@cell>
     |          ^ (property) "@cell": Marko.AttrTag<{
    renderBody: Marko.Body;
}> | undefined
  23 |       // ^?     ^?
  24 |       <@cell>${row.bar}</@cell>
  25 |     </@row>
```

### Ln 22, Col 17
```marko
  20 |     <@row>
  21 |     // ^?
> 22 |       <@cell>${row.foo}</@cell>
     |                 ^ (parameter) row: {
    readonly foo: "a";
    readonly bar: "b";
} | {
    readonly foo: "c";
    readonly bar: "d";
}
  23 |       // ^?     ^?
  24 |       <@cell>${row.bar}</@cell>
  25 |     </@row>
```

