import type { CompletionItem } from "vscode-languageserver";

import { type Node, NodeType } from "../../../utils/parser";
import { getDocFile } from "../../../utils/doc";
import getTagNameCompletion from "../util/get-tag-name-completion";

import type { CompletionMeta, CompletionResult } from ".";

export function OpenTagName({
  document,
  lookup,
  parsed,
  node,
}: CompletionMeta<Node.OpenTagName>): CompletionResult {
  const importer = getDocFile(document);
  const tag = node.parent;
  const range = parsed.locationAt(node);
  const isAttrTag = tag.type === NodeType.AttrTag;
  const result: CompletionItem[] = [];

  if (isAttrTag) {
    let parentTag = tag.owner;
    while (parentTag?.type === NodeType.AttrTag) parentTag = parentTag.owner;
    const parentTagDef =
      parentTag && parentTag.nameText && lookup.getTag(parentTag.nameText);

    if (parentTagDef) {
      const { nestedTags } = parentTagDef;
      for (const key in nestedTags) {
        if (key !== "*") {
          const tag = nestedTags[key];
          result.push(
            getTagNameCompletion({
              tag,
              range,
              importer,
              showAutoComplete: true,
            })
          );
        }
      }
    }
  } else {
    const skipStatements = !(
      tag.concise && tag.parent.type === NodeType.Program
    );
    for (const tag of lookup.getTagsSorted()) {
      if (
        !(
          tag.name === "*" ||
          tag.isNestedTag ||
          (skipStatements && tag.parseOptions?.statement) ||
          (tag.name[0] === "_" &&
            /^@?marko[/-]|[\\/]node_modules[\\/]/.test(tag.filePath))
        )
      ) {
        const completion = getTagNameCompletion({
          tag,
          range,
          importer,
          showAutoComplete: true,
        });
        completion.sortText = `0${completion.label}`; // Ensure higher priority than typescript.
        result.push(completion);
      }
    }
  }

  return result;
}
