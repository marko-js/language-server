import {
  type LanguageService,
  type LanguageServiceOptions,
  type Stylesheet,
  getCSSLanguageService,
  getLESSLanguageService,
  getSCSSLanguageService,
} from "vscode-css-languageservice";
import {
  ColorInformation,
  ColorPresentation,
  Diagnostic,
  DocumentHighlight,
  DocumentLink,
  InitializeParams,
  InsertReplaceEdit,
  Location,
  Range,
  SymbolInformation,
  TextDocumentEdit,
  TextEdit,
} from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { type Extracted, extractStyle } from "@marko/language-tools";
import { processDoc } from "../../utils/file";
import fileSystemProvider from "../../utils/file-system";
import resolveReference from "../../utils/resolve-url";
import type { Plugin } from "../types";

interface ProcessedStyle {
  parsed: Stylesheet;
  extracted: Extracted;
  virtualDoc: TextDocument;
  service: LanguageService;
}

const services: Record<
  string,
  (options: LanguageServiceOptions) => LanguageService
> = {
  ".css": getCSSLanguageService,
  ".less": getLESSLanguageService,
  ".scss": getSCSSLanguageService,
};
let clientCapabilities: InitializeParams["capabilities"] | undefined;

const StyleSheetService: Partial<Plugin> = {
  initialize(params) {
    clientCapabilities = params.capabilities;
  },
  async doComplete(doc, params) {
    const sourceOffset = doc.offsetAt(params.position);
    for (const style of processStyle(doc)) {
      // Find the first stylesheet data that contains the offset.
      const generatedPos = style.extracted.generatedPositionAt(sourceOffset);
      if (generatedPos === undefined) continue;

      const result = await style.service.doComplete2(
        style.virtualDoc,
        generatedPos,
        style.parsed,
        { resolveReference }
      );

      if (result.itemDefaults) {
        const { editRange } = result.itemDefaults;
        if (editRange) {
          if ("start" in editRange) {
            result.itemDefaults.editRange = getSourceRange(style, editRange);
          } else {
            editRange.insert = getSourceRange(style, editRange.insert)!;
            editRange.replace = getSourceRange(style, editRange.replace)!;
          }
        }
      }

      for (const item of result.items) {
        if (item.textEdit) {
          item.textEdit = getSourceInsertReplaceEdit(style, item.textEdit);
        }

        if (item.additionalTextEdits) {
          item.additionalTextEdits = getSourceEdits(
            style,
            item.additionalTextEdits
          );
        }
      }

      return result;
    }
  },
  findDefinition(doc, params) {
    const sourceOffset = doc.offsetAt(params.position);
    for (const style of processStyle(doc)) {
      // Find the first stylesheet data that contains the offset.
      const generatedPos = style.extracted.generatedPositionAt(sourceOffset);
      if (generatedPos === undefined) continue;

      const result = style.service.findDefinition(
        style.virtualDoc,
        generatedPos,
        style.parsed
      );

      if (result) {
        const sourceRange = getSourceRange(style, result.range);
        if (sourceRange) {
          return {
            range: sourceRange,
            uri: doc.uri,
          };
        }
      }

      break;
    }
  },
  findReferences(doc, params) {
    const sourceOffset = doc.offsetAt(params.position);
    for (const style of processStyle(doc)) {
      // Find the first stylesheet data that contains the offset.
      const generatedPos = style.extracted.generatedPositionAt(sourceOffset);
      if (generatedPos === undefined) continue;

      const result: Location[] = [];
      for (const location of style.service.findReferences(
        style.virtualDoc,
        generatedPos,
        style.parsed
      )) {
        const sourceRange = getSourceRange(style, location.range);
        if (sourceRange) {
          result.push({
            range: sourceRange,
            uri: location.uri,
          });
        }
      }

      return result.length ? result : undefined;
    }
  },
  findDocumentSymbols(doc) {
    const result: SymbolInformation[] = [];
    for (const extracted of processStyle(doc)) {
      for (const symbol of extracted.service.findDocumentSymbols(
        extracted.virtualDoc,
        extracted.parsed
      )) {
        if (symbol.location.uri === doc.uri) {
          const sourceRange = getSourceRange(extracted, symbol.location.range);
          if (sourceRange) {
            result.push({
              kind: symbol.kind,
              name: symbol.name,
              tags: symbol.tags,
              deprecated: symbol.deprecated,
              containerName: symbol.containerName,
              location: { uri: doc.uri, range: sourceRange },
            });
          }
        } else {
          result.push(symbol);
        }
      }
    }

    return result.length ? result : undefined;
  },
  async findDocumentLinks(doc) {
    const result: DocumentLink[] = [];
    for (const extracted of processStyle(doc)) {
      for (const link of await extracted.service.findDocumentLinks2(
        extracted.virtualDoc,
        extracted.parsed,
        { resolveReference }
      )) {
        const sourceRange = getSourceRange(extracted, link.range);
        if (sourceRange) {
          result.push({
            range: sourceRange,
            target: link.target,
            tooltip: link.tooltip,
            data: link.data,
          });
        }
      }
    }

    return result.length ? result : undefined;
  },
  findDocumentHighlights(doc, params) {
    const sourceOffset = doc.offsetAt(params.position);
    for (const style of processStyle(doc)) {
      // Find the first stylesheet data that contains the offset.
      const generatedPos = style.extracted.generatedPositionAt(sourceOffset);
      if (generatedPos === undefined) continue;

      const result: DocumentHighlight[] = [];
      for (const highlight of style.service.findDocumentHighlights(
        style.virtualDoc,
        generatedPos,
        style.parsed
      )) {
        const sourceRange = getSourceRange(style, highlight.range);
        if (sourceRange) {
          result.push({
            range: sourceRange,
            kind: highlight.kind,
          });
        }
      }

      return result.length ? result : undefined;
    }
  },
  findDocumentColors(doc) {
    const result: ColorInformation[] = [];
    for (const extracted of processStyle(doc)) {
      for (const colorInfo of extracted.service.findDocumentColors(
        extracted.virtualDoc,
        extracted.parsed
      )) {
        const sourceRange = getSourceRange(extracted, colorInfo.range);
        if (sourceRange) {
          result.push({
            range: sourceRange,
            color: colorInfo.color,
          });
        }
      }
    }

    return result.length ? result : undefined;
  },
  getColorPresentations(doc, params) {
    for (const extracted of processStyle(doc)) {
      const generatedRange = getGeneratedRange(doc, extracted, params.range);
      // Find the first stylesheet data that contains the offset.
      if (generatedRange === undefined) continue;

      const result: ColorPresentation[] = [];
      for (const colorPresentation of extracted.service.getColorPresentations(
        extracted.virtualDoc,
        extracted.parsed,
        params.color,
        generatedRange
      )) {
        const textEdit =
          colorPresentation.textEdit &&
          getSourceEdit(extracted, colorPresentation.textEdit);
        const additionalTextEdits =
          colorPresentation.additionalTextEdits &&
          getSourceEdits(extracted, colorPresentation.additionalTextEdits);

        if (textEdit || additionalTextEdits) {
          result.push({
            label: colorPresentation.label,
            textEdit,
            additionalTextEdits,
          });
        }
      }

      return result.length ? result : undefined;
    }
  },
  doHover(doc, params) {
    const sourceOffset = doc.offsetAt(params.position);
    for (const style of processStyle(doc)) {
      // Find the first stylesheet data that contains the offset.
      const generatedPos = style.extracted.generatedPositionAt(sourceOffset);
      if (generatedPos === undefined) continue;

      const result = style.service.doHover(
        style.virtualDoc,
        generatedPos,
        style.parsed
      );

      if (result) {
        if (result.range) {
          const sourceRange = getSourceRange(style, result.range);
          if (sourceRange) {
            return {
              range: sourceRange,
              contents: result.contents,
            };
          }
        } else {
          return result;
        }
      }
    }
  },
  async doRename(doc, params) {
    const sourceOffset = doc.offsetAt(params.position);
    for (const style of processStyle(doc)) {
      // Find the first stylesheet data that contains the offset.
      const generatedOffset = style.extracted.generatedOffsetAt(sourceOffset);
      if (generatedOffset === undefined) continue;

      const result = style.service.doRename(
        style.virtualDoc,
        style.virtualDoc.positionAt(generatedOffset),
        params.newName,
        style.parsed
      );

      if (result.changes) {
        for (const uri in result.changes) {
          if (uri === doc.uri) {
            result.changes[uri] =
              getSourceEdits(style, result.changes[uri]) || [];
          }
        }
      }

      if (result.documentChanges) {
        for (const change of result.documentChanges) {
          if (TextDocumentEdit.is(change)) {
            if (change.textDocument.uri === doc.uri) {
              change.edits = getSourceEdits(style, change.edits) || [];
            }
          }
        }
      }

      return result;
    }
  },
  doCodeActions(doc, params) {
    for (const extracted of processStyle(doc)) {
      // Find the first stylesheet data that contains the offset.
      const generatedRange = getGeneratedRange(doc, extracted, params.range);
      if (generatedRange === undefined) continue;

      const result = extracted.service.doCodeActions(
        extracted.virtualDoc,
        generatedRange,
        params.context,
        extracted.parsed
      );

      for (const command of result) {
        const edits = command.arguments?.[2];
        if (edits && Array.isArray(edits) && isTextEdit(edits[0])) {
          command.arguments![2] = getSourceEdits(extracted, edits);
        }
      }

      return result;
    }
  },
  doValidate(doc) {
    const result: Diagnostic[] = [];
    for (const extracted of processStyle(doc)) {
      for (const diag of extracted.service.doValidation(
        extracted.virtualDoc,
        extracted.parsed
      )) {
        const sourceRange = getSourceRange(extracted, diag.range);
        if (sourceRange) {
          diag.range = sourceRange;
          result.push(diag);
        }
      }
    }

    return result.length ? result : undefined;
  },
};

