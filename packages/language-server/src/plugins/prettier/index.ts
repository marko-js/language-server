import { dirname } from "path";
import { create as createPrettierService } from "volar-service-prettier";
import type {
  FormattingOptions,
  LanguageServiceContext,
  LanguageServicePlugin,
} from "@volar/language-service";
import { Connection, ShowMessageNotification } from "@volar/language-server";
import { MessageType } from "@volar/language-server";
import { URI } from "vscode-uri";
import { Project } from "@marko/language-tools";
import * as markoPrettier from "prettier-plugin-marko";
import type { Options } from "prettier";
import * as prettierBuiltIn from "prettier";
import { importMarkoPrettierPlugin, importPrettier } from "./package";

export function createMarkoPrettierService(
  connection: Connection,
): LanguageServicePlugin {
  let prettier: typeof prettierBuiltIn | undefined;
  let prettierPlugin: typeof markoPrettier | undefined;
  let hasShownNotification = false;

  return createPrettierService(
    (context) => {
      const { prettierInstance, prettierPluginMarko } =
        getPrettierInstance(context);

      prettier = prettierInstance;
      prettierPlugin = prettierPluginMarko;

      // Show a warning notification if Prettier or the Marko plugin isn't installed.
      if ((!prettier || !prettierPlugin) && !hasShownNotification) {
        connection.sendNotification(ShowMessageNotification.type, {
          message:
            "Couldn't load `prettier` or `prettier-plugin-marko`. Falling back to built-in versions.",
          type: MessageType.Warning,
        });
        hasShownNotification = true;
      }

      if (!prettier) {
        // Fallback to the built-in version of prettier.
        prettier = prettierBuiltIn;
      }

      if (!prettierPlugin) {
        // Fallback to the built-in version of prettier-plugin-marko.
        prettierPlugin = markoPrettier;
      }

      return prettier;
    },
    {
      documentSelector: [{ language: "marko" }],
      isFormattingEnabled: async (prettier, document, _) => {
        const uri = URI.parse(document.uri);
        if (uri.scheme === "file") {
          const fileInfo = await prettier.getFileInfo(uri.fsPath, {
            ignorePath: ".prettierignore",
            resolveConfig: false,
          });
          if (fileInfo.ignored) {
            return false;
          }
        }
        return true;
      },
      getFormattingOptions: async (
        prettierInstance,
        document,
        formatOptions,
        context,
      ) => {
        return getFormattingOptions(
          prettierInstance,
          prettierPlugin!,
          document.uri,
          formatOptions,
          context,
          (message) => {
            connection.sendNotification(ShowMessageNotification.type, {
              message,
              type: MessageType.Warning,
            });
          },
        );
      },
    },
  );
}

export function getPrettierInstance(context: LanguageServiceContext): {
  prettierInstance?: typeof import("prettier");
  prettierPluginMarko?: typeof import("prettier-plugin-marko");
} {
  for (const workspaceFolder of context.env.workspaceFolders) {
    if (workspaceFolder.scheme === "file") {
      const prettierInstance = importPrettier(workspaceFolder.fsPath);
      const prettierPluginMarko = importMarkoPrettierPlugin(
        workspaceFolder.fsPath,
      );

      return { prettierInstance, prettierPluginMarko };
    }
  }
  return {};
}

export async function getFormattingOptions(
  prettierInstance: typeof import("prettier"),
  prettierPlugin: typeof markoPrettier,
  documentUriString: string,
  formatOptions: FormattingOptions,
  context: LanguageServiceContext,
  onError?: (message: string) => void,
): Promise<Options> {
  const uri = URI.parse(documentUriString);
  const documentUri = context.decodeEmbeddedDocumentUri(uri)?.[0] ?? uri;
  const filePath = documentUri.fsPath;

  if (!filePath) {
    return {};
  }

  const fileDir = dirname(filePath);
  let configOptions = null;
  try {
    configOptions = await prettierInstance.resolveConfig(filePath, {
      useCache: false,
      editorconfig: true,
    });
  } catch (e) {
    onError && onError(`Failed to load Prettier config.\n\nError:\n${e}`);
    console.error("Failed to load Prettier config.", e);
  }

  const editorOptions = await context.env.getConfiguration<object>?.(
    "prettier",
    documentUriString,
  );

  // Return a config with the following cascade:
  // - Prettier config file should always win if it exists, if it doesn't:
  // - Prettier config from the VS Code extension is used, if it doesn't exist:
  // - Use the editor's basic configuration settings
  const resolvedConfig = {
    filepath: filePath,
    tabWidth: formatOptions.tabSize,
    useTabs: !formatOptions.insertSpaces,
    ...editorOptions,
    ...configOptions,
  };

  try {
    prettierPlugin.setCompiler(
      Project.getCompiler(fileDir),
      Project.getConfig(fileDir),
    );

    return {
      ...resolvedConfig,
      plugins: [prettierPlugin, ...(resolvedConfig.plugins ?? [])],
      parser: "marko",
    };
  } catch (e) {
    onError &&
      onError(`Failed to configure marko-prettier-plugin.\n\nError:\n${e}`);
    console.error("Failed to load Prettier config.", e);
    return {
      ...resolvedConfig,
    };
  }
}
