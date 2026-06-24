import assert from "node:assert/strict";

import type { Diagnostic as CompilerDiagnostic } from "@marko/compiler/babel-utils";
import { Project } from "@marko/language-tools";
import fs from "fs";
import snapshot from "mocha-snap";
import path from "path";
import {
  CancellationToken,
  Command,
  type InitializeParams,
  Position,
} from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
// import { bench, run } from "mitata";
import { URI } from "vscode-uri";

import MarkoLanguageService, { documents } from "../service";
import MarkoPlugin from "../service/marko";
import {
  collectBatchFixes,
  getFixCandidates,
} from "../service/marko/code-actions";
import { codeFrame } from "./util/code-frame";

Project.setDefaultTypePaths({
  internalTypesFile:
    require.resolve("@marko/language-tools/marko.internal.d.ts"),
  markoTypesFile: require.resolve("marko/index.d.ts"),
});

// Advertise client-side code action resolve support so fixes are exercised
// through the lazy resolve path (`doCodeActions` -> `doCodeActionResolve`).
MarkoPlugin.initialize?.({
  capabilities: {
    textDocument: { codeAction: { resolveSupport: { properties: ["edit"] } } },
  },
} as InitializeParams);

// const SHOULD_BENCH = process.env.BENCH;
// const BENCHED = new Set<string>();
const FIXTURE_DIR = path.join(__dirname, "fixtures");

for (const subdir of fs.readdirSync(FIXTURE_DIR)) {
  const fixtureSubdir = path.join(FIXTURE_DIR, subdir);

  if (!fs.statSync(fixtureSubdir).isDirectory()) continue;
  for (const entry of fs.readdirSync(fixtureSubdir)) {
    it(entry, async () => {
      const fixtureDir = path.join(fixtureSubdir, entry);

      for (const filename of loadMarkoFiles(fixtureDir)) {
        const doc = documents.get(URI.file(filename).toString())!;
        const code = doc.getText();
        const params = {
          textDocument: {
            uri: doc.uri,
            languageId: doc.languageId,
            version: doc.version,
            text: code,
          },
        } as const;
        documents.doOpen(params);

        let results = "";

        for (const position of getHovers(doc)) {
          const hoverInfo = await MarkoLanguageService.doHover(
            doc,
            {
              position,
              textDocument: doc,
            },
            CancellationToken.None,
          );
          const loc = { start: position, end: position };

          let message = "";
          const contents = hoverInfo?.contents;
          if (contents) {
            if (Array.isArray(contents)) {
              message = "\n" + contents.join("\n  ");
            } else if (typeof contents === "object") {
              message = contents.value;
            } else {
              message = contents;
            }
          }

          if (message) {
            results += `### Ln ${position.line + 1}, Col ${
              position.character + 1
            }\n\`\`\`marko\n${codeFrame(
              code,
              message.replace(/```typescript\r?\n([\s\S]*)\r?\n```/gm, "$1"),
              loc,
            )}\n\`\`\`\n\n`;
          }
        }

        if (results.length) {
          results = `## Hovers\n${results}`;
        }

        const scriptOutput:
          | {
              language: string;
              content: string;
            }
          | undefined = await MarkoLanguageService.commands[
          "$/showScriptOutput"
        ](doc.uri);
        if (scriptOutput) {
          await snapshot(scriptOutput.content, {
            file: path.relative(
              fixtureDir,
              filename.replace(
                /\.marko$/,
                scriptOutput.language === "typescript" ? ".ts" : ".js",
              ),
            ),
            dir: fixtureDir,
          });
        }

        const htmlOutput:
          | {
              language: string;
              content: string;
            }
          | undefined = await MarkoLanguageService.commands["$/showHtmlOutput"](
          doc.uri,
        );
        if (htmlOutput) {
          await snapshot(htmlOutput.content, {
            file: path.relative(
              fixtureDir,
              filename.replace(/\.marko$/, ".html"),
            ),
            dir: fixtureDir,
          });
        }

        const errors = await MarkoLanguageService.doValidate(doc);

        if (errors && errors.length) {
          results += "## Diagnostics\n";

          for (const error of errors) {
            const loc = {
              start: error.range.start,
              end: error.range.end,
            };
            results += `### Ln ${loc.start.line + 1}, Col ${
              loc.start.character + 1
            }\n\`\`\`marko\n${codeFrame(code, error.message, loc)}\n\`\`\`\n\n`;
          }
        }

        const codeActions = await MarkoLanguageService.doCodeActions(
          doc,
          {
            textDocument: { uri: doc.uri },
            range: {
              start: doc.positionAt(0),
              end: doc.positionAt(code.length),
            },
            context: { diagnostics: errors || [] },
          },
          CancellationToken.None,
        );

        let codeActionResults = "";
        for (const action of codeActions || []) {
          if (Command.is(action)) continue;
          const resolved =
            (await MarkoLanguageService.doCodeActionResolve(
              action,
              CancellationToken.None,
            )) || action;
          const edits = resolved.edit?.changes?.[doc.uri] || [];
          const fixed = TextDocument.applyEdits(doc, edits);
          codeActionResults += `### ${resolved.title}\n\`\`\`marko\n${fixed}\n\`\`\`\n\n`;
        }

        if (codeActionResults) {
          results += `## Code Actions\n${codeActionResults}`;
        }

        documents.doClose(params);

        await snapshot(results, {
          file: path.relative(fixtureDir, filename.replace(/\.marko$/, ".md")),
          dir: fixtureDir,
        });
      }
    });
  }
}

