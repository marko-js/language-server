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

    let segmentStart = rawValue.lastIndexOf("/", relativeOffset);
    if (segmentStart === -1) segmentStart = relativeOffset;

    const resolveRequest = rawValue.slice(0, segmentStart) || ".";
    const dir = resolveUrl(resolveRequest, document.uri);

    if (dir?.[0] === "/") {
      const result: CompletionItem[] = [];
      const curDir =
        resolveRequest === "." ? dir : resolveUrl(".", document.uri);
      const curFile = curDir === dir ? path.basename(document.uri) : undefined;
      const replaceRange = Range.create(
        document.positionAt(start + segmentStart + 1),
        document.positionAt(start + rawValue.length)
      );

      for (const [entry, type] of await fileSystem.readDirectory(dir)) {
        if (entry[0] !== "." && entry !== curFile) {
          const isDir = type === FileType.Directory;
          const label = isDir ? `${entry}/` : entry;
          result.push({
            label,
            kind: isDir ? CompletionItemKind.Folder : CompletionItemKind.File,
            textEdit: TextEdit.replace(replaceRange, label),
            command: isDir
              ? {
                  title: "Suggest",
                  command: "editor.action.triggerSuggest",
                }
              : undefined,
          });
        }
      }

      return result;
    }
  }
}
