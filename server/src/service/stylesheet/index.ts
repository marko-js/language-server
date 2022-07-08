import {
  CompletionList,
  Diagnostic,
  InsertReplaceEdit,
  Range,
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

export default {
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
        service.parseStylesheet(virtualDoc)
      );

      for (const item of result.items) {
        if (item.additionalTextEdits) {
          for (const edit of item.additionalTextEdits) {
            if (!updateRange(doc, info, edit.range)) {
              edit.newText = "";
              edit.range = START_OF_FILE;
            }
          }
        }

        const { textEdit } = item;
        if (textEdit) {
          if ((textEdit as TextEdit).range) {
            if (!updateRange(doc, info, (textEdit as TextEdit).range)) {
              textEdit.newText = "";
              (textEdit as TextEdit).range = START_OF_FILE;
            }
          }

          if ((textEdit as InsertReplaceEdit).insert) {
            if (
              !updateRange(doc, info, (textEdit as InsertReplaceEdit).insert)
            ) {
              textEdit.newText = "";
              (textEdit as InsertReplaceEdit).insert = START_OF_FILE;
            }
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
        service.parseStylesheet(virtualDoc)
      );

      if (result && updateRange(doc, info, result.range)) {
        return result;
      }

      break;
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
} as Partial<Plugin>;

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
