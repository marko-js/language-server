import { Position, Range, TextEdit } from "vscode-languageserver";
import { URI } from "vscode-uri";
import * as prettier from "prettier";
import * as markoPrettier from "prettier-plugin-marko";
import { displayError } from "../../utils/messages";
import type { Plugin } from "../types";

const NO_EDIT = [
  TextEdit.replace(
    Range.create(Position.create(0, 0), Position.create(0, 0)),
    ""
  ),
];

export const format: Plugin["format"] = async (doc, params, token) => {
  try {
    const { fsPath, scheme } = URI.parse(doc.uri);
    const text = doc.getText();
    const options: prettier.Options = {
      parser: "marko",
      filepath: fsPath,
      plugins: [markoPrettier],
      tabWidth: params.options.tabSize,
      useTabs: params.options.insertSpaces === false,
      ...(scheme === "file"
        ? await prettier
            .resolveConfig(fsPath, {
              editorconfig: true,
            })
            .catch(() => null)
        : null),
    };

    if (!token.isCancellationRequested) {
      // TODO: format selection
      return [
        TextEdit.replace(
          Range.create(doc.positionAt(0), doc.positionAt(text.length)),
          prettier.format(text, options)
        ),
      ];
    }
  } catch (e) {
    displayError(e);
  }

  return NO_EDIT;
};
