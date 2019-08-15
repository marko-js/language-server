import { URI } from "vscode-uri";
import resolveFrom from "resolve-from";
import lassoPackageRoot from "lasso-package-root";
import { TextDocument } from "vscode-languageserver";

const markoCompilerCache: any = {};

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
    descriptionMoreURL?: string;
  }>;
}
export interface TagDefinition {
  dir: string;
  filePath: string;
  attributeGroups?: string[];
  patternAttributes?: AttributeDefinition[];
  attributes: { [x: string]: AttributeDefinition };
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
}

export function loadMarkoCompiler(dir: string) {
  const rootDir = lassoPackageRoot.getRootDir(dir);
  if (!rootDir) {
    return;
  }

  let cached = markoCompilerCache[rootDir];

  if (!cached) {
    const compilerPath = resolveFrom.silent(rootDir, "marko/compiler");
    markoCompilerCache[rootDir] = cached = require(compilerPath &&
      /4\./.test(require(resolveFrom(rootDir, "marko/package.json")).version)
      ? compilerPath
      : "marko/compiler");
  }

  return cached;
}

export function getTagLibLookup(document: TextDocument): TagLibLookup {
  const { path } = URI.parse(document.uri);
  return loadMarkoCompiler(path).buildTaglibLookup(path);
}
