import type { TaglibLookup } from "@marko/babel-utils";
import type { DefinitionParams } from "vscode-languageserver";
import type { TextDocument } from "vscode-languageserver-textdocument";
import type { Node, parse } from "../../utils/parser";

export interface DefinitionMeta<N extends Node.AnyNode> {
  lookup: TaglibLookup;
  document: TextDocument;
  params: DefinitionParams;
  parsed: ReturnType<typeof parse>;
  offset: number;
  code: string;
  node: N;
}
