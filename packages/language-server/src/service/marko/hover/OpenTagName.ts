import type { MarkupContent } from "vscode-languageserver";

import type { Node } from "../../../utils/parser";
import { getDocFile } from "../../../utils/doc-file";
import getTagNameCompletion from "../util/get-tag-name-completion";
import { START_OF_FILE } from "../../../utils/utils";

import type { HoverMeta, HoverResult } from ".";

export function OpenTagName({
  document,
  lookup,
  parsed,
  node,
}: HoverMeta<Node.OpenTagName>): HoverResult {
  const importer = getDocFile(document);
  const tag = node.parent;
  const range = parsed.locationAt(node);
  const tagDef = tag.nameText && lookup.getTag(tag.nameText);

  if (tagDef) {
    const completion = getTagNameCompletion({
      tag: tagDef,
      range: START_OF_FILE,
      importer,
    });
    return {
      range,
      contents: completion.documentation as MarkupContent,
    };
  }
}
