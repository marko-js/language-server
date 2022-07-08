import type { DefinitionParams, DefinitionLink } from "vscode-languageserver";
import type { TextDocument } from "vscode-languageserver-textdocument";
import { getCompilerInfo, parse } from "../../../utils/compiler";
import { NodeType } from "../../../utils/parser";
import type { Plugin, Result } from "../../types";
import { OpenTagName } from "./OpenTagName";
import { AttrName } from "./AttrName";

export type DefinitionResult = Result<DefinitionLink[]>;
export interface DefinitionMeta<N = unknown>
  extends ReturnType<typeof getCompilerInfo> {
  document: TextDocument;
  params: DefinitionParams;
  parsed: ReturnType<typeof parse>;
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
  const parsed = parse(doc);
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
