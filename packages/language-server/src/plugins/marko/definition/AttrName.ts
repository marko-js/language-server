import { getLines, getLocation, type Node } from "@marko/language-tools";
import { LocationLink } from "@volar/language-service";
import fs from "fs";
import { URI } from "vscode-uri";

import { MarkoVirtualCode } from "../../../language";
import { START_LOCATION } from "../../../utils/constants";
import RegExpBuilder from "../../../utils/regexp-builder";

export function AttrName(
  node: Node.AttrName,
  file: MarkoVirtualCode,
): LocationLink[] | undefined {
  const tagName = node.parent.parent.nameText;
  const attrName = file.markoAst.read(node);
  const tagDef = tagName ? file.tagLookup.getTag(tagName) : undefined;
  const attrDef = file.tagLookup.getAttribute(tagName || "", attrName);
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
        originSelectionRange: file.markoAst.locationAt(node),
      },
    ];
  }
}
