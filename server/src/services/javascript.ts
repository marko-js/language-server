// import * as fs from "fs";
// import { getFileFsPath, getFilePath } from "../util-old/paths";
// import * as ts from "typescript";
// import * as tsModule from "typescript";
// import { TextDocument } from "vscode-languageserver";
// import { IAutocompleteArguments } from "../util-old/autocomplete";
// // import { getSingleTypeDocument } from '../util/document';
// // import { LanguageService } from 'vscode-css-languageservice';

// // TODO add initial files
// const scriptFileNameSet = new Set();
// const localScriptRegionDocuments = new Map<string, TextDocument>();
// let currentScriptDoc: TextDocument;

// function getDefaultCompilerOptions() {
//   const defaultCompilerOptions: ts.CompilerOptions = {
//     allowNonTsExtensions: true,
//     allowJs: true,
//     lib: ["lib.dom.d.ts", "lib.es2017.d.ts"],
//     target: tsModule.ScriptTarget.Latest,
//     moduleResolution: tsModule.ModuleResolutionKind.NodeJs,
//     module: tsModule.ModuleKind.CommonJS,
//     jsx: tsModule.JsxEmit.Preserve,
//     allowSyntheticDefaultImports: true,
//     experimentalDecorators: true
//   };

//   return defaultCompilerOptions;
// }

// export function getLanguageHost(
//   rootFileNames: string[]
// ): ts.LanguageServiceHost {
//   const files: ts.MapLike<{ version: number }> = {};

//   return {
//     getScriptFileNames: () => rootFileNames,
//     getScriptVersion: fileName =>
//       files[fileName] && files[fileName].version.toString(),
//     getScriptSnapshot: fileName => {
//       if (!fs.existsSync(fileName)) {
//         return undefined;
//       }

//       return ts.ScriptSnapshot.fromString(fs.readFileSync(fileName).toString());
//     },
//     getCurrentDirectory: () => process.cwd(),
//     getCompilationSettings: () => getDefaultCompilerOptions(),
//     getDefaultLibFileName: options => ts.getDefaultLibFilePath(options),
//     fileExists: ts.sys.fileExists,
//     readFile: ts.sys.readFile,
//     readDirectory: ts.sys.readDirectory
//   };
// }

// export function updateCurrentMarkoTextDocument(
//   options: IAutocompleteArguments
// ) {
//   const {
//     doc
//     // scopeAtPos,
//   } = options;
//   const fileFsPath = getFileFsPath(doc.uri);
//   const filePath = getFilePath(doc.uri);
//   // When file is not in language service, add it
//   if (!localScriptRegionDocuments.has(fileFsPath)) {
//     if (fileFsPath.endsWith(".marko")) {
//       scriptFileNameSet.add(filePath);
//     }
//   }

//   // if (!currentScriptDoc || doc.uri !== currentScriptDoc.uri || doc.version !== currentScriptDoc.version) {
//   //     currentScriptDoc = getSingleTypeDocument(doc, scopeAtPos.regions, 'script');
//   //     const localLastDoc = localScriptRegionDocuments.get(fileFsPath);
//   //     if (localLastDoc && currentScriptDoc.languageId !== localLastDoc.languageId) {
//   //         // if languageId changed, restart the language service; it can't handle file type changes
//   //         jsLanguageService.dispose();
//   //         jsLanguageService = tsModule.createLanguageService(jsHost);
//   //     }
//   //     localScriptRegionDocuments.set(fileFsPath, currentScriptDoc);
//   //     // versions.set(fileFsPath, (versions.get(fileFsPath) || 0) + 1);
//   // }
//   return {
//     // service: jsLanguageService,
//     scriptDoc: currentScriptDoc
//   };
// }
