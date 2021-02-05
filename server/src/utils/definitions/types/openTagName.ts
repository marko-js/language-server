import { URI } from "vscode-uri";
import {
  Range,
  LocationLink,
  TextDocumentPositionParams,
} from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import escapeRegexp from "escape-string-regexp";
import { ParserEvents } from "../../htmljs-parser";
import { TagLibLookup, TagDefinition } from "../../compiler";
import {
  START_OF_FILE,
  findNonControlFlowParent,
  createTextDocument,
  rangeFromEvent,
} from "../../utils";

export function openTagName(
  taglib: TagLibLookup,
  document: TextDocument,
  params: TextDocumentPositionParams,
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
    return;
  }

  const tagEntryFile = tagDef.template || tagDef.renderer || tagDef.filePath;

  if (/\/marko(?:-tag)?\.json$/.test(tagEntryFile)) {
    const tagDefDoc = createTextDocument(tagEntryFile);
    const match = new RegExp(
      `"<${escapeRegexp(event.tagName)}>"\s*:\s*[^\r\n,]+`
    ).exec(tagDefDoc.getText());

    if (match && match.index) {
      range = Range.create(
        tagDefDoc.positionAt(match.index),
        tagDefDoc.positionAt(match.index + match[0].length)
      );
    }
  }

  return LocationLink.create(
    URI.file(tagEntryFile).toString(),
    range,
    range,
    rangeFromEvent(document, event)
  );
}
