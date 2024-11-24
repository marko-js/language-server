import type { Node } from "@marko/language-tools";

import { START_LOCATION } from "../../../utils/constants";
import getTagNameCompletion from "../util/get-tag-name-completion";
import type { HoverMeta, HoverResult } from ".";

export function OpenTagName({
  node,
  file: { parsed, filename, lookup },
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

    if (completion.documentation) {
      return {
        range,
        contents: completion.documentation,
      };
    }
  }
}