export { StyleSheetService as default };

function processStyle(doc: TextDocument) {
  return processDoc(doc, ({ uri, version, parsed, project: { lookup } }) => {
    const result: ProcessedStyle[] = [];
    for (const [ext, extracted] of extractStyle({
      parsed,
      lookup,
    })) {
      const service = services[ext]?.({
        fileSystemProvider,
        clientCapabilities,
      });
      if (service) {
        const virtualDoc = TextDocument.create(
          uri,
          "css",
          version as number,
          extracted.toString()
        );
        result.push({
          service,
          extracted,
          virtualDoc,
          parsed: service.parseStylesheet(virtualDoc),
        });
      }
    }

    return result;
  });
}

function getSourceEdits(
  extracted: ProcessedStyle,
  edits: TextEdit[]
): TextEdit[] | undefined {
  const result: TextEdit[] = [];

  for (const edit of edits) {
    const sourceEdit = getSourceEdit(extracted, edit);
    if (sourceEdit) {
      result.push(sourceEdit);
    }
  }

  return result.length ? result : undefined;
}

function getSourceEdit(
  extracted: ProcessedStyle,
  textEdit: TextEdit
): TextEdit | undefined {
  const sourceRange = getSourceRange(extracted, textEdit.range);
  if (sourceRange) {
    return {
      newText: textEdit.newText,
      range: sourceRange,
    };
  }
}

