import type { Hover, HoverParams } from "vscode-languageserver";
import type { TextDocument } from "vscode-languageserver-textdocument";

import {
  type CompilerInfo,
  getCompilerInfo,
  parse,
} from "../../../utils/compiler";
import { NodeType, type Parsed } from "../../../utils/parser";
import type { Plugin, Result } from "../../types";

import { OpenTagName } from "./OpenTagName";

export type HoverResult = Result<Hover>;
export interface HoverMeta<N = unknown> extends CompilerInfo {
  document: TextDocument;
  params: HoverParams;
  parsed: Parsed;
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
