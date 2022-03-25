import path from "path";
import { URI } from "vscode-uri";
import resolveFrom from "resolve-from";
import lassoPackageRoot from "lasso-package-root";
import type { TextDocument } from "vscode-languageserver-textdocument";
import type {
  AttributeDefinition,
  TagDefinition,
  TaglibLookup,
} from "@marko/babel-utils";

import * as builtinCompiler from "@marko/compiler";
import * as builtinTranslator from "@marko/translator-default";

export type Compiler = typeof import("@marko/compiler");
export { AttributeDefinition, TagDefinition, TaglibLookup };
export type CompilerAndTranslator = {
  compiler: Compiler;
  translator: any; // TODO should update the type in `@marko/compiler` to not just be string | undefined
};

const compilerAndTranslatorForDoc = new WeakMap<
  TextDocument,
  CompilerAndTranslator
>();

export function getCompilerAndTranslatorForDoc(
  doc: TextDocument
): CompilerAndTranslator {
  let compilerAndTranslator = compilerAndTranslatorForDoc.get(doc);
  if (!compilerAndTranslator) {
    compilerAndTranslatorForDoc.set(
      doc,
      (compilerAndTranslator = loadCompiler(
        path.dirname(URI.parse(doc.uri).fsPath)
      ))
    );
  }

  return compilerAndTranslator;
}

export function getTagLibLookup(
  document: TextDocument
): TaglibLookup | undefined {
  try {
    const { compiler, translator } = getCompilerAndTranslatorForDoc(document);
    return compiler.taglib.buildLookup(
      URI.parse(document.uri).fsPath,
      translator
    );
  // eslint-disable-next-line no-empty
  } catch {}
}

function loadCompiler(dir: string): CompilerAndTranslator {
  const rootDir = lassoPackageRoot.getRootDir(dir);
  const pkgPath =
    rootDir && resolveFrom.silent(rootDir, "@marko/compiler/package.json");
  const pkg = pkgPath && require(pkgPath);

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
        compiler: require(resolveFrom(dir, "@marko/compiler")),
        translator,
      };
      // eslint-disable-next-line no-empty
    } catch {}
  }

  return {
    compiler: builtinCompiler,
    translator: builtinTranslator,
  };
}
