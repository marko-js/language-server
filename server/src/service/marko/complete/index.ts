import type { TextDocument } from "vscode-languageserver-textdocument";
import {
  CompletionItem,
  CompletionList,
  CompletionParams,
} from "vscode-languageserver";
import { getCompilerInfo, parse } from "../../../utils/compiler";

import { Tag } from "./Tag";
import { OpenTagName } from "./OpenTagName";
import { AttrName } from "./AttrName";
import { AttrValue } from "./AttrValue";
import { Import } from "./Import";
import type { Plugin, Result } from "../../types";
import { NodeType } from "../../../utils/parser";

export type CompletionResult = Result<CompletionItem[]>;
export interface CompletionMeta<N = unknown>
  extends ReturnType<typeof getCompilerInfo> {
  document: TextDocument;
  params: CompletionParams;
  parsed: ReturnType<typeof parse>;
  offset: number;
  code: string;
  node: N;
}

const handlers: Record<
  string,
  (data: CompletionMeta<any>) => CompletionResult
> = {
  Tag,
  OpenTagName,
  AttrName,
  AttrValue,
  Import,
};

export const doComplete: Plugin["doComplete"] = async (doc, params) => {
  const parsed = parse(doc);
  const offset = doc.offsetAt(params.position);
  const node = parsed.nodeAt(offset);
  return CompletionList.create(
    (await handlers[NodeType[node.type]]?.({
      document: doc,
      params,
      parsed,
      offset,
      node,
      code: doc.getText(),
      ...getCompilerInfo(doc),
    })) || [],
    true
  );
};
