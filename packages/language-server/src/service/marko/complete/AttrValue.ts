import type { Node } from "@marko/language-tools";
import path from "path";
import {
  CompletionItem,
  CompletionItemKind,
  TextEdit,
} from "vscode-languageserver";

import fileSystem, { FileType } from "../../../utils/file-system";
import resolveUrl from "../../../utils/resolve-url";
import getContextFromAttr from "../util/context-from-attr";
import isDocumentLinkAttr from "../util/is-document-link-attr";
import getTagShorthandCompletions from "../util/tag-shorthand-completions";
import type { CompletionMeta } from ".";

// The shorthand tag name inside a `from=` string (eg `"<foo>"` or `"<fo`).
const fromTagReg = /^<((?:[^'">\\]|\\.)*)(>?)/;

export async function AttrValue({
  offset,
  node,
  file,
}: CompletionMeta<Node.AttrValue>): Promise<void | CompletionItem[]> {
  const { uri, parsed, code } = file;
  const attr = node.parent;
  const fromAttr = getContextFromAttr(code, attr.parent, attr);

  if (fromAttr) {
    const start = node.value.start + 1;
    const content = parsed.read({ start, end: node.value.end - 1 });
    const match = fromTagReg.exec(content);
    if (match || !content) {
      // Complete the `"<tag-name>"` form; a `.`-led value falls through to
      // the relative path completion below.
      const [, name = "", close = ""] = match || [];
      const nameStart = start + (match ? 1 : 0);
      const items = getTagShorthandCompletions(
        file,
        { start: nameStart, end: nameStart + name.length },
        close ? "" : ">",
      );
      if (!match) {
        for (const item of items) {
          item.textEdit!.newText = `<${item.textEdit!.newText}`;
        }
      }
      return items;
    }
  }

  if (fromAttr || isDocumentLinkAttr(code, attr.parent, attr)) {
    const start = node.value.start + 1;
    if (code[start] !== ".") return; // only resolve relative paths

    const end = node.value.end - 1;
    const relativeOffset = offset - start;
    const rawValue = parsed.read({
      start,
      end,
    });

    const segmentStart = rawValue.lastIndexOf("/", relativeOffset);
    if (segmentStart === -1) return; // only resolve after a slash.

    const req = rawValue.slice(0, segmentStart);
    const resolved = resolveUrl(req, uri);

    if (resolved) {
      const result: CompletionItem[] = [];
      const curFile = req === "." ? path.basename(uri) : undefined;
      const replaceRange = parsed.locationAt({
        start: start + segmentStart + 1,
        end: start + rawValue.length,
      });

      for (const [entry, type] of await fileSystem.readDirectory(resolved)) {
        if (entry[0] !== "." && entry !== curFile) {
          result.push(
            type === FileType.Directory
              ? {
                  label: `${entry}/`,
                  kind: CompletionItemKind.Folder,
                  textEdit: TextEdit.replace(replaceRange, `${entry}/`),
                  command: {
                    title: "Suggest",
                    command: "editor.action.triggerSuggest",
                  },
                }
              : {
                  label: entry,
                  kind: CompletionItemKind.File,
                  textEdit: TextEdit.replace(replaceRange, entry),
                },
          );
        }
      }

      return result;
    }
  }
}
