import assert from "node:assert/strict";
import { createRequire } from "node:module";
import path from "node:path";
import url from "node:url";

import ts from "typescript";

import { createLanguageService, Project } from "../..";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

Project.setDefaultTypePaths({
  internalTypesFile: path.join(__dirname, "../../../marko.internal.d.ts"),
  markoTypesFile: require.resolve("marko/index.d.ts"),
});

const FIXTURE_DIR = path.join(__dirname, "fixtures/language-service");
const configFile = path.join(FIXTURE_DIR, "tsconfig.json");
const entryFile = path.join(FIXTURE_DIR, "entry.marko");
const tagFile = path.join(FIXTURE_DIR, "components/my-tag.marko");
const otherFile = path.join(FIXTURE_DIR, "other.marko");
const parseErrorFile = path.join(FIXTURE_DIR, "parse-error.marko");

describe("createLanguageService", () => {
  it("type checks a .marko file with <tag> and relative .marko imports", () => {
    const { service, addRootName } = createLanguageService({ ts, configFile });
    addRootName(entryFile);

    const program = service.getProgram()!;
    assert.ok(
      program.getSourceFile(tagFile),
      "expected the <my-tag> import to resolve to components/my-tag.marko",
    );
    assert.ok(
      program.getSourceFile(otherFile),
      "expected ./other.marko to resolve",
    );

    for (const file of [entryFile, tagFile, otherFile]) {
      const sourceFile = program.getSourceFile(file)!;
      assert.deepEqual(
        [
          ...program.getSyntacticDiagnostics(sourceFile),
          ...program.getSemanticDiagnostics(sourceFile),
        ].map((diag) =>
          ts.flattenDiagnosticMessageText(diag.messageText, "\n"),
        ),
        [],
        `expected ${path.basename(file)} to check cleanly`,
      );
    }
  });

  it("exposes the extracted exports through the type checker", () => {
    const { service, addRootName } = createLanguageService({ ts, configFile });
    addRootName(entryFile);

    const program = service.getProgram()!;
    const checker = program.getTypeChecker();
    const sourceFile = program.getSourceFile(entryFile)!;
    const moduleSymbol = checker.getSymbolAtLocation(sourceFile)!;
    const input = checker
      .getExportsOfModule(moduleSymbol)
      .find((exported) => exported.name === "Input")!;
    assert.deepEqual(
      checker
        .getPropertiesOfType(checker.getDeclaredTypeOfSymbol(input))
        .map((prop) => prop.name),
      ["name"],
    );
  });

  it("checks a file whose extraction fails as an empty file", () => {
    const { service, addRootName, getProcessor } = createLanguageService({
      ts,
      configFile,
    });
    // No fixture input reliably makes `extract` throw, so force a failure.
    const processor = getProcessor(parseErrorFile)!;
    const extract = processor.extract;
    processor.extract = () => {
      throw new Error("simulated parse failure");
    };

    try {
      addRootName(parseErrorFile);
      const program = service.getProgram()!;
      const sourceFile = program.getSourceFile(parseErrorFile)!;
      assert.equal(sourceFile.text, "");
      assert.deepEqual(program.getSemanticDiagnostics(sourceFile), []);
    } finally {
      processor.extract = extract;
    }
  });
});
