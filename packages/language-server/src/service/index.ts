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
  Hover,
  Location,
  MarkedString,
  Range,
  SymbolInformation,
  WorkspaceEdit,
} from "vscode-languageserver";
import { MarkupContent, MarkupKind } from "vscode-languageserver";

import {
  doChange,
  doChangeWatchedFiles,
  doClose,
  doOpen,
  get,
} from "../utils/text-documents";
export const documents = {
  get,
  doChange,
  doOpen,
  doClose,
  doChangeWatchedFiles,
};

import HtmlPlugin from "./html";
import MarkoPlugin from "./marko";
import ScriptPlugin from "./script";
import StylePlugin from "./style";
import type { Plugin } from "./types";

const REG_MARKDOWN_CHARS = /[\\`*_{}[\]<>()#+.!|-]/g;
const plugins = [MarkoPlugin, ScriptPlugin, StylePlugin, HtmlPlugin];

/**
 * Facade to all embedded plugins, eg css, typescript and our own.
 */
const service: Plugin = {
  commands: Object.assign({}, ...plugins.map(({ commands }) => commands)),
  async initialize(params) {
    await Promise.allSettled(
      plugins.map((plugin) => plugin.initialize?.(params)),
    );
  },
  async doComplete(doc, params, cancel) {
    // TODO: this should handle CompletionList.itemDefaults.
    // If there is a single responding plugin, pass through, otherwise need to apply the defaults to the completion items for the plugin.

    // Used to filter out duplicate labels (highest sortText wins).
    const results = await Promise.allSettled(
      plugins.map((plugin) => plugin.doComplete?.(doc, params, cancel)),
    );

    if (cancel.isCancellationRequested) return;

    const itemsByLabel = new Map<string, CompletionItem>();
    for (const result of results) {
      if (result.status !== "fulfilled" || !result.value) continue;

      for (const item of Array.isArray(result.value)
        ? result.value
        : result.value.items) {
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

    return { items: [...itemsByLabel.values()], isIncomplete: true };
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
    const results = await Promise.allSettled(
      plugins.map((plugin) => plugin.findDefinition?.(doc, params, cancel)),
    );

    if (cancel.isCancellationRequested) return;

    let links: (Location | DefinitionLink)[] | undefined;
    for (const result of results) {
      if (result.status !== "fulfilled" || !result.value) continue;
      links = (links || []).concat(result.value);
    }

    return links;
  },
  async findReferences(doc, params, cancel) {
    const results = await Promise.allSettled(
      plugins.map((plugin) => plugin.findReferences?.(doc, params, cancel)),
    );

    if (cancel.isCancellationRequested) return;

    let references: Location[] | undefined;
    for (const result of results) {
      if (result.status !== "fulfilled" || !result.value) continue;
      references = (references || []).concat(result.value);
    }

    return references;
  },
  async findDocumentSymbols(doc, params, cancel) {
    const results = await Promise.allSettled(
      plugins.map((plugin) =>
        plugin.findDocumentSymbols?.(doc, params, cancel),
      ),
    );

    if (cancel.isCancellationRequested) return;

    let symbols: SymbolInformation[] | undefined;
    for (const result of results) {
      if (result.status !== "fulfilled" || !result.value) continue;
      symbols = (symbols || []).concat(result.value);
    }

    return symbols;
  },
  async findDocumentLinks(doc, params, cancel) {
    const results = await Promise.allSettled(
      plugins.map((plugin) => plugin.findDocumentLinks?.(doc, params, cancel)),
    );

    if (cancel.isCancellationRequested) return;

    let links: DocumentLink[] | undefined;
    for (const result of results) {
      if (result.status !== "fulfilled" || !result.value) continue;
      links = (links || []).concat(result.value);
    }

    return links;
  },
  async findDocumentHighlights(doc, params, cancel) {
    const results = await Promise.allSettled(
      plugins.map((plugin) =>
        plugin.findDocumentHighlights?.(doc, params, cancel),
      ),
    );

    if (cancel.isCancellationRequested) return;

    let highlights: DocumentHighlight[] | undefined;
    for (const result of results) {
      if (result.status !== "fulfilled" || !result.value) continue;
      highlights = (highlights || []).concat(result.value);
    }

    return highlights;
  },
  async findDocumentColors(doc, params, cancel) {
    const results = await Promise.allSettled(
      plugins.map((plugin) => plugin.findDocumentColors?.(doc, params, cancel)),
    );

    if (cancel.isCancellationRequested) return;

    let colors: ColorInformation[] | undefined;
    for (const result of results) {
      if (result.status !== "fulfilled" || !result.value) continue;
      colors = (colors || []).concat(result.value);
    }

    return colors;
  },
  async getColorPresentations(doc, params, cancel) {
    const results = await Promise.allSettled(
      plugins.map((plugin) =>
        plugin.getColorPresentations?.(doc, params, cancel),
      ),
    );

    if (cancel.isCancellationRequested) return;

    let presentations: ColorPresentation[] | undefined;
    for (const result of results) {
      if (result.status !== "fulfilled" || !result.value) continue;
      presentations = (presentations || []).concat(result.value);
    }

    return presentations;
  },
  async doHover(doc, params, cancel) {
    const results = await Promise.allSettled(
      plugins.map((plugin) => plugin.doHover?.(doc, params, cancel)),
    );

    if (cancel.isCancellationRequested) return;

    let hovers: Hover | undefined;
    for (const result of results) {
      if (result.status !== "fulfilled" || !result.value) continue;
      if (hovers) {
        hovers.range = maxRange(hovers.range, result.value.range);
        hovers.contents = mergeHoverContents(
          hovers.contents,
          result.value.contents,
        );
      } else {
        hovers = result.value;
      }
    }

    return hovers;
  },
  async doRename(doc, params, cancel) {
    const results = await Promise.allSettled(
      plugins.map((plugin) => plugin.doRename?.(doc, params, cancel)),
    );

    if (cancel.isCancellationRequested) return;

    let changes: WorkspaceEdit["changes"];
    let changeAnnotations: WorkspaceEdit["changeAnnotations"];
    let documentChanges: WorkspaceEdit["documentChanges"];
    for (const result of results) {
      if (result.status !== "fulfilled" || !result.value) continue;
      const { value } = result;
      if (value.changes) {
        if (changes) {
          changes = { ...changes };

          for (const uri in value.changes) {
            changes[uri] = changes[uri]
              ? changes[uri].concat(value.changes[uri])
              : value.changes[uri];
          }
        } else {
          changes = value.changes;
        }
      }

      if (value.changeAnnotations) {
        changeAnnotations = changeAnnotations
          ? {
              ...changeAnnotations,
              ...value.changeAnnotations,
            }
          : value.changeAnnotations;
      }

      if (value.documentChanges) {
        documentChanges = documentChanges
          ? documentChanges.concat(value.documentChanges)
          : value.documentChanges;
      }
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
    const results = await Promise.allSettled(
      plugins.map((plugin) => plugin.doCodeActions?.(doc, params, cancel)),
    );

    if (cancel.isCancellationRequested) return;

    let actions: (Command | CodeAction)[] | undefined;
    for (const result of results) {
      if (result.status !== "fulfilled" || !result.value) continue;
      actions = (actions || []).concat(result.value);
    }

    return actions;
  },
  async doValidate(doc) {
    const results = await Promise.allSettled(
      plugins.map((plugin) => plugin.doValidate?.(doc)),
    );

    let diagnostics: Diagnostic[] | undefined;
    for (const result of results) {
      if (result.status !== "fulfilled" || !result.value) continue;
      diagnostics = (diagnostics || []).concat(result.value);
    }

    return diagnostics;
  },
  format: MarkoPlugin.format!,
};

function maxRange(a: Range | undefined, b: Range | undefined) {
  if (!a) return b;
  if (!b) return a;
  return {
    start: {
      line: Math.min(a.start.line, b.start.line),
      character: Math.min(a.start.character, b.start.character),
    },
    end: {
      line: Math.max(a.end.line, b.end.line),
      character: Math.max(a.end.character, b.end.character),
    },
  };
}

function mergeHoverContents(a: Hover["contents"], b: Hover["contents"]) {
  if (!a) return b;
  if (!b) return a;

  if (!MarkupContent.is(a)) {
    a = markedStringToMarkupContent(a);
  }

  if (!MarkupContent.is(b)) {
    b = markedStringToMarkupContent(b);
  }

  if (a.kind === b.kind) {
    return {
      kind: a.kind,
      value: `${a.value}\n${b.value}`,
    };
  }

  return {
    kind: MarkupKind.Markdown,
    value: `${markupContentToMarkdown(a)}\n${markupContentToMarkdown(b)}`,
  };
}

function markedStringToMarkupContent(
  markedString: MarkedString | MarkedString[],
): MarkupContent {
  return {
    kind: MarkupKind.Markdown,
    value: Array.isArray(markedString)
      ? markedString.map((it) => markedStringToString(it)).join("\n")
      : markedStringToString(markedString),
  };
}

function markedStringToString(markedString: MarkedString) {
  if (typeof markedString === "string") {
    return markedString;
  }

  return `\`\`\`${markedString.language}\n${markedString.value}\n\`\`\``;
}

function markupContentToMarkdown(content: MarkupContent): string {
  return content.kind === MarkupKind.Markdown
    ? content.value
    : escapeMarkdown(content.value);
}

function escapeMarkdown(str: string) {
  return str.replace(REG_MARKDOWN_CHARS, "$1");
}

export { service as default };
