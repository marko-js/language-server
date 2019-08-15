import path from "path";
import { URI } from "vscode-uri";
import {
  CompletionList,
  CompletionParams,
  CompletionItemKind,
  InsertTextFormat,
  MarkupKind,
  TextDocument,
  TextEdit,
  Range
} from "vscode-languageserver";

import { ParserEvents } from "./htmljs-parser";
import { TagLibLookup, TagDefinition } from "./compiler";

export default function getCompletion(
  taglib: TagLibLookup,
  document: TextDocument,
  params: CompletionParams,
  event: ParserEvents.Any | null
): CompletionList {
  if (event) {
    const doc = params.textDocument;
    const filePath = URI.parse(doc.uri).path;

    switch (event.type) {
      case "openTagName": {
        let tags: TagDefinition[];
        const triggerCharacter =
          (params.context && params.context.triggerCharacter) ||
          event.tagName[0];
        const isAttributeTag = triggerCharacter === "@";
        const completionRange = Range.create(
          document.positionAt(event.pos + 1),
          document.positionAt(event.endPos - 1)
        );

        if (isAttributeTag) {
          const parentTag = findNonControlFlowParent(event);
          const parentTagDef = parentTag && taglib.getTag(parentTag.tagName);
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
            .filter(it => !it.deprecated)
            .filter(it => it.name !== "*")
            .filter(
              it =>
                /^[^_]/.test(it.name) || !/\/node_modules\//.test(it.filePath)
            )
            .map(it => {
              const fileForTag = it.template || it.renderer || it.filePath;
              const relativeFileForTag = path.relative(fileForTag, filePath);
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
                    ? `Core Marko [<${it.name}>](file://${fileForTag}) tag.`
                    : `Custom Marko tag discovered from the ["${nodeModuleName}"](file://${fileForTag}) npm package.`
                  : `Custom Marko tag discovered from:\n\n[${relativeFileForTag}](file://${fileForTag})`
              };

              const autocomplete = it.autocomplete && it.autocomplete[0];
              const moreInfo = autocomplete && autocomplete.descriptionMoreURL;
              if (moreInfo) {
                documentation.value += `\n\n[More Info](${moreInfo})`;
              }

              return {
                documentation,
                range: completionRange,
                kind: CompletionItemKind.Class,
                insertTextFormat: InsertTextFormat.Snippet,
                label: it.isNestedTag ? `@${it.name}` : it.name,
                textEdit: TextEdit.replace(
                  completionRange,
                  autocomplete ? autocomplete.snippet : it.name
                )
              };
            })
        );
      }

      case "openTag": {
        if (event.openTagOnly) {
          break;
        }

        const closingTagStr = `</${event.tagName}>`;
        return CompletionList.create([
          {
            label: closingTagStr,
            kind: CompletionItemKind.Class,
            insertTextFormat: InsertTextFormat.Snippet,
            insertText: `\n\t$0\n${closingTagStr}`
          }
        ]);
      }

      case "closeTag": {
        const nextChar = document.getText()[document.offsetAt(params.position)]; // this would be the next char because we insert a closing bracket for the parser.
        const closingTagStr = event.tagName + (nextChar === ">" ? "" : ">");

        return CompletionList.create([
          {
            label: closingTagStr,
            kind: CompletionItemKind.Class,
            insertTextFormat: InsertTextFormat.Snippet,
            insertText: closingTagStr
          }
        ]);
      }
    }
  }

  return CompletionList.create();
}

function findNonControlFlowParent(tag: ParserEvents.OpenTagName) {
  let parent = tag.parent;

  while (parent) {
    if (!/^(?:else-)?if|else|for|while$/.test(parent.tagName)) {
      return parent;
    }

    parent = parent.parent;
  }

  return null;
}
