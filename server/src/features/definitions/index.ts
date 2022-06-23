import type { TaglibLookup } from "@marko/babel-utils";
import type {
  Connection,
  TextDocuments,
  DefinitionParams,
  Definition,
  DefinitionLink,
} from "vscode-languageserver";
import type { TextDocument } from "vscode-languageserver-textdocument";
import { parse, getTagLibLookup } from "../../utils/compiler";
import { NodeType } from "../../utils/parser";
import { displayError } from "../messages";

import { OpenTagName } from "./types/OpenTagName";
import { AttrName } from "./types/AttrName";

export interface DefinitionMeta<N = unknown> {
  lookup: TaglibLookup;
  document: TextDocument;
  params: DefinitionParams;
  parsed: ReturnType<typeof parse>;
  offset: number;
  code: string;
  node: N;
}

const NO_DEFINITIONS: DefinitionLink[] = [];
const HANDLERS: Record<
  string,
  (data: DefinitionMeta<any>) => Definition | DefinitionLink[] | void
> = {
  OpenTagName,
  AttrName,
};

export default function setup(
  connection: Connection,
  documents: TextDocuments<TextDocument>
) {
  connection.onDefinition((params) => {
    let result: Definition | DefinitionLink[] | void;
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

    return result || NO_DEFINITIONS;
  });
}
