import {
  CodeAction,
  ColorInformation,
  ColorPresentation,
  Command,
  CompletionItem,
  CompletionList,
  DefinitionLink,
  Diagnostic,
  DocumentHighlight,
  DocumentLink,
  Location,
  SymbolInformation,
  WorkspaceEdit,
} from "vscode-languageserver";
import { displayError } from "../utils/messages";
import type { Plugin } from "./types";

import MarkoPlugin from "./marko";
import StyleSheetPlugin from "./stylesheet";
const plugins = [MarkoPlugin, StyleSheetPlugin];

/**
 * Facade to all embedded plugins, eg css, typescript and our own.
 */
const service: Plugin = {
  async initialize(params) {
    await Promise.all(plugins.map((plugin) => plugin.initialize?.(params)));
  },
  async doComplete(doc, params, cancel) {
    let items: CompletionItem[] | undefined;
    let isIncomplete = false;
    // TODO: this should handle CompletionList.itemDefaults.
    // If there is a single responding plugin, pass through, otherwise need to apply the defaults to the completion items for the plugin.

    try {
      for (const pending of plugins.map((plugin) =>
        plugin.doComplete?.(doc, params, cancel)
      )) {
        const cur = await pending;
        if (cancel.isCancellationRequested) return;
        if (cur) {
          let curItems!: CompletionItem[];
          if (Array.isArray(cur)) {
            curItems = cur;
          } else {
            curItems = cur.items;
            isIncomplete ||= cur.isIncomplete;
          }

          items = items ? items.concat(curItems) : curItems;
        }
      }
    } catch (err) {
      isIncomplete = true;
      displayError(err);
    }

    if (items) {
      return CompletionList.create(items, isIncomplete);
    }
  },
  async findDefinition(doc, params, cancel) {
    let result: (Location | DefinitionLink)[] | undefined;

    try {
      for (const pending of plugins.map((plugin) =>
        plugin.findDefinition?.(doc, params, cancel)
      )) {
        const cur = await pending;
        if (cancel.isCancellationRequested) return;
        if (cur) result = (result || []).concat(cur);
      }
    } catch (err) {
      displayError(err);
    }

    return result;
  },
  async findReferences(doc, params, cancel) {
    let result: Location[] | undefined;

    try {
      for (const pending of plugins.map((plugin) =>
        plugin.findReferences?.(doc, params, cancel)
      )) {
        const cur = await pending;
        if (cancel.isCancellationRequested) return;
        if (cur) result = result ? result.concat(cur) : cur;
      }
    } catch (err) {
      displayError(err);
    }

    return result;
  },
  async findDocumentSymbols(doc, params, cancel) {
    let result: SymbolInformation[] | undefined;

    try {
      for (const pending of plugins.map((plugin) =>
        plugin.findDocumentSymbols?.(doc, params, cancel)
      )) {
        const cur = await pending;
        if (cancel.isCancellationRequested) return;
        if (cur) result = result ? result.concat(cur) : cur;
      }
    } catch (err) {
      displayError(err);
    }

    return result;
  },
  async findDocumentLinks(doc, params, cancel) {
    let result: DocumentLink[] | undefined;

    try {
      for (const pending of plugins.map((plugin) =>
        plugin.findDocumentLinks?.(doc, params, cancel)
      )) {
        const cur = await pending;
        if (cancel.isCancellationRequested) return;
        if (cur) result = result ? result.concat(cur) : cur;
      }
    } catch (err) {
      displayError(err);
    }

    return result;
  },
  async findDocumentHighlights(doc, params, cancel) {
    let result: DocumentHighlight[] | undefined;

    try {
      for (const pending of plugins.map((plugin) =>
        plugin.findDocumentHighlights?.(doc, params, cancel)
      )) {
        const cur = await pending;
        if (cancel.isCancellationRequested) return;
        if (cur) result = result ? result.concat(cur) : cur;
      }
    } catch (err) {
      displayError(err);
    }

    return result;
  },
  async findDocumentColors(doc, params, cancel) {
    let result: ColorInformation[] | undefined;

    try {
      for (const pending of plugins.map((plugin) =>
        plugin.findDocumentColors?.(doc, params, cancel)
      )) {
        const cur = await pending;
        if (cancel.isCancellationRequested) return;
        if (cur) result = result ? result.concat(cur) : cur;
      }
    } catch (err) {
      displayError(err);
    }

    return result;
  },
  async getColorPresentations(doc, params, cancel) {
    let result: ColorPresentation[] | undefined;

    try {
      for (const pending of plugins.map((plugin) =>
        plugin.getColorPresentations?.(doc, params, cancel)
      )) {
        const cur = await pending;
        if (cancel.isCancellationRequested) return;
        if (cur) result = result ? result.concat(cur) : cur;
      }
    } catch (err) {
      displayError(err);
    }

    return result;
  },
  async doHover(doc, params, cancel) {
    try {
      for (const plugin of plugins) {
        const result = await plugin.doHover?.(doc, params, cancel);
        if (cancel.isCancellationRequested) return;
        if (result) return result;
      }
    } catch (err) {
      displayError(err);
    }
  },
  async doRename(doc, params, cancel) {
    let changes: WorkspaceEdit["changes"];
    let changeAnnotations: WorkspaceEdit["changeAnnotations"];
    let documentChanges: WorkspaceEdit["documentChanges"];

    try {
      for (const pending of plugins.map((plugin) =>
        plugin.doRename?.(doc, params, cancel)
      )) {
        const cur = await pending;
        if (cancel.isCancellationRequested) return;

        if (cur) {
          if (cur.changes) {
            if (changes) {
              changes = { ...changes };

              for (const uri in cur.changes) {
                changes[uri] = changes[uri]
                  ? changes[uri].concat(cur.changes[uri])
                  : cur.changes[uri];
              }
            } else {
              changes = cur.changes;
            }
          }

          if (cur.changeAnnotations) {
            changeAnnotations = changeAnnotations
              ? {
                  ...changeAnnotations,
                  ...cur.changeAnnotations,
                }
              : cur.changeAnnotations;
          }

          if (cur.documentChanges) {
            documentChanges = documentChanges
              ? documentChanges.concat(cur.documentChanges)
              : cur.documentChanges;
          }
        }
      }
    } catch (err) {
      displayError(err);
    }

    if (changes || changeAnnotations || documentChanges) {
      return {
        changes,
        changeAnnotations,
        documentChanges,
      };
    }
  },
  async doCodeActions(doc, params, cancel) {
    let result: (Command | CodeAction)[] | undefined;

    try {
      for (const pending of plugins.map((plugin) =>
        plugin.doCodeActions?.(doc, params, cancel)
      )) {
        const cur = await pending;
        if (cancel.isCancellationRequested) return;
        if (cur) result = result ? result.concat(cur) : cur;
      }
    } catch (err) {
      displayError(err);
    }

    return result;
  },
  async doValidate(doc) {
    let result: Diagnostic[] | undefined;
    try {
      for (const pending of plugins.map((plugin) => plugin.doValidate?.(doc))) {
        const cur = await pending;
        if (cur) result = result ? result.concat(cur) : cur;
      }
    } catch (err) {
      displayError(err);
    }

    return result;
  },
  format: MarkoPlugin.format,
};

export { service as default };
