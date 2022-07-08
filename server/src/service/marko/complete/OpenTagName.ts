import path from "path";
import { URI } from "vscode-uri";
import {
  CompletionItemKind,
  CompletionItem,
  InsertTextFormat,
  MarkupKind,
  TextEdit,
} from "vscode-languageserver";
import type { TagDefinition } from "@marko/babel-utils";
import { type Node, NodeType } from "../../../utils/parser";
import { getDocFile } from "../../../utils/doc-file";
import type { CompletionMeta, CompletionResult } from ".";

export function OpenTagName({
  document,
  lookup,
  parsed,
  node,
}: CompletionMeta<Node.OpenTagName>): CompletionResult {
  if (!lookup) return;

  const currentTemplateFilePath = getDocFile(document);
  const tag = node.parent;
  const tagNameLocation = parsed.locationAt(node);
  let tags: TagDefinition[];

  if (tag.type === NodeType.AttrTag) {
    let parentTag = tag.owner;
    while (parentTag?.type === NodeType.AttrTag) parentTag = parentTag.owner;
    const parentTagDef =
      parentTag && parentTag.nameText && lookup.getTag(parentTag.nameText);
    tags =
      (parentTagDef &&
        parentTagDef.nestedTags &&
        Object.values(parentTagDef.nestedTags)) ||
      [];
  } else {
    tags = lookup.getTagsSorted().filter((it) => !it.isNestedTag);
  }

  return tags
    .filter((it) => !it.deprecated)
    .filter((it) => it.name !== "*")
    .filter(
      (it) => /^[^_]/.test(it.name) || !/\/node_modules\//.test(it.filePath)
    )
    .map((it) => {
      let label = it.isNestedTag ? `@${it.name}` : it.name;
      const fileForTag = it.template || it.renderer || it.filePath;
      const fileURIForTag = URI.file(fileForTag).toString();
      const nodeModuleMatch = /\/node_modules\/((?:@[^/]+\/)?[^/]+)/.exec(
        fileForTag
      );

      const nodeModuleName = nodeModuleMatch && nodeModuleMatch[1];
      const isCoreTag = nodeModuleName === "marko";

      const documentation = {
        kind: MarkupKind.Markdown,
        value: it.html
          ? `Built in [<${it.name}>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/${it.name}) HTML tag.`
          : nodeModuleName
          ? isCoreTag
            ? `Core Marko [<${it.name}>](${fileURIForTag}) tag.`
            : `Custom Marko tag discovered from the ["${nodeModuleName}"](${fileURIForTag}) npm package.`
          : `Custom Marko tag discovered from:\n\n[${path.relative(
              currentTemplateFilePath,
              fileForTag
            )}](${fileURIForTag})`,
      };

      if (it.description) {
        documentation.value += `\n\n${it.description}`;
      }

      const autocomplete = it.autocomplete && it.autocomplete[0];

      if (autocomplete) {
        if (autocomplete.displayText) {
          label = autocomplete.displayText;
        }

        if (autocomplete.description) {
          documentation.value += `\n\n${autocomplete.description}`;
        }

        if (autocomplete.descriptionMoreURL) {
          documentation.value += `\n\n[More Info](${autocomplete.descriptionMoreURL})`;
        }
      }

      return {
        label,
        documentation,
        kind: CompletionItemKind.Class,
        insertTextFormat: InsertTextFormat.Snippet,
        textEdit: TextEdit.replace(
          tagNameLocation,
          (autocomplete && autocomplete.snippet) || label
        ),
      } as CompletionItem;
    });
}
