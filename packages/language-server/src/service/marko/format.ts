import { Project } from "@marko/language-tools";
import * as prettier from "prettier";
import * as markoPrettier from "prettier-plugin-marko";
import { CancellationToken, TextEdit } from "vscode-languageserver";

import { TextDocument } from "vscode-languageserver-textdocument";
import { START_POSITION } from "../../utils/constants";
import { getFSDir, getFSPath } from "../../utils/file";
import { displayError } from "../../utils/messages";
import type { Plugin } from "../types";

export interface FormatOptions {
  tabSize: number;
  insertSpaces: boolean;
  mode?: "concise" | "html";
}

export async function formatDocument(
  doc: TextDocument,
  formatOptions: FormatOptions,
  cancel?: CancellationToken,
) {
  try {
    const dir = getFSDir(doc);
    const filepath = getFSPath(doc);
    const text = doc.getText();
    const options: prettier.Options = {
      parser: "marko",
      filepath,
      plugins: [markoPrettier],
      tabWidth: formatOptions.tabSize,
      useTabs: formatOptions.insertSpaces === false,
      markoSyntax: formatOptions.mode ?? "auto",
      ...(filepath
        ? await prettier
            .resolveConfig(filepath, {
              editorconfig: true,
            })
            .catch(() => null)
        : null),
    };

    markoPrettier.setCompiler(Project.getCompiler(dir), Project.getConfig(dir));

    if (cancel?.isCancellationRequested) return;

    // TODO: format selection
    return [
      TextEdit.replace(
        {
          start: START_POSITION,
          end: doc.positionAt(text.length),
        },
        await prettier.format(text, options),
      ),
    ];
  } catch (e) {
    displayError(e);
  }
}

export const format: Plugin["format"] = async (doc, params, cancel) => {
  return formatDocument(doc, params.options, cancel);
};
