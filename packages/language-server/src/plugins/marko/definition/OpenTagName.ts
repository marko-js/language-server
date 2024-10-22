import fs from "fs";
import path from "path";
import { URI } from "vscode-uri";
import type { TagDefinition } from "@marko/babel-utils";
import {
  type Node,
  NodeType,
  getLines,
  getLocation,
} from "@marko/language-tools";
import { LocationLink } from "@volar/language-service";
import RegExpBuilder from "../../../utils/regexp-builder";
import { START_LOCATION } from "../../../utils/constants";
import { MarkoVirtualCode } from "../../../language";

export function OpenTagName(
  node: Node.OpenTagName,
  file: MarkoVirtualCode,
): LocationLink[] | undefined {
  const tag = node.parent;
  let tagDef: TagDefinition | null | undefined;
  let range = START_LOCATION;

  if (tag.type === NodeType.AttrTag) {
    let parentTag = tag.owner;
    while (parentTag?.type === NodeType.AttrTag) parentTag = parentTag.owner;
    tagDef =
      parentTag && parentTag.nameText
        ? file.tagLookup.getTag(parentTag.nameText)
        : undefined;
  } else {
    tagDef = tag.nameText ? file.tagLookup.getTag(tag.nameText) : undefined;
  }

  if (!tagDef) {
    return;
  }

  const tagEntryFile = tagDef.template || tagDef.renderer || tagDef.filePath;

  if (!path.isAbsolute(tagEntryFile)) {
    return;
  }

  if (/\/marko(?:-tag)?\.json$/.test(tagEntryFile)) {
    const tagDefSource = fs.readFileSync(tagEntryFile, "utf-8");
    const match =
      RegExpBuilder`/"(?:<${tag.nameText}>|${tag.nameText})"\s*:\s*[^\r\n,]+/g`.exec(
        tagDefSource,
      );

    if (match && match.index) {
      range = getLocation(
        getLines(tagDefSource),
        match.index,
        match.index + match[0].length,
      );
    }
  }

  return [
    {
      targetUri: URI.file(tagEntryFile).toString(),
      targetRange: range,
      targetSelectionRange: range,
      originSelectionRange: file.markoAst.locationAt(node),
    },
  ];
}
