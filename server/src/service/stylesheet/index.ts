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
} from "vscode-languageserver";
import {
  getCSSLanguageService,
  getLESSLanguageService,
  getSCSSLanguageService,
  LanguageService,
} from "vscode-css-languageservice";
import { TextDocument } from "vscode-languageserver-textdocument";
import { getCompilerInfo, parse } from "../../utils/compiler";
import { START_OF_FILE } from "../../utils/utils";
import type { Plugin } from "../types";
import { extractStyleSheets } from "./extract";

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

const services: Record<string, () => LanguageService> = {
  css: getCSSLanguageService,
  less: getLESSLanguageService,
  scss: getSCSSLanguageService,
};

const StyleSheetService: Partial<Plugin> = {
  async doComplete(doc, params) {
    const infoByExt = getStyleSheetInfo(doc);
    const sourceOffset = doc.offsetAt(params.position);

    for (const ext in infoByExt) {
      const info = infoByExt[ext];
      // Find the first stylesheet data that contains the offset.
      const generatedOffset = info.generatedOffsetAt(sourceOffset);
      if (generatedOffset === undefined) continue;

      const { service, virtualDoc } = info;
      const result = service.doComplete(
        virtualDoc,
        virtualDoc.positionAt(generatedOffset),
        info.parsed
      );

      for (const item of result.items) {
        if (item.additionalTextEdits) {
          for (const textEdit of item.additionalTextEdits) {
            updateTextEdit(doc, info, textEdit);
          }
        }

        const { textEdit } = item;
        if (textEdit) {
          if ((textEdit as TextEdit).range) {
            updateTextEdit(doc, info, textEdit as TextEdit);
          }

          if ((textEdit as InsertReplaceEdit).insert) {
            updateInsertReplaceEdit(doc, info, textEdit as InsertReplaceEdit);
          }
        }
      }

      return result;
    }

    return CompletionList.create([], true);
  },
  async findDefinition(doc, params) {
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

      if (result && updateRange(doc, info, result.range)) {
        return result;
      }

      break;
    }
  },
  async findReferences(doc, params) {
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
        if (updateRange(doc, info, location.range)) {
          result.push(location);
        }
      }

      return result.length ? result : undefined;
    }
  },
  async findDocumentHighlights(doc, params) {
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
        if (updateRange(doc, info, highlight.range)) {
          result.push(highlight);
        }
      }

      return result.length ? result : undefined;
    }
  },
  async findDocumentColors(doc) {
    const infoByExt = getStyleSheetInfo(doc);
    const result: ColorInformation[] = [];

    for (const ext in infoByExt) {
      const info = infoByExt[ext];
      const { service, virtualDoc } = info;

      for (const colorInfo of service.findDocumentColors(
        virtualDoc,
        info.parsed
      )) {
        if (updateRange(doc, info, colorInfo.range)) {
          result.push(colorInfo);
        }
      }
    }

    if (result.length) {
      return result;
    }
  },
  async getColorPresentations(doc, params) {
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
      const result = service.getColorPresentations(
        virtualDoc,
        info.parsed,
        params.color,
        Range.create(
          virtualDoc.positionAt(generatedOffsetStart),
          virtualDoc.positionAt(generatedOffsetEnd)
        )
      );

      for (const colorPresentation of result) {
        if (colorPresentation.textEdit) {
          updateTextEdit(doc, info, colorPresentation.textEdit);
        }

        if (colorPresentation.additionalTextEdits) {
          for (const textEdit of colorPresentation.additionalTextEdits) {
            updateTextEdit(doc, info, textEdit);
          }
        }
      }

      return result;
    }
  },
  async doHover(doc, params) {
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

      if (result && (!result.range || updateRange(doc, info, result.range))) {
        return result;
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
            for (const textEdit of result.changes[uri]) {
              updateTextEdit(doc, info, textEdit);
            }
          }
        }
      }

      if (result.documentChanges) {
        for (const change of result.documentChanges) {
          if (TextDocumentEdit.is(change)) {
            if (change.textDocument.uri === doc.uri) {
              for (const textEdit of change.edits) {
                updateTextEdit(doc, info, textEdit);
              }
            }
          }
        }
      }

      return result;
    }
  },
  async doCodeActions(doc, params) {
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

      if (result) {
        for (const command of result) {
          const edits = command.arguments?.[2] as TextEdit[]; // we know the css language service returns text edits here.
          if (edits) {
            for (const textEdit of edits) {
              updateTextEdit(doc, info, textEdit);
            }
          }
        }
        return result;
      }
    }
  },
  async doValidate(doc) {
    const infoByExt = getStyleSheetInfo(doc);
    const result: Diagnostic[] = [];

    for (const ext in infoByExt) {
      const info = infoByExt[ext];

      for (const diag of info.service.doValidation(
        info.virtualDoc,
        info.parsed
      )) {
        if (updateRange(doc, info, diag.range)) {
          result.push(diag);
        }
      }
    }

    return result;
  },
};

export { StyleSheetService as default };

function updateTextEdit(
  doc: TextDocument,
  info: StyleSheetInfo,
  textEdit: TextEdit
) {
  if (!updateRange(doc, info, textEdit.range)) {
    textEdit.newText = "";
    textEdit.range = START_OF_FILE;
  }
}

function updateInsertReplaceEdit(
  doc: TextDocument,
  info: StyleSheetInfo,
  insertReplaceEdit: InsertReplaceEdit
) {
  if (!updateRange(doc, info, insertReplaceEdit.insert)) {
    insertReplaceEdit.newText = "";
    insertReplaceEdit.insert = START_OF_FILE;
  }
}

function updateRange(doc: TextDocument, info: StyleSheetInfo, range: Range) {
  const start = info.sourceOffsetAt(info.virtualDoc.offsetAt(range.start));
  const end = info.sourceOffsetAt(info.virtualDoc.offsetAt(range.end));

  if (start !== undefined || end !== undefined) {
    range.start = doc.positionAt(start ?? end!);
    range.end = doc.positionAt(end ?? start!);
    return true;
  }

  return false;
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
      const service = services[ext]?.();
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
