import { URI } from "vscode-uri";
import resolveFrom from "resolve-from";
import lassoPackageRoot from "lasso-package-root";
import { TextDocument } from "vscode-languageserver";

const markoCompilerCache: any = {};

export interface AttributeDefinition {
  allowExpressions: boolean;
  filePath: string;
  name: string;
  type: string | null;
  pattern: string | null;
  required: boolean;
  defaultValue: unknown;
  description: string | void;
}

export interface TagDefinition {
  dir: string;
  filePath: string;
  attributes: { [x: string]: AttributeDefinition };
  nestedTags: null | {
    [x: string]: TagDefinition & {
      isNestedTag: true;
      isRepeated: boolean;
      targetProperty: string;
    };
  };
  autocomplete: Array<{
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
