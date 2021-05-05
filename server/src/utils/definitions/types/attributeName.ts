import { URI } from "vscode-uri";
import {
  Range,
  LocationLink,
  TextDocumentPositionParams,
} from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { TagLibLookup } from "../../compiler";
import { ParserEvents } from "../../htmljs-parser";
import RegExpBuilder from "../../regexp-builder";
import { START_OF_FILE, createTextDocument, rangeFromEvent } from "../../utils";

export function attributeName(
  taglib: TagLibLookup,
  document: TextDocument,
  params: TextDocumentPositionParams,
  event: ParserEvents.AttributeName
) {
  const tagName = event.tag.tagNameExpression ? undefined : event.tag.tagName;
  const tagDef = tagName && taglib.getTag(tagName);
  const attrDef = taglib.getAttribute(tagName || "*", event.name);
  let range = START_OF_FILE;

  if (!attrDef) {
    return;
  }

  const attrEntryFile = attrDef.filePath || (tagDef && tagDef.filePath);

  if (!attrEntryFile) {
    return;
  }

  if (/\/marko(?:-tag)?\.json$/.test(attrEntryFile)) {
    const tagDefDoc = createTextDocument(attrEntryFile);
    const match = RegExpBuilder`/"@${event.name}"\s*:\s*[^\r\n,]+/g`.exec(
      tagDefDoc.getText()
    );

    if (match && match.index) {
      range = Range.create(
        tagDefDoc.positionAt(match.index),
        tagDefDoc.positionAt(match.index + match[0].length)
      );
    }
  }

  return LocationLink.create(
    URI.file(attrEntryFile).toString(),
    range,
    range,
    rangeFromEvent(document, event)
  );
}
