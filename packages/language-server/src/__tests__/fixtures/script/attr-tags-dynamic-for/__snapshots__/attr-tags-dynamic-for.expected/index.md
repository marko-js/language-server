## Hovers
### Ln 24, Col 9
```marko
  22 |   <for|item, index, all| of=list>
  23 |     <@a>
> 24 |       ${item} ${index} ${all}
     |         ^ (parameter) item: {
    readonly value: 1;
} | {
    readonly value: 2;
} | {
    readonly value: 3;
}
  25 | //      ^?      ^?       ^?
  26 |     </@a>
  27 |   </for>
```

### Ln 24, Col 17
```marko
  22 |   <for|item, index, all| of=list>
  23 |     <@a>
> 24 |       ${item} ${index} ${all}
     |                 ^ (parameter) index: number
  25 | //      ^?      ^?       ^?
  26 |     </@a>
  27 |   </for>
```

### Ln 24, Col 26
```marko
  22 |   <for|item, index, all| of=list>
  23 |     <@a>
> 24 |       ${item} ${index} ${all}
     |                          ^ (parameter) all: readonly [{
    readonly value: 1;
}, {
    readonly value: 2;
}, {
    readonly value: 3;
}]
  25 | //      ^?      ^?       ^?
  26 |     </@a>
  27 |   </for>
```

### Ln 33, Col 9
```marko
  31 |   <for|item, index| of=list>
  32 |     <@a>
> 33 |       ${item}
     |         ^ (parameter) item: {
    readonly value: 1;
} | {
    readonly value: 2;
} | {
    readonly value: 3;
}
  34 | //      ^?
  35 |     </@a>
  36 |     <@b>
```

### Ln 37, Col 9
```marko
  35 |     </@a>
  36 |     <@b>
> 37 |       ${index}
     |         ^ (parameter) index: number
  38 | //      ^?
  39 |     </@b>
  40 |   </for>
```

### Ln 52, Col 3
```marko
  50 |
  51 | <effect() {
> 52 |   hoistedFromForOf;
     |   ^ const hoistedFromForOf: (() => 1 | 2 | 3) & Iterable<1 | 2 | 3>
  53 | //^?
  54 | }/>
  55 |
```

### Ln 61, Col 9
```marko
  59 |   <for|key, value| in=record>
  60 |     <@a>
> 61 |       ${key} ${value}
     |         ^ (parameter) key: "a" | "b"
  62 | //      ^?     ^?
  63 |     </@a>
  64 |   </for>
```

### Ln 61, Col 16
```marko
  59 |   <for|key, value| in=record>
  60 |     <@a>
> 61 |       ${key} ${value}
     |                ^ (parameter) value: 1 | 2
  62 | //      ^?     ^?
  63 |     </@a>
  64 |   </for>
```

### Ln 76, Col 3
```marko
  74 |
  75 | <effect() {
> 76 |   hoistedFromForIn;
     |   ^ const hoistedFromForIn: (() => "a" | "b") & Iterable<"a" | "b">
  77 | //^?
  78 | }/>
  79 |
```

### Ln 83, Col 9
```marko
  81 |   <for|index| to=10>
  82 |     <@a>
> 83 |       ${index}
     |         ^ (parameter) index: number
  84 | //      ^?
  85 |     </@a>
  86 |   </for>
```

### Ln 93, Col 9
```marko
  91 |   <for|index| from=1 to=10>
  92 |     <@a>
> 93 |       ${index}
     |         ^ (parameter) index: number
  94 | //      ^?
  95 |     </@a>
  96 |   </for>
```

### Ln 102, Col 9
```marko
  100 |   <for|index| to=10 step=2>
  101 |     <@a>
> 102 |       ${index}
      |         ^ (parameter) index: number
  103 | //      ^?
  104 |     </@a>
  105 |   </for>
```

### Ln 117, Col 3
```marko
  115 |
  116 | <effect() {
> 117 |   hoistedFromForTo;
      |   ^ const hoistedFromForTo: (() => number) & Iterable<number>
  118 | //^?
  119 | }/>
  120 |
```

