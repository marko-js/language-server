// TODO:
// * Support a non verbose output for ci
// * Add a `--watch` option?

import path from "path";
import ts from "typescript/lib/tsserverlibrary";
import color from "kleur";
import { codeFrameColumns } from "@babel/code-frame";
import {
  type Location,
  Processors,
  getExt,
  isDefinitionFile,
} from "@marko/language-tools";

export const Display = {
  codeframe: "codeframe",
  condensed: "condensed",
} as const;
export type Display = (typeof Display)[keyof typeof Display];

export interface Options {
  project?: string;
  display?: Display;
  emit?: boolean;
}

interface Report {
  out: string[];
  display: Exclude<Options["display"], undefined>;
  hasErrors: boolean;
  formatSettings: Required<ts.FormatCodeSettings>;
}

const currentDirectory = ts.sys.getCurrentDirectory();
const fsPathReg = /^(?:[./\\]|[A-Z]:)/i;
const modulePartsReg = /^((?:@(?:[^/]+)\/)?(?:[^/]+))(.*)$/;
const extractCache = new WeakMap<
  ts.SourceFile,
  ReturnType<Processors.Processor["extract"]>
>();
const requiredTSCompilerOptions: ts.CompilerOptions = {
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  allowJs: true,
  declaration: true,
  skipLibCheck: true,
  isolatedModules: true,
  allowNonTsExtensions: true,
};
const requiredTSCompilerOptionsEmit: ts.CompilerOptions = {
  ...requiredTSCompilerOptions,
  noEmit: false,
  declaration: true,
  emitDeclarationOnly: false,
};
const requiredTSCompilerOptionsNoEmit: ts.CompilerOptions = {
  ...requiredTSCompilerOptions,
  noEmit: true,
  declaration: false,
  emitDeclarationOnly: false,
};

const defaultTSConfig = {
  include: [],
  compilerOptions: {
    lib: ["dom", "node", "esnext"],
  } satisfies ts.CompilerOptions,
};

export default function run(opts: Options) {
  const {
    emit = false,
    display = Display.codeframe,
    project: configFile = findConfigFile("tsconfig.json") ||
      findConfigFile("jsconfig.json"),
  } = opts;

  if (!configFile)
    throw new Error("Could not find tsconfig.json or jsconfig.json");

  const { host, parsedCommandLine, getProcessor } = createCompilerHost(
    configFile,
    emit ? requiredTSCompilerOptionsEmit : requiredTSCompilerOptionsNoEmit
  );
  const formatSettings = ts.getDefaultFormatCodeSettings(
    host.getNewLine?.() || ts.sys.newLine
  ) as Required<ts.FormatCodeSettings>;
  const report: Report = {
    out: [],
    display,
    hasErrors: false,
    formatSettings,
  };
  const program = ts.createProgram({
    host,
    options: parsedCommandLine.options,
    rootNames: parsedCommandLine.fileNames,
    projectReferences: parsedCommandLine.projectReferences,
  });

  reportDiagnostics(report, ts.getPreEmitDiagnostics(program));

  if (!report.hasErrors) {
    const typeChecker = program.getTypeChecker();
    const printer = ts.createPrinter({
      noEmitHelpers: true,
      removeComments: true,
    });
    const emitResult = program.emit(
      undefined,
      emit
        ? (fileName, _text, writeByteOrderMark, onError, sourceFiles, data) => {
            const processor =
              (sourceFiles?.length === 1 &&
                getProcessor(sourceFiles[0].fileName)) ||
              undefined;

            if (processor) {
              const [sourceFile] = sourceFiles!;
              const processorExt = getExt(sourceFile.fileName)!;
              const inDtsExt = processorExt + ts.Extension.Dts;
              const inJsExt = processorExt + ts.Extension.Js;
              const inExt = fileName.endsWith(inDtsExt)
                ? inDtsExt
                : fileName.endsWith(inJsExt)
                ? inJsExt
                : undefined;

              if (!inExt) {
                throw new Error("Unexpected file extension: " + fileName);
              }

              const isDts = inExt === inDtsExt;
              let outFileName = fileName;

              if (isDefinitionFile(sourceFile.fileName)) {
                if (!isDts) return; // Don't double emit `.d.marko` files.
                outFileName = fileName.slice(0, -inExt.length) + processorExt;
              } else {
                if (
                  isDts &&
                  program.getSourceFile(
                    `${sourceFile.fileName.slice(
                      0,
                      -processorExt.length
                    )}.d${processorExt}`
                  )
                ) {
                  // If a `.d.marko` file exists, don't emit the source files `.d.marko`.
                  return;
                }
                outFileName =
                  fileName.slice(0, -inExt.length) +
                  (isDts ? ".d" : "") +
                  processorExt;
              }

              const extracted = extractCache.get(
                program.getSourceFile(sourceFile.fileName)!
              )!;
              const printContext: Processors.PrintContext = {
                extracted,
                printer,
                typeChecker,
                sourceFile,
                formatSettings,
              };

              host.writeFile(
                outFileName,
                isDts
                  ? processor.printTypes(printContext).code
                  : processor.print(printContext).code,
                writeByteOrderMark,
                onError,
                sourceFiles,
                data
              );
            } else {
              host.writeFile(
                fileName,
                _text,
                writeByteOrderMark,
                onError,
                sourceFiles,
                data
              );
            }
          }
        : undefined,
      undefined,
      false
    );

    reportDiagnostics(report, emitResult.diagnostics);
  }

  const lineSep =
    report.formatSettings.newLineCharacter +
    report.formatSettings.newLineCharacter;
  console.log(report.out.join(lineSep));
  process.exitCode = report.hasErrors ? 1 : 0;
}

