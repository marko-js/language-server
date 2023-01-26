import type { MarkupContent } from "vscode-languageserver";
import type { Node } from "@marko/language-tools";

import getTagNameCompletion from "../util/get-tag-name-completion";
import { START_LOCATION } from "../../../utils/constants";

import type { HoverMeta, HoverResult } from ".";

export function OpenTagName({
  node,
  file: {
    parsed,
    filename,
    project: { lookup },
  },
}: HoverMeta<Node.OpenTagName>): HoverResult {
  const tag = node.parent;
  const range = parsed.locationAt(node);
  const tagDef = tag.nameText && lookup.getTag(tag.nameText);

  if (tagDef) {
    const completion = getTagNameCompletion({
      tag: tagDef,
      range: START_LOCATION,
      importer: filename,
    });
    return {
      range,
      contents: completion.documentation as MarkupContent,
    };
  }
}
