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
import { getDocDir, getDocFile } from "./doc-file";
import * as parser from "./parser";

const compilerInfoByDir = new Map<string, CompilerInfo>();
builtinCompiler.configure({ translator: builtinTranslator as any });

export type Compiler = typeof import("@marko/compiler");
export { AttributeDefinition, TagDefinition, TaglibLookup };
export type CompilerInfo = {
  cache: Map<unknown, unknown>;
  parseCache: WeakMap<TextDocument, ReturnType<typeof parser.parse>>;
  compiler: Compiler;
  translator: any; // TODO should update the type in `@marko/compiler` to not just be string | undefined
};

export function parse(doc: TextDocument) {
  const compilerInfo = getCompilerInfo(doc);
  let parsed = compilerInfo.parseCache.get(doc);
  if (!parsed) {
    compilerInfo.parseCache.set(doc, (parsed = parser.parse(doc.getText())));
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

export function getTagLibLookup(doc: TextDocument): TaglibLookup | undefined {
  try {
    const { compiler, translator } = getCompilerInfo(doc);
    return compiler.taglib.buildLookup(getDocFile(doc), translator);
    // eslint-disable-next-line no-empty
  } catch {}
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
        info.parseCache = new WeakMap();
        info.compiler.taglib.clearCaches();
      }
    }
  });

  documents.onDidChangeContent(({ document }) => {
    if (document.version > 1) {
      getCompilerInfo(document)?.parseCache.delete(document);
    }
  });
}

function loadCompilerInfo(dir: string): CompilerInfo {
  const rootDir = lassoPackageRoot.getRootDir(dir);
  const pkgPath =
    rootDir && resolveFrom.silent(rootDir, "@marko/compiler/package.json");
  const pkg = pkgPath && require(pkgPath);
  const cache = new Map();
  const parseCache = new WeakMap();

  if (pkg && /^5\./.test(pkg.version)) {
    try {
      // Ensure translator is available in local package, or fallback to built in compiler.
      let translator = ([] as string[])
        .concat(
          Object.keys(pkg.dependencies),
          Object.keys(pkg.peerDependencies),
          Object.keys(pkg.devDependencies)
        )
        .find((name) => /^marko$|^(@\/marko\/|marko-)translator-/.test(name));

      if (translator === "marko" || !translator) {
        // Fallback to compiler default translator
        translator = require(resolveFrom(dir, "@marko/compiler/config"))
          .translator as string;
      }

      require(resolveFrom(dir, translator));
      return {
        cache,
        parseCache,
        compiler: require(resolveFrom(dir, "@marko/compiler")),
        translator,
      };
      // eslint-disable-next-line no-empty
    } catch {}
  }

  return {
    cache,
    parseCache,
    compiler: builtinCompiler,
    translator: builtinTranslator,
  };
}