## Diagnostics
### Ln 51, Col 1
```marko
  49 | </>
  50 |
> 51 | <effect() {
     | ^^^^^^^^^^^
> 52 |   hoistedFromForOf;
     | ^^^^^^^^^^^^^^^^^^^
> 53 | //^?
     | ^^^^^^^^^^^^^^^^^^^
> 54 | }/>
     | ^^^^ The 'effect' tag has been replaced by the 'script' tag.
  55 |
  56 | <let/record={ a: 1, b: 2 } as const/>
  57 |
```

### Ln 75, Col 1
```marko
  73 | </>
  74 |
> 75 | <effect() {
     | ^^^^^^^^^^^
> 76 |   hoistedFromForIn;
     | ^^^^^^^^^^^^^^^^^^^
> 77 | //^?
     | ^^^^^^^^^^^^^^^^^^^
> 78 | }/>
     | ^^^^ The 'effect' tag has been replaced by the 'script' tag.
  79 |
  80 | <${custom}>
  81 |   <for|index| to=10>
```

### Ln 116, Col 1
```marko
  114 | </>
  115 |
> 116 | <effect() {
      | ^^^^^^^^^^^
> 117 |   hoistedFromForTo;
      | ^^^^^^^^^^^^^^^^^^^
> 118 | //^?
      | ^^^^^^^^^^^^^^^^^^^
> 119 | }/>
      | ^^^^ The 'effect' tag has been replaced by the 'script' tag.
  120 |
```

### Ln 1, Col 4
```marko
> 1 | <${custom}>
    |    ^^^^^^ Cannot find name 'custom'.
  2 |   <for>
  3 |     <@a/>
  4 |   </for>
```

### Ln 2, Col 4
```marko
  1 | <${custom}>
> 2 |   <for>
    |    ^^^ Argument of type '{}' is not assignable to parameter of type '{ of: false | void | Iterable<unknown> | null; } | { in: false | void | object | null; } | { to: number; from?: number | undefined; step?: number | undefined; } | { until: number; from?: number | undefined; step?: number | undefined; }'.
  3 |     <@a/>
  4 |   </for>
  5 | </>
```

### Ln 15, Col 4
```marko
  13 | }] as const/>
  14 |
> 15 | <${custom}>
     |    ^^^^^^ Cannot find name 'custom'.
  16 |   <for of=list>
  17 |     <@a/>
  18 |   </for>
```

### Ln 21, Col 4
```marko
  19 | </>
  20 |
> 21 | <${custom}>
     |    ^^^^^^ Cannot find name 'custom'.
  22 |   <for|item, index, all| of=list>
  23 |     <@a>
  24 |       ${item} ${index} ${all}
```

### Ln 30, Col 4
```marko
  28 | </>
  29 |
> 30 | <${custom}>
     |    ^^^^^^ Cannot find name 'custom'.
  31 |   <for|item, index| of=list>
  32 |     <@a>
  33 |       ${item}
```

### Ln 43, Col 4
```marko
  41 | </>
  42 |
> 43 | <${custom}>
     |    ^^^^^^ Cannot find name 'custom'.
  44 |   <for|item| of=list>
  45 |     <@a>
  46 |       <const/hoistedFromForOf() { return item.value }>
```

### Ln 58, Col 4
```marko
  56 | <let/record={ a: 1, b: 2 } as const/>
  57 |
> 58 | <${custom}>
     |    ^^^^^^ Cannot find name 'custom'.
  59 |   <for|key, value| in=record>
  60 |     <@a>
  61 |       ${key} ${value}
```

### Ln 67, Col 4
```marko
  65 | </>
  66 |
> 67 | <${custom}>
     |    ^^^^^^ Cannot find name 'custom'.
  68 |   <for|key| in=record>
  69 |     <@a>
  70 |       <const/hoistedFromForIn() { return key }/>
```

### Ln 80, Col 4
```marko
  78 | }/>
  79 |
> 80 | <${custom}>
     |    ^^^^^^ Cannot find name 'custom'.
  81 |   <for|index| to=10>
  82 |     <@a>
  83 |       ${index}
```

### Ln 90, Col 4
```marko
  88 |
  89 |
> 90 | <${custom}>
     |    ^^^^^^ Cannot find name 'custom'.
  91 |   <for|index| from=1 to=10>
  92 |     <@a>
  93 |       ${index}
```

### Ln 99, Col 4
```marko
   97 | </>
   98 |
>  99 | <${custom}>
      |    ^^^^^^ Cannot find name 'custom'.
  100 |   <for|index| to=10 step=2>
  101 |     <@a>
  102 |       ${index}
```

