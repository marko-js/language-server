import {
  type Connection,
  type TextDocuments,
  type DocumentFormattingParams,
  Position,
  Range,
  TextEdit,
} from "vscode-languageserver";
import type { TextDocument } from "vscode-languageserver-textdocument";
import { URI } from "vscode-uri";
import * as prettier from "prettier";
import * as markoPrettier from "prettier-plugin-marko";
import { displayError } from "../messages";

export default function setup(
  connection: Connection,
  documents: TextDocuments<TextDocument>
) {
  connection.onDocumentFormatting(
    async ({
      textDocument,
      options,
    }: DocumentFormattingParams): Promise<TextEdit[]> => {
      try {
        const doc = documents.get(textDocument.uri)!;
        const { fsPath, scheme } = URI.parse(textDocument.uri);
        const text = doc.getText();
        const formatted = prettier.format(text, {
          parser: "marko",
          filepath: fsPath,
          plugins: [markoPrettier],
          tabWidth: options.tabSize,
          useTabs: options.insertSpaces === false,
          ...(scheme === "file"
            ? await prettier
                .resolveConfig(fsPath, {
                  editorconfig: true,
                })
                .catch(() => null)
            : null),
        });

        // TODO: format selection
        return [
          TextEdit.replace(
            Range.create(doc.positionAt(0), doc.positionAt(text.length)),
            formatted
          ),
        ];
      } catch (e) {
        displayError(e);
      }

      return [
        TextEdit.replace(
          Range.create(Position.create(0, 0), Position.create(0, 0)),
          ""
        ),
      ];
    }
  );
}
