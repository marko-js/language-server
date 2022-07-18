import {
  ColorInformation,
  CompletionList,
  Diagnostic,
  DocumentHighlight,
  InsertReplaceEdit,
  Range,
  TextDocumentEdit,
  Location,
  TextEdit,
  DocumentLink,
  InitializeParams,
  ColorPresentation,
  SymbolInformation,
} from "vscode-languageserver";
import {
  getCSSLanguageService,
  getLESSLanguageService,
  getSCSSLanguageService,
  type LanguageService,
  type LanguageServiceOptions,
} from "vscode-css-languageservice";
import { TextDocument } from "vscode-languageserver-textdocument";
import { getCompilerInfo, parse } from "../../utils/compiler";
import type { Plugin } from "../types";
import { extractStyleSheets } from "./extract";
import resolveReference from "../../utils/resolve-url";
import fileSystemProvider from "../../utils/file-system";

interface StyleSheetInfo {
  virtualDoc: TextDocument;
  service: LanguageService;
  parsed: ReturnType<LanguageService["parseStylesheet"]>;
  sourceOffsetAt(generatedOffset: number): number | undefined;
  generatedOffsetAt(sourceOffset: number): number | undefined;
}

const cache = new WeakMap<
  ReturnType<typeof parse>,
  Record<string, StyleSheetInfo>
>();

const services: Record<
  string,
  (options: LanguageServiceOptions) => LanguageService
> = {
  css: getCSSLanguageService,
  less: getLESSLanguageService,
  scss: getSCSSLanguageService,
};
let clientCapabilities: InitializeParams["capabilities"] | undefined;

