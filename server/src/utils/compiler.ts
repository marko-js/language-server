import resolveFrom from "resolve-from";
import lassoPackageRoot from "lasso-package-root";
import type { TextDocument } from "vscode-languageserver-textdocument";
import type { Connection, TextDocuments } from "vscode-languageserver";
import type {
  AttributeDefinition,
  TagDefinition,
  TaglibLookup,
} from "@marko/babel-utils";

import * as builtinCompiler from "@marko/compiler";
import * as builtinTranslator from "@marko/translator-default";
import { getDocDir } from "./doc-file";
import * as parser from "./parser";

const lookupKey = Symbol("lookup");
const compilerInfoByDir = new Map<string, CompilerInfo>();
builtinCompiler.configure({ translator: builtinTranslator });

export type Compiler = typeof import("@marko/compiler");
export { AttributeDefinition, TagDefinition, TaglibLookup };
export type CompilerInfo = {
  cache: Map<unknown, unknown>;
  lookup: TaglibLookup | null;
  compiler: Compiler;
  translator: builtinCompiler.Config["translator"];
};

export function parse(doc: TextDocument) {
  const compilerInfo = getCompilerInfo(doc);
  let parsed = compilerInfo.cache.get(doc) as
    | ReturnType<typeof parser.parse>
    | undefined;
  if (!parsed) {
    const source = doc.getText();
    compilerInfo.cache.set(doc, (parsed = parser.parse(source)));
  }

  return parsed;
}

export function getCompilerInfo(doc: TextDocument): CompilerInfo {
  const dir = getDocDir(doc);
  let info = compilerInfoByDir.get(dir);
  if (!info) {
    info = loadCompilerInfo(dir);
    compilerInfoByDir.set(dir, info);
  }

  return info;
}

export default function setup(
  connection: Connection,
  documents: TextDocuments<TextDocument>
) {
  connection.onDidChangeWatchedFiles(() => {
    for (const dir of new Set(documents.all().map(getDocDir))) {
      const info = compilerInfoByDir.get(dir);
      if (info) {
        info.cache.clear();
        info.compiler.taglib.clearCaches();
      }
    }
  });

  documents.onDidChangeContent(({ document }) => {
    if (document.version > 1) {
      getCompilerInfo(document)?.cache.delete(document);
    }
  });
}

function loadCompilerInfo(dir: string): CompilerInfo {
  const rootDir = lassoPackageRoot.getRootDir(dir);
  const pkgPath =
    rootDir && resolveFrom.silent(rootDir, "@marko/compiler/package.json");
  const pkg = pkgPath && require(pkgPath);
  const cache = new Map();
  let translator = builtinTranslator;
  let compiler = builtinCompiler;

  if (pkg && /^5\./.test(pkg.version)) {
    try {
      // Ensure translator is available in local package, or fallback to built in compiler.
      let checkTranslator = ([] as string[])
        .concat(
          Object.keys(pkg.dependencies),
          Object.keys(pkg.peerDependencies),
          Object.keys(pkg.devDependencies)
        )
        .find((name) => /^marko$|^(@\/marko\/|marko-)translator-/.test(name));

      if (checkTranslator === "marko" || !checkTranslator) {
        // Fallback to compiler default translator
        checkTranslator = require(resolveFrom(dir, "@marko/compiler/config"))
          .translator as string;
      }

      [compiler, translator] = [
        require(resolveFrom(dir, "@marko/compiler")),
        require(resolveFrom(dir, checkTranslator)),
      ];
      // eslint-disable-next-line no-empty
    } catch {}
  }

  return {
    cache,
    get lookup() {
      let lookup: TaglibLookup | null = cache.get(lookupKey);
      if (lookup === undefined) {
        // Lazily build the lookup, and ensure it's re-created whenever the cache is cleared.
        try {
          lookup = compiler.taglib.buildLookup(dir, translator);
        } catch {
          lookup = null;
        }

        cache.set(lookupKey, lookup);
      }

      return lookup;
    },
    compiler,
    translator,
  };
}
