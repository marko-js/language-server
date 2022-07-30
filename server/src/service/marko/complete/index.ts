import {
  CompletionItem,
  CompletionList,
  CompletionParams,
} from "vscode-languageserver";
import type { TextDocument } from "vscode-languageserver-textdocument";

import {
  type CompilerInfo,
  getCompilerInfo,
  getParsed,
} from "../../../utils/compiler";
import { NodeType, type Parsed } from "../../../utils/parser";
import type { Plugin, Result } from "../../types";

import { AttrName } from "./AttrName";
import { AttrValue } from "./AttrValue";
import { Import } from "./Import";
import { OpenTagName } from "./OpenTagName";
import { Tag } from "./Tag";

export type CompletionResult = Result<CompletionItem[]>;
export interface CompletionMeta<N = unknown> extends CompilerInfo {
  document: TextDocument;
  params: CompletionParams;
  parsed: Parsed;
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
  const parsed = getParsed(doc);
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