const StyleSheetService: Partial<Plugin> = {
  initialize(params) {
    clientCapabilities = params.capabilities;
  },
  async doComplete(doc, params) {
    const infoByExt = getStyleSheetInfo(doc);
    const sourceOffset = doc.offsetAt(params.position);

    for (const ext in infoByExt) {
      const info = infoByExt[ext];
      // Find the first stylesheet data that contains the offset.
      const generatedOffset = info.generatedOffsetAt(sourceOffset);
      if (generatedOffset === undefined) continue;

      const { service, virtualDoc } = info;
      const result = await service.doComplete2(
        virtualDoc,
        virtualDoc.positionAt(generatedOffset),
        info.parsed,
        { resolveReference }
      );

      if (result.itemDefaults) {
        const { editRange } = result.itemDefaults;
        if (editRange) {
          if ("start" in editRange) {
            result.itemDefaults.editRange = getSourceRange(
              doc,
              info,
              editRange
            );
          } else {
            editRange.insert = getSourceRange(doc, info, editRange.insert)!;
            editRange.replace = getSourceRange(doc, info, editRange.replace)!;
          }
        }
      }

      for (const item of result.items) {
        if (item.textEdit) {
          item.textEdit = getSourceInsertReplaceEdit(doc, info, item.textEdit);
        }

        if (item.additionalTextEdits) {
          item.additionalTextEdits = getSourceEdits(
            doc,
            info,
            item.additionalTextEdits
          );
        }
      }

      return result;
    }

    return CompletionList.create([], true);
  },
  findDefinition(doc, params) {
    const infoByExt = getStyleSheetInfo(doc);
    const sourceOffset = doc.offsetAt(params.position);

    for (const ext in infoByExt) {
      const info = infoByExt[ext];
      // Find the first stylesheet data that contains the offset.
      const generatedOffset = info.generatedOffsetAt(sourceOffset);
      if (generatedOffset === undefined) continue;

      const { service, virtualDoc } = info;
      const result = service.findDefinition(
        virtualDoc,
        virtualDoc.positionAt(generatedOffset),
        info.parsed
      );

      if (result) {
        const range = getSourceRange(doc, info, result.range);
        if (range) {
          return {
            range,
            uri: doc.uri,
          };
        }
      }

      break;
    }
  },
  findReferences(doc, params) {
    const infoByExt = getStyleSheetInfo(doc);
    const sourceOffset = doc.offsetAt(params.position);

    for (const ext in infoByExt) {
      const info = infoByExt[ext];
      // Find the first stylesheet data that contains the offset.
      const generatedOffset = info.generatedOffsetAt(sourceOffset);
      if (generatedOffset === undefined) continue;

      const { service, virtualDoc } = info;
      const result: Location[] = [];

      for (const location of service.findReferences(
        virtualDoc,
        virtualDoc.positionAt(generatedOffset),
        info.parsed
      )) {
        const range = getSourceRange(doc, info, location.range);
        if (range) {
          result.push({
            range,
            uri: location.uri,
          });
        }
      }

      return result.length ? result : undefined;
    }
  },
  findDocumentSymbols(doc) {
    const infoByExt = getStyleSheetInfo(doc);
    const result: SymbolInformation[] = [];

    for (const ext in infoByExt) {
      const info = infoByExt[ext];
      const { service, virtualDoc } = info;

      for (const symbol of service.findDocumentSymbols(
        virtualDoc,
        info.parsed
      )) {
        if (symbol.location.uri === doc.uri) {
          const range = getSourceRange(doc, info, symbol.location.range);
          if (range) {
            result.push({
              kind: symbol.kind,
              name: symbol.name,
              tags: symbol.tags,
              deprecated: symbol.deprecated,
              containerName: symbol.containerName,
              location: { uri: doc.uri, range },
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
    const infoByExt = getStyleSheetInfo(doc);
    const result: DocumentLink[] = [];

    for (const ext in infoByExt) {
      const info = infoByExt[ext];
      const { service, virtualDoc } = info;

      for (const link of await service.findDocumentLinks2(
        virtualDoc,
        info.parsed,
        { resolveReference }
      )) {
        const range = getSourceRange(doc, info, link.range);
        if (range) {
          result.push({
            range,
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
    const infoByExt = getStyleSheetInfo(doc);
    const sourceOffset = doc.offsetAt(params.position);

    for (const ext in infoByExt) {
      const info = infoByExt[ext];
      // Find the first stylesheet data that contains the offset.
      const generatedOffset = info.generatedOffsetAt(sourceOffset);
      if (generatedOffset === undefined) continue;

      const { service, virtualDoc } = info;
      const result: DocumentHighlight[] = [];

      for (const highlight of service.findDocumentHighlights(
        virtualDoc,
        virtualDoc.positionAt(generatedOffset),
        info.parsed
      )) {
        const range = getSourceRange(doc, info, highlight.range);
        if (range) {
          result.push({
            range,
            kind: highlight.kind,
          });
        }
      }

      return result.length ? result : undefined;
    }
  },
  findDocumentColors(doc) {
    const infoByExt = getStyleSheetInfo(doc);
    const result: ColorInformation[] = [];

    for (const ext in infoByExt) {
      const info = infoByExt[ext];
      const { service, virtualDoc } = info;

      for (const colorInfo of service.findDocumentColors(
        virtualDoc,
        info.parsed
      )) {
        const range = getSourceRange(doc, info, colorInfo.range);
        if (range) {
          result.push({
            range,
            color: colorInfo.color,
          });
        }
      }
    }

    return result.length ? result : undefined;
  },
  getColorPresentations(doc, params) {
    const infoByExt = getStyleSheetInfo(doc);
    const sourceOffset = doc.offsetAt(params.range.start);

    for (const ext in infoByExt) {
      const info = infoByExt[ext];
      // Find the first stylesheet data that contains the offset.
      const generatedOffsetStart = info.generatedOffsetAt(sourceOffset);
      if (generatedOffsetStart === undefined) continue;

      const generatedOffsetEnd = info.generatedOffsetAt(
        doc.offsetAt(params.range.end)
      );
      if (generatedOffsetEnd === undefined) continue;

      const { service, virtualDoc } = info;
      const result: ColorPresentation[] = [];

      for (const colorPresentation of service.getColorPresentations(
        virtualDoc,
        info.parsed,
        params.color,
        Range.create(
          virtualDoc.positionAt(generatedOffsetStart),
          virtualDoc.positionAt(generatedOffsetEnd)
        )
      )) {
        const textEdit =
          colorPresentation.textEdit &&
          getSourceEdit(doc, info, colorPresentation.textEdit);
        const additionalTextEdits =
          colorPresentation.additionalTextEdits &&
          getSourceEdits(doc, info, colorPresentation.additionalTextEdits);

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
    const infoByExt = getStyleSheetInfo(doc);
    const sourceOffset = doc.offsetAt(params.position);

    for (const ext in infoByExt) {
      const info = infoByExt[ext];
      // Find the first stylesheet data that contains the offset.
      const generatedOffset = info.generatedOffsetAt(sourceOffset);
      if (generatedOffset === undefined) continue;

      const { service, virtualDoc } = info;
      const result = service.doHover(
        virtualDoc,
        virtualDoc.positionAt(generatedOffset),
        info.parsed
      );

      if (result) {
        if (result.range) {
          const range = getSourceRange(doc, info, result.range);
          if (range) {
            return {
              range,
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
    const infoByExt = getStyleSheetInfo(doc);
    const sourceOffset = doc.offsetAt(params.position);

    for (const ext in infoByExt) {
      const info = infoByExt[ext];
      // Find the first stylesheet data that contains the offset.
      const generatedOffset = info.generatedOffsetAt(sourceOffset);
      if (generatedOffset === undefined) continue;

      const { service, virtualDoc } = info;
      const result = service.doRename(
        virtualDoc,
        virtualDoc.positionAt(generatedOffset),
        params.newName,
        info.parsed
      );

      if (result.changes) {
        for (const uri in result.changes) {
          if (uri === doc.uri) {
            result.changes[uri] =
              getSourceEdits(doc, info, result.changes[uri]) || [];
          }
        }
      }

      if (result.documentChanges) {
        for (const change of result.documentChanges) {
          if (TextDocumentEdit.is(change)) {
            if (change.textDocument.uri === doc.uri) {
              change.edits = getSourceEdits(doc, info, change.edits) || [];
            }
          }
        }
      }

      return result;
    }
  },
  doCodeActions(doc, params) {
    const infoByExt = getStyleSheetInfo(doc);
    const sourceOffset = doc.offsetAt(params.range.start);

    for (const ext in infoByExt) {
      const info = infoByExt[ext];
      // Find the first stylesheet data that contains the offset.
      const generatedOffsetStart = info.generatedOffsetAt(sourceOffset);
      if (generatedOffsetStart === undefined) continue;

      const generatedOffsetEnd = info.generatedOffsetAt(
        doc.offsetAt(params.range.end)
      );
      if (generatedOffsetEnd === undefined) continue;

      const { service, virtualDoc } = info;
      const result = service.doCodeActions(
        virtualDoc,
        Range.create(
          virtualDoc.positionAt(generatedOffsetStart),
          virtualDoc.positionAt(generatedOffsetEnd)
        ),
        params.context,
        info.parsed
      );

      for (const command of result) {
        const edits = command.arguments?.[2];
        if (edits && Array.isArray(edits) && isTextEdit(edits[0])) {
          command.arguments![2] = getSourceEdits(doc, info, edits);
        }
      }

      return result;
    }
  },
  doValidate(doc) {
    const infoByExt = getStyleSheetInfo(doc);
    const result: Diagnostic[] = [];

    for (const ext in infoByExt) {
      const info = infoByExt[ext];

      for (const diag of info.service.doValidation(
        info.virtualDoc,
        info.parsed
      )) {
        const range = getSourceRange(doc, info, diag.range);
        if (range) {
          diag.range = range;
          result.push(diag);
        }
      }
    }

    return result.length ? result : undefined;
  },
};

export { StyleSheetService as default };

function getSourceEdits(
  doc: TextDocument,
  info: StyleSheetInfo,
  edits: TextEdit[]
): TextEdit[] | undefined {
  const result: TextEdit[] = [];

  for (const edit of edits) {
    const sourceEdit = getSourceEdit(doc, info, edit);
    if (sourceEdit) {
      result.push(sourceEdit);
    }
  }

  return result.length ? result : undefined;
}

function getSourceEdit(
  doc: TextDocument,
  info: StyleSheetInfo,
  textEdit: TextEdit
): TextEdit | undefined {
  const range = getSourceRange(doc, info, textEdit.range);
  if (range) {
    return {
      newText: textEdit.newText,
      range,
    };
  }
}

function getSourceInsertReplaceEdit(
  doc: TextDocument,
  info: StyleSheetInfo,
  textEdit: TextEdit | InsertReplaceEdit
): TextEdit | InsertReplaceEdit | undefined {
  if (isTextEdit(textEdit)) {
    return getSourceEdit(doc, info, textEdit);
  } else if (textEdit.replace) {
    const range = getSourceRange(doc, info, textEdit.replace);
    if (range) {
      return {
        newText: textEdit.newText,
        replace: range,
      } as InsertReplaceEdit;
    }
  } else {
    const range = getSourceRange(doc, info, textEdit.insert);
    if (range) {
      return {
        newText: textEdit.newText,
        insert: range,
      } as InsertReplaceEdit;
    }
  }
}

function getSourceRange(
  doc: TextDocument,
  info: StyleSheetInfo,
  range: Range
): Range | undefined {
  const start = info.sourceOffsetAt(info.virtualDoc.offsetAt(range.start));
  if (start === undefined) return;

  let end: number | undefined = start;

  if (
    range.start.line !== range.end.line ||
    range.start.character !== range.end.character
  ) {
    end = info.sourceOffsetAt(info.virtualDoc.offsetAt(range.end));
    if (end === undefined) return;
  }

  const pos = doc.positionAt(start);
  return {
    start: pos,
    end: start === end ? pos : doc.positionAt(end),
  };
}

function getStyleSheetInfo(doc: TextDocument): Record<string, StyleSheetInfo> {
  const parsed = parse(doc);
  let cached = cache.get(parsed);

  if (!cached) {
    const results = extractStyleSheets(
      doc.getText(),
      parsed.program,
      getCompilerInfo(doc).lookup
    );

    cached = {};

    for (const ext in results) {
      const service = services[ext]?.({
        fileSystemProvider,
        clientCapabilities,
      });
      if (!service) continue;

      const { generated, sourceOffsetAt, generatedOffsetAt } = results[ext];
      const virtualDoc = TextDocument.create(
        doc.uri,
        "css",
        doc.version,
        generated
      );

      cached[ext] = {
        service,
        virtualDoc,
        sourceOffsetAt,
        generatedOffsetAt,
        parsed: service.parseStylesheet(virtualDoc),
      };
    }

    cache.set(parsed, cached);
  }

  return cached;
}

function isTextEdit(edit: TextEdit | InsertReplaceEdit): edit is TextEdit {
  return (edit as TextEdit).range !== undefined;
}
