import type { Hover, HoverParams } from "vscode-languageserver";
import { NodeType } from "@marko/language-tools";

import { MarkoFile, getMarkoFile } from "../../../utils/file";
import type { Plugin, Result } from "../../types";

import { OpenTagName } from "./OpenTagName";

export type HoverResult = Result<Hover>;
export interface HoverMeta<N = unknown> {
  file: MarkoFile;
  params: HoverParams;
  offset: number;
  node: N;
}

const handlers: Record<string, (data: HoverMeta<any>) => HoverResult> = {
  OpenTagName,
};

export const doHover: Plugin["doHover"] = async (doc, params) => {
  const file = getMarkoFile(doc);
  const offset = doc.offsetAt(params.position);
  const node = file.parsed.nodeAt(offset);
  return await handlers[NodeType[node.type]]?.({
    file,
    params,
    offset,
    node,
  });
};
