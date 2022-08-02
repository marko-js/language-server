import type { TaglibLookup } from "@marko/babel-utils";
import { DocumentLink } from "vscode-languageserver";
import type { TextDocument } from "vscode-languageserver-textdocument";
import { URI } from "vscode-uri";
import { getCompilerInfo, parse } from "../../utils/compiler";
import { type Node, type Range, NodeType } from "../../utils/parser";
import resolveUrl from "../../utils/resolve-url";
import type { Plugin } from "../types";
import isDocumentLinkAttr from "./util/is-document-link-attr";

const importTagReg = /(['"])<((?:[^\1\\>]+|\\.)*)>?\1/g;
const cache = new WeakMap<ReturnType<typeof parse>, DocumentLink[]>();

export const findDocumentLinks: Plugin["findDocumentLinks"] = async (doc) => {
  const parsed = parse(doc);
  let result = cache.get(parsed);
  if (!result) {
    result = extractDocumentLinks(doc, parsed, getCompilerInfo(doc).lookup);
    cache.set(parsed, result);
  }
  return result;
};

/**
 * Iterate over the Marko CST and extract all the file links in the document.
 */
function extractDocumentLinks(
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
            if (isDocumentLinkAttr(doc, node, attr)) {
              const resolved = resolveUrl(
                read(attr.value.value).slice(1, -1),
                doc.uri
              );
              if (resolved) {
                links.push(
                  DocumentLink.create(
                    parsed.locationAt(attr.value.value),
                    resolveUrl(read(attr.value.value).slice(1, -1), doc.uri)
                  )
                );
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
              parsed.locationAt({
                start: item.start + match.index,
                end: item.start + match.index + length,
              }),
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