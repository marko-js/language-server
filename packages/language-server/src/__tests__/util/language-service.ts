import { Project } from "@marko/language-tools";
import { LanguageServerHandle, startLanguageServer } from "@volar/test-utils";
import fs from "fs";
import path from "path";
import ts from "typescript";
import * as protocol from "vscode-languageserver-protocol/node";

const rootDir = process.cwd();

let serverHandle: LanguageServerHandle | undefined;

Project.setDefaultTypePaths({
  internalTypesFile: require.resolve(
    "@marko/language-tools/marko.internal.d.ts",
  ),
  markoTypesFile: require.resolve("marko/index.d.ts"),
});

export async function getLanguageServer() {
  // Use the fixtures directory as the workspace root for proper type resolution
  const fixturesDir = path.resolve(rootDir, "./__tests__/fixtures/");
  const compilerOptions: ts.CompilerOptions = {
    ...ts.getDefaultCompilerOptions(),
    rootDir: fixturesDir,
    strict: true,
    skipLibCheck: true,
    noEmitOnError: true,
    noImplicitAny: true,
    esModuleInterop: true,
    skipDefaultLibCheck: true,
    allowNonTsExtensions: true,
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ESNext,
    moduleResolution: ts.ModuleResolutionKind.NodeNext,
  };

  if (!serverHandle) {
    serverHandle = startLanguageServer(path.resolve("./bin.js"));
    const tsdkPath = path.dirname(
      require.resolve("typescript/lib/typescript.js"),
    );
    // Initialize the server with the fixtures directory as the root workspace
    await serverHandle.initialize(fixturesDir, {
      typescript: { tsdk: tsdkPath, compilerOptions },
    });

    // Ensure that our first test does not suffer from a TypeScript overhead
    await serverHandle.sendCompletionRequest(
      "file://doesnt-exists",
      protocol.Position.create(0, 0),
    );
  }

  return serverHandle;
}

export function loadMarkoFiles(dir: string, all = new Set<string>()) {
  for (const entry of fs.readdirSync(dir)) {
    const file = path.join(dir, entry);
    const stat = fs.statSync(file);
    if (stat.isFile()) {
      all.add(file);
    } else if (stat.isDirectory() && entry !== "__snapshots__") {
      loadMarkoFiles(file, all);
    }
  }

  return all;
}
