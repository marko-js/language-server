import { LanguageServicePlugin } from "@volar/language-service";
import { URI } from "vscode-uri";

import { MarkoVirtualCode } from "../../language";
import { getFormattingOptions, getPrettierInstance } from "../prettier";

export const create = (): LanguageServicePlugin => {
  return {
    name: "marko-action-format",
    capabilities: {
      executeCommandProvider: {
        commands: ["marko.formatWithSyntax"],
      },
    },
    create(context) {
      return {
        async executeCommand(_command: string, [fileUri, options]: any[]) {
          const uri = URI.parse(fileUri);

          const sourceFile = context.language.scripts.get(uri);
          if (!sourceFile) {
            return;
          }

          const rootCode = sourceFile?.generated?.root;
          if (!(rootCode instanceof MarkoVirtualCode)) {
            return;
          }

          const { prettierInstance, prettierPluginMarko } =
            getPrettierInstance(context);
          if (!prettierInstance || !prettierPluginMarko) {
            return;
          }

          const prettierOptions = await getFormattingOptions(
            prettierInstance,
            prettierPluginMarko,
            fileUri,
            options,
            context,
          );

          // Override the configured options with the options passed in.
          const prettierConfig = { ...prettierOptions, ...options };
          const oldText = rootCode.code;
          const newText = await prettierInstance.format(
            oldText,
            prettierConfig,
          );

          // TODO: Is there another way to do positionAt that doesn't involve getting the document?
          const document = context.documents.get(
            fileUri,
            "marko",
            rootCode.snapshot,
          );
          return [
            {
              newText,
              range: {
                start: { line: 0, character: 0 },
                end: document.positionAt(oldText.length),
              },
            },
          ];
        },
      };
    },
  };
};
