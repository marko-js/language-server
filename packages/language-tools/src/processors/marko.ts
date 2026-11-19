import type { Config, types as t } from "@marko/compiler";
import path from "path";

import { extractScript, ScriptLang } from "../extractors/script";
import { parse } from "../parser";
import * as Project from "../util/project";
import type { ProcessorConfig } from ".";

const isRemapExtensionReg = /\.ts$/;
const skipRemapExtensionsReg =
  /\.(?:[cm]?jsx?|json|marko|css|less|sass|scss|styl|stylus|pcss|postcss|sss|a?png|jpe?g|jfif|pipeg|pjp|gif|svg|ico|web[pm]|avif|mp4|ogg|mp3|wav|flac|aac|opus|woff2?|eot|[ot]tf|webmanifest|pdf|txt)$/;

const markoProcessor: ProcessorConfig = {
  extensions: [".marko"],
  create({ ts, host, configFile }) {
    const currentDirectory = host.getCurrentDirectory
      ? host.getCurrentDirectory()
      : ts.sys.getCurrentDirectory();
    const defaultScriptLang =
      configFile && /tsconfig/.test(configFile) ? ScriptLang.ts : ScriptLang.js;
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
        const parsed = parse(code, fileName);
        const dir = path.dirname(parsed.filename);
        return extractScript({
          ts,
          parsed,
          translator: Project.getConfig(dir).translator,
          markoRun: !!runtimeTypes.markoRunTypesFile,
          lookup: Project.getTagLookup(dir),
          scriptLang: Project.getScriptLang(
            fileName,
            defaultScriptLang,
            ts,
            host,
          ),
        });
      },
      print({ extracted: { parsed } }) {
        const dir = path.dirname(parsed.filename);
        const { code, map } = Project.getCompiler(dir).compileSync(
          parsed.code,
          parsed.filename,
          { ...Project.getConfig(dir), ...compileConfig },
        );
        return { code, map };
      },
    };
  },
};

export default markoProcessor;
