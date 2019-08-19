import path from "path";
import { URI } from "vscode-uri";
import {
  CompletionList,
  CompletionItem,
  CompletionParams,
  CompletionItemKind,
  InsertTextFormat,
  MarkupKind,
  MarkupContent,
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
    const filePath = URI.parse(document.uri).path;

    switch (event.type) {
      case "openTagName": {
        let tags: TagDefinition[];
        const triggerCharacter =
          (params.context && params.context.triggerCharacter) ||
          event.tagName[0];
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
            .filter(it => !it.deprecated)
            .filter(it => it.name !== "*")
            .filter(
              it =>
                /^[^_]/.test(it.name) || !/\/node_modules\//.test(it.filePath)
            )
            .map(it => {
              const label = it.isNestedTag ? `@${it.name}` : it.name;
              const fileForTag = it.template || it.renderer || it.filePath;
              const fileURIForTag = URI.file(fileForTag).toString();
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

      case "attributeName": {
        const attrNameRange = rangeFromEvent(document, event);

        const defaultTagDef = taglib.getTag("*");
        const tagDef =
          !event.tag.tagNameExpression && taglib.getTag(event.tag.tagName);
        const allAttributes = Object.assign({}, defaultTagDef.attributes);
        const patternAttributes = defaultTagDef.patternAttributes || [];

        if (tagDef) {
          Object.assign(allAttributes, tagDef.attributes);

          // Add user defined pattern attributes.
          if (tagDef.patternAttributes) {
            patternAttributes.push(...tagDef.patternAttributes);
          }

          // Add attributes from listed groups.
          if (tagDef.attributeGroups) {
            tagDef.attributeGroups.forEach(group =>
              Object.assign(
                allAttributes,
                (taglib as any).merged.attributeGroups[group]
              )
            );
          }

          // Ignore nested tag attributes.
          if (tagDef.nestedTags) {
            Object.values(tagDef.nestedTags).forEach(def => {
              delete allAttributes[def.targetProperty];
            });
          }
        }

        // TODO: improve pattern attributes matching.
        patternAttributes.forEach(attr => {
          const name = attr.pattern!.test(event.name)
            ? event.name
            : attr.name.slice(0, attr.name.indexOf("*"));
          allAttributes[name] = attr;
        });

        delete allAttributes["*"];

        return CompletionList.create(
          Object.entries(allAttributes)
            .filter(([, def]) => !def.deprecated)
            .filter(
              ([name, def]) =>
                /^[^_]/.test(name) || !/\/node_modules\//.test(def.filePath)
            )
            .map(([name, def]) => {
              const type = def.type || (def.html ? "string" : null);
              let label = name;
              let snippet = name;
              let documentation: MarkupContent | undefined;

              if (def.enum) {
                snippet += `="\${1|${def.enum.join()}|}"$0`;
              } else {
                switch (type) {
                  case "string":
                    snippet += '="$1"$0';
                    break;
                  case "function":
                    snippet += "=($1)$0";
                    break;
                  case "statement":
                  case "boolean":
                  case "flag":
                    break;
                  default:
                    snippet += "=";
                    break;
                }
              }

              const autocomplete = def.autocomplete && def.autocomplete[0];

              if (autocomplete) {
                label = autocomplete.displayText || label;
                snippet = autocomplete.snippet || snippet;

                if (autocomplete.descriptionMoreURL) {
                  documentation = {
                    kind: MarkupKind.Markdown,
                    value: `[More Info](${autocomplete.descriptionMoreURL})`
                  };
                }
              }

              return {
                label,
                documentation,
                detail: def.description,
                kind: CompletionItemKind.Property,
                insertTextFormat: InsertTextFormat.Snippet,
                textEdit: TextEdit.replace(attrNameRange, snippet)
              } as CompletionItem;
            })
        );
      }

      case "attributeModifier": {
        return CompletionList.create([
          {
            label: "scoped",
            kind: CompletionItemKind.Keyword,
            detail: "Use to prefix with a unique ID"
          },
          {
            label: "no-update",
            kind: CompletionItemKind.Keyword,
            detail: "Use to skip future updates to this attribute"
          }
        ]);
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
        const closingTagStr = `</${event.tagName}>`;

        return CompletionList.create([
          {
            label: closingTagStr,
            kind: CompletionItemKind.Class,
            insertTextFormat: InsertTextFormat.Snippet,
            textEdit: TextEdit.replace(
              rangeFromEvent(document, event),
              closingTagStr
            )
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

function rangeFromEvent(document: TextDocument, event: ParserEvents.Any) {
  return Range.create(
    document.positionAt(event.pos),
    document.positionAt(event.endPos)
  );
}
