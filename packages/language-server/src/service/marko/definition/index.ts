import type { DefinitionLink, DefinitionParams } from "vscode-languageserver";
import { NodeType } from "@marko/language-tools";

import { MarkoFile, getMarkoFile } from "../../../utils/file";
import type { Plugin, Result } from "../../types";

import { AttrName } from "./AttrName";
import { OpenTagName } from "./OpenTagName";

export type DefinitionResult = Result<DefinitionLink[]>;
export interface DefinitionMeta<N = unknown> {
  file: MarkoFile;
  params: DefinitionParams;
  offset: number;
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
  const file = getMarkoFile(doc);
  const offset = doc.offsetAt(params.position);
  const node = file.parsed.nodeAt(offset);
  return (
    (await handlers[NodeType[node.type]]?.({
      file,
      params,
      offset,
      node,
    })) || []
  );
};
