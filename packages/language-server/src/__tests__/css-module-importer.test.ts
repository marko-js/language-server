import { Project } from "@marko/language-tools";
import assert from "assert";
import fs from "fs";
import path from "path";
import { URI } from "vscode-uri";

import MarkoLanguageService, { documents } from "../service";
import { getTSProject } from "../service/script";

Project.setDefaultTypePaths({
  internalTypesFile:
    require.resolve("@marko/language-tools/marko.internal.d.ts"),
  markoTypesFile: require.resolve("marko/index.d.ts"),
});

const FIXTURE_DIR = path.join(
  __dirname,
  "fixtures",
  "script",
  "css-module-importer",
);

describe("css module importer scoping", () => {
  it("leaves `.module.css` imports in plain .ts files to normal resolution", () => {
    const tsFile = path.join(FIXTURE_DIR, "usage.ts");
    const project = getTSProject(tsFile);
    const diagnostics = project.service.getSemanticDiagnostics(tsFile);

    // Marko only resolves CSS modules for Marko importers; for a .ts file it
    // defers, so without the user's own setup the import is simply unresolved
    // (TS2307) rather than silently bound to Marko's strict virtual module.
    assert.ok(
      diagnostics.some((d) => d.code === 2307),
      `expected the .ts import to be left unresolved, got codes: ${
        diagnostics.map((d) => d.code).join(", ") || "none"
      }`,
    );
  });

  it("still types the CSS module for a Marko importer", async () => {
    const markoFile = path.join(FIXTURE_DIR, "index.marko");
    const uri = URI.file(markoFile).toString();
    documents.doOpen({
      textDocument: {
        uri,
        languageId: "marko",
        version: 1,
        text: fs.readFileSync(markoFile, "utf-8"),
      },
    });
    const doc = documents.get(uri)!;

    const errors = await MarkoLanguageService.doValidate(doc);

    // The Marko importer resolves the CSS module (no "cannot find module") and
    // its `styles.button` access type-checks cleanly.
    assert.ok(
      !errors?.some((e) => /cannot find module/i.test(String(e.message))),
      `unexpected resolution error: ${JSON.stringify(errors)}`,
    );
  });
});
