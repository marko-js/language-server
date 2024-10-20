import {
  LanguageServicePlugin,
  LanguageServicePluginInstance,
} from "@volar/language-service";
import { TextDocument } from "vscode-languageserver-textdocument";
import { URI } from "vscode-uri";
import { MarkoVirtualCode } from "../core/marko-plugin";
import { provideCompletions } from "./complete";
import { provideHover } from "./hover";
import { provideValidations } from "./validate";
import { provideDefinitions } from "./definition";
// import { provideDocumentSymbols } from "./document-symbols";

export const create = (
  _: typeof import("typescript"),
): LanguageServicePlugin => {
  return {
    name: "marko",
    capabilities: {
      hoverProvider: true,
      definitionProvider: true,
      diagnosticProvider: {
        interFileDependencies: false,
        workspaceDiagnostics: false,
      },
      completionProvider: {
        triggerCharacters: [
          ".",
          ":",
          "<",
          ">",
          "@",
          "/",
          '"',
          "'",
          "`",
          " ",
          "=",
          "*",
          "#",
          "$",
          "+",
          "^",
          "(",
          "[",
          "-",
        ],
      },
    },
    create(context): LanguageServicePluginInstance {
      return {
        // TODO: Is this necessary?
        // provideDocumentSymbols(document, token) {
        //   if (token.isCancellationRequested) return;
        //   return worker(document, (virtualCode) => {
        //     return provideDocumentSymbols(virtualCode);
        //   });
        // },
        provideDefinition(document, position, token) {
          if (token.isCancellationRequested) return;
          return worker(document, (virtualCode) => {
            const offset = document.offsetAt(position);
            return provideDefinitions(virtualCode, offset);
          });
        },
        provideDiagnostics(document, token) {
          if (token.isCancellationRequested) return;
          return worker(document, async (virtualCode) => {
            const validations = await provideValidations(virtualCode);
            if (validations.length) {
              console.log("validations", validations);
            }
            return validations;
          });
        },
        provideHover(document, position, token) {
          if (token.isCancellationRequested) return;
          return worker(document, (virtualCode) => {
            const offset = document.offsetAt(position);
            return provideHover(virtualCode, offset);
          });
        },
        provideCompletionItems(document, position, _, token) {
          if (token.isCancellationRequested) return;
          return worker(document, (virtualCode) => {
            const offset = document.offsetAt(position);
            const completions = provideCompletions(virtualCode, offset);

            if (completions) {
              return {
                isIncomplete: false,
                items: completions.map((it) => {
                  it.data.source = "marko";
                  return it;
                }),
              };
            }

            return {
              items: [],
              isIncomplete: true,
            };
          });
        },
      };

      function worker<T>(
        document: TextDocument,
        callback: (markoDocument: MarkoVirtualCode) => T,
      ): T | undefined {
        const decoded = context.decodeEmbeddedDocumentUri(
          URI.parse(document.uri),
        );
        const sourceScript =
          decoded && context.language.scripts.get(decoded[0]);
        const virtualCode =
          decoded && sourceScript?.generated?.embeddedCodes.get(decoded[1]);
        if (!(virtualCode instanceof MarkoVirtualCode)) return;

        return callback(virtualCode);
      }
    },
  };
};

// export default {
//   findDocumentLinks,
//   findDocumentSymbols,
