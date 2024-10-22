import path from "path";
import {
  type CodeMapping,
  type LanguagePlugin,
  type VirtualCode,
  forEachEmbeddedCode,
} from "@volar/language-core";
import type { URI } from "vscode-uri";
import type ts from "typescript";
import { Project, extractHTML, parse } from "@marko/language-tools";
import { TaglibLookup } from "@marko/babel-utils";
import { parseScripts } from "./parseScript";
import { parseStyles } from "./parseStyles";
import { parseHtml } from "./parseHtml";
import "../utils/project-defaults";

const decoratedHosts = new WeakSet<ts.LanguageServiceHost>();

export function addMarkoTypes(
  rootDir: string,
  ts: typeof import("typescript"),
  host: ts.LanguageServiceHost,
) {
  if (decoratedHosts.has(host)) {
    return;
  }
  decoratedHosts.add(host);

  const getScriptFileNames = host.getScriptFileNames.bind(host);

  host.getScriptFileNames = () => {
    const addedFileNames = [];

    const typeLibs = Project.getTypeLibs(rootDir, ts, host);

    addedFileNames.push(typeLibs.internalTypesFile);
    if (typeLibs.markoRunTypesFile) {
      addedFileNames.push(typeLibs.markoRunTypesFile);
    }
    if (typeLibs.markoRunGeneratedTypesFile) {
      addedFileNames.push(typeLibs.markoRunGeneratedTypesFile);
    }
    addedFileNames.push(typeLibs.markoTypesFile);

    return [...getScriptFileNames(), ...addedFileNames];
  };
}

export function createMarkoLanguagePlugin(
  ts: typeof import("typescript"),
): LanguagePlugin<URI, MarkoVirtualCode> {
  return {
    getLanguageId(uri) {
      if (uri.path.endsWith(".marko")) {
        return "marko";
      }
    },
    createVirtualCode(uri, languageId, snapshot) {
      if (languageId === "marko") {
        const fileName = uri.fsPath.replace(/\\/g, "/");
        return new MarkoVirtualCode(fileName, snapshot, ts);
      }
    },
    typescript: {
      extraFileExtensions: [
        { extension: "marko", isMixedContent: true, scriptKind: 7 },
      ],
      getServiceScript(markoCode) {
        for (const code of forEachEmbeddedCode(markoCode)) {
          if (code.id === "script") {
            return {
              code,
              extension: ".ts",
              scriptKind: 3 satisfies ts.ScriptKind.TS,
            };
          }
        }
      },
    },
  };
}

export class MarkoVirtualCode implements VirtualCode {
  id = "root";
  languageId = "marko";
  mappings!: CodeMapping[];
  embeddedCodes!: VirtualCode[];
  markoAst: ReturnType<typeof parse>;
  tagLookup: TaglibLookup;
  htmlAst: ReturnType<typeof extractHTML>;
  compiler: typeof import("@marko/compiler");
  code: string;

  constructor(
    public fileName: string,
    public snapshot: ts.IScriptSnapshot,
    public ts: typeof import("typescript"),
  ) {
    this.mappings = [
      {
        sourceOffsets: [0],
        generatedOffsets: [0],
        lengths: [this.snapshot.getLength()],
        data: {
          verification: true,
          completion: true,
          semantic: true,
          navigation: true,
          structure: true,
          format: true,
        },
      },
    ];

    this.embeddedCodes = [];

    this.code = this.snapshot.getText(0, this.snapshot.getLength());
    this.markoAst = parse(this.code, this.fileName);

    const dirname = path.dirname(fileName);
    this.tagLookup = Project.getTagLookup(dirname);
    this.compiler = Project.getCompiler(path.dirname(this.fileName));

    const scripts = parseScripts(this.markoAst, this.ts, this.tagLookup);
    this.embeddedCodes.push(...scripts);

    const styles = parseStyles(this.markoAst, this.tagLookup);
    this.embeddedCodes.push(...styles);

    this.htmlAst = extractHTML(this.markoAst);
    const html = parseHtml(this.htmlAst);
    this.embeddedCodes.push(...html);
  }
}
