import { TextEdit } from "vscode-languageserver";
import { URI } from "vscode-uri";
import * as prettier from "prettier";
import * as markoPrettier from "prettier-plugin-marko";

import { displayError } from "../../utils/messages";
import type { Plugin } from "../types";

export const format: Plugin["format"] = async (doc, params, cancel) => {
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

    if (cancel.isCancellationRequested) return;

    // TODO: format selection
    const ret = [
      TextEdit.replace(
        {
          start: {
            line: 0,
            character: 0,
          },
          end: doc.positionAt(text.length),
        },
        prettier.format(text, options)
      ),
    ];
    return ret;
  } catch (e) {
    displayError(e);
  }
};
