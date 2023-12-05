import fs from "fs";
import { URI } from "vscode-uri";
import { type Node, getLines, getLocation } from "@marko/language-tools";

import RegExpBuilder from "../../../utils/regexp-builder";
import { START_LOCATION } from "../../../utils/constants";

import type { DefinitionMeta, DefinitionResult } from ".";

export function AttrName({
  node,
  file: { parsed, lookup },
}: DefinitionMeta<Node.AttrName>): DefinitionResult {
  const tagName = node.parent.parent.nameText;
  const attrName = parsed.read(node);
  const tagDef = tagName ? lookup.getTag(tagName) : undefined;
  const attrDef = lookup.getAttribute(tagName || "", attrName);
  let range = START_LOCATION;

  if (!attrDef) {
    return;
  }

  const attrEntryFile = attrDef.filePath || tagDef?.filePath;
  if (!attrEntryFile) {
    return;
  }

  if (/\.json$/.test(attrEntryFile)) {
    const tagDefSource = fs.readFileSync(attrEntryFile, "utf-8");
    const match = RegExpBuilder`/"@${attrName}"\s*:\s*[^\r\n,]+/g`.exec(
      tagDefSource,
    );

    if (match && match.index) {
      range = getLocation(
        getLines(tagDefSource),
        match.index,
        match.index + match[0].length,
      );
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
}
