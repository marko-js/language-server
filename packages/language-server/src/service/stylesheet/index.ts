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

import { DocInfo, processDoc } from "../../utils/doc";
import type { Extracted } from "../../utils/extractor";
import fileSystemProvider from "../../utils/file-system";
import resolveReference from "../../utils/resolve-url";
import type { Plugin } from "../types";

import { extractStyleSheets } from "./extract";

interface ExtractedStyles extends Extracted {
  service: LanguageService;
  parsed: Stylesheet;
  virtualDoc: TextDocument;
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
    for (const extracted of processDoc(doc, extract)) {
      // Find the first stylesheet data that contains the offset.
      const generatedPos = extracted.generatedPositionAt(sourceOffset);
      if (generatedPos === undefined) continue;

      const result = await extracted.service.doComplete2(
        extracted.virtualDoc,
        generatedPos,
        extracted.parsed,
        { resolveReference }
      );

      if (result.itemDefaults) {
        const { editRange } = result.itemDefaults;
        if (editRange) {
          if ("start" in editRange) {
            result.itemDefaults.editRange = getSourceRange(
              extracted,
              editRange
            );
          } else {
            editRange.insert = getSourceRange(extracted, editRange.insert)!;
            editRange.replace = getSourceRange(extracted, editRange.replace)!;
          }
        }
      }

      for (const item of result.items) {
        if (item.textEdit) {
          item.textEdit = getSourceInsertReplaceEdit(extracted, item.textEdit);
        }

        if (item.additionalTextEdits) {
          item.additionalTextEdits = getSourceEdits(
            extracted,
            item.additionalTextEdits
          );
        }
      }

      return result;
    }
  },
  findDefinition(doc, params) {
    const sourceOffset = doc.offsetAt(params.position);
    for (const extracted of processDoc(doc, extract)) {
      // Find the first stylesheet data that contains the offset.
      const generatedPos = extracted.generatedPositionAt(sourceOffset);
      if (generatedPos === undefined) continue;

      const result = extracted.service.findDefinition(
        extracted.virtualDoc,
        generatedPos,
        extracted.parsed
      );

      if (result) {
        const sourceRange = getSourceRange(extracted, result.range);
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
    for (const extracted of processDoc(doc, extract)) {
      // Find the first stylesheet data that contains the offset.
      const generatedPos = extracted.generatedPositionAt(sourceOffset);
      if (generatedPos === undefined) continue;

      const result: Location[] = [];
      for (const location of extracted.service.findReferences(
        extracted.virtualDoc,
        generatedPos,
        extracted.parsed
      )) {
        const sourceRange = getSourceRange(extracted, location.range);
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
    for (const extracted of processDoc(doc, extract)) {
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
    for (const extracted of processDoc(doc, extract)) {
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
    for (const extracted of processDoc(doc, extract)) {
      // Find the first stylesheet data that contains the offset.
      const generatedPos = extracted.generatedPositionAt(sourceOffset);
      if (generatedPos === undefined) continue;

      const result: DocumentHighlight[] = [];
      for (const highlight of extracted.service.findDocumentHighlights(
        extracted.virtualDoc,
        generatedPos,
        extracted.parsed
      )) {
        const sourceRange = getSourceRange(extracted, highlight.range);
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
    for (const extracted of processDoc(doc, extract)) {
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
    for (const extracted of processDoc(doc, extract)) {
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
    for (const extracted of processDoc(doc, extract)) {
      // Find the first stylesheet data that contains the offset.
      const generatedPos = extracted.generatedPositionAt(sourceOffset);
      if (generatedPos === undefined) continue;

      const result = extracted.service.doHover(
        extracted.virtualDoc,
        generatedPos,
        extracted.parsed
      );

      if (result) {
        if (result.range) {
          const sourceRange = getSourceRange(extracted, result.range);
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
    for (const extracted of processDoc(doc, extract)) {
      // Find the first stylesheet data that contains the offset.
      const generatedOffset = extracted.generatedOffsetAt(sourceOffset);
      if (generatedOffset === undefined) continue;

      const result = extracted.service.doRename(
        extracted.virtualDoc,
        extracted.virtualDoc.positionAt(generatedOffset),
        params.newName,
        extracted.parsed
      );

      if (result.changes) {
        for (const uri in result.changes) {
          if (uri === doc.uri) {
            result.changes[uri] =
              getSourceEdits(extracted, result.changes[uri]) || [];
          }
        }
      }

      if (result.documentChanges) {
        for (const change of result.documentChanges) {
          if (TextDocumentEdit.is(change)) {
            if (change.textDocument.uri === doc.uri) {
              change.edits = getSourceEdits(extracted, change.edits) || [];
            }
          }
        }
      }

      return result;
    }
  },
  doCodeActions(doc, params) {
    for (const extracted of processDoc(doc, extract)) {
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
    for (const extracted of processDoc(doc, extract)) {
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

function getSourceEdits(
  extracted: ExtractedStyles,
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
  extracted: ExtractedStyles,
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
  extracted: ExtractedStyles,
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
  extracted: ExtractedStyles,
  range: Range
): Range | undefined {
  return extracted.sourceLocationAt(
    extracted.virtualDoc.offsetAt(range.start),
    extracted.virtualDoc.offsetAt(range.end)
  );
}

function getGeneratedRange(
  doc: TextDocument,
  extracted: ExtractedStyles,
  range: Range
): Range | undefined {
  return extracted.generatedLocationAt(
    doc.offsetAt(range.start),
    doc.offsetAt(range.end)
  );
}

function extract({ uri, version, code, parsed, info }: DocInfo) {
  const result: ExtractedStyles[] = [];
  for (const [ext, extracted] of extractStyleSheets(
    code,
    parsed,
    info.lookup
  )) {
    const service = services[ext]?.({
      fileSystemProvider,
      clientCapabilities,
    });
    if (service) {
      const virtualDoc = TextDocument.create(
        uri,
        "css",
        version as number,
        extracted.generated
      );
      result.push({
        service,
        virtualDoc,
        parsed: service.parseStylesheet(virtualDoc),
        ...extracted,
      });
    }
  }

  return result;
}

function isTextEdit(edit: TextEdit | InsertReplaceEdit): edit is TextEdit {
  return (edit as TextEdit).range !== undefined;
}
