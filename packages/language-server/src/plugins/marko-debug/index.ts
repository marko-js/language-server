import { LanguageServicePlugin } from "@volar/language-service";
import { URI } from "vscode-uri";
import { MarkoVirtualCode } from "../../language";

export const create = (): LanguageServicePlugin => {
  return {
    name: "marko-debug",
    capabilities: {
      executeCommandProvider: {
        commands: ["marko.extractScript", "marko.extractHtml"],
      },
    },
    create(context) {
      return {
        executeCommand(command: string, [fileUri]: any[]) {
          const uri = URI.parse(fileUri);

          const sourceFile = context.language.scripts.get(uri);
          if (!sourceFile) {
            return;
          }

          const rootCode = sourceFile?.generated?.root;
          if (!(rootCode instanceof MarkoVirtualCode)) {
            return;
          }

          switch (command) {
            case "marko.extractScript": {
              const code = rootCode.embeddedCodes.find((code) => {
                return code.id === "script";
              });
              const content = code?.snapshot.getText(
                0,
                code.snapshot.getLength(),
              );
              return { content, language: "typescript" };
            }
            case "marko.extractHtml": {
              const code = rootCode.embeddedCodes.find((code) => {
                return code.id === "html";
              });
              const content = code?.snapshot.getText(
                0,
                code.snapshot.getLength(),
              );
              return { content, language: "html" };
            }
          }
        },
      };
    },
  };
};