function createCompilerHost(
  configFile: string,
  compilerOptions: ts.CompilerOptions
) {
  // const processors: Record<keyof Processors, Processor> = {};
  const getProcessor = (fileName: string) => {
    const ext = getExt(fileName);
    return ext ? processors[ext] : undefined;
  };
  const resolveModuleNameLiterals: Exclude<
    ts.CompilerHost["resolveModuleNameLiterals"],
    undefined
  > = (
    moduleLiterals,
    containingFile,
    redirectedReference,
    options,
    _containingSourceFile,
    _reusedNames
  ) => {
    return moduleLiterals.map((moduleLiteral) => {
      return ts.bundlerModuleNameResolver(
        moduleLiteral.text,
        containingFile,
        options,
        host,
        resolutionCache,
        redirectedReference
      );
    });
  };

  const parsedCommandLine = ts.parseJsonConfigFileContent(
    (configFile && ts.readConfigFile(configFile, ts.sys.readFile).config) ||
      defaultTSConfig,
    ts.sys,
    currentDirectory,
    compilerOptions,
    configFile,
    undefined,
    Processors.extensions.map((extension) => ({
      extension,
      isMixedContent: false,
      scriptKind: ts.ScriptKind.Deferred,
    }))
  );

  const host: ts.CompilerHost = {
    getDefaultLibFileName: ts.getDefaultLibFilePath,
    writeFile: ts.sys.writeFile,
    getCurrentDirectory: ts.sys.getCurrentDirectory,
    getDirectories: ts.sys.getDirectories,
    getCanonicalFileName: (fileName) =>
      ts.sys.useCaseSensitiveFileNames ? fileName : fileName.toLowerCase(),
    getNewLine: () => ts.sys.newLine,
    useCaseSensitiveFileNames: () => ts.sys.useCaseSensitiveFileNames,
    fileExists: ts.sys.fileExists,
    readFile: ts.sys.readFile,
    readDirectory: (path, extensions, exclude, include, depth) =>
      ts.sys.readDirectory(
        path,
        extensions?.concat(Processors.extensions),
        exclude,
        include,
        depth
      ),
    resolveModuleNameLiterals(
      moduleLiterals,
      containingFile,
      redirectedReference,
      options,
      containingSourceFile,
      reusedNames
    ) {
      let normalModuleLiterals = moduleLiterals as ts.StringLiteralLike[];
      let resolvedModules:
        | undefined
        | (ts.ResolvedModuleWithFailedLookupLocations | undefined)[];

      for (let i = 0; i < moduleLiterals.length; i++) {
        const moduleLiteral = moduleLiterals[i];
        const moduleName = moduleLiteral.text;
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
            // that modules `marko.json`. If the `marko.json` exists then we'll
            // try resolving the `.marko` file relative to that.
            const [, nodeModuleName, relativeModulePath] =
              modulePartsReg.exec(moduleName)!;
            const { resolvedModule } = ts.nodeModuleNameResolver(
              `${nodeModuleName}/package.json`,
              containingFile,
              options,
              host,
              resolutionCache,
              redirectedReference
            );

            if (resolvedModule) {
              isExternalLibraryImport = true;
              resolvedFileName = path.join(
                resolvedModule.resolvedFileName,
                "..",
                relativeModulePath
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
                -ext.length
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
        ? resolveModuleNameLiterals(
            normalModuleLiterals,
            containingFile,
            redirectedReference,
            options,
            containingSourceFile,
            reusedNames
          )
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
    },
    getSourceFile: (fileName, languageVersion) => {
      const processor = getProcessor(fileName);
      const code = host.readFile(fileName);
      if (code !== undefined) {
        if (processor) {
          const extracted = processor.extract(fileName, code);
          const sourceFile = ts.createSourceFile(
            fileName,
            extracted.toString(),
            languageVersion,
            true,
            processor.getScriptKind(fileName)
          );

          extractCache.set(sourceFile, extracted);
          return sourceFile;
        }

        return ts.createSourceFile(fileName, code, languageVersion, true);
      }
    },
  };

  const resolutionCache = ts.createModuleResolutionCache(
    currentDirectory,
    host.getCanonicalFileName,
    parsedCommandLine.options
  );

  const processors = Processors.create({
    ts,
    host,
    configFile,
  });

  parsedCommandLine.fileNames = [
    ...new Set(
      parsedCommandLine.fileNames.concat(
        Object.values(processors)
          .map((processor) => processor.getRootNames?.())
          .flat()
          .filter(Boolean) as string[]
      )
    ),
  ];

  return {
    host,
    parsedCommandLine,
    getProcessor,
  };
}

function reportDiagnostics(report: Report, diags: readonly ts.Diagnostic[]) {
  for (const diag of diags) {
    if (diag.file && diag.start !== undefined) {
      const extracted = extractCache.get(diag.file);
      let code = diag.file.text;
      let loc: Location | void;

      if (extracted) {
        loc = extracted.sourceLocationAt(
          diag.start,
          diag.start + (diag.length || 0)
        );
        code = extracted.parsed.code;

        if (!loc) continue; // Ignore diagnostics that are outside of the extracted code.
      } else {
        const start = ts.getLineAndCharacterOfPosition(diag.file, diag.start);
        const end = diag.length
          ? ts.getLineAndCharacterOfPosition(
              diag.file,
              diag.start + diag.length
            )
          : start;
        loc = {
          start,
          end,
        };
      }

      if (diag.category === ts.DiagnosticCategory.Error) {
        report.hasErrors = true;
      }

      const diagMessage = flattenDiagnosticMessage(
        diag.messageText,
        report.display,
        report.formatSettings.newLineCharacter
      );

      report.out.push(
        `${color.cyan(
          path.relative(currentDirectory, diag.file.fileName)
        )}:${color.yellow(loc.start.line + 1)}:${color.yellow(
          loc.start.character + 1
        )} - ${coloredDiagnosticCategory(diag.category)} ${color.dim(
          `TS${diag.code}`
        )}${report.formatSettings.newLineCharacter}${
          report.display === Display.codeframe
            ? report.formatSettings.newLineCharacter +
              formatCodeFrameMessage(code, loc, diagMessage)
            : diagMessage
        }`
      );
    } else {
      if (diag.category === ts.DiagnosticCategory.Error) {
        report.hasErrors = true;
      }

      report.out.push(
        flattenDiagnosticMessage(
          diag.messageText,
          report.display,
          report.formatSettings.newLineCharacter
        )
      );
    }

    if (diag.relatedInformation && report.display === Display.codeframe) {
      reportRelatedDiagnostics(report, diag.relatedInformation);
    }
  }
}

function reportRelatedDiagnostics(
  report: Report,
  diags: readonly ts.DiagnosticRelatedInformation[]
) {
  for (const diag of diags) {
    if (diag.file && diag.start) {
      const extracted = extractCache.get(diag.file);
      let code = diag.file.text;
      let loc: Location | void;

      if (extracted) {
        loc = extracted.sourceLocationAt(
          diag.start,
          diag.start + (diag.length || 0)
        );
        code = extracted.parsed.code;
      } else {
        const start = ts.getLineAndCharacterOfPosition(diag.file, diag.start);
        const end = diag.length
          ? ts.getLineAndCharacterOfPosition(
              diag.file,
              diag.start + diag.length
            )
          : start;
        loc = {
          start,
          end,
        };
      }

      if (loc) {
        report.out.push(
          formatCodeFrameMessage(
            code,
            loc,
            `${flattenDiagnosticMessage(
              diag.messageText,
              report.display,
              report.formatSettings.newLineCharacter
            )} @ ${path.relative(currentDirectory, diag.file.fileName)}:${
              loc.start.line + 1
            }:${loc.start.character + 1}`
          )
        );
      }
    } else {
      report.out.push(
        flattenDiagnosticMessage(
          diag.messageText,
          report.display,
          report.formatSettings.newLineCharacter
        )
      );
    }
  }
}

function formatCodeFrameMessage(code: string, loc: Location, message: string) {
  return codeFrameColumns(
    code,
    {
      start: {
        line: loc.start.line + 1,
        column: loc.start.character + 1,
      },
      end: {
        line: loc.end.line + 1,
        column: loc.end.character + 1,
      },
    },
    {
      highlightCode: true,
      message,
    }
  );
}

function flattenDiagnosticMessage(
  message: string | ts.DiagnosticMessageChain,
  display: Display,
  newLine: string
) {
  const str = ts.flattenDiagnosticMessageText(message, newLine);
  const strWithNewlines = str.replace(/(?:\r?\n)[ \t]+/g, newLine);
  return str === strWithNewlines
    ? str
    : (display === Display.codeframe ? newLine : "") + strWithNewlines;
}

function coloredDiagnosticCategory(category: ts.DiagnosticCategory) {
  switch (category) {
    case ts.DiagnosticCategory.Error:
      return color.red("error");
    case ts.DiagnosticCategory.Warning:
      return color.yellow("warning");
    case ts.DiagnosticCategory.Message:
      return color.blue("message");
    case ts.DiagnosticCategory.Suggestion:
      return color.magenta("suggestion");
    default:
      return color.red(
        (ts.DiagnosticCategory[category] || "unknown").toLocaleLowerCase()
      );
  }
}

function findConfigFile(name: string) {
  return ts.findConfigFile(currentDirectory, ts.sys.fileExists, name);
}
