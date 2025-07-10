import { NodeType } from "@marko/language-tools";
import type { CompletionItem, CompletionParams } from "vscode-languageserver";

import { getMarkoFile, MarkoFile } from "../../../utils/file";
import type { Plugin, Result } from "../../types";
import { AttrName } from "./AttrName";
import { AttrValue } from "./AttrValue";
import { Import } from "./Import";
import { OpenTagName } from "./OpenTagName";
import { Tag } from "./Tag";

export type CompletionResult = Result<CompletionItem[]>;
export interface CompletionMeta<N = unknown> {
  file: MarkoFile;
  params: CompletionParams;
  offset: number;
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
  Static: Import,
};

export const doComplete: Plugin["doComplete"] = async (doc, params) => {
  const file = getMarkoFile(doc);
  const offset = doc.offsetAt(params.position);
  const node = file.parsed.nodeAt(offset);
  return {
    items:
      (await handlers[NodeType[node.type]]?.({
        file,
        params,
        offset,
        node,
      })) || [],
    isIncomplete: true,
  };
};
