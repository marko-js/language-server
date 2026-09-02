import assert from "assert";

import { CommentType, type Node, NodeType, parse, TagType } from "..";

describe("@marko/parse", () => {
  it("parses a template with string node types", () => {
    const parsed = parse('import x from "x"\n// hi\n<div>${x}</div>\n');
    assert.deepStrictEqual(
      parsed.program.body.map((node) => node.type),
      [NodeType.Import, NodeType.Comment, NodeType.Tag],
    );
    assert.deepStrictEqual(
      parsed.program.static.map((node) => node.type),
      [NodeType.Import],
    );
  });

  it("attaches leading comments to the following node", () => {
    const parsed = parse("// lead\n<div/>\n// trailing\n");
    const tag = parsed.program.body.find((node) => node.type === NodeType.Tag)!;
    assert.strictEqual((tag as any).comments?.length, 1);
    assert.strictEqual(parsed.program.comments?.length, 1);
    assert.strictEqual(parsed.comments.length, 2);
    assert.strictEqual(parsed.comments[0].commentType, "line");
  });

  it("scopes trailing comments to their body", () => {
    const parsed = parse("<div>\n  // inside\n</div>\n<span/>\n");
    const [div, span] = parsed.program.body;
    assert.strictEqual(
      (div as any).body.some((node: any) => node.type === NodeType.Comment),
      true,
    );
    assert.strictEqual((span as any).comments, undefined);
    assert.strictEqual(parsed.program.comments, undefined);
  });

  it("collects syntax errors while still producing a tree", () => {
    const parsed = parse("<span></div>");
    assert.strictEqual(parsed.errors.length, 1);
    assert.match(parsed.errors[0].message, /closing "div" tag/);
    assert.strictEqual(parsed.program.body[0].type, NodeType.Tag);
  });

  it("lets the getTagType hook override tag body types only", () => {
    const calls: [string, TagType][] = [];
    const parsed = parse(
      [
        "style {",
        "  .a { color: red }",
        "}",
        'import x from "x"',
        "img",
        "script",
        "foo raw text",
        "<div/>",
        "",
      ].join("\n"),
      "index.marko",
      {
        getTagType(name, _range, defaultType) {
          calls.push([name, defaultType]);
          switch (name) {
            case "style":
            case "import":
              return TagType.text;
            case "img":
              return TagType.html;
            case "script":
              return TagType.void;
            case "foo":
              return TagType.statement;
          }
        },
      },
    );

    // Built in statements never reach the hook and keep their node kinds.
    assert.deepStrictEqual(
      parsed.program.body.map((node) => node.type),
      [
        NodeType.Style,
        NodeType.Import,
        NodeType.Tag,
        NodeType.Tag,
        NodeType.Static,
        NodeType.Tag,
      ],
    );
    assert.deepStrictEqual(calls, [
      ["img", TagType.void],
      ["script", TagType.text],
      ["foo", TagType.html],
      ["div", TagType.html],
    ]);

    const [, , img, script, forced, div] = parsed.program.body as [
      Node.Style,
      Node.Import,
      Node.Tag,
      Node.Tag,
      Node.Static,
      Node.Tag,
    ];
    assert.strictEqual(img.bodyType, TagType.html);
    assert.strictEqual(script.bodyType, TagType.void);
    assert.strictEqual(script.body, undefined);
    assert.strictEqual(div.bodyType, TagType.html);
    // The forced statement becomes a generic Static node with a name range.
    assert.strictEqual(forced.target, undefined);
    assert.strictEqual(parsed.read(forced.name!), "foo");
    assert.strictEqual(parsed.errors.length, 0);
  });

  it("returns the filename verbatim", () => {
    assert.strictEqual(parse("", "a/b\\c.marko").filename, "a/b\\c.marko");
    assert.strictEqual(parse("").filename, "index.marko");
  });

  it("parses async attribute methods", () => {
    const parsed = parse("<div async onClick() { await x }/>");
    const tag = parsed.program.body[0] as Node.Tag;
    const attr = tag.attrs![0] as Node.AttrNamed;
    assert.strictEqual(attr.value?.type, NodeType.AttrMethod);
    assert.strictEqual((attr.value as Node.AttrMethod).async, true);
    assert.strictEqual(
      parsed.read((attr.value as Node.AttrMethod).body),
      "{ await x }",
    );
  });

  it("classifies html comments", () => {
    const parsed = parse("<!-- a -->\n/* b */\n// c\n");
    assert.deepStrictEqual(
      parsed.comments.map((comment) => comment.commentType),
      [CommentType.html, CommentType.block, CommentType.line],
    );
  });

  it("finds comment and static nodes in the body by offset", () => {
    const code = 'import x from "x"\n<div>\n  <!-- c -->\n</div>\n';
    const parsed = parse(code);
    assert.strictEqual(parsed.nodeAt(2).type, NodeType.Import);
    const comment = parsed.nodeAt(code.indexOf("<!--") + 2);
    assert.strictEqual(comment.type, NodeType.Comment);
    assert.strictEqual(comment.parent.type, NodeType.Tag);
  });

  it("scopes concise mode trailing comments to their body", () => {
    const parsed = parse("div\n  // inside\nspan\n");
    const [div, span] = parsed.program.body as [Node.Tag, Node.Tag];
    assert.deepStrictEqual(
      div.body!.map((node) => node.type),
      [NodeType.Comment],
    );
    assert.strictEqual(span.comments, undefined);
    assert.strictEqual(parsed.program.comments, undefined);
  });

  it("finds nodes by offset", () => {
    const parsed = parse("<div>${x}</div>");
    assert.strictEqual(parsed.nodeAt(7).type, NodeType.Placeholder);
  });
});
