import path from "path";
import type { Config, types as t } from "@marko/compiler";
import type ts from "typescript/lib/tsserverlibrary";
import { ScriptLang, extractScript } from "../extractors/script";
import { parse } from "../parser";

import * as Project from "../util/project";
import type { ProcessorConfig } from ".";

const isRemapExtensionReg = /\.ts$/;
const skipRemapExtensionsReg =
  /\.(?:[cm]?jsx?|json|marko|css|less|sass|scss|styl|stylus|pcss|postcss|sss|a?png|jpe?g|jfif|pipeg|pjp|gif|svg|ico|web[pm]|avif|mp4|ogg|mp3|wav|flac|aac|opus|woff2?|eot|[ot]tf|webmanifest|pdf|txt)$/;

export default {
  extension: ".marko",
  create({ ts, host, configFile }) {
    const currentDirectory = host.getCurrentDirectory
      ? host.getCurrentDirectory()
      : ts.sys.getCurrentDirectory();
    const defaultScriptLang =
      configFile && /tsconfig/g.test(configFile)
        ? ScriptLang.ts
        : ScriptLang.js;
    const runtimeTypes = Project.getTypeLibs(currentDirectory, ts, host);
    const rootNames = [
      runtimeTypes.internalTypesFile,
      runtimeTypes.markoTypesFile,
    ];
    const getJSFileIfTSExists = (source: string, importer: string) =>
      host.fileExists(path.join(importer, "..", `${source}.ts`)) &&
      `${source}.js`;
    const compileConfig: Config = {
      output: "source",
      stripTypes: true,
      sourceMaps: true,
      babelConfig: {
        babelrc: false,
        configFile: false,
        browserslistConfigFile: false,
        plugins: [
          {
            visitor: {
              // Find all relative imports in Marko template
              // if they would map to a `.ts` file, then we convert it to a `.js` file for the output.
              "ImportDeclaration|ExportNamedDeclaration"(
                decl: t.NodePath<
                  t.ImportDeclaration | t.ExportNamedDeclaration
                >,
              ) {
                const { node } = decl;
                const value = node.source?.value;
                const importKind =
                  "importKind" in node ? node.importKind : undefined;
                if (
                  value?.[0] === "." &&
                  (!importKind || importKind === "value") &&
                  !skipRemapExtensionsReg.test(value)
                ) {
                  const filename = decl.hub.file.opts.filename as string;
                  const remap = isRemapExtensionReg.test(value)
                    ? `${value.slice(0, -2)}js`
                    : getJSFileIfTSExists(value, filename) ||
                      getJSFileIfTSExists(`${value}/index`, filename);
                  if (remap) {
                    node.source!.value = remap;
                  }
                }
              },
            },
          },
        ],
        caller: {
          name: "@marko/type-check",
          supportsStaticESM: true,
          supportsDynamicImport: true,
          supportsTopLevelAwait: true,
          supportsExportNamespaceFrom: true,
        },
      },
    };

    if (runtimeTypes.markoRunTypesFile) {
      rootNames.push(runtimeTypes.markoRunTypesFile);
    }

    if (runtimeTypes.markoRunGeneratedTypesFile) {
      rootNames.push(runtimeTypes.markoRunGeneratedTypesFile);
    }

    return {
      getRootNames() {
        return rootNames;
      },
      getScriptExtension(fileName) {
        return Project.getScriptLang(fileName, defaultScriptLang, ts, host) ===
          ScriptLang.ts
          ? ts.Extension.Ts
          : ts.Extension.Js;
      },
      getScriptKind(fileName) {
        return Project.getScriptLang(fileName, defaultScriptLang, ts, host) ===
          ScriptLang.ts
          ? ts.ScriptKind.TS
          : ts.ScriptKind.JS;
      },
      extract(fileName, code) {
        const dir = path.dirname(fileName);
        const parsed = parse(code, fileName);
        return extractScript({
          ts,
          parsed,
          lookup: Project.getTagLookup(dir),
          scriptLang: Project.getScriptLang(
            fileName,
            defaultScriptLang,
            ts,
            host,
          ),
          runtimeTypesCode: runtimeTypes.markoTypesCode,
        });
      },
      print({ extracted: { parsed } }) {
        const { code, map } = Project.getCompiler(
          path.dirname(parsed.filename),
        ).compileSync(parsed.code, parsed.filename, compileConfig);
        return { code, map };
      },
      printTypes({ printer, typeChecker, sourceFile, formatSettings }) {
        let code = "";
        const nlChar = formatSettings.newLineCharacter;
        const tabChar = formatSettings.convertTabsToSpaces
          ? " ".repeat(formatSettings.indentSize)
          : "\t";

        let defaultExport: undefined | ts.ExportAssignment;
        let defaultExportId: string | undefined;
        let componentImpl: undefined | ts.ClassDeclaration;
        let internalRenderImpl: undefined | ts.FunctionDeclaration;

        for (const statement of sourceFile.statements) {
          if (ts.isExportAssignment(statement)) {
            // Matches `export default ...`.
            defaultExport = statement;
            defaultExportId = ts.isIdentifier(statement.expression)
              ? (statement.expression.escapedText as string)
              : undefined;
          } else if (
            ts.isClassDeclaration(statement) &&
            statement.name?.escapedText === "Component"
          ) {
            // Matches the output of the Marko `class {}` block.
            componentImpl = statement;
          } else if (
            ts.isFunctionDeclaration(statement) &&
            statement.name?.escapedText === "___marko_internal_template"
          ) {
            // Matches the render function code (used to read `<return>`).
            internalRenderImpl = statement;
          }
        }

        for (const statement of sourceFile.statements) {
          if (
            statement === defaultExport || // skips the generated `export default ...`.
            statement === componentImpl || // skips the generated `class {}` since it needs special processing.
            statement === internalRenderImpl || // skips the internal template render code.
            isExportComponentType(statement) || // skips the generated `export { type Component }`.
            isImportComponentType(statement) || // skips the generated `import type Component from "..."`.
            isExportEmptyInputType(statement) || // skips empty exported Input, eg `export type Input = {}` or `export interface Input {}`.
            isExportInputTypeAsComponentInput(statement) || // skips outputing `export type Input = Component["input"]` since it's inferred.
            (defaultExportId && // If the `export default` was an identifier, we also remove the variable that declared the identifier.
              isVariableStatementForName(statement, defaultExportId))
          ) {
            continue;
          }

          const printed = printer.printNode(
            ts.EmitHint.Unspecified,
            statement,
            sourceFile,
          );

          // Add `static` to all non-import/export statements.
          if (!/^(?:import|export) /.test(printed)) code += "static ";
          code += printed + nlChar;
        }

        if (componentImpl?.members.length) {
          code += `class {${nlChar}`;

          // Print the component class members.
          // The Marko component `class` is not a `declared` class, and so we need to convert
          // the dts equivalent to something that could be put in a real class.
          for (const member of componentImpl.members) {
            if (ts.isPropertyDeclaration(member)) {
              // Properties get prefixed with `declare`.
              code += `${tabChar}declare ${
                printer.printNode(ts.EmitHint.Unspecified, member, sourceFile) +
                nlChar
              }`;
            } else if (
              ts.isMethodDeclaration(member) ||
              ts.isGetAccessorDeclaration(member) ||
              ts.isSetAccessorDeclaration(member)
            ) {
              // Method like things get a dummy implementation of `return 1 as any;`.
              code += `${
                tabChar +
                printer
                  .printNode(ts.EmitHint.Unspecified, member, sourceFile)
                  .replace(/;\s*$/, "")
              } { return ${castType("any")}; }${nlChar}`;
            } else if (ts.isIndexSignatureDeclaration(member)) {
              // Index signatures are already safe to use in a class.
              code +=
                tabChar +
                printer.printNode(ts.EmitHint.Unspecified, member, sourceFile) +
                nlChar;
            }
          }

          code += `}${nlChar}`;
        }

        if (internalRenderImpl) {
          // Print the return type of the render function.
          // This is used to print the `<return>` tag.
          const returnType = typeChecker
            .getSignatureFromDeclaration(internalRenderImpl)
            ?.getReturnType();
          if (returnType) {
            const props = returnType.getProperties();
            const valueType =
              (props.length === 1 &&
                props[0].name === "value" &&
                typeChecker.getPropertyOfType(returnType, "value")) ||
              undefined;
            code += "<return ";

            if (valueType) {
              code += `= ${castType(
                typeChecker.typeToString(
                  typeChecker.getTypeOfSymbol(valueType),
                ),
              )}`;
            } else {
              code += `...${castType(typeChecker.typeToString(returnType))}`;
            }

            code += `/>${nlChar}`;
          }
        }

        return { code };
      },
    };

    function isImportComponentType(statement: ts.Statement) {
      return (
        ts.isImportDeclaration(statement) &&
        statement.importClause?.name?.escapedText === "Component"
      );
    }

    function isExportInputTypeAsComponentInput(statement: ts.Statement) {
      return (
        ts.isTypeAliasDeclaration(statement) &&
        statement.name.escapedText === "Input" &&
        ts.isIndexedAccessTypeNode(statement.type) &&
        ts.isTypeReferenceNode(statement.type.objectType) &&
        ts.isIdentifier(statement.type.objectType.typeName) &&
        statement.type.objectType.typeName.escapedText === "Component" &&
        ts.isLiteralTypeNode(statement.type.indexType) &&
        ts.isStringLiteral(statement.type.indexType.literal) &&
        statement.type.indexType.literal.text === "input"
      );
    }

    function isExportEmptyInputType(statement: ts.Statement) {
      return (
        (ts.isTypeAliasDeclaration(statement) &&
          statement.name.escapedText === "Input" &&
          ts.isTypeLiteralNode(statement.type) &&
          !statement.typeParameters &&
          statement.type.members.length === 0) ||
        (ts.isInterfaceDeclaration(statement) &&
          statement.name.escapedText === "Input" &&
          !statement.heritageClauses &&
          !statement.typeParameters &&
          statement.members.length === 0)
      );
    }

    function isExportComponentType(statement: ts.Statement) {
      return (
        ts.isExportDeclaration(statement) &&
        statement.exportClause &&
        ts.isNamedExports(statement.exportClause) &&
        statement.exportClause.elements.length === 1 &&
        statement.exportClause.elements[0].name.escapedText === "Component"
      );
    }

    function isVariableStatementForName(statement: ts.Statement, name: string) {
      if (ts.isVariableStatement(statement)) {
        for (const decl of statement.declarationList.declarations) {
          if (ts.isIdentifier(decl.name) && decl.name.escapedText === name) {
            return true;
          }
        }
      }
    }
  },
} satisfies ProcessorConfig;

function castType(type: string) {
  if (type === "any") {
    return "1 as any";
  }

  return `(1 as any as ${type})`;
}
