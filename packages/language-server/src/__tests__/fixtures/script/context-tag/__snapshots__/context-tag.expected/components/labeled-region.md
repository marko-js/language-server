## Hovers
### Ln 9, Col 12
```marko
   7 | <context=input.label>
   8 |   <${input.content}/>
>  9 |   <context/label from="<labeled-region>"/>
     |            ^ const label: string
  10 |   //       ^?
  11 |   <div>${label.toUpperCase()}</div>
  12 | </context>
```

