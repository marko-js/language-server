import path from "path";
import { URI } from "vscode-uri";
import { Range, LocationLink } from "vscode-languageserver";
import type { TagDefinition } from "../../compiler";
import RegExpBuilder from "../../regexp-builder";
import { START_OF_FILE, createTextDocument } from "../../utils";
import type { DefinitionMeta } from "../meta";
import { Node, NodeType } from "../../parser";

export function OpenTagName({
  lookup,
  parsed,
  node,
}: DefinitionMeta<Node.OpenTagName>) {
  const tag = node.parent;
  let tagDef: TagDefinition | null | undefined;
  let range = START_OF_FILE;

  if (tag.type === NodeType.AttrTag) {
    let parentTag = tag.owner;
    while (parentTag?.type === NodeType.AttrTag) parentTag = parentTag.owner;
    tagDef =
      parentTag && parentTag.nameText
        ? lookup.getTag(parentTag.nameText)
        : undefined;
  } else {
    tagDef = tag.nameText ? lookup.getTag(tag.nameText) : undefined;
  }

  if (!tagDef) {
    return;
  }

  const tagEntryFile = tagDef.template || tagDef.renderer || tagDef.filePath;

  if (!path.isAbsolute(tagEntryFile)) {
    return;
  }

  if (/\/marko(?:-tag)?\.json$/.test(tagEntryFile)) {
    const tagDefDoc = createTextDocument(tagEntryFile);
    const match =
      RegExpBuilder`/"(?:<${tag.nameText}>|${tag.nameText})"\s*:\s*[^\r\n,]+/g`.exec(
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
      URI.file(tagEntryFile).toString(),
      range,
      range,
      parsed.locationAt(node)
    ),
  ];
}
