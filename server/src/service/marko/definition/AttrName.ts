import { URI } from "vscode-uri";
import { Range, LocationLink } from "vscode-languageserver";
import RegExpBuilder from "../../../utils/regexp-builder";
import { START_OF_FILE, createTextDocument } from "../../../utils/utils";
import type { Node } from "../../../utils/parser";
import type { DefinitionMeta, DefinitionResult } from ".";

export function AttrName({
  lookup,
  parsed,
  node,
}: DefinitionMeta<Node.AttrName>): DefinitionResult {
  if (!lookup) return;

  const tagName = node.parent.parent.nameText;
  const attrName = parsed.read(node);
  if (attrName[0] === "{") return; // Ignore tag blocks.

  const tagDef = tagName && lookup.getTag(tagName);
  const attrDef = lookup.getAttribute(tagName || "", attrName);
  let range = START_OF_FILE;

  if (!attrDef) {
    return;
  }

  const attrEntryFile = attrDef.filePath || (tagDef && tagDef.filePath);

  if (!attrEntryFile) {
    return;
  }

  if (/\/marko(?:-tag)?\.json$/.test(attrEntryFile)) {
    const tagDefDoc = createTextDocument(attrEntryFile);
    const match = RegExpBuilder`/"@${attrName}"\s*:\s*[^\r\n,]+/g`.exec(
      tagDefDoc.getText()
    );

    if (match && match.index) {
      range = Range.create(
        tagDefDoc.positionAt(match.index),
        tagDefDoc.positionAt(match.index + match[0].length)
      );
    }
  }

  return [
    LocationLink.create(
      URI.file(attrEntryFile).toString(),
      range,
      range,
      parsed.locationAt(node)
    ),
  ];
}
