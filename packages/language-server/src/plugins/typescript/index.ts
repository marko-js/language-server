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

  const startMetaOffset = startOffset - ATTRIBUTE_START_TAG.length;
  const endMetaOFfset = endOffset + ATTRIBUTE_END_TAG.length;

  const startMarker = document.getText({
    start: document.positionAt(startMetaOffset),
    end: diagnostic.range.start,
  });
  const endMarker = document.getText({
    start: diagnostic.range.end,
    end: document.positionAt(endMetaOFfset),
  });
  if (startMarker === ATTRIBUTE_START_TAG && endMarker === ATTRIBUTE_END_TAG) {
    // Attributes in the extracted script have quotes around them, the TypeScript
    // diagnostics range doesn't match the Marko template which means that Volar
    // doesn't display the diagnostics.
    // So, we wrap the extracted attribute names with comments so that we can
    // tell when the diagnostics are for an attribute.
    diagnostic.range.start.character = diagnostic.range.start.character + 1;
    diagnostic.range.end.character = diagnostic.range.end.character - 1;
  }
  return diagnostic;
}