// if (SHOULD_BENCH) {
//   after(async function () {
//     this.timeout(0);
//     console.log();
//     await run();
//   });
// }

describe("code action kind filtering", () => {
  const file = path.join(FIXTURE_DIR, "code-action", "fix-all", "index.marko");
  const uri = URI.file(file).toString();
  const content = fs.readFileSync(file, "utf-8");
  const doc = TextDocument.create(uri, "marko", 1, content);
  const range = {
    start: { line: 0, character: 0 },
    end: doc.positionAt(content.length),
  };

  const kindsFor = async (only?: string[]) => {
    const actions = await MarkoLanguageService.doCodeActions(
      doc,
      { textDocument: { uri }, range, context: { diagnostics: [], only } },
      CancellationToken.None,
    );
    return (actions || []).map((action) =>
      Command.is(action) ? "command" : action.kind,
    );
  };

  it("offers both quick fixes and fix-all when unfiltered", async () => {
    const kinds = await kindsFor();
    assert.ok(kinds.includes("quickfix"), "expected quick fixes");
    assert.ok(kinds.includes("source.fixAll.marko"), "expected a fix-all");
  });

  it("offers only quick fixes when `quickfix` is requested", async () => {
    const kinds = await kindsFor(["quickfix"]);
    assert.ok(kinds.length > 0);
    assert.ok(kinds.every((kind) => kind === "quickfix"));
  });

  it("offers only fix-all when `source.fixAll` is requested", async () => {
    // A generic `source.fixAll` request matches our `source.fixAll.marko`
    // action via kind hierarchy -- this is what VS Code's "Fix All" uses.
    assert.deepEqual(await kindsFor(["source.fixAll"]), [
      "source.fixAll.marko",
    ]);
  });
});

describe("diagnostic fix prompts", () => {
  // A compiler fix is either an automatic function fix (`true`) or an
  // interactive `confirm`/`select` prompt. None ship in marko 5 yet, so the
  // prompt mapping is verified here against synthetic diagnostics.
  const diag = (fix: unknown, label = "msg") =>
    ({ type: "deprecation", label, loc: false, fix }) as CompilerDiagnostic;

  it("maps an automatic function fix to a single preferred quick fix", () => {
    assert.deepEqual(getFixCandidates(diag(true, "Use input")), [
      { title: "Use input", value: undefined, isPreferred: true },
    ]);
  });

  it("maps a confirm prompt to a single non-preferred 'yes' action", () => {
    const fix = { type: "confirm", message: "Convert?", initialValue: false };
    assert.deepEqual(getFixCandidates(diag(fix)), [
      { title: "Convert?", value: true, isPreferred: false },
    ]);
  });

  it("maps a select prompt to one non-preferred action per option", () => {
    const fix = {
      type: "select",
      message: "Pick",
      options: [{ value: "a", label: "Option A" }, { value: "b" }],
      initialValue: "a",
    };
    assert.deepEqual(getFixCandidates(diag(fix)), [
      { title: "Pick: Option A", value: "a", isPreferred: false },
      { title: "Pick: b", value: "b", isPreferred: false },
    ]);
  });

  it("batches only automatic function fixes into 'fix all'", () => {
    const fixes = collectBatchFixes([
      diag(true),
      diag({ type: "confirm", message: "x", initialValue: true }),
      diag({ type: "select", message: "y", options: [{ value: "a" }] }),
      diag(true),
      diag(false),
    ]);
    // Indices 0 and 3 (the function fixes); prompts and non-fixes are excluded.
    assert.deepEqual([...fixes.keys()], [0, 3]);
  });
});

function* getHovers(doc: TextDocument): Generator<Position> {
  for (const { index } of doc.getText().matchAll(/\^\?/g)) {
    const pos = doc.positionAt(index!);
    yield {
      line: pos.line - 1,
      character: pos.character,
    };
  }
}

export function* loadMarkoFiles(dir: string): Generator<string> {
  for (const entry of fs.readdirSync(dir)) {
    const file = path.join(dir, entry);
    const stat = fs.statSync(file);
    if (stat.isFile()) {
      if (file.endsWith(".marko")) {
        yield file;
      }
    } else if (stat.isDirectory() && entry !== "__snapshots__") {
      yield* loadMarkoFiles(file);
    }
  }
}
