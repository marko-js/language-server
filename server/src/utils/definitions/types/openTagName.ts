import path from "path";
import { URI } from "vscode-uri";
import {
  type TextDocumentPositionParams,
  Range,
  LocationLink,
} from "vscode-languageserver";
import type { TextDocument } from "vscode-languageserver-textdocument";
import type { ParserEvents } from "../../htmljs-parser";
import type { TaglibLookup, TagDefinition } from "../../compiler";
import RegExpBuilder from "../../regexp-builder";
import {
  START_OF_FILE,
  findNonControlFlowParent,
  createTextDocument,
  rangeFromEvent,
} from "../../utils";

export function openTagName(
  taglib: TaglibLookup,
  document: TextDocument,
  _params: TextDocumentPositionParams,
  event: ParserEvents.OpenTagName
) {
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
    return [];
  }

  const tagEntryFile = tagDef.template || tagDef.renderer || tagDef.filePath;

  if (!path.isAbsolute(tagEntryFile)) {
    return [];
  }

  if (/\/marko(?:-tag)?\.json$/.test(tagEntryFile)) {
    const tagDefDoc = createTextDocument(tagEntryFile);
    const match =
      RegExpBuilder`/"(?:<${event.tagName}>|${event.tagName})"\s*:\s*[^\r\n,]+/g`.exec(
        tagDefDoc.getText()
      );

    if (match && match.index) {
      range = Range.create(
        tagDefDoc.positionAt(match.index),
        tagDefDoc.positionAt(match.index + match[0].length)
      );
    }
  }

  return [
    LocationLink.create(
      URI.file(tagEntryFile).toString(),
      range,
      range,
      rangeFromEvent(document, event)
    ),
  ];
}
