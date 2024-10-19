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
import { Options } from "prettier";
import { dynamicRequire } from "../../utils/importPackage";
import { getMarkoPrettierPluginPath, importPrettier } from "./package";

export function getMarkoPrettierService(
  connection: Connection,
): LanguageServicePlugin {
  let prettier: typeof import("prettier") | undefined;
  let prettierPluginPath: string | undefined;
  let hasShownNotification = false;

  return createPrettierService(
    (context) => {
      const { prettierInstance, markoPluginPath } =
        getPrettierInstance(context);

      prettier = prettierInstance;
      prettierPluginPath = markoPluginPath;

      // Show a warning notification if Prettier or the Marko plugin isn't installed.
      if ((!prettier || !prettierPluginPath) && !hasShownNotification) {
        connection.sendNotification(ShowMessageNotification.type, {
          message:
            "Couldn't load `prettier` or `prettier-plugin-marko`. Formatting will not work. Please make sure those two packages are installed into your project and restart the language server.",
          type: MessageType.Warning,
        });
        hasShownNotification = true;
      }

      return prettierInstance;
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
          prettierPluginPath,
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
  markoPluginPath?: string;
} {
  for (const workspaceFolder of context.env.workspaceFolders) {
    if (workspaceFolder.scheme === "file") {
      const prettierInstance = importPrettier(workspaceFolder.fsPath);
      const markoPluginPath = getMarkoPrettierPluginPath(
        workspaceFolder.fsPath,
      );

      return { prettierInstance, markoPluginPath };
    }
  }
  return {};
}

export async function getFormattingOptions(
  prettierInstance: typeof import("prettier"),
  markoPluginPath: string | undefined,
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
    let resolvedPlugin;
    if (markoPluginPath) {
      resolvedPlugin = dynamicRequire(markoPluginPath);
    } else {
      resolvedPlugin = markoPrettier;
    }

    resolvedPlugin.setCompiler(
      Project.getCompiler(fileDir),
      Project.getConfig(fileDir),
    );

    return {
      ...resolvedConfig,
      plugins: [resolvedPlugin, ...(resolvedConfig.plugins ?? [])],
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
