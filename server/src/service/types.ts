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
  DocumentHighlight,
  DocumentHighlightParams,
  DocumentLink,
  DocumentLinkParams,
  Hover,
  HoverParams,
  InitializeParams,
  Location,
  LocationLink,
  ReferenceParams,
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
  initialize: (params: InitializeParams) => Promise<void> | void;
  doComplete: Handler<CompletionParams, CompletionItem[] | CompletionList>;
  doValidate: (doc: TextDocument) => Result<Diagnostic[]>;
  doHover: Handler<HoverParams, Hover>;
  doRename: Handler<RenameParams, WorkspaceEdit>;
  doCodeActions: Handler<CodeActionParams, (Command | CodeAction)[]>;
  findDefinition: Handler<
    DefinitionParams,
    Location | LocationLink | (Location | LocationLink)[]
  >;
  findReferences: Handler<ReferenceParams, Location[]>;
  findDocumentLinks: Handler<DocumentLinkParams, DocumentLink[]>;
  findDocumentHighlights: Handler<DocumentHighlightParams, DocumentHighlight[]>;
  findDocumentColors: Handler<DocumentColorParams, ColorInformation[]>;
  getColorPresentations: Handler<ColorPresentationParams, ColorPresentation[]>;
  format: Handler<DocumentFormattingParams, TextEdit[]>;
};
