import { URI } from "vscode-uri";
import {
  Range,
  Location,
  TextDocument,
  TextDocumentPositionParams
} from "vscode-languageserver";
import escapeRegexp from "escape-string-regexp";
import { ParserEvents } from "../../htmljs-parser";
import { TagLibLookup, TagDefinition } from "../../compiler";
import {
  START_OF_FILE,
  findNonControlFlowParent,
  createTextDocument
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

  return Location.create(URI.file(tagEntryFile).toString(), range);
}
