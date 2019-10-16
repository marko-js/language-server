import path from "path";
import { URI } from "vscode-uri";
import resolveFrom from "resolve-from";
import lassoPackageRoot from "lasso-package-root";
import { TextDocument } from "vscode-languageserver";

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
  autocomplete: Array<{
    displayText: string;
    snippet: string;
    description: string;
    descriptionMoreURL?: string;
  }>;
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
  autocomplete?: Array<{
    displayText: string;
    snippet: string;
    description: string;
    descriptionMoreURL?: string;
  }>;
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

export interface TagLibLookup {
  getTagsSorted(): TagDefinition[];
  getTag(tagName: string): TagDefinition;
  getAttribute(tagName: string, attrName: string): AttributeDefinition;
  forEachAttribute(
    tagName: string,
    callback: (attr: AttributeDefinition, tag: TagDefinition) => void
  ): void;
}

export function loadMarkoFile(dir: string, request: string) {
  const fullRequest = path.join("marko/src", request);
  return require(isCompatibleCompilerInstalled(dir)
    ? resolveFrom(dir, fullRequest)
    : fullRequest);
}

export function isCompatibleCompilerInstalled(dir: string) {
  const rootDir = lassoPackageRoot.getRootDir(dir);
  const packagePath =
    rootDir && resolveFrom.silent(rootDir, "marko/package.json");
  return packagePath && /4\./.test(require(packagePath).version);
}

export function getTagLibLookup(document: TextDocument): TagLibLookup {
  const { fsPath } = URI.parse(document.uri);
  const compiler = loadMarkoFile(fsPath, "compiler");
  compiler.clearCaches();
  return compiler.buildTaglibLookup(fsPath);
}
