import type {
  CancellationToken,
  CompletionItem,
  CompletionList,
  CompletionParams,
  Diagnostic,
  DocumentFormattingParams,
  TextEdit,
} from "vscode-languageserver";
import type { TextDocument } from "vscode-languageserver-textdocument";

export type Result<V> = Promise<V | void> | V | void;
type Handler<P, R> = (
  doc: TextDocument,
  params: P extends null ? CancellationToken : P,
  token: P extends null ? never : CancellationToken
) => Result<R>;

export type Plugin = {
  doComplete: Handler<CompletionParams, CompletionItem[] | CompletionList>;
  format: Handler<DocumentFormattingParams, TextEdit[]>;
  doValidate: (doc: TextDocument) => Result<Diagnostic[]>;
};
