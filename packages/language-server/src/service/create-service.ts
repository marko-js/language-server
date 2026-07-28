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
import {
  MarkupContent,
  MarkupKind,
  SemanticTokensBuilder,
} from "vscode-languageserver";
import type { TextDocument } from "vscode-languageserver-textdocument";

import type { Plugin, SemanticToken } from "./types";

const REG_MARKDOWN_CHARS = /[\\`*_{}[\]<>()#+.!|-]/g;

/**
 * Build the facade over a set of embedded plugins (eg css, typescript and our
 * own). The Node entry passes all four plugins; the browser entry omits the
 * jsdom-backed HTML plugin. Keeping the merge logic here (instead of in the
 * Node `index.ts`) lets both environments share a single implementation.
 */
export function createService(plugins: Partial<Plugin>[]): Plugin {
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
        for (const ref of result.value) {
          references ||= [];
          // Drop a reference overlapping one from an earlier plugin (eg a CSS
          // module class found by both the script and style plugins).
          if (
            !references.some(
              (it) => it.uri === ref.uri && rangesOverlap(it.range, ref.range),
            )
          ) {
            references.push(ref);
          }
        }
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
        plugins.map((plugin) =>
          plugin.findDocumentLinks?.(doc, params, cancel),
        ),
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
    async getSemanticTokens(doc, params, cancel) {
      const results = await Promise.allSettled(
        plugins.map(async (plugin) =>
          plugin.getSemanticTokens?.(doc, params, cancel),
        ),
      );

      if (cancel.isCancellationRequested) return;

      let tokens: SemanticToken[] | undefined;
      for (const result of results) {
        if (result.status === "rejected") {
          console.error(result.reason);
          continue;
        }
        if (!Array.isArray(result.value)) continue;

        for (const token of result.value) {
          const { start, end } = token.range;
          if (start.line === end.line) {
            if (start.character < end.character) {
              (tokens ||= []).push(token);
            }
            continue;
          }

          // No client this server has seen advertises multilineTokenSupport,
          // so split multiline tokens into one per line rather than emit them.
          for (let line = start.line; line <= end.line; line++) {
            const startCharacter = line === start.line ? start.character : 0;
            const endCharacter =
              line === end.line ? end.character : lineLength(doc, line);
            if (startCharacter < endCharacter) {
              (tokens ||= []).push({
                range: {
                  start: { line, character: startCharacter },
                  end: { line, character: endCharacter },
                },
                type: token.type,
                modifiers: token.modifiers,
              });
            }
          }
        }
      }

      if (!tokens) return;

      // A stable sort keeps plugin order for equal starts, and the `prevEnd`
      // watermark then drops any token overlapping one already kept -- so on
      // conflicting ranges the earliest plugin wins, mirroring the overlap
      // rules in findReferences/doRename. The watermark advances before the
      // range filter so full and range requests agree on which overlapping
      // token survives.
      tokens.sort(
        (a, b) =>
          a.range.start.line - b.range.start.line ||
          a.range.start.character - b.range.start.character,
      );

      const filterRange = "range" in params ? params.range : undefined;
      const builder = new SemanticTokensBuilder();
      let prevEnd: Range["end"] | undefined;
      for (const { range, type, modifiers } of tokens) {
        if (prevEnd && positionBefore(range.start, prevEnd)) continue;
        prevEnd = range.end;
        if (filterRange && !rangesOverlap(range, filterRange)) continue;
        builder.push(
          range.start.line,
          range.start.character,
          range.end.character - range.start.character,
          type,
          modifiers,
        );
      }

      return { data: builder.build().data };
    },
    async findDocumentColors(doc, params, cancel) {
      const results = await Promise.allSettled(
        plugins.map((plugin) =>
          plugin.findDocumentColors?.(doc, params, cancel),
        ),
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
    async prepareRename(doc, params, cancel) {
      for (const plugin of plugins) {
        try {
          const result = await plugin.prepareRename?.(doc, params, cancel);
          if (cancel.isCancellationRequested) return;
          if (result) return result;
        } catch {
          // ignore
        }
      }
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
          changes ||= {};

          for (const uri in value.changes) {
            const existing = (changes[uri] ||= []);
            for (const edit of value.changes[uri]) {
              // Drop an edit overlapping one from an earlier plugin, which would
              // otherwise corrupt the rename.
              if (!existing.some((it) => rangesOverlap(it.range, edit.range))) {
                existing.push(edit);
              }
            }
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
    async doCodeActionResolve(action, cancel) {
      for (const plugin of plugins) {
        try {
          const result = await plugin.doCodeActionResolve?.(action, cancel);
          if (cancel.isCancellationRequested) return;
          if (result) return result;
        } catch {
          // ignore
        }
      }
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
    format(doc, params, cancel) {
      for (const plugin of plugins) {
        if (plugin.format) return plugin.format(doc, params, cancel);
      }
    },
  };

  return service;
}

function positionBefore(a: Range["start"], b: Range["start"]) {
  return a.line < b.line || (a.line === b.line && a.character < b.character);
}

function lineLength(doc: TextDocument, line: number) {
  return doc
    .getText({
      start: { line, character: 0 },
      end: { line: line + 1, character: 0 },
    })
    .replace(/\r?\n$/, "").length;
}

/** Whether two ranges overlap (ie two plugins reported the same token). */
function rangesOverlap(a: Range, b: Range) {
  return positionBefore(a.start, b.end) && positionBefore(b.start, a.end);
}

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
