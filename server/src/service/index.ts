import {
  CompletionItem,
  CompletionList,
  DefinitionLink,
  Diagnostic,
  Location,
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
  async doComplete(doc, params, cancel) {
    const result = CompletionList.create([], false);

    try {
      const requests = plugins.map((plugin) =>
        plugin.doComplete?.(doc, params, cancel)
      );
      for (const pending of requests) {
        const cur = await pending;
        if (cancel.isCancellationRequested) break;
        if (cur) {
          let items!: CompletionItem[];
          if (Array.isArray(cur)) {
            items = cur;
          } else {
            items = cur.items;
            result.isIncomplete ||= cur.isIncomplete;
          }

          result.items.push(...items);
        }
      }
    } catch (err) {
      result.isIncomplete = true;
      displayError(err);
    }

    return result;
  },
  async findDefinition(doc, params, cancel) {
    const result: (DefinitionLink | Location)[] = [];

    try {
      const requests = plugins.map((plugin) =>
        plugin.findDefinition?.(doc, params, cancel)
      );
      for (const pending of requests) {
        const cur = await pending;
        if (cancel.isCancellationRequested) break;
        if (cur) {
          if (Array.isArray(cur)) {
            result.push(...cur);
          } else {
            result.push(cur);
          }
        }
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
      const requests = plugins.map((plugin) =>
        plugin.doRename?.(doc, params, cancel)
      );
      for (const pending of requests) {
        const cur = await pending;
        if (cancel.isCancellationRequested) break;

        if (cur) {
          if (cur.changes) {
            if (changes) {
              for (const uri in cur.changes) {
                if (changes[uri]) {
                  changes[uri].push(...cur.changes[uri]);
                } else {
                  changes[uri] = cur.changes[uri];
                }
              }
            } else {
              changes = cur.changes;
            }
          }

          if (cur.changeAnnotations) {
            if (changeAnnotations) {
              Object.assign(changeAnnotations, cur.changeAnnotations);
            } else {
              changeAnnotations = cur.changeAnnotations;
            }
          }

          if (cur.documentChanges) {
            if (documentChanges) {
              documentChanges.push(...cur.documentChanges);
            } else {
              documentChanges = cur.documentChanges;
            }
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
  async doValidate(doc) {
    const result: Diagnostic[] = [];
    try {
      const requests = plugins.map((plugin) => plugin.doValidate?.(doc));
      for (const pending of requests) {
        const cur = await pending;
        if (cur) result.push(...cur);
      }
    } catch (err) {
      displayError(err);
    }

    return result;
  },
  format: MarkoPlugin.format,
};

export { service as default };
