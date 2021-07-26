import path from "path";
import { URI } from "vscode-uri";
import {
  CompletionItemKind,
  CompletionParams,
  CompletionItem,
  CompletionList,
  InsertTextFormat,
  MarkupKind,
  TextEdit,
} from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { ParserEvents } from "../../htmljs-parser";
import { TagLibLookup, TagDefinition } from "../../compiler";
import { rangeFromEvent, findNonControlFlowParent } from "../../utils";

export function openTagName(
  taglib: TagLibLookup,
  document: TextDocument,
  params: CompletionParams,
  event: ParserEvents.OpenTagName
) {
  const { fsPath: currentTemplateFilePath } = URI.parse(document.uri);
  let tags: TagDefinition[];
  const triggerCharacter =
    (params.context && params.context.triggerCharacter) || event.tagName[0];
  const isAttributeTag = triggerCharacter === "@";
  const tagNameRange = rangeFromEvent(document, event);

  if (isAttributeTag) {
    const parentTag = findNonControlFlowParent(event);
    const parentTagDef =
      parentTag &&
      !parentTag.tagNameExpression &&
      taglib.getTag(parentTag.tagName);
    tags =
      (parentTagDef &&
        parentTagDef.nestedTags &&
        Object.values(parentTagDef.nestedTags)) ||
      [];
  } else {
    tags = taglib.getTagsSorted().filter((it) => !it.isNestedTag);
  }

  return CompletionList.create(
    tags
      .filter((it) => !it.deprecated)
      .filter((it) => it.name !== "*")
      .filter(
        (it) => /^[^_]/.test(it.name) || !/\/node_modules\//.test(it.filePath)
      )
      .map((it) => {
        let label = it.isNestedTag ? `@${it.name}` : it.name;
        const fileForTag = it.template || it.renderer || it.filePath;
        const fileURIForTag = URI.file(fileForTag).toString();
        const nodeModuleMatch = /\/node_modules\/((?:\@[^/]+\/)?[^/]+)/.exec(
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
            tagNameRange,
            (autocomplete && autocomplete.snippet) || label
          ),
        } as CompletionItem;
      }),
    true
  );
}
