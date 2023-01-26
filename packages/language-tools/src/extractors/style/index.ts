import type { TaglibLookup } from "@marko/babel-utils";

import { type Node, NodeType, type Parsed } from "../../parser";
import { type Extracted, Extractor } from "../../util/extractor";

export interface ExtractStyleOptions {
  parsed: Parsed;
  lookup: TaglibLookup;
}

/**
 * Iterate over the Marko CST and extract all the stylesheets.
 */
export function extractStyle(opts: ExtractStyleOptions) {
  const { parsed, lookup } = opts;
  const extractorsByExt = new Map<string, Extractor>();
  const { read, program, code } = parsed;
  let placeholderId = 0;

  for (const node of program.static) {
    if (node.type === NodeType.Style) {
      getExtractor(node.ext || ".css").copy(node.value);
    }
  }

  for (const node of program.body) {
    visit(node);
  }

  const extractedByExt = new Map<string, Extracted>();
  for (const [ext, extractor] of extractorsByExt) {
    extractedByExt.set(ext, extractor.end());
  }

  return extractedByExt;

  function visit(node: Node.ChildNode) {
    switch (node.type) {
      case NodeType.AttrTag:
        if (node.body) {
          for (const child of node.body) {
            visit(child);
          }
        }
        break;
      case NodeType.Tag:
        if (node.body) {
          if (node.nameText === "style") {
            const ext = node.shorthandClassNames
              ? read(node.shorthandClassNames.at(-1)!)
              : ".css";

            for (const child of node.body) {
              switch (child.type) {
                case NodeType.Text:
                  // Add all the text nodes to the stylesheet.
                  getExtractor(ext).copy(child);
                  break;
                case NodeType.Placeholder:
                  // Eventually we'll want to support placeholders in stylesheets, this just pretends they are custom properties.
                  getExtractor(ext).write(`var(--_${placeholderId++})`);
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
                getExtractor("css")
                  .write(":root{")
                  .copy({
                    start: attr.value.value.start + 1,
                    end: attr.value.value.end - 1,
                  })
                  .write("}");
              }
            }
          }
        }
        break;
    }
  }

  function getExtractor(ext: string) {
    let extractor = extractorsByExt.get(ext);
    if (!extractor) {
      extractorsByExt.set(ext, (extractor = new Extractor(parsed)));
    }
    return extractor;
  }
}
