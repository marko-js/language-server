import { dirname } from "path";
import { create as createPrettierService } from "volar-service-prettier";
import type { Connection, LanguageServicePlugin } from "@volar/language-server";
import { ShowMessageNotification } from "@volar/language-server";
import { MessageType } from "@volar/language-server";
import { URI } from "vscode-uri";
import { Project } from "@marko/language-tools";
import * as markoPrettier from "prettier-plugin-marko";
import { dynamicRequire } from "../../utils/importPackage";
import { getMarkoPrettierPluginPath, importPrettier } from "./package";

export function getMarkoPrettierService(
  connection: Connection,
): LanguageServicePlugin {
  let prettier: ReturnType<typeof importPrettier>;
  let prettierPluginPath: ReturnType<typeof getMarkoPrettierPluginPath>[0];
  let hasShownNotification = false;

  return createPrettierService(
    (context) => {
      for (const workspaceFolder of context.env.workspaceFolders) {
        if (workspaceFolder.scheme === "file") {
          prettier = importPrettier(workspaceFolder.fsPath);
          const [path] =
            getMarkoPrettierPluginPath(workspaceFolder.fsPath) ?? [];
          prettierPluginPath = path;
          if ((!prettier || !prettierPluginPath) && !hasShownNotification) {
            connection.sendNotification(ShowMessageNotification.type, {
              message:
                "Couldn't load `prettier` or `prettier-plugin-marko`. Formatting will not work. Please make sure those two packages are installed into your project and restart the language server.",
              type: MessageType.Warning,
            });
            hasShownNotification = true;
          }
        }
        return prettier;
      }
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
        const filePath = URI.parse(document.uri).fsPath;
        const fileDir = dirname(filePath);
        let configOptions = null;
        try {
          configOptions = await prettierInstance.resolveConfig(filePath, {
            useCache: false,
            editorconfig: true,
          });
        } catch (e) {
          connection.sendNotification(ShowMessageNotification.type, {
            message: `Failed to load Prettier config.\n\nError:\n${e}`,
            type: MessageType.Warning,
          });
          console.error("Failed to load Prettier config.", e);
        }

        const editorOptions = await context.env.getConfiguration<object>?.(
          "prettier",
          document.uri,
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
          if (prettierPluginPath) {
            resolvedPlugin = dynamicRequire(prettierPluginPath);
          } else {
            // TODO: Fallback to the built-in version of marko-prettier-plugin if the workspace doesn't have it installed.
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
          connection.sendNotification(ShowMessageNotification.type, {
            message: `Failed to configure marko-prettier-plugin.\n\nError:\n${e}`,
            type: MessageType.Warning,
          });
          console.error("Failed to load Prettier config.", e);
          return {
            ...resolvedConfig,
          };
        }
      },
    },
  );
}
