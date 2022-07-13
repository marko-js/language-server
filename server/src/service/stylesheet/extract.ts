import type { TaglibLookup } from "@marko/babel-utils";
import { createExtractor } from "../../utils/extractor";
import { Node, Range, NodeType } from "../../utils/parser";

/**
 * Iterate over the Marko CST and extract all the stylesheets.
 */
export function extractStyleSheets(
  code: string,
  program: Node.Program,
  lookup: TaglibLookup
) {
  let placeholderId = 0;
  const extractorsByExt: Record<
    string,
    ReturnType<typeof createExtractor>
  > = {};
  const read = (range: Range) => code.slice(range.start, range.end);
  const getExtractor = (ext: string) =>
    extractorsByExt[ext] || (extractorsByExt[ext] = createExtractor(code));
  const getFileExtFromTag = (tag: Node.Tag) => {
    const prefixEnd = tag.shorthandClassNames
      ? tag.shorthandClassNames.at(-1)!.end
      : tag.name.end;

    return tag.shorthandClassNames
      ? read({
          start: tag.shorthandClassNames[0].start,
          end: prefixEnd,
        }).replace(/^.*\./, "")
      : "css";
  };
  const visit = (node: Node.ChildNode) => {
    switch (node.type) {
      case NodeType.Tag:
        if (node.nameText === "style" && node.concise && node.attrs) {
          const block = node.attrs.at(-1)!;
          // Adds style blocks to the style sheet.
          if (block.type === NodeType.AttrNamed && code[block.start] === "{") {
            getExtractor(getFileExtFromTag(node)).write`${{
              start: block.start + 1,
              end: block.end - 1,
            }}`;
            break;
          }
        }

        if (node.body) {
          if (node.nameText === "style") {
            const ext = getFileExtFromTag(node);
            for (const child of node.body) {
              switch (child.type) {
                case NodeType.Text:
                  // Add all the text nodes to the stylesheet.
                  getExtractor(ext).write`${child}`;
                  break;
                case NodeType.Placeholder:
                  // Eventually we'll want to support placeholders in stylesheets, this just pretends they are custom properties.
                  getExtractor(ext).write`${`var(--_${placeholderId++})`}`;
                  break;
              }
            }
          } else {
            for (const child of node.body) {
              visit(child);
            }
          }
        }

        if (node.attrs) {
          for (const attr of node.attrs) {
            if (
              // Check for string literal attribute values.
              attr.type === NodeType.AttrNamed &&
              attr.value?.type === NodeType.AttrValue &&
              /^['"]$/.test(code[attr.value.value.start])
            ) {
              const name = read(attr.name);

              // TODO: support #style directive with custom extension, eg `#style.less=""`.
              // /^#style(?:\..*)/.test(name)

              // Adds inline style and #style attributes to the stylesheet.
              if (
                name === "#style" ||
                (name === "style" &&
                  node.nameText &&
                  name === "style" &&
                  lookup.getTag(node.nameText)?.html)
              ) {
                // Add inline "style" attribute.
                getExtractor("css").write`:root{${{
                  start: attr.value.value.start + 1,
                  end: attr.value.value.end - 1,
                }}}`;
              }
            }
          }
        }
        break;
    }
  };

  for (const node of program.body) visit(node);

  const resultsByExt: Record<
    string,
    ReturnType<ReturnType<typeof createExtractor>["end"]>
  > = {};

  for (const ext in extractorsByExt) {
    resultsByExt[ext] = extractorsByExt[ext].end();
  }

  return resultsByExt;
}
