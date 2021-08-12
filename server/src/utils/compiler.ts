import path from "path";
import { URI } from "vscode-uri";
import resolveFrom from "resolve-from";
import lassoPackageRoot from "lasso-package-root";
import { TextDocument } from "vscode-languageserver-textdocument";

export interface AttributeDefinition {
  allowExpressions: boolean;
  filePath: string;
  name: string;
  type?: string;
  html?: boolean;
  enum?: string[];
  pattern?: RegExp;
  required: boolean;
  defaultValue: unknown;
  description?: string;
  deprecated: boolean;
  autocomplete: {
    displayText: string;
    snippet: string;
    description: string;
    descriptionMoreURL?: string;
  }[];
}
export interface TagDefinition {
  dir: string;
  filePath: string;
  attributeGroups?: string[];
  patternAttributes?: AttributeDefinition[];
  attributes: { [x: string]: AttributeDefinition };
  description?: string;
  nestedTags?: {
    [x: string]: TagDefinition & {
      isNestedTag: true;
      isRepeated: boolean;
      targetProperty: string;
    };
  };
  autocomplete?: {
    displayText: string;
    snippet: string;
    description: string;
    descriptionMoreURL?: string;
  }[];
  html: boolean;
  name: string;
  taglibId: string;
  template: string;
  renderer: string;
  deprecated: boolean;
  isNestedTag: true;
  isRepeated: boolean;
  openTagOnly: boolean;
  targetProperty: string;
}

export type Compiler = typeof import("@marko/compiler");

export interface TagLibLookup {
  getTagsSorted(): TagDefinition[];
  getTag(tagName: string): TagDefinition;
  getAttribute(tagName: string, attrName: string): AttributeDefinition;
  forEachAttribute(
    tagName: string,
    callback: (attr: AttributeDefinition, tag: TagDefinition) => void
  ): void;
}

const compilerForDoc = new WeakMap<TextDocument, Compiler>();

export function getCompilerForDoc(doc: TextDocument): Compiler {
  let compiler = compilerForDoc.get(doc);
  if (!compiler) {
    compilerForDoc.set(
      doc,
      (compiler = loadCompiler(path.dirname(URI.parse(doc.uri).fsPath)))
    );
  }

  return compiler;
}

export function getTagLibLookup(
  document: TextDocument
): TagLibLookup | undefined {
  return getCompilerForDoc(document).taglib.buildLookup(
    URI.parse(document.uri).fsPath
  );
}

function loadCompiler(dir: string) {
  return require(isCompatibleCompilerInstalled(dir)
    ? resolveFrom(dir, "@marko/compiler")
    : "@marko/compiler") as Compiler;
}

function isCompatibleCompilerInstalled(dir: string) {
  const rootDir = lassoPackageRoot.getRootDir(dir);
  const packagePath =
    rootDir && resolveFrom.silent(rootDir, "@marko/compiler/package.json");
  return Boolean(packagePath && /^5\./.test(require(packagePath).version));
}
