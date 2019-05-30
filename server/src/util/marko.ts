/* --------------------------------------------------------------------------------------------
* Copyright (c) Patrick Steele-Idem. All rights reserved.
* Licensed under the MIT License. See License.txt in the project root for license information.

Modifications Copyright 2018 eBay Inc.
Author/Developer: Diego Berrocal

Use of this source code is governed by an MIT-style
license that can be found in the LICENSE file or at
https://opensource.org/licenses/MIT.
* ------------------------------------------------------------------------------------------ */

import defaultMarkoCompiler = require("marko/compiler");
import { TextDocument } from "vscode-languageserver";
import URI from "vscode-uri";
const markoCompilerCache: any = {};
const resolveFrom = require("resolve-from");
const lassoPackageRoot = require("lasso-package-root");
const versionRegExp = /^[0-9]+/;
const versionCache: any = {};

export interface Scope {
  tagName: string;
  data?: any;
  scopeType: ScopeType;
}

export enum ScopeType {
  TAG,
  ATTR_NAME,
  ATTR_VALUE,
  NO_SCOPE,
  TEXT,
  CLOSE_TAG
}

export interface IHtMLJSParserEventAttributes {
  argument:{[key:string]: string};
  endPos:number
  name:string;
  pos:number;
  value:string;
  literalValue:string;
}


export interface IHtMLJSParserEvent {
  attributes: IHtMLJSParserEventAttributes[];
  endPos:number;
  pos:number
  concise:boolean
  emptyTagName:string
  openTagOnly:boolean
  selfClosed:boolean;
  tagName:string;
  tagNameEndPos:number;
  tagNameExpression:string
  type:string

}

export function loadMarkoCompiler(dir: string) {
  let rootDir = lassoPackageRoot.getRootDir(dir);
  if (!rootDir) {
    return;
  }

  let markoCompiler = markoCompilerCache[rootDir];
  if (!markoCompiler) {
    let markoCompilerPath = resolveFrom.silent(rootDir, "marko/compiler");
    if (markoCompilerPath) {
      var packageJsonPath = resolveFrom.silent(rootDir, "marko/package.json", true);
      var pkg = require(packageJsonPath);

      var version = pkg.version;
      if (version) {
        var versionMatches = versionRegExp.exec(version);
        if (versionMatches) {
          var majorVersion = parseInt(versionMatches[0], 10);
          if (majorVersion >= 3) {
            markoCompiler = require(markoCompilerPath);
          }
        }
      }
    }
    markoCompilerCache[rootDir] = markoCompiler =
      markoCompiler || defaultMarkoCompiler;
  }

  return markoCompiler;
}

export function getMarkoMajorVersion(dir: string) {
  if (!dir) {
    return null;
  }

  let rootDir = lassoPackageRoot.getRootDir(dir);
  if (!rootDir) {
    return;
  }

  let majorVersion = versionCache[rootDir];
  if (majorVersion === undefined) {
    var packageJsonPath = resolveFrom.silent(rootDir, "marko/package.json", true);
    if (packageJsonPath) {
      var pkg = require(packageJsonPath);
      var version = pkg.version;
      if (version) {
        var versionMatches = versionRegExp.exec(version);
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
  for (let dir in markoCompilerCache) {
    let markoCompiler = markoCompilerCache[dir];
    markoCompiler.clearCaches();
  }
}

export function getTagLibLookup(document: TextDocument) {
  const { path: dir } = URI.parse(document.uri);
  return loadMarkoCompiler(dir).buildTaglibLookup(dir);
}

export function getTag(document: TextDocument, tagName: string) {
  const tagLibLookup = getTagLibLookup(document);
  return tagLibLookup.getTag(tagName);
}