function getSourceInsertReplaceEdit(
  extracted: ProcessedStyle,
  textEdit: TextEdit | InsertReplaceEdit
): TextEdit | InsertReplaceEdit | undefined {
  if (isTextEdit(textEdit)) {
    return getSourceEdit(extracted, textEdit);
  } else if (textEdit.replace) {
    const sourceRange = getSourceRange(extracted, textEdit.replace);
    if (sourceRange) {
      return {
        newText: textEdit.newText,
        replace: sourceRange,
      } as InsertReplaceEdit;
    }
  } else {
    const sourceRange = getSourceRange(extracted, textEdit.insert);
    if (sourceRange) {
      return {
        newText: textEdit.newText,
        insert: sourceRange,
      } as InsertReplaceEdit;
    }
  }
}

function getSourceRange(
  style: ProcessedStyle,
  range: Range
): Range | undefined {
  return style.extracted.sourceLocationAt(
    style.virtualDoc.offsetAt(range.start),
    style.virtualDoc.offsetAt(range.end)
  );
}

function getGeneratedRange(
  doc: TextDocument,
  style: ProcessedStyle,
  range: Range
): Range | undefined {
  return style.extracted.generatedLocationAt(
    doc.offsetAt(range.start),
    doc.offsetAt(range.end)
  );
}

function isTextEdit(edit: TextEdit | InsertReplaceEdit): edit is TextEdit {
  return (edit as TextEdit).range !== undefined;
}
