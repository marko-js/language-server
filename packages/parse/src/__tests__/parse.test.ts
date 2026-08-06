import assert from "assert";

import { NodeType, parse, TagType } from "..";

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

  it("honors the getTagType hook over built in handling", () => {
    const parsed = parse(
      "style {\n  .a { color: red }\n}\nfoo raw text\n",
      "index.marko",
      {
        getTagType(name) {
          if (name === "style") return TagType.text;
          if (name === "foo") return TagType.statement;
        },
      },
    );

    // The built in `style {}` statement handling is overridden to a text tag.
    const style = parsed.program.body[0];
    assert.strictEqual(style.type, NodeType.Tag);
    // The forced statement becomes a generic Static node with a name range.
    const forced = parsed.program.static[0];
    assert.strictEqual(forced.type, NodeType.Static);
    assert.strictEqual(forced.target, undefined);
    assert.strictEqual(parsed.read(forced.name!), "foo");
  });

  it("finds nodes by offset", () => {
    const parsed = parse("<div>${x}</div>");
    assert.strictEqual(parsed.nodeAt(7).type, NodeType.Placeholder);
  });
});
