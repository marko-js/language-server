import fs from "fs";
import { URI } from "vscode-uri";

import RegExpBuilder from "../../../utils/regexp-builder";
import { START_OF_FILE } from "../../../utils/utils";
import { type Node, getLines, getLocation } from "../../../utils/parser";

import type { DefinitionMeta, DefinitionResult } from ".";

export function AttrName({
  lookup,
  parsed,
  node,
}: DefinitionMeta<Node.AttrName>): DefinitionResult {
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
    const tagDefSource = fs.readFileSync(attrEntryFile, "utf-8");
    const match = RegExpBuilder`/"@${attrName}"\s*:\s*[^\r\n,]+/g`.exec(
      tagDefSource
    );

    if (match && match.index) {
      range = getLocation(
        getLines(tagDefSource),
        match.index,
        match.index + match[0].length
      );
    }
  }

  return [
    {
      targetUri: URI.file(attrEntryFile).toString(),
      targetRange: range,
      targetSelectionRange: range,
      originSelectionRange: parsed.locationAt(node),
    },
  ];
}
