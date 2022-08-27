import { TextEdit } from "vscode-languageserver";
import * as prettier from "prettier";
import * as markoPrettier from "prettier-plugin-marko";

import { START_POSITION } from "../../utils/constants";
import { displayError } from "../../utils/messages";
import { getFSPath } from "../../utils/file";
import type { Plugin } from "../types";

export const format: Plugin["format"] = async (doc, params, cancel) => {
  try {
    const filepath = getFSPath(doc);
    const text = doc.getText();
    const options: prettier.Options = {
      parser: "marko",
      filepath,
      plugins: [markoPrettier],
      tabWidth: params.options.tabSize,
      useTabs: params.options.insertSpaces === false,
      ...(filepath
        ? await prettier
            .resolveConfig(filepath, {
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
          start: START_POSITION,
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
