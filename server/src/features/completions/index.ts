import type { TaglibLookup } from "@marko/babel-utils";
import {
  type Connection,
  type TextDocuments,
  type CompletionParams,
  CompletionList,
} from "vscode-languageserver";
import type { TextDocument } from "vscode-languageserver-textdocument";
import { parse, getTagLibLookup } from "../../utils/compiler";
import { NodeType } from "../../utils/parser";
import { displayError } from "../messages";

import { Tag } from "./types/Tag";
import { OpenTagName } from "./types/OpenTagName";
import { AttrName } from "./types/AttrName";

export interface CompletionMeta<N = unknown> {
  lookup: TaglibLookup;
  document: TextDocument;
  params: CompletionParams;
  parsed: ReturnType<typeof parse>;
  offset: number;
  code: string;
  node: N;
}

const NO_COMPLETIONS = CompletionList.create([], true);
const HANDLERS: Record<
  string,
  (data: CompletionMeta<any>) => CompletionList | void
> = {
  Tag,
  OpenTagName,
  AttrName,
};

export default function setup(
  connection: Connection,
  documents: TextDocuments<TextDocument>
) {
  connection.onCompletion((params): CompletionList => {
    let result: CompletionList | void;

    try {
      const document = documents.get(params.textDocument.uri)!;
      const lookup = getTagLibLookup(document);
      if (lookup) {
        const offset = document.offsetAt(params.position);
        const code = document.getText();
        const parsed = parse(document);
        const node = parsed.nodeAt(offset);
        result = HANDLERS[NodeType[node.type]]?.({
          document,
          params,
          lookup,
          parsed,
          offset,
          code,
          node,
        });
      }
    } catch (e) {
      displayError(e);
    }

    return result || NO_COMPLETIONS;
  });
}