### Ln 108, Col 4
```marko
  106 | </>
  107 |
> 108 | <${custom}>
      |    ^^^^^^ Cannot find name 'custom'.
  109 |   <for|index| to=10>
  110 |     <@a>
  111 |       <const/hoistedFromForTo() { return index }/>
```

## Code Actions
### The 'effect' tag has been replaced by the 'script' tag.
```marko
<${custom}>
  <for>
    <@a/>
  </for>
</>
<let/list=[{
  value: 1
}, {
  value: 2
}, {
  value: 3
}] as const/>
<${custom}>
  <for of=list>
    <@a/>
  </for>
</>
<${custom}>
  <for|item, index, all| of=list>
    <@a>
      ${item} ${index} ${all}
      <!--      ^?      ^?       ^?-->
    </@a>
  </for>
</>
<${custom}>
  <for|item, index| of=list>
    <@a>
      ${item}
      <!--      ^?-->
    </@a>
    <@b>
      ${index}
      <!--      ^?-->
    </@b>
  </for>
</>
<${custom}>
  <for|item| of=list>
    <@a>
      <const/hoistedFromForOf() {
        return item.value;
      }/>
    </@a>
  </for>
</>
<script >
  hoistedFromForOf;
  //^?
</script>
<let/record={
  a: 1,
  b: 2
} as const/>
<${custom}>
  <for|key, value| in=record>
    <@a>
      ${key} ${value}
      <!--      ^?     ^?-->
    </@a>
  </for>
</>
<${custom}>
  <for|key| in=record>
    <@a>
      <const/hoistedFromForIn() {
        return key;
      }/>
    </@a>
  </for>
</>
<effect() {
  hoistedFromForIn;
  //^?
}/>
<${custom}>
  <for|index| to=10>
    <@a>
      ${index}
      <!--      ^?-->
    </@a>
  </for>
</>
<${custom}>
  <for|index| from=1 to=10>
    <@a>
      ${index}
      <!--      ^?-->
    </@a>
  </for>
</>
<${custom}>
  <for|index| to=10 step=2>
    <@a>
      ${index}
      <!--      ^?-->
    </@a>
  </for>
</>
<${custom}>
  <for|index| to=10>
    <@a>
      <const/hoistedFromForTo() {
        return index;
      }/>
    </@a>
  </for>
</>
<effect() {
  hoistedFromForTo;
  //^?
}/>
```

### The 'effect' tag has been replaced by the 'script' tag.
```marko
<${custom}>
  <for>
    <@a/>
  </for>
</>
<let/list=[{
  value: 1
}, {
  value: 2
}, {
  value: 3
}] as const/>
<${custom}>
  <for of=list>
    <@a/>
  </for>
</>
<${custom}>
  <for|item, index, all| of=list>
    <@a>
      ${item} ${index} ${all}
      <!--      ^?      ^?       ^?-->
    </@a>
  </for>
</>
<${custom}>
  <for|item, index| of=list>
    <@a>
      ${item}
      <!--      ^?-->
    </@a>
    <@b>
      ${index}
      <!--      ^?-->
    </@b>
  </for>
</>
<${custom}>
  <for|item| of=list>
    <@a>
      <const/hoistedFromForOf() {
        return item.value;
      }/>
    </@a>
  </for>
</>
<effect() {
  hoistedFromForOf;
  //^?
}/>
<let/record={
  a: 1,
  b: 2
} as const/>
<${custom}>
  <for|key, value| in=record>
    <@a>
      ${key} ${value}
      <!--      ^?     ^?-->
    </@a>
  </for>
</>
<${custom}>
  <for|key| in=record>
    <@a>
      <const/hoistedFromForIn() {
        return key;
      }/>
    </@a>
  </for>
</>
<script >
  hoistedFromForIn;
  //^?
</script>
<${custom}>
  <for|index| to=10>
    <@a>
      ${index}
      <!--      ^?-->
    </@a>
  </for>
</>
<${custom}>
  <for|index| from=1 to=10>
    <@a>
      ${index}
      <!--      ^?-->
    </@a>
  </for>
</>
<${custom}>
  <for|index| to=10 step=2>
    <@a>
      ${index}
      <!--      ^?-->
    </@a>
  </for>
</>
<${custom}>
  <for|index| to=10>
    <@a>
      <const/hoistedFromForTo() {
        return index;
      }/>
    </@a>
  </for>
</>
<effect() {
  hoistedFromForTo;
  //^?
}/>
```

