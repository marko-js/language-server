import type { TaglibLookup } from "@marko/babel-utils";
import { DocumentLink } from "vscode-languageserver";
import type { TextDocument } from "vscode-languageserver-textdocument";
import { URI } from "vscode-uri";
import {
  type Node,
  type Range,
  type parse,
  NodeType,
} from "../../../utils/parser";
import resolveUrl from "../../../utils/resolve-url";
import isDocumentLinkAttr from "../util/is-document-link-attr";

const importTagReg = /(['"])<((?:[^\1\\>]+|\\.)*)>?\1/g;

/**
 * Iterate over the Marko CST and extract all the file links in the document.
 */
export function extractDocumentLinks(
  doc: TextDocument,
  parsed: ReturnType<typeof parse>,
  lookup: TaglibLookup
): DocumentLink[] {
  if (URI.parse(doc.uri).scheme === "untitled") {
    return [];
  }

  const links: DocumentLink[] = [];
  const { program } = parsed;
  const code = doc.getText();
  const read = (range: Range) => code.slice(range.start, range.end);
  const visit = (node: Node.ChildNode) => {
    switch (node.type) {
      case NodeType.Tag:
        if (node.attrs && node.nameText) {
          for (const attr of node.attrs) {
            if (isDocumentLinkAttr(doc, node, attr)) {
              links.push(
                DocumentLink.create(
                  {
                    start: parsed.positionAt(attr.value.value.start),
                    end: parsed.positionAt(attr.value.value.end),
                  },
                  resolveUrl(read(attr.value.value).slice(1, -1), doc.uri)
                )
              );
            }
          }
        }
        if (node.body) {
          for (const child of node.body) {
            visit(child);
          }
        }

        break;
    }
  };

  for (const item of program.static) {
    // check for import statement (this currently only support the tag import shorthand).
    if (item.type === NodeType.Statement && code[item.start] === "i") {
      importTagReg.lastIndex = 0;
      const value = parsed.read(item);
      const match = importTagReg.exec(value);
      if (match) {
        const [{ length }, , tagName] = match;
        const tagDef = lookup.getTag(tagName);
        const fileForTag = tagDef && (tagDef.template || tagDef.renderer);

        if (fileForTag) {
          links.push(
            DocumentLink.create(
              {
                start: parsed.positionAt(item.start + match.index),
                end: parsed.positionAt(item.start + match.index + length),
              },
              fileForTag
            )
          );
        }
      }
    }
  }

  for (const item of program.body) {
    visit(item);
  }

  return links;
}
