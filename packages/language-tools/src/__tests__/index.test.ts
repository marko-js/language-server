import fs from "fs";
import path from "path";
import ts from "typescript/lib/tsserverlibrary";
import snapshot from "mocha-snap";
import { format } from "prettier";
// import { bench, run } from "mitata";
import { taglib } from "@marko/compiler";
import type { Extracted } from "../util/extractor";
import { Parsed, ScriptLang, extractScript, parse } from "..";
import { codeFrame } from "./util/code-frame";
import { createLanguageService, loadDir } from "./util/language-service";

// const SHOULD_BENCH = process.env.BENCH;
// const BENCHED = new Set<string>();
const INTERNAL_LIB_FILE = path.join(__dirname, "../../marko.internal.d.ts");
const INTERNAL_LIB_CODE = fs.readFileSync(INTERNAL_LIB_FILE, "utf-8");
const RUNTIME_LIB_FILE = require.resolve("marko/index.d.ts");
const RUNTIME_LIB_CODE = fs.readFileSync(RUNTIME_LIB_FILE, "utf-8");
const FIXTURES = path.join(__dirname, "fixtures");

for (const entry of fs.readdirSync(FIXTURES)) {
  it(entry, async () => {
    const fixtureDir = path.join(FIXTURES, entry);
    const fixtureFiles = loadDir(
      fixtureDir,
      new Map([
        [INTERNAL_LIB_FILE, INTERNAL_LIB_CODE],
        [RUNTIME_LIB_FILE, RUNTIME_LIB_CODE],
      ])
    );
    const fileMeta = new Map<
      string,
      {
        code: string;
        parsed: Parsed;
        extracted: Extracted;
        hovers: number[] | undefined;
      }
    >();
    const ls = createLanguageService(fixtureFiles, {
      marko: {
        ext: ts.Extension.Ts,
        kind: ts.ScriptKind.TS,
        extract(filename, src) {
          const [code, hovers] = extractHovers(src);
          const parsed = parse(code, filename);
          const lookup = taglib.buildLookup(path.dirname(filename));
          const potentialComponentPath = path.resolve(
            filename,
            "../component.ts"
          );

          const extractOptions: Parameters<typeof extractScript>[0] = {
            ts,
            parsed,
            lookup,
            scriptLang: ScriptLang.ts,
            runtimeTypesCode: RUNTIME_LIB_CODE,
            componentFilename: fs.existsSync(potentialComponentPath)
              ? "./component"
              : undefined,
          };

          const extracted = extractScript(extractOptions);

          // if (SHOULD_BENCH && !BENCHED.has(filename)) {
          //   BENCHED.add(filename);
          //   bench(`extract ${path.relative(FIXTURES, filename)}`, () => {
          //     extractScripts(extractOptions);
          //   });
          // }

          fileMeta.set(filename, {
            code,
            parsed,
            extracted,
            hovers,
          });

          return extracted;
        },
      },
    });

    for (const [filename] of fixtureFiles) {
      // TODO: this could be better, but it's used to prime the file meta cache.
      ls.getProgram()!.getSourceFile(filename);
      const meta = fileMeta.get(filename);
      if (!meta) continue;

      const { code, parsed, extracted, hovers } = meta;
      let results = "";

      if (hovers) {
        results += "## Hovers\n";

        for (const sourceOffset of hovers) {
          const generatedOffset = extracted.generatedOffsetAt(sourceOffset);
          const pos = parsed.positionAt(sourceOffset);
          const loc = { start: pos, end: pos };
          let content = "";

          if (generatedOffset === undefined) {
            content = codeFrame(
              code,
              "Could not find generated location for hover",
              loc
            );
          } else {
            const hoverInfo = ls.getQuickInfoAtPosition(
              filename,
              generatedOffset
            );

            if (hoverInfo) {
              content = codeFrame(
                code,
                ts.displayPartsToString(hoverInfo.displayParts),
                loc
              );
            } else {
              content = codeFrame(
                code,
                "Could not find hover info at location",
                loc
              );
            }
          }

          results += `### Ln ${pos.line + 1}, Col ${
            pos.character + 1
          }\n\`\`\`marko\n${content}\n\`\`\`\n\n`;
        }
      }

      const diags = [
        ...ls.getSuggestionDiagnostics(filename),
        ...ls.getSyntacticDiagnostics(filename),
        ...ls.getSemanticDiagnostics(filename),
      ];

      const sourceDiagLocations: [number, string][] = [];
      const generatedDiagLocations: [number, string][] = [];

      for (const diag of diags) {
        const message = ts.flattenDiagnosticMessageText(diag.messageText, "\n");

        if (diag.file && diag.start !== undefined) {
          const { start } = diag;
          const end = start + (diag.length || 0);
          let loc = extracted.sourceLocationAt(start, end);
          let codeForFrame = code;
          let lang = "marko";

          if (!loc) {
            lang = "ts";
            loc = {
              start: ts.getLineAndCharacterOfPosition(diag.file, start),
              end: ts.getLineAndCharacterOfPosition(diag.file, end),
            };
            codeForFrame = extracted.toString();
          }

          const result =
            `### Ln ${loc.start.line + 1}, Col ${
              loc.start.character + 1
            }\n\`\`\`${lang}\n` +
            codeFrame(codeForFrame, message, loc) +
            "\n```\n\n";

          if (lang === "marko") {
            sourceDiagLocations.push([
              extracted.sourceOffsetAt(start)!,
              result,
            ]);
          } else {
            generatedDiagLocations.push([start, result]);
          }
        } else {
          throw new Error("No file or start");
        }
      }

      if (sourceDiagLocations.length) {
        results += "## Source Diagnostics\n";
        sourceDiagLocations.sort(sortByFirstIndex);
        for (const [, result] of sourceDiagLocations) {
          results += result;
        }
      }

      if (generatedDiagLocations.length) {
        results += "## Generated Diagnostics\n";
        generatedDiagLocations.sort(sortByFirstIndex);

        for (const [, result] of generatedDiagLocations) {
          results += result;
        }
      }

      await snapshot(
        tryFormat(extracted.toString()),
        path.relative(fixtureDir, filename.replace(/\.marko$/, ".ts")),
        fixtureDir
      );

      await snapshot(
        results,
        path.relative(fixtureDir, filename.replace(/\.marko$/, ".md")),
        fixtureDir
      );
    }
  });
}

// if (SHOULD_BENCH) {
//   after(async function () {
//     this.timeout(0);
//     console.log();
//     await run();
//   });
// }

function extractHovers(code: string) {
  const hoverChar = "█";
  let nextIndex = code.indexOf(hoverChar);

  if (nextIndex === -1) {
    return [code, undefined] as const;
  }

  const hovers: number[] = [];
  let len = 0;
  let curIndex = 0;
  let resultCode = "";

  do {
    hovers.push(nextIndex - len);
    resultCode += code.slice(curIndex, nextIndex);
    curIndex = nextIndex + 1;
    nextIndex = code.indexOf(hoverChar, nextIndex + 1);
    len++;
  } while (nextIndex !== -1);

  resultCode += code.slice(curIndex);
  return [resultCode, hovers] as const;
}

function tryFormat(code: string) {
  try {
    return format(code, { parser: "typescript" });
  } catch {
    return code;
  }
}

function sortByFirstIndex<T extends [number, ...any]>([a]: T, [b]: T) {
  return a - b;
}
