import type {
  Diagnostic,
  LanguageServicePlugin,
  LanguageServicePluginInstance,
} from "@volar/language-server";
import { create as createTypeScriptServices } from "volar-service-typescript";
import { TextDocument } from "vscode-languageserver-textdocument";

export const create = (
  ts: typeof import("typescript"),
): LanguageServicePlugin[] => {
  const tsServicePlugins = createTypeScriptServices(
    ts as typeof import("typescript"),
    {},
  );
  return tsServicePlugins.map<LanguageServicePlugin>((plugin) => {
    if (plugin.name === "typescript-semantic") {
      return {
        ...plugin,
        create(context): LanguageServicePluginInstance {
          const typeScriptPlugin = plugin.create(context);
          return {
            ...typeScriptPlugin,
            async provideDiagnostics(document, token) {
              const diagnostics = await typeScriptPlugin.provideDiagnostics?.(
                document,
                token,
              );
              if (!diagnostics) return null;

              return diagnostics.map((diagnostic) => {
                if (
                  diagnostic.code ===
                  DiagnosticCodes.ObjectLiteralKnownPropertyNames
                ) {
                  console.log(
                    "Adjusting diagnostic range for TS2353 error code",
                  );
                  return adjustDiagnostic(diagnostic, document);
                }
                return diagnostic;
              });
            },
          };
        },
      };
    }
    return plugin;
  });
};

const ATTRIBUTE_START_TAG = "/**attribute-name-start*/";
const ATTRIBUTE_END_TAG = "/**attribute-name-end*/";

// https://github.com/Microsoft/TypeScript/blob/main/src/compiler/diagnosticMessages.json
const DiagnosticCodes = {
  ObjectLiteralKnownPropertyNames: 2353,
};

function adjustDiagnostic(
  diagnostic: Diagnostic,
  document: TextDocument,
): Diagnostic {
  const startOffset = document.offsetAt(diagnostic.range.start);
  const endOffset = document.offsetAt(diagnostic.range.end);

  const startMarkerIndex = document.lastIndexOf(
    ATTRIBUTE_START_TAG,
    startOffset,
  );
  const endMarkerIndex = documentText.indexOf(ATTRIBUTE_END_TAG, endOffset);
  if (
    startMarkerIndex !== -1 &&
    endMarkerIndex !== -1 &&
    startMarkerIndex < diagnostic.range.start.character &&
    endMarkerIndex > diagnostic.range.end.character
  ) {
    console.log(
      "Adjusting diagnostic range for TS2353 error code in attributes",
    );
    diagnostic.range.start.character =
      startMarkerIndex + ATTRIBUTE_START_TAG.length; // Adjust start character
    diagnostic.range.end.character = endMarkerIndex; // Adjust end character
  }
  return diagnostic;
}
