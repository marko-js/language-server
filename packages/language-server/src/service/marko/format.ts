import { createRequire } from "module";
import path from "path";
import * as prettier from "prettier";
import * as markoPrettier from "prettier-plugin-marko";
import { CancellationToken, TextEdit } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";

import { START_POSITION } from "../../utils/constants";
import { getFSPath } from "../../utils/file";
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
    const filepath = getFSPath(doc);
    const text = doc.getText();
    const formatted = await formatWithProjectConfig(text, filepath, {
      tabWidth: formatOptions.tabSize,
      useTabs: formatOptions.insertSpaces === false,
      markoSyntax: formatOptions.mode ?? "auto",
    });

    if (cancel?.isCancellationRequested) return;

    // TODO: format selection
    return [
      TextEdit.replace(
        {
          start: START_POSITION,
          end: doc.positionAt(text.length),
        },
        formatted,
      ),
    ];
  } catch (e) {
    displayError(e);
  }
}

export const format: Plugin["format"] = async (doc, params, cancel) => {
  return formatDocument(doc, params.options, cancel);
};

/**
 * Formats Marko code with the project's prettier config over the given options.
 * The config's plugins are resolved from the config file, since prettier
 * resolves a plugin name from the process's working directory, and the Marko
 * plugin is always kept, which a config's `plugins` would otherwise replace.
 */
export async function formatWithProjectConfig(
  text: string,
  filepath: string | undefined,
  options?: prettier.Options,
) {
  const base: prettier.Options = {
    parser: "marko",
    filepath,
    ...options,
    plugins: [markoPrettier],
  };
  const [config, configFile] = filepath
    ? await Promise.all([
        prettier
          .resolveConfig(filepath, { editorconfig: true })
          .catch(() => null),
        prettier.resolveConfigFile(filepath).catch(() => null),
      ])
    : [null, null];
  if (!config) return prettier.format(text, base);

  const plugins = resolvePlugins(config.plugins, configFile ?? filepath!);
  const withConfig = {
    ...base,
    ...config,
    plugins: [markoPrettier, ...plugins],
  };
  try {
    return await prettier.format(text, withConfig);
  } catch (err) {
    if (!plugins.length) throw err;
    // A project plugin that cannot load or run should not stop Marko formatting.
    return prettier.format(text, { ...withConfig, plugins: [markoPrettier] });
  }
}

function resolvePlugins(plugins: prettier.Options["plugins"], from: string) {
  const require = createRequire(from);
  return (plugins ?? []).map((plugin) => {
    if (typeof plugin !== "string" || path.isAbsolute(plugin)) return plugin;
    try {
      return require.resolve(plugin);
    } catch {
      return plugin;
    }
  });
}
