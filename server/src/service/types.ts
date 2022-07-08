import type {
  CancellationToken,
  CompletionItem,
  CompletionList,
  CompletionParams,
  DefinitionParams,
  Diagnostic,
  DocumentFormattingParams,
  Hover,
  HoverParams,
  Location,
  LocationLink,
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
  doValidate: (doc: TextDocument) => Result<Diagnostic[]>;
  doHover: Handler<HoverParams, Hover>;
  findDefinition: Handler<
    DefinitionParams,
    Location | LocationLink | (Location | LocationLink)[]
  >;
  format: Handler<DocumentFormattingParams, TextEdit[]>;
};
