import path from "path";
import { URI } from "vscode-uri";
import {
  CompletionItemKind,
  CompletionParams,
  CompletionItem,
  CompletionList,
  InsertTextFormat,
  TextDocument,
  MarkupKind,
  TextEdit
} from "vscode-languageserver";
import { ParserEvents } from "../../htmljs-parser";
import { TagLibLookup, TagDefinition } from "../../compiler";
import { rangeFromEvent, findNonControlFlowParent } from "../../utils";

export function openTagName(
  taglib: TagLibLookup,
  document: TextDocument,
  params: CompletionParams,
  event: ParserEvents.OpenTagName
) {
  const currentTemplateFilePath = URI.parse(document.uri).path;
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
    tags = taglib.getTagsSorted().filter(it => !it.isNestedTag);
  }

  return CompletionList.create(
    tags
      // .filter(it => !it.deprecated)
      .filter(it => it.name !== "*")
      .filter(
        it => /^[^_]/.test(it.name) || !/\/node_modules\//.test(it.filePath)
      )
      .map(it => {
        const label = it.isNestedTag ? `@${it.name}` : it.name;
        const fileForTag = it.template || it.renderer || it.filePath;
        const fileURIForTag = URI.file(fileForTag).toString();
        const relativeFileForTag = path.relative(
          fileForTag,
          currentTemplateFilePath
        );
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
            : `Custom Marko tag discovered from:\n\n[${relativeFileForTag}](${fileURIForTag})`
        };

        const autocomplete = it.autocomplete && it.autocomplete[0];
        const moreInfo = autocomplete && autocomplete.descriptionMoreURL;
        if (moreInfo) {
          documentation.value += `\n\n[More Info](${moreInfo})`;
        }

        return {
          label,
          documentation,
          kind: CompletionItemKind.Class,
          insertTextFormat: InsertTextFormat.Snippet,
          textEdit: TextEdit.replace(
            tagNameRange,
            (autocomplete && autocomplete.snippet) || label
          )
        } as CompletionItem;
      })
  );
}