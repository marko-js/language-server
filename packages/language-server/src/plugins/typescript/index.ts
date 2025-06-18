import type {
  LanguageServicePlugin,
  LanguageServicePluginInstance,
} from "@volar/language-server";
import { create as createTypeScriptServices } from "volar-service-typescript";
import { URI } from "vscode-uri";

import { MarkoVirtualCode } from "../../language";

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

              const decoded = context.decodeEmbeddedDocumentUri(
                URI.parse(document.uri),
              );
              const sourceScript =
                decoded && context.language.scripts.get(decoded[0]);
              const rootCode = sourceScript?.generated?.root;
              const scriptCode =
                sourceScript?.generated?.embeddedCodes.get("script");

              if (rootCode instanceof MarkoVirtualCode && scriptCode) {
                return diagnostics.map((diagnostic) => {
                  const scriptStartOffset = document.offsetAt(
                    diagnostic.range.start,
                  );
                  const scriptEndOffset = document.offsetAt(
                    diagnostic.range.end,
                  );

                  for (const mapping of scriptCode.mappings) {
                    // If any of the mappings intersect with the diagnostic range,
                    // we can assume that the diagnostic is for that mapping.
                    //
                    // This should ideally capture all mappings in the diagnostic range.
                    const generatedStartOffset = mapping.generatedOffsets[0];
                    const generatedEndOffset =
                      generatedStartOffset + mapping.lengths[0];

                    if (
                      generatedStartOffset <= scriptEndOffset &&
                      scriptStartOffset <= generatedEndOffset
                    ) {
                      const start = document.positionAt(
                        mapping.generatedOffsets[0],
                      );
                      const end = document.positionAt(
                        mapping.generatedOffsets[0] + mapping.lengths[0],
                      );
                      diagnostic.range.start = start;
                      diagnostic.range.end = end;
                      return diagnostic;
                    }
                  }
                  return diagnostic;
                });
              }
            },
          };
        },
      };
    }
    return plugin;
  });
};
