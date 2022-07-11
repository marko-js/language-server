import type {
  CancellationToken,
  CodeAction,
  CodeActionParams,
  ColorInformation,
  ColorPresentation,
  ColorPresentationParams,
  Command,
  CompletionItem,
  CompletionList,
  CompletionParams,
  DefinitionParams,
  Diagnostic,
  DocumentColorParams,
  DocumentFormattingParams,
  Hover,
  HoverParams,
  Location,
  LocationLink,
  RenameParams,
  TextEdit,
  WorkspaceEdit,
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
  doRename: Handler<RenameParams, WorkspaceEdit>;
  doCodeActions: Handler<CodeActionParams, (Command | CodeAction)[]>;
  findDefinition: Handler<
    DefinitionParams,
    Location | LocationLink | (Location | LocationLink)[]
  >;
  findDocumentColors: Handler<DocumentColorParams, ColorInformation[]>;
  getColorPresentations: Handler<ColorPresentationParams, ColorPresentation[]>;
  format: Handler<DocumentFormattingParams, TextEdit[]>;
};
