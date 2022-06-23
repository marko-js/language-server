import { URI } from "vscode-uri";
import { Range, LocationLink } from "vscode-languageserver";
import RegExpBuilder from "../../regexp-builder";
import { START_OF_FILE, createTextDocument } from "../../utils";
import type { DefinitionMeta } from "../meta";
import type { Node } from "../../parser";

export function AttrName({
  lookup,
  parsed,
  node,
}: DefinitionMeta<Node.AttrName>) {
  const tagName = node.parent.parent.nameText;
  const attrName = parsed.read(node);
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
