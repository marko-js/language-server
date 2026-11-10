## Hovers
### Ln 76, Col 6
```marko
  74 |
  75 | <script>
> 76 |   fromRepeated;
     |      ^ const fromRepeated: (() => "repeated") & Iterable<"repeated">
  77 |   // ^?
  78 |   fromIf;
  79 |   // ^?
```

### Ln 78, Col 6
```marko
  76 |   fromRepeated;
  77 |   // ^?
> 78 |   fromIf;
     |      ^ const fromIf: (() => "if") & Iterable<"if">
  79 |   // ^?
  80 |   fromFor;
  81 |   // ^?
```

### Ln 80, Col 6
```marko
  78 |   fromIf;
  79 |   // ^?
> 80 |   fromFor;
     |      ^ const fromFor: (() => number) & Iterable<number>
  81 |   // ^?
  82 |   fromContent;
  83 |   // ^?
```

### Ln 82, Col 6
```marko
  80 |   fromFor;
  81 |   // ^?
> 82 |   fromContent;
     |      ^ const fromContent: (() => "content") & Iterable<"content">
  83 |   // ^?
  84 |   fromNested;
  85 |   // ^?
```

### Ln 84, Col 6
```marko
  82 |   fromContent;
  83 |   // ^?
> 84 |   fromNested;
     |      ^ const fromNested: (() => "nested") & Iterable<"nested">
  85 |   // ^?
  86 |   fromDefine;
  87 |   // ^?
```

### Ln 86, Col 6
```marko
  84 |   fromNested;
  85 |   // ^?
> 86 |   fromDefine;
     |      ^ const fromDefine: (() => "define") & Iterable<"define">
  87 |   // ^?
  88 |   fromUntyped;
  89 |   // ^?
```

### Ln 88, Col 6
```marko
  86 |   fromDefine;
  87 |   // ^?
> 88 |   fromUntyped;
     |      ^ const fromUntyped: (() => number) & Iterable<number>
  89 |   // ^?
  90 | </script>
  91 |
```

### Ln 101, Col 7
```marko
   99 | </gtable>
  100 | <script>
> 101 |       fromLoop;
      |       ^ const fromLoop: (() => string) & Iterable<string>
  102 | //    ^?
  103 | </script>
  104 |
```

### Ln 117, Col 7
```marko
  115 | </gtable>
  116 | <script>
> 117 |       besideError;
      |       ^ const besideError: any
  118 | //    ^?
  119 | </script>
  120 |
```

### Ln 132, Col 7
```marko
  130 | </panel>
  131 | <script>
> 132 |       fromScriptletIf;
      |       ^ const fromScriptletIf: (() => "scriptlet") & Iterable<"scriptlet">
  133 | //    ^?
  134 | </script>
  135 |
```

### Ln 148, Col 7
```marko
  146 | </panel>
  147 | <script>
> 148 |       fromCell;
      |       ^ const fromCell: (() => "cell") & Iterable<"cell">
  149 | //    ^?
  150 | </script>
  151 |
```

## Diagnostics
### Ln 109, Col 12
```marko
  107 | // inference when its argument has an unannotated param)
  108 | <gtable rows=users>
> 109 |   <@column title=1/>
      |            ^^^^^ Type 'number' is not assignable to type 'string'.
  110 |   <if=flag>
  111 |     <@column|row| title="a">
  112 |       <const/besideError=() => row/>
```

