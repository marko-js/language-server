import {
  type CompletionItem,
  CompletionItemKind,
  InsertTextFormat,
  type MarkupContent,
  MarkupKind,
  TextEdit,
} from "vscode-languageserver";

import type { Node } from "@marko/language-tools";

import type { CompletionMeta, CompletionResult } from ".";

export function AttrName({
  offset,
  node,
  file: { parsed, lookup },
}: CompletionMeta<Node.AttrName>): CompletionResult {
  let name = parsed.read(node);
  const modifierIndex = name.indexOf(":");
  const hasModifier = modifierIndex !== -1;

  if (hasModifier) {
    if (offset >= node.start + modifierIndex) {
      return [
        {
          label: "scoped",
          kind: CompletionItemKind.Keyword,
          detail: "Use to prefix with a unique ID",
        },
        {
          label: "no-update",
          kind: CompletionItemKind.Keyword,
          detail: "Use to skip future updates to this attribute",
        },
      ];
    } else {
      name = name.slice(0, modifierIndex);
    }
  }

  const completions: CompletionItem[] = [];
  const attrNameLoc = parsed.locationAt(
    hasModifier
      ? {
          start: node.start,
          end: node.start + name.length,
        }
      : node,
  );

  const tagName = node.parent.parent.nameText || "";
  const tagDef = tagName && lookup.getTag(tagName);
  const nestedTagAttrs: { [x: string]: boolean } = {};

  if (tagDef && tagDef.nestedTags) {
    for (const key in tagDef.nestedTags) {
      const nestedTagDef = tagDef.nestedTags[key];
      nestedTagAttrs[nestedTagDef.targetProperty] = true;
    }
  }

  lookup.forEachAttribute(tagName, (attr, parent) => {
    if (
      attr.deprecated ||
      nestedTagAttrs[attr.name] ||
      attr.name === "*" ||
      attr.type === "never" ||
      (attr.name[0] === "_" &&
        isExternalModule(attr.filePath || parent.filePath))
    ) {
      return;
    }

    const type = attr.type || (attr.html ? "string" : null);
    const documentation: MarkupContent = {
      kind: MarkupKind.Markdown,
      value: attr.description || "",
    };
    let label = attr.name;
    let snippet = attr.name;

    if (attr.enum) {
      // TODO: We should use the following, but vscode has a regression with multi choice snippets form the language server.
      // snippet += `="\${1|${attr.enum.join()}|}"$0`;
      snippet += `="$1"$0`;
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

    const autocomplete =
      attr.autocomplete && Array.isArray(attr.autocomplete)
        ? attr.autocomplete[0]
        : attr.autocomplete;

    if (autocomplete) {
      label = autocomplete.displayText || label;
      snippet = autocomplete.snippet || snippet;

      if (autocomplete.descriptionMoreURL) {
        if (documentation.value) {
          documentation.value += `\n\n`;
        }

        documentation.value += `[More Info](${autocomplete.descriptionMoreURL})`;
      }
    }

    if (!attr.required) {
      label += "?";
    }

    completions.push({
      label,
      documentation: documentation.value ? documentation : undefined,
      kind: CompletionItemKind.Property,
      insertTextFormat: InsertTextFormat.Snippet,
      textEdit: TextEdit.replace(attrNameLoc, snippet),
    });
  });

  return completions;
}

function isExternalModule(file: string) {
  return (
    /[/\\]node_modules[/\\]/.test(file) || !/^(?:[A-Za-z]:\\|[./\\])/.test(file)
  );
}
