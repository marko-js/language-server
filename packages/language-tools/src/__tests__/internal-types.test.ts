import assert from "assert";
import { createRequire } from "module";
import path from "path";
import ts from "typescript";
import url from "url";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const internalTypesFile = path.join(__dirname, "../../marko.internal.d.ts");

describe("marko.internal.d.ts", () => {
  // The tools add it to a project's own program, so it has to type check
  // under the project's options, which may not skip checking declarations.
  it("type checks without skipLibCheck", () => {
    const program = ts.createProgram({
      rootNames: [require.resolve("marko/index.d.ts"), internalTypesFile],
      options: {
        strict: true,
        noEmit: true,
        skipLibCheck: false,
        lib: ["lib.esnext.d.ts", "lib.dom.d.ts"],
        target: ts.ScriptTarget.ESNext,
        module: ts.ModuleKind.ESNext,
        moduleResolution: ts.ModuleResolutionKind.Bundler,
      },
    });

    assert.deepEqual(
      ts
        .getPreEmitDiagnostics(program)
        .filter(
          (diag) =>
            diag.file && path.resolve(diag.file.fileName) === internalTypesFile,
        )
        .map((diag) => ts.flattenDiagnosticMessageText(diag.messageText, "\n")),
      [],
    );
  });
});
