import { URI } from "vscode-uri";
import { TextDocument } from "vscode-languageserver";
import { EmbeddedRegion } from "./document";
import resolveFrom from "resolve-from";
import lassoPackageRoot from "lasso-package-root";

const markoCompilerCache: any = {};
const versionRegExp = /^[0-9]+/;
const versionCache: any = {};
const defaultCompilers: any = {
  marko: require("marko/compiler"),
  CodeWriter: require("marko/dist/compiler/CodeWriter")
};

export interface Scope {
  tagName?: string;
  regions?: EmbeddedRegion[];
  data?: any;
  scopeType: ScopeType;
  event?: IHtmlJSParserEvent;
}

export enum ScopeType {
  TAG,
  ATTR_NAME,
  ATTR_VALUE,
  NO_SCOPE,
  TEXT,
  CLOSE_TAG,
  JAVASCRIPT
}

export interface IHtmlJSParserEventAttributes {
  argument: { [key: string]: string };
  endPos: number;
  name: string;
  pos: number;
  value: string;
  literalValue: string;
}

export interface IHtmlJSParserEventShortClass {
  rawParts: [
    {
      pos: number;
      endPos: number;
      text: string;
    }
  ];
  value: string;
}

export interface IHtmlJSParserArgument {
  endAfterGroup: boolean;
  endPos: number;
  // groupStack:
  isStringLiteral: boolean;
  lastLeftParenPos: number;
  lastRightParenPos: number;
  // parentState:Object {name: "STATE_TAG_ARGS", eol: , eof: , …}
  pos: number;
  value: string;
}

export interface IHtmlJSParserEvent {
  attributes: IHtmlJSParserEventAttributes[];
  argument?: IHtmlJSParserArgument;
  shorthandClassNames: IHtmlJSParserEventShortClass[];
  endPos: number;
  value: string;
  pos: number;
  concise: boolean;
  emptyTagName: string;
  openTagOnly: boolean;
  selfClosed: boolean;
  tagName: string;
  tagNameEndPos: number;
  tagNameExpression: string;
  type: string;
}

export function loadCompilerComponent(component: string, dir: string) {
  const rootDir = lassoPackageRoot.getRootDir(dir);
  const cacheLookup = `${rootDir}-${component}`;
  if (!rootDir) {
    return;
  }

  let codeWriter = markoCompilerCache[cacheLookup];
  if (!codeWriter) {
    const codeWriterPath = resolveFrom.silent(
      rootDir,
      `marko/compiler/${component}`
    );
    if (codeWriterPath) {
      codeWriter = require(codeWriterPath);
    }
    markoCompilerCache[cacheLookup] = codeWriter =
      codeWriter || defaultCompilers[component];
  }
}

export function loadMarkoCompiler(dir: string) {
  const rootDir = lassoPackageRoot.getRootDir(dir);
  if (!rootDir) {
    return;
  }

  let markoCompiler = markoCompilerCache[rootDir];
  if (!markoCompiler) {
    const markoCompilerPath = resolveFrom.silent(rootDir, "marko/compiler");
    if (markoCompilerPath) {
      const { version } = require(resolveFrom(
        rootDir,
        "marko/package.json"
      ));

      if (version) {
        const versionMatches = versionRegExp.exec(version);
        if (versionMatches) {
          const majorVersion = parseInt(versionMatches[0], 10);
          if (majorVersion >= 3) {
            markoCompiler = require(markoCompilerPath);
          }
        }
      }
    }
    markoCompilerCache[rootDir] = markoCompiler =
      markoCompiler || defaultCompilers.marko;
  }

  return markoCompiler;
}

export function getMarkoMajorVersion(dir: string) {
  if (!dir) {
    return null;
  }

  const rootDir = lassoPackageRoot.getRootDir(dir);
  if (!rootDir) {
    return;
  }

  let majorVersion = versionCache[rootDir];
  if (majorVersion === undefined) {
    const packageJsonPath = resolveFrom.silent(
      rootDir,
      "marko/package.json"
    );

    if (packageJsonPath) {
      const { version } = require(packageJsonPath);
      if (version) {
        const versionMatches = versionRegExp.exec(version);
        if (versionMatches) {
          majorVersion = parseInt(versionMatches[0], 10);
        }
      }
    }
    versionCache[rootDir] = majorVersion || null;
  }

  return majorVersion;
}

export function clearCache() {
  for (const dir in markoCompilerCache) {
    const markoCompiler = markoCompilerCache[dir];
    markoCompiler.clearCaches();
  }
}

export function getTagLibLookup(document: TextDocument) {
  const { path: dir } = URI.parse(document.uri);
  return loadMarkoCompiler(dir).buildTaglibLookup(dir);
}

export function getTag(document: TextDocument, tagName: string) {
  return getTagLibLookup(document).getTag(tagName);
}