### The 'effect' tag has been replaced by the 'script' tag.
```marko
<${custom}>
  <for>
    <@a/>
  </for>
</>
<let/list=[{
  value: 1
}, {
  value: 2
}, {
  value: 3
}] as const/>
<${custom}>
  <for of=list>
    <@a/>
  </for>
</>
<${custom}>
  <for|item, index, all| of=list>
    <@a>
      ${item} ${index} ${all}
      <!--      ^?      ^?       ^?-->
    </@a>
  </for>
</>
<${custom}>
  <for|item, index| of=list>
    <@a>
      ${item}
      <!--      ^?-->
    </@a>
    <@b>
      ${index}
      <!--      ^?-->
    </@b>
  </for>
</>
<${custom}>
  <for|item| of=list>
    <@a>
      <const/hoistedFromForOf() {
        return item.value;
      }/>
    </@a>
  </for>
</>
<effect() {
  hoistedFromForOf;
  //^?
}/>
<let/record={
  a: 1,
  b: 2
} as const/>
<${custom}>
  <for|key, value| in=record>
    <@a>
      ${key} ${value}
      <!--      ^?     ^?-->
    </@a>
  </for>
</>
<${custom}>
  <for|key| in=record>
    <@a>
      <const/hoistedFromForIn() {
        return key;
      }/>
    </@a>
  </for>
</>
<effect() {
  hoistedFromForIn;
  //^?
}/>
<${custom}>
  <for|index| to=10>
    <@a>
      ${index}
      <!--      ^?-->
    </@a>
  </for>
</>
<${custom}>
  <for|index| from=1 to=10>
    <@a>
      ${index}
      <!--      ^?-->
    </@a>
  </for>
</>
<${custom}>
  <for|index| to=10 step=2>
    <@a>
      ${index}
      <!--      ^?-->
    </@a>
  </for>
</>
<${custom}>
  <for|index| to=10>
    <@a>
      <const/hoistedFromForTo() {
        return index;
      }/>
    </@a>
  </for>
</>
<script >
  hoistedFromForTo;
  //^?
</script>
```

### Fix all auto-fixable Marko issues
```marko
<${custom}>
  <for>
    <@a/>
  </for>
</>
<let/list=[{
  value: 1
}, {
  value: 2
}, {
  value: 3
}] as const/>
<${custom}>
  <for of=list>
    <@a/>
  </for>
</>
<${custom}>
  <for|item, index, all| of=list>
    <@a>
      ${item} ${index} ${all}
      <!--      ^?      ^?       ^?-->
    </@a>
  </for>
</>
<${custom}>
  <for|item, index| of=list>
    <@a>
      ${item}
      <!--      ^?-->
    </@a>
    <@b>
      ${index}
      <!--      ^?-->
    </@b>
  </for>
</>
<${custom}>
  <for|item| of=list>
    <@a>
      <const/hoistedFromForOf() {
        return item.value;
      }/>
    </@a>
  </for>
</>
<script >
  hoistedFromForOf;
  //^?
</script>
<let/record={
  a: 1,
  b: 2
} as const/>
<${custom}>
  <for|key, value| in=record>
    <@a>
      ${key} ${value}
      <!--      ^?     ^?-->
    </@a>
  </for>
</>
<${custom}>
  <for|key| in=record>
    <@a>
      <const/hoistedFromForIn() {
        return key;
      }/>
    </@a>
  </for>
</>
<script >
  hoistedFromForIn;
  //^?
</script>
<${custom}>
  <for|index| to=10>
    <@a>
      ${index}
      <!--      ^?-->
    </@a>
  </for>
</>
<${custom}>
  <for|index| from=1 to=10>
    <@a>
      ${index}
      <!--      ^?-->
    </@a>
  </for>
</>
<${custom}>
  <for|index| to=10 step=2>
    <@a>
      ${index}
      <!--      ^?-->
    </@a>
  </for>
</>
<${custom}>
  <for|index| to=10>
    <@a>
      <const/hoistedFromForTo() {
        return index;
      }/>
    </@a>
  </for>
</>
<script >
  hoistedFromForTo;
  //^?
</script>
```

