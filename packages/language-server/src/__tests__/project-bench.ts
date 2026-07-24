// Benchmark harness: runs the HTML/a11y validation pipeline over real project
// files and reports per-phase timings. Works on both `main` and the
// child-template-inlining branch so results are comparable.
//
// Usage:
//   tsx src/__tests__/project-bench.mts sweep <out.jsonl> <listFile>
//   tsx src/__tests__/project-bench.mts edit <out.jsonl> <listFile> [iterations]
//
// <listFile> is a newline-separated list of absolute .marko file paths.

import fs from "fs";
import path from "path";
import type { TextDocument } from "vscode-languageserver-textdocument";
import { URI } from "vscode-uri";

import { documents } from "../service";
import HTMLPlugin from "../service/html";
import { clearMarkoCacheForFile, getMarkoFile } from "../utils/file";

const [, , mode, outFile, listFile, iterArg] = process.argv;
const files = fs
  .readFileSync(listFile, "utf-8")
  .split("\n")
  .map((l) => l.trim())
  .filter(Boolean);

const out = fs.createWriteStream(outFile);
const emit = (row: object) => out.write(JSON.stringify(row) + "\n");

function openFile(file: string): TextDocument {
  const uri = URI.file(file).toString();
  documents.doOpen({
    textDocument: {
      uri,
      languageId: "marko",
      version: 1,
      text: fs.readFileSync(file, "utf-8"),
    },
  });
  return (documents as any).get?.(uri) ?? getDoc(uri);
}

// `documents` on main only re-exports a subset; fall back through the module.
import * as textDocuments from "../utils/text-documents";
function getDoc(uri: string) {
  return textDocuments.get(uri)!;
}

async function timed<T>(fn: () => T | Promise<T>) {
  const start = performance.now();
  const value = await fn();
  return { ms: performance.now() - start, value };
}

async function sweep() {
  let done = 0;
  for (const file of files) {
    const row: Record<string, unknown> = { file };
    try {
      const doc = openFile(file);
      const parse = await timed(() => getMarkoFile(doc));
      row.parseMs = parse.ms;
      row.sourceChars = doc.getText().length;

      const extract = await timed(async () => {
        const res = await HTMLPlugin.commands!["$/showHtmlOutput"](doc.uri);
        return (res as { content: string } | undefined)?.content ?? "";
      });
      row.extractMs = extract.ms;
      row.extractedChars = extract.value.length;
      row.inlinedNodes = (
        extract.value.match(/data-marko-node-id="[^"]*#/g) ?? []
      ).length;

      const validate = await timed(() => HTMLPlugin.doValidate!(doc));
      row.validateMs = validate.ms;
      row.diagnostics = (validate.value ?? []).length;

      documents.doClose({ textDocument: { uri: doc.uri } });
    } catch (err) {
      row.error = String(err).slice(0, 300);
    }
    emit(row);
    if (++done % 50 === 0) console.log(`  ${done}/${files.length}`);
  }
  emit({ rssMb: process.memoryUsage().rss / 1e6 });
}

// Simulates a user typing in an open file: repeated single-character content
// edits (visible text changes -> extraction changes) and comment edits
// (extraction usually unchanged).
async function editLoop() {
  const iterations = Number(iterArg ?? 15);
  for (const file of files) {
    try {
      const doc = openFile(file);
      let version = doc.version;
      let marker = 0;

      const applyEdit = (text: string, prevLength: number, offset: number) => {
        documents.doChange({
          textDocument: { uri: doc.uri, version: ++version },
          contentChanges: [
            {
              range: {
                start: doc.positionAt(offset),
                end: doc.positionAt(offset + prevLength),
              },
              text,
            },
          ],
        });
        clearMarkoCacheForFile(doc);
      };

      // Seed a marker element at the end of the file that we can mutate.
      applyEdit(`\n<div>bench 0</div>`, 0, doc.getText().length);
      const contentEdit = () => {
        const search = `<div>bench ${marker % 10}</div>`;
        const offset = doc.getText().lastIndexOf(search);
        if (offset === -1) throw new Error("marker lost");
        marker++;
        applyEdit(`<div>bench ${marker % 10}</div>`, search.length, offset);
      };
      // Comment edits change the source without changing rendered output.
      applyEdit(`\n<!-- c0 -->`, 0, doc.getText().length);
      let comment = 0;
      const commentEdit = () => {
        const search = `<!-- c${comment % 10} -->`;
        const offset = doc.getText().lastIndexOf(search);
        if (offset === -1) throw new Error("comment marker lost");
        comment++;
        applyEdit(`<!-- c${comment % 10} -->`, search.length, offset);
      };

      const measure = async (label: string, edit: () => void) => {
        for (let i = 0; i < 3; i++) {
          edit();
          await HTMLPlugin.doValidate!(doc);
        }
        const samples: number[] = [];
        for (let i = 0; i < iterations; i++) {
          edit();
          const { ms } = await timed(() => HTMLPlugin.doValidate!(doc));
          samples.push(ms);
        }
        samples.sort((a, b) => a - b);
        emit({
          file,
          label,
          mean: samples.reduce((a, b) => a + b, 0) / samples.length,
          p50: samples[samples.length >> 1],
          max: samples[samples.length - 1],
          min: samples[0],
        });
      };

      await measure("content-edit", contentEdit);
      await measure("comment-edit", commentEdit);
      documents.doClose({ textDocument: { uri: doc.uri } });
    } catch (err) {
      emit({ file, error: String(err).slice(0, 300) });
    }
  }
}

const run = mode === "sweep" ? sweep : editLoop;
run().then(() => {
  out.end();
  console.log(`done: ${outFile}`);
});
