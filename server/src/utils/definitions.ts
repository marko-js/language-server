import fs from "fs";
import { URI } from "vscode-uri";
import {
  Definition,
  TextDocument,
  TextDocumentPositionParams,
  Position,
  Range
} from "vscode-languageserver";
import escapeRegexp from "escape-string-regexp";

import { ParserEvents } from "./htmljs-parser";
import { TagLibLookup, TagDefinition } from "./compiler";

const START_OF_FILE = Range.create(
  Position.create(0, 0),
  Position.create(0, 0)
);

export default function getDefinition(
  taglib: TagLibLookup,
  document: TextDocument,
  params: TextDocumentPositionParams,
  event: ParserEvents.Any | null
): Definition {
  if (event) {
    switch (event.type) {
      case "openTagName": {
        let tagDef: TagDefinition | null | undefined;
        let range = START_OF_FILE;
        const isAttributeTag = event.tagName[0] === "@";

        if (isAttributeTag) {
          const parentTag = findNonControlFlowParent(event);
          tagDef =
            parentTag &&
            (parentTag.tagNameExpression
              ? undefined
              : taglib.getTag(parentTag.tagName));
        } else {
          tagDef = taglib.getTag(event.tagName);
        }

        if (!tagDef) {
          break;
        }

        const tagEntryFile =
          tagDef.template || tagDef.renderer || tagDef.filePath;

        if (/\/marko(?:-tag)?\.json$/.test(tagEntryFile)) {
          const tagDefDoc = createTextDocument(tagEntryFile);
          const match = new RegExp(`"<${escapeRegexp(event.tagName)}>"`).exec(
            tagDefDoc.getText()
          );

          if (match && match.index) {
            range = Range.create(
              tagDefDoc.positionAt(match.index),
              tagDefDoc.positionAt(match.index + match[0].length)
            );
          }
        }

        return {
          uri: URI.file(tagEntryFile).toString(),
          range
        };
      }

      case "attributeName": {
        const tagName = event.tag.tagNameExpression ? "*" : event.tag.tagName;
        const attrDef = taglib.getAttribute(tagName, event.name);

        if (!attrDef) {
          break;
        }

        const attrEntryFile = attrDef.filePath;
        let range = START_OF_FILE;

        if (/\/marko(?:-tag)?\.json$/.test(attrEntryFile)) {
          const tagDefDoc = createTextDocument(attrEntryFile);
          const match = new RegExp(`"@${escapeRegexp(event.name)}"`).exec(
            tagDefDoc.getText()
          );

          if (match && match.index) {
            range = Range.create(
              tagDefDoc.positionAt(match.index),
              tagDefDoc.positionAt(match.index + match[0].length)
            );
          }
        }

        return {
          uri: URI.file(attrDef.filePath).toString(),
          range
        };
      }
    }
  }

  return [];
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

function createTextDocument(filename: string): TextDocument {
  const uri = URI.file(filename).toString();
  const content = fs.readFileSync(filename, "utf-8");
  return TextDocument.create(uri, "plaintext", 0, content);
}
