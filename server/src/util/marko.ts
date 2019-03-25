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
const markoCompilerCache: any = {};
const resolveFrom = require("resolve-from");
const lassoPackageRoot = require("lasso-package-root");
const versionRegExp = /^[0-9]+/;
const versionCache: any = {};

function loadMarkoCompiler(dir: string) {
  let rootDir = lassoPackageRoot.getRootDir(dir);
  if (!rootDir) {
    return;
  }

  let markoCompiler = markoCompilerCache[rootDir];
  if (!markoCompiler) {
    let markoCompilerPath = resolveFrom(rootDir, "marko/compiler");
    if (markoCompilerPath) {
      var packageJsonPath = resolveFrom(rootDir, "marko/package.json");
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

function getMarkoMajorVersion(dir: string) {
  if (!dir) {
    return null;
  }

  let rootDir = lassoPackageRoot.getRootDir(dir);
  if (!rootDir) {
    return;
  }

  let majorVersion = versionCache[rootDir];
  if (majorVersion === undefined) {
    var packageJsonPath = resolveFrom(rootDir, "marko/package.json");
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

function clearCache() {
  for (let dir in markoCompilerCache) {
    let markoCompiler = markoCompilerCache[dir];
    markoCompiler.clearCaches();
  }
}

exports.loadMarkoCompiler = loadMarkoCompiler;
exports.clearCache = clearCache;
exports.defaultMarkoCompiler = defaultMarkoCompiler;
exports.getMarkoMajorVersion = getMarkoMajorVersion;
