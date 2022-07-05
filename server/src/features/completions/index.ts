import {
  type Range,
  type Connection,
  type TextDocuments,
  type CompletionParams,
  CompletionList,
  TextEdit,
  InsertReplaceEdit,
} from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { getCompilerInfo, parse } from "../../utils/compiler";
import { NodeType } from "../../utils/parser";
import { displayError } from "../messages";

import { Tag } from "./types/Tag";
import { OpenTagName } from "./types/OpenTagName";
import { AttrName } from "./types/AttrName";
import { getCSSLanguageService } from "vscode-css-languageservice";
import { START_OF_FILE } from "../../utils/utils";

export interface CompletionMeta<N = unknown>
  extends ReturnType<typeof getCompilerInfo> {
  document: TextDocument;
  params: CompletionParams;
  parsed: ReturnType<typeof parse>;
  offset: number;
  code: string;
  node: N;
}

const NO_COMPLETIONS = CompletionList.create([], true);
const HANDLERS: Record<
  string,
  (data: CompletionMeta<any>) => CompletionList | void
> = {
  Tag,
  OpenTagName,
  AttrName,
};

export default function setup(
  connection: Connection,
  documents: TextDocuments<TextDocument>
) {
  connection.onCompletion((params): CompletionList => {
    let result: CompletionList | void;

    try {
      const document = documents.get(params.textDocument.uri)!;
      const offset = document.offsetAt(params.position);
      const code = document.getText();
      const parsed = parse(document);
      const outputOffset = parsed.stylesheet.outputOffsetFrom(offset);

      if (outputOffset !== undefined) {
        const service = getCSSLanguageService();
        const contentDocument = TextDocument.create(
          document.uri,
          "css",
          document.version,
          parsed.stylesheet.output
        );

        result = service.doComplete(
          contentDocument,
          contentDocument.positionAt(outputOffset),
          service.parseStylesheet(contentDocument)
        );

        const updateRange = (range: Range) => {
          const start = parsed.stylesheet.inputOffsetFrom(
            contentDocument.offsetAt(range.start)
          );
          const end = parsed.stylesheet.inputOffsetFrom(
            contentDocument.offsetAt(range.end)
          );

          if (start !== undefined || end !== undefined) {
            range.start = document.positionAt(start ?? end!);
            range.end = document.positionAt(end ?? start!);
            return true;
          }

          return false;
        };

        for (const item of result.items) {
          if (item.additionalTextEdits) {
            for (const edit of item.additionalTextEdits) {
              if (!updateRange(edit.range)) {
                edit.newText = "";
                edit.range = START_OF_FILE;
              }
            }
          }

          const { textEdit } = item;
          if (textEdit) {
            if ((textEdit as TextEdit).range) {
              if (!updateRange((textEdit as TextEdit).range)) {
                textEdit.newText = "";
                (textEdit as TextEdit).range = START_OF_FILE;
              }
            }

            if ((textEdit as InsertReplaceEdit).insert) {
              if (!updateRange((textEdit as InsertReplaceEdit).insert)) {
                textEdit.newText = "";
                (textEdit as InsertReplaceEdit).insert = START_OF_FILE;
              }
            }
          }
        }
      } else {
        const node = parsed.nodeAt(offset);
        result = HANDLERS[NodeType[node.type]]?.({
          document,
          params,
          parsed,
          offset,
          code,
          node,
          ...getCompilerInfo(document),
        });
      }
    } catch (e) {
      displayError(e);
    }

    if (result) {
      result.isIncomplete = true;
    }

    return result || NO_COMPLETIONS;
  });
}
