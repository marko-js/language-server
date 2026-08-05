import path from "path";
import type ts from "typescript/lib/tsserverlibrary";

import type { Processor } from "../processors";
import { getExt } from "./get-ext";
import { isDefinitionFile } from "./is-definition-file";
import * as Project from "./project";

const fsPathReg = /^(?:[./\\]|[A-Z]:)/i;
const importTagReg = /^<([^>]+)>$/;
const modulePartsReg = /^((?:@(?:[^/]+)\/)?(?:[^/]+))(.*)$/;

export interface CreateModuleResolverOptions {
  ts: typeof ts;
  host: ts.ModuleResolutionHost;
  getProcessor(fileName: string): Processor | undefined;
  resolutionCache?: ts.ModuleResolutionCache;
}

export type ModuleResolver = (
  moduleLiterals: readonly ts.StringLiteralLike[],
  containingFile: string,
  redirectedReference: ts.ResolvedProjectReference | undefined,
  options: ts.CompilerOptions,
) => readonly ts.ResolvedModuleWithFailedLookupLocations[];

/**
 * Returns a `resolveModuleNameLiterals` implementation (for a
 * `ts.CompilerHost` or `ts.LanguageServiceHost`) that understands processor
 * files: `import Tag from "<tag>"` resolves through the taglib lookup,
 * relative and external-package specifiers resolve to processor files
 * (preferring an adjacent `.d.*` definition file), and everything else falls
 * back to `ts.bundlerModuleNameResolver`.
 */
export function createModuleResolver({
  ts,
  host,
  getProcessor,
  resolutionCache,
}: CreateModuleResolverOptions): ModuleResolver {
  return (moduleLiterals, containingFile, redirectedReference, options) => {
    let normalModuleLiterals = moduleLiterals as ts.StringLiteralLike[];
    let resolvedModules:
      | undefined
      | (ts.ResolvedModuleWithFailedLookupLocations | undefined)[];

    for (let i = 0; i < moduleLiterals.length; i++) {
      const moduleLiteral = moduleLiterals[i];
      let moduleName = moduleLiteral.text;

      const tagNameMatch = importTagReg.exec(moduleName);
      if (tagNameMatch) {
        // Try to resolve `import Tag from "<tag>"` style imports.
        const [, tagName] = tagNameMatch;
        const tagDef = Project.getTagLookup(
          path.dirname(containingFile),
        ).getTag(tagName);
        const tagFileName = tagDef && (tagDef.template || tagDef.renderer);
        if (tagFileName) {
          moduleName = tagFileName;
        }
      }

      const processor =
        moduleName[0] !== "*" ? getProcessor(moduleName) : undefined;
      if (processor) {
        let isExternalLibraryImport = false;
        let resolvedFileName: string | undefined;
        if (fsPathReg.test(moduleName)) {
          // For fs paths just see if it exists on disk.
          resolvedFileName = path.resolve(containingFile, "..", moduleName);
        } else {
          // For other paths we treat it as a node_module and try resolving
          // that modules `package.json`. If the `package.json` exists then we'll
          // try resolving the `.marko` file relative to that.
          const [, nodeModuleName, relativeModulePath] =
            modulePartsReg.exec(moduleName)!;
          const { resolvedModule } = ts.nodeModuleNameResolver(
            `${nodeModuleName}/package.json`,
            containingFile,
            options,
            host,
            resolutionCache,
            redirectedReference,
          );

          if (resolvedModule) {
            isExternalLibraryImport = true;
            resolvedFileName = path.join(
              resolvedModule.resolvedFileName,
              "..",
              relativeModulePath,
            );
          }
        }

        if (!resolvedModules) {
          resolvedModules = [];
          normalModuleLiterals = [];
          for (let j = 0; j < i; j++) {
            resolvedModules.push(undefined);
            normalModuleLiterals.push(moduleLiterals[j]);
          }
        }

        if (resolvedFileName) {
          if (isDefinitionFile(resolvedFileName)) {
            if (!host.fileExists(resolvedFileName)) {
              resolvedFileName = undefined;
            }
          } else {
            const ext = getExt(resolvedFileName)!;
            const definitionFile = `${resolvedFileName.slice(
              0,
              -ext.length,
            )}.d${ext}`;
            if (host.fileExists(definitionFile)) {
              resolvedFileName = definitionFile;
            } else if (!host.fileExists(resolvedFileName)) {
              resolvedFileName = undefined;
            }
          }
        }

        resolvedModules.push({
          resolvedModule: resolvedFileName
            ? {
                resolvedFileName,
                extension: processor.getScriptExtension(resolvedFileName),
                isExternalLibraryImport,
              }
            : undefined,
        });
      } else if (resolvedModules) {
        resolvedModules.push(undefined);
        normalModuleLiterals.push(moduleLiteral);
      }
    }

    const normalResolvedModules = normalModuleLiterals.length
      ? normalModuleLiterals.map((moduleLiteral) => {
          return ts.bundlerModuleNameResolver(
            moduleLiteral.text,
            containingFile,
            options,
            host,
            resolutionCache,
            redirectedReference,
          );
        })
      : undefined;

    if (resolvedModules) {
      if (normalResolvedModules) {
        for (let i = 0, j = 0; i < resolvedModules.length; i++) {
          if (!resolvedModules[i]) {
            resolvedModules[i] = normalResolvedModules[j++];
          }
        }
      }
      return resolvedModules as readonly ts.ResolvedModuleWithFailedLookupLocations[];
    } else {
      return normalResolvedModules!;
    }
  };
}
