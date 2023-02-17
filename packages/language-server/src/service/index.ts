import type {
  CodeAction,
  ColorInformation,
  ColorPresentation,
  Command,
  CompletionItem,
  DefinitionLink,
  Diagnostic,
  DocumentHighlight,
  DocumentLink,
  Location,
  SymbolInformation,
  WorkspaceEdit,
} from "vscode-languageserver";

import type { Plugin } from "./types";
import MarkoPlugin from "./marko";
import ScriptPlugin from "./script";
import StylePlugin from "./style";
const plugins = [MarkoPlugin, ScriptPlugin, StylePlugin];

/**
 * Facade to all embedded plugins, eg css, typescript and our own.
 */
const service: Plugin = {
  commands: Object.assign({}, ...plugins.map(({ commands }) => commands)),
  async initialize(params) {
    await Promise.allSettled(
      plugins.map((plugin) => plugin.initialize?.(params))
    );
  },
  async doComplete(doc, params, cancel) {
    let isIncomplete = false;
    // TODO: this should handle CompletionList.itemDefaults.
    // If there is a single responding plugin, pass through, otherwise need to apply the defaults to the completion items for the plugin.

    // Used to filter out duplicate labels (highest sortText wins).
    const itemsByLabel = new Map<string, CompletionItem>();

    await Promise.allSettled(
      plugins.map(async (plugin) => {
        const cur = await plugin.doComplete?.(doc, params, cancel);
        if (cancel.isCancellationRequested) return;
        if (cur) {
          let curItems!: CompletionItem[];
          if (Array.isArray(cur)) {
            curItems = cur;
          } else {
            curItems = cur.items;
            isIncomplete ||= cur.isIncomplete;
          }

          for (const item of curItems) {
            const { label } = item;
            const existingItem = itemsByLabel.get(label);
            if (existingItem) {
              if ((existingItem.sortText || label) < (item.sortText || label)) {
                itemsByLabel.set(label, item);
              }
            } else {
              itemsByLabel.set(label, item);
            }
          }
        }
      })
    );

    if (cancel.isCancellationRequested) return;

    if (itemsByLabel.size) {
      return { items: [...itemsByLabel.values()], isIncomplete };
    }
  },
  async doCompletionResolve(item, cancel) {
    for (const plugin of plugins) {
      try {
        const result = await plugin.doCompletionResolve?.(item, cancel);
        if (cancel.isCancellationRequested) return;
        if (result) return result;
      } catch {
        // ignore
      }
    }
  },
  async findDefinition(doc, params, cancel) {
    let result: (Location | DefinitionLink)[] | undefined;

    await Promise.allSettled(
      plugins.map(async (plugin) => {
        const cur = await plugin.findDefinition?.(doc, params, cancel);
        if (cancel.isCancellationRequested) return;
        if (cur) result = (result || []).concat(cur);
      })
    );

    if (cancel.isCancellationRequested) return;
    return result;
  },
  async findReferences(doc, params, cancel) {
    let result: Location[] | undefined;

    await Promise.allSettled(
      plugins.map(async (plugin) => {
        const cur = await plugin.findReferences?.(doc, params, cancel);
        if (cancel.isCancellationRequested) return;
        if (cur) result = (result || []).concat(cur);
      })
    );

    if (cancel.isCancellationRequested) return;
    return result;
  },
  async findDocumentSymbols(doc, params, cancel) {
    let result: SymbolInformation[] | undefined;

    await Promise.allSettled(
      plugins.map(async (plugin) => {
        const cur = await plugin.findDocumentSymbols?.(doc, params, cancel);
        if (cancel.isCancellationRequested) return;
        if (cur) result = (result || []).concat(cur);
      })
    );

    if (cancel.isCancellationRequested) return;
    return result;
  },
  async findDocumentLinks(doc, params, cancel) {
    let result: DocumentLink[] | undefined;

    await Promise.allSettled(
      plugins.map(async (plugin) => {
        const cur = await plugin.findDocumentLinks?.(doc, params, cancel);
        if (cancel.isCancellationRequested) return;
        if (cur) result = (result || []).concat(cur);
      })
    );

    if (cancel.isCancellationRequested) return;
    return result;
  },
  async findDocumentHighlights(doc, params, cancel) {
    let result: DocumentHighlight[] | undefined;

    await Promise.allSettled(
      plugins.map(async (plugin) => {
        const cur = await plugin.findDocumentHighlights?.(doc, params, cancel);
        if (cancel.isCancellationRequested) return;
        if (cur) result = (result || []).concat(cur);
      })
    );

    if (cancel.isCancellationRequested) return;
    return result;
  },
  async findDocumentColors(doc, params, cancel) {
    let result: ColorInformation[] | undefined;

    await Promise.allSettled(
      plugins.map(async (plugin) => {
        const cur = await plugin.findDocumentColors?.(doc, params, cancel);
        if (cancel.isCancellationRequested) return;
        if (cur) result = (result || []).concat(cur);
      })
    );

    if (cancel.isCancellationRequested) return;
    return result;
  },
  async getColorPresentations(doc, params, cancel) {
    let result: ColorPresentation[] | undefined;

    await Promise.allSettled(
      plugins.map(async (plugin) => {
        const cur = await plugin.getColorPresentations?.(doc, params, cancel);
        if (cancel.isCancellationRequested) return;
        if (cur) result = (result || []).concat(cur);
      })
    );

    if (cancel.isCancellationRequested) return;
    return result;
  },
  async doHover(doc, params, cancel) {
    for (const plugin of plugins) {
      try {
        const result = await plugin.doHover?.(doc, params, cancel);
        if (cancel.isCancellationRequested) return;
        if (result) return result;
      } catch {
        // ignore
      }
    }
  },
  async doRename(doc, params, cancel) {
    let changes: WorkspaceEdit["changes"];
    let changeAnnotations: WorkspaceEdit["changeAnnotations"];
    let documentChanges: WorkspaceEdit["documentChanges"];

    await Promise.allSettled(
      plugins.map(async (plugin) => {
        const cur = await plugin.doRename?.(doc, params, cancel);
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
      })
    );

    if (cancel.isCancellationRequested) return;
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

    await Promise.allSettled(
      plugins.map(async (plugin) => {
        const cur = await plugin.doCodeActions?.(doc, params, cancel);
        if (cancel.isCancellationRequested) return;
        if (cur) result = (result || []).concat(cur);
      })
    );

    if (cancel.isCancellationRequested) return;
    return result;
  },
  async doValidate(doc) {
    let result: Diagnostic[] | undefined;

    await Promise.allSettled(
      plugins.map(async (plugin) => {
        const cur = await plugin.doValidate?.(doc);
        if (cur) result = (result || []).concat(cur);
      })
    );

    return result;
  },
  format: MarkoPlugin.format,
};

export { service as default };
