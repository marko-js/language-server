import type { TagDefinition } from "@marko/compiler/babel-utils";
import path from "path";
import {
  type CompletionItem,
  CompletionItemKind,
  MarkupKind,
  type Range,
  TextEdit,
} from "vscode-languageserver";
import { URI } from "vscode-uri";

import { isHTML } from "./is-html";

export default function getTagNameCompletion({
  tag,
  range,
  importer,
}: {
  tag: TagDefinition;
  range?: Range;
  importer?: string;
}): CompletionItem {
  const label = tag.isNestedTag ? `@${tag.name}` : tag.name;
  const fileForTag = tag.template || tag.renderer || tag.filePath;
  const fileURIForTag = URI.file(fileForTag).toString();
  const nodeModuleMatch =
    /[\\/]node_modules[\\/]((?:@[^\\/]+[\\/])?[^\\/]+)/.exec(fileForTag);

  const nodeModuleName =
    nodeModuleMatch && nodeModuleMatch[1].replace(/\\/g, "/");
  const isCoreTag =
    /^@?marko[/-]/.test(tag.taglibId || tag.filePath) ||
    nodeModuleName === "marko";
  const html = isHTML(tag);
  const documentation = {
    kind: MarkupKind.Markdown,
    value: html
      ? `Built in [&lt;${tag.name}&gt;](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/${tag.name}) HTML tag.`
      : isCoreTag
        ? `Core Marko &lt;${tag.name}&gt; tag.`
        : nodeModuleName
          ? `Custom Marko tag discovered from the ["${nodeModuleName}"](${fileURIForTag}) npm package.`
          : `Custom Marko tag discovered from:\n\n[${
              importer
                ? path.relative(path.dirname(importer), fileForTag)
                : fileForTag
            }](${fileURIForTag})`,
  };

  return {
    label,
    documentation,
    kind: html ? CompletionItemKind.Property : CompletionItemKind.Class,
    textEdit: range && TextEdit.replace(range, label),
  };
}
