import type { TextDocument } from "vscode-languageserver-textdocument";
import type { HoverParams, Hover } from "vscode-languageserver";
import { getCompilerInfo, parse } from "../../../utils/compiler";
import type { Plugin, Result } from "../../types";
import { NodeType } from "../../../utils/parser";
import { OpenTagName } from "./OpenTagName";

export type HoverResult = Result<Hover>;
export interface HoverMeta<N = unknown>
  extends ReturnType<typeof getCompilerInfo> {
  document: TextDocument;
  params: HoverParams;
  parsed: ReturnType<typeof parse>;
  offset: number;
  code: string;
  node: N;
}

const handlers: Record<string, (data: HoverMeta<any>) => HoverResult> = {
  OpenTagName,
};

export const doHover: Plugin["doHover"] = async (doc, params) => {
  const parsed = parse(doc);
  const offset = doc.offsetAt(params.position);
  const node = parsed.nodeAt(offset);
  return await handlers[NodeType[node.type]]?.({
    document: doc,
    params,
    parsed,
    offset,
    node,
    code: doc.getText(),
    ...getCompilerInfo(doc),
  });
};
