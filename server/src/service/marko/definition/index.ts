import type { DefinitionLink, DefinitionParams } from "vscode-languageserver";
import type { TextDocument } from "vscode-languageserver-textdocument";

import {
  type CompilerInfo,
  getCompilerInfo,
  getParsed,
} from "../../../utils/compiler";
import { NodeType, type Parsed } from "../../../utils/parser";
import type { Plugin, Result } from "../../types";

import { AttrName } from "./AttrName";
import { OpenTagName } from "./OpenTagName";

export type DefinitionResult = Result<DefinitionLink[]>;
export interface DefinitionMeta<N = unknown> extends CompilerInfo {
  document: TextDocument;
  params: DefinitionParams;
  parsed: Parsed;
  offset: number;
  code: string;
  node: N;
}

const handlers: Record<
  string,
  (data: DefinitionMeta<any>) => DefinitionResult
> = {
  OpenTagName,
  AttrName,
};

export const findDefinition: Plugin["findDefinition"] = async (doc, params) => {
  const parsed = getParsed(doc);
  const offset = doc.offsetAt(params.position);
  const node = parsed.nodeAt(offset);
  return (
    (await handlers[NodeType[node.type]]?.({
      document: doc,
      params,
      parsed,
      offset,
      node,
      code: doc.getText(),
      ...getCompilerInfo(doc),
    })) || []
  );
};
