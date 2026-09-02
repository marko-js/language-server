# `@marko/parse`

A syntax tree parser for [Marko](https://markojs.com) templates, built on
[`htmljs-parser`](https://github.com/marko-js/htmljs-parser) (which is fully
re-exported, so consumers of this package never need to depend on it
directly).

```ts
import { parse, NodeType, TagType } from "@marko/parse";

const {
  program, // The syntax tree (comments and static statements are part of
  //         `program.body` in document order; statics are also available
  //         via `program.static`, and leading comments are attached to the
  //         nodes which follow them).
  errors, // Syntax errors encountered while parsing (the tree is still
  //        produced on a best effort basis).
  comments, // Every comment in document order.
  nodeAt, // (offset: number) => the most specific node at that offset.
  read, // (range: Range) => string
  positionAt, // (offset: number) => { line, character } (0-based)
  locationAt, // (range: Range) => { start, end } positions
  filename, // The filename passed in, verbatim (defaults to "index.marko").
  code, // The source passed in.
} = parse(source, filename, {
  // Optionally override how tag bodies parse (eg from taglib `parseOptions`).
  getTagType(name, range, defaultType) {},
});
```

Every node is a plain object with `start`/`end` source offsets, a string
`type` (see `NodeType`) and a `parent` back-reference.

## `getTagType`

The built in table always decides the kind of node a tag name produces: the
core statements (`import`, `export`, `class`, `static`, `server`, `client`
and `style {}` blocks) become `Import`/`Export`/`Class`/`Static`/`Style`
nodes, `@tags` become `AttrTag` nodes and everything else is a `Tag`.

The hook is only called for `Tag` nodes, with the tag name, the range of the
name and the body type the built in table chose (`TagType.html`,
`TagType.text` or `TagType.void`). Returning a `TagType` replaces that body
type; returning `TagType.statement` instead turns the tag into a generic
`Static` node (with `target` undefined and its keyword in `name`); returning
nothing keeps the default.
