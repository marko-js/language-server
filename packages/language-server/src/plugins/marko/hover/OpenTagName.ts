import type { Node } from "@marko/language-tools";
import { Hover } from "vscode-languageserver";

import { MarkoVirtualCode } from "../../../language";
import { START_LOCATION } from "../../../utils/constants";
import getTagNameCompletion from "../util/get-tag-name-completion";

export function OpenTagName(
  node: Node.OpenTagName,
  file: MarkoVirtualCode,
): Hover | undefined {
  const tag = node.parent;
  const range = file.markoAst.locationAt(node);
  const tagDef = tag.nameText && file.tagLookup.getTag(tag.nameText);

  if (tagDef) {
    const completion = getTagNameCompletion({
      tag: tagDef,
      range: START_LOCATION,
      importer: file.fileName,
    });

    if (completion.documentation) {
      return {
        range,
        contents: completion.documentation,
      };
    }
  }
}
