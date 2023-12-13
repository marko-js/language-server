// TODO:
// * Add a `--watch` option?

import path from "path";
import crypto from "crypto";
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
  hasErrors: boolean;
  display: Exclude<Options["display"], undefined>;
  formatSettings: Required<ts.FormatCodeSettings>;
}

const currentDirectory = ts.sys.getCurrentDirectory();
const getCanonicalFileName = ts.sys.useCaseSensitiveFileNames
  ? (fileName: string) => fileName
  : (fileName: string) => fileName.toLowerCase();
const fsPathReg = /^(?:[./\\]|[A-Z]:)/i;
const modulePartsReg = /^((?:@(?:[^/]+)\/)?(?:[^/]+))(.*)$/;
const extractCache = new WeakMap<
  ts.SourceFile,
  ReturnType<Processors.Processor["extract"]>
>();
const requiredTSCompilerOptions: ts.CompilerOptions = {
  allowJs: true,
  composite: true,
  incremental: true,
  declaration: true,
  skipLibCheck: true,
  isolatedModules: true,
  allowNonTsExtensions: true,
};

export default function run(opts: Options) {
  const {
    display = Display.codeframe,
    project: configFile = findRootConfigFile("tsconfig.json") ||
      findRootConfigFile("jsconfig.json"),
  } = opts;

  if (!configFile)
    throw new Error("Could not find tsconfig.json or jsconfig.json");

  const formatSettings = ts.getDefaultFormatCodeSettings(
    ts.sys.newLine,
  ) as Required<ts.FormatCodeSettings>;
  const report: Report = {
    out: [],
    display,
    formatSettings,
    hasErrors: false,
  };
  const extraExtensions = Processors.extensions.map((extension) => ({
    extension,
    isMixedContent: false,
    scriptKind: ts.ScriptKind.Deferred,
  }));

  const solutionHost = ts.createSolutionBuilderHost(
    undefined,
    (
      rootNames,
      options,
      compilerHost,
      oldProgram,
      configFileParsingDiagnostics,
      projectReferences,
    ) => {
      if (!compilerHost) {
        throw new Error("Expected compilerHost to be provided.");
      }
      const resolutionCache = ts.createModuleResolutionCache(
        currentDirectory,
        getCanonicalFileName,
        options,
      );

      const { readDirectory = ts.sys.readDirectory } = compilerHost;
      compilerHost.readDirectory = (
        path,
        extensions,
        exclude,
        include,
        depth,
      ) =>
        readDirectory(
          path,
          extensions?.concat(Processors.extensions),
          exclude,
          include,
          depth,
        );

      compilerHost.resolveModuleNameLiterals = (
        moduleLiterals,
        containingFile,
        redirectedReference,
        options,
        _containingSourceFile,
        _reusedNames,
      ) => {
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
                compilerHost,
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
                if (!compilerHost.fileExists(resolvedFileName)) {
                  resolvedFileName = undefined;
                }
              } else {
                const ext = getExt(resolvedFileName)!;
                const definitionFile = `${resolvedFileName.slice(
                  0,
                  -ext.length,
                )}.d${ext}`;
                if (compilerHost.fileExists(definitionFile)) {
                  resolvedFileName = definitionFile;
                } else if (!compilerHost.fileExists(resolvedFileName)) {
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
                compilerHost,
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

      const getSourceFile = compilerHost.getSourceFile.bind(compilerHost);
      compilerHost.getSourceFile = (
        fileName,
        languageVersion,
        onError,
        shouldCreateNewSourceFile,
      ) => {
        const processor = getProcessor(fileName);
        const code = compilerHost.readFile(fileName);
        if (code !== undefined) {
          if (processor) {
            const extracted = processor.extract(fileName, code);
            const extractedCode = extracted.toString();
            const sourceFile = ts.createSourceFile(
              fileName,
              extractedCode,
              languageVersion,
              true,
              processor.getScriptKind(fileName),
            );

            (sourceFile as any).version = crypto
              .createHash("md5")
              .update(extractedCode)
              .digest("hex");
            extractCache.set(sourceFile, extracted);
            return sourceFile;
          }

          return getSourceFile(
            fileName,
            languageVersion,
            onError,
            shouldCreateNewSourceFile,
          );
        }
      };

      const builderProgram = ts.createEmitAndSemanticDiagnosticsBuilderProgram(
        rootNames,
        options,
        compilerHost,
        oldProgram,
        configFileParsingDiagnostics,
        projectReferences,
      );

      const program = builderProgram.getProgram();
      const builderEmit = builderProgram.emit.bind(builderProgram);
      builderProgram.emit = (
        targetSourceFile,
        _writeFile,
        cancellationToken,
        emitOnlyDtsFiles,
        customTransformers,
      ) => {
        let writeFile = _writeFile;
        if (_writeFile) {
          const typeChecker = program.getTypeChecker();
          const printer = ts.createPrinter({
            noEmitHelpers: true,
            removeComments: true,
          });
          writeFile = (
            fileName,
            _text,
            writeByteOrderMark,
            onError,
            sourceFiles,
            data,
          ) => {
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
                const msg = `Unexpected file extension: ${fileName}`;
                if (onError) {
                  onError(msg);
                  return;
                }

                throw new Error(msg);
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
                      -processorExt.length,
                    )}.d${processorExt}`,
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
                program.getSourceFile(sourceFile.fileName)!,
              )!;
              const printContext: Processors.PrintContext = {
                extracted,
                printer,
                typeChecker,
                sourceFile,
                formatSettings: report.formatSettings,
              };

              _writeFile(
                outFileName,
                isDts
                  ? processor.printTypes(printContext).code
                  : processor.print(printContext).code,
                writeByteOrderMark,
                onError,
                sourceFiles,
                data,
              );
            } else {
              _writeFile(
                fileName,
                _text,
                writeByteOrderMark,
                onError,
                sourceFiles,
                data,
              );
            }
          };
        }

        return builderEmit(
          targetSourceFile,
          writeFile,
          cancellationToken,
          emitOnlyDtsFiles,
          customTransformers,
        );
      };

      return builderProgram;
    },
    (diag) => reportDiagnostic(report, diag),
  );
  const processors = Processors.create({
    ts,
    configFile,
    host: solutionHost,
  });
  const getProcessor = (fileName: string) => {
    const ext = getExt(fileName);
    return ext ? processors[ext] : undefined;
  };

  solutionHost.getParsedCommandLine = (fileName) => {
    const parsedCommandLine = ts.getParsedCommandLineOfConfigFile(
      fileName,
      requiredTSCompilerOptions,
      {
        ...ts.sys,
        onUnRecoverableConfigFileDiagnostic(diag) {
          reportDiagnostic(report, diag);
        },
      },
      undefined,
      undefined,
      extraExtensions,
    );
    if (!parsedCommandLine) return;

    const finalRootNames = new Set(parsedCommandLine.fileNames);
    for (const name in processors) {
      const rootNames =
        processors[name as keyof typeof processors].getRootNames?.();
      if (rootNames) {
        for (const rootName of rootNames) {
          finalRootNames.add(rootName);
        }
      }
    }

    parsedCommandLine.fileNames = [...finalRootNames];
    return parsedCommandLine;
  };

  ts.createSolutionBuilder(solutionHost, [configFile], {}).build();
  process.exitCode = report.hasErrors ? 1 : 0;
  console.log(
    report.out.join(
      report.formatSettings.newLineCharacter +
        report.formatSettings.newLineCharacter,
    ),
  );
}

function reportDiagnostic(report: Report, diag: ts.Diagnostic) {
  const diagMessage = flattenDiagnosticMessage(
    diag.messageText,
    report.display,
    report.formatSettings.newLineCharacter,
  );

  if (diag.file) {
    let code = diag.file.text;
    let loc: Location | void = undefined;

    if (diag.start !== undefined) {
      const extracted = extractCache.get(diag.file);

      if (extracted) {
        loc = extracted.sourceLocationAt(
          diag.start,
          diag.start + (diag.length || 0),
        );
        code = extracted.parsed.code;
      } else {
        const start = ts.getLineAndCharacterOfPosition(diag.file, diag.start);
        const end = diag.length
          ? ts.getLineAndCharacterOfPosition(
              diag.file,
              diag.start + diag.length,
            )
          : start;
        loc = {
          start,
          end,
        };
      }
    }

    if (loc) {
      report.out.push(
        `${color.cyan(
          path.relative(currentDirectory, diag.file.fileName),
        )}:${color.yellow(loc.start.line + 1)}:${color.yellow(
          loc.start.character + 1,
        )} - ${coloredDiagnosticCategory(diag.category)} ${color.dim(
          `TS${diag.code}`,
        )}${report.formatSettings.newLineCharacter}${
          report.display === Display.codeframe
            ? report.formatSettings.newLineCharacter +
              formatCodeFrameMessage(code, loc, diagMessage)
            : diagMessage
        }`,
      );
    } else {
      report.out.push(
        `${color.cyan(
          path.relative(currentDirectory, diag.file.fileName),
        )} - ${coloredDiagnosticCategory(diag.category)} ${color.dim(
          `TS${diag.code}`,
        )}${report.formatSettings.newLineCharacter}${diagMessage}`,
      );
    }
  } else {
    report.out.push(diagMessage);
  }

  if (!report.hasErrors && diag.category === ts.DiagnosticCategory.Error) {
    report.hasErrors = true;
  }

  if (diag.relatedInformation && report.display === Display.codeframe) {
    reportRelatedDiagnostics(report, diag.relatedInformation);
  }
}

function reportRelatedDiagnostics(
  report: Report,
  diags: readonly ts.DiagnosticRelatedInformation[],
) {
  for (const diag of diags) {
    reportDiagnostic(report, diag);
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
    },
  );
}

function flattenDiagnosticMessage(
  message: string | ts.DiagnosticMessageChain,
  display: Display,
  newLine: string,
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
        (ts.DiagnosticCategory[category] || "unknown").toLocaleLowerCase(),
      );
  }
}

function findRootConfigFile(name: string) {
  return ts.findConfigFile(currentDirectory, ts.sys.fileExists, name);
}
