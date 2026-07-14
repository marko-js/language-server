import { type Node, NodeType } from "@marko/language-tools";
import type { DocumentLink } from "vscode-languageserver";

import { type MarkoFile, processDoc } from "../../utils/file";
import resolveUrl from "../../utils/resolve-url";
import type { Plugin } from "../types";
import getContextFromAttr from "./util/context-from-attr";
import isDocumentLinkAttr from "./util/is-document-link-attr";

const importTagReg = /(['"])<((?:[^'"\\>]|\\.)*)>?\1/g;

export const findDocumentLinks: Plugin["findDocumentLinks"] = async (doc) => {
  return processDoc(doc, extractDocumentLinks);
};

/**
 * Iterate over the Marko CST and extract all the file links in the document.
 */
function extractDocumentLinks({
  uri,
  scheme,
  parsed,
  code,
  lookup,
}: MarkoFile): DocumentLink[] {
  if (scheme !== "file") {
    return [];
  }

  const links: DocumentLink[] = [];
  const { program, read } = parsed;
  const visit = (node: Node.ChildNode) => {
    switch (node.type) {
      case NodeType.AttrTag:
        if (node.body) {
          for (const child of node.body) {
            visit(child);
          }
        }
        break;
      case NodeType.Tag:
        if (node.attrs && node.nameText) {
          for (const attr of node.attrs) {
            const fromAttr = getContextFromAttr(code, node, attr);
            if (fromAttr) {
              const request = read(fromAttr.value.value).slice(1, -1);
              const tagMatch = /^<(.*)>$/.exec(request);
              const target = tagMatch
                ? (() => {
                    const tagDef = lookup.getTag(tagMatch[1]);
                    return tagDef && (tagDef.template || tagDef.renderer);
                  })()
                : request[0] === "."
                  ? resolveUrl(request, uri)
                  : undefined;
              if (target) {
                links.push({
                  range: parsed.locationAt(fromAttr.value.value),
                  target,
                });
              }
            } else if (isDocumentLinkAttr(code, node, attr)) {
              const resolved = resolveUrl(
                read(attr.value.value).slice(1, -1),
                uri,
              );
              if (resolved) {
                links.push({
                  range: parsed.locationAt(attr.value.value),
                  target: resolveUrl(read(attr.value.value).slice(1, -1), uri),
                });
              }
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

  for (const node of program.static) {
    // check for import statement (this currently only support the tag import shorthand).
    if (node.type === NodeType.Import) {
      importTagReg.lastIndex = 0;
      const value = parsed.read(node);
      const match = importTagReg.exec(value);
      if (match) {
        const [{ length }, , tagName] = match;
        const tagDef = lookup.getTag(tagName);
        const fileForTag = tagDef && (tagDef.template || tagDef.renderer);

        if (fileForTag) {
          links.push({
            range: parsed.locationAt({
              start: node.start + match.index,
              end: node.start + match.index + length,
            }),
            target: fileForTag,
          });
        }
      }
    }
  }

  for (const node of program.body) {
    visit(node);
  }

  return links;
}
