import path from "path";
import {
  CompletionItem,
  CompletionItemKind,
  Range,
  TextEdit,
} from "vscode-languageserver";
import type { Node } from "../../../utils/parser";
import isDocumentLinkAttr from "../util/is-document-link-attr";
import fileSystem, { FileType } from "../../../utils/file-system";
import resolveUrl from "../../../utils/resolve-url";
import type { CompletionMeta } from ".";

export async function AttrValue({
  document,
  offset,
  node,
  parsed,
  code,
}: CompletionMeta<Node.AttrValue>): Promise<void | CompletionItem[]> {
  const attr = node.parent;
  if (isDocumentLinkAttr(document, attr.parent, attr)) {
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
    const uri = resolveUrl(req, document.uri);

    if (uri) {
      const result: CompletionItem[] = [];
      const curFile = req === "." ? path.basename(document.uri) : undefined;
      const replaceRange = Range.create(
        document.positionAt(start + segmentStart + 1),
        document.positionAt(start + rawValue.length)
      );

      for (const [entry, type] of await fileSystem.readDirectory(uri)) {
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
                }
          );
        }
      }

      return result;
    }
  }
}
