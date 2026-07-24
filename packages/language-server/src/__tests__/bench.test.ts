import assert from "node:assert/strict";

import fs from "fs";
import path from "path";
import type { TextDocument } from "vscode-languageserver-textdocument";
import { URI } from "vscode-uri";

import { documents } from "../service";
import HTMLPlugin from "../service/html";
import { clearMarkoCacheForFile } from "../utils/file";

const SHOULD_BENCH = process.env.BENCH;
const LEAVES = 20;
const WRAPPERS = 10;
const SECTIONS = 24;

(SHOULD_BENCH ? describe : describe.skip)("a11y validation bench", () => {
  let appDir: string;
  let tick = 0;
  let edit = 0;

  const openPage = (name: string, text: string) => {
    const uri = URI.file(path.join(appDir, name)).toString();
    documents.doOpen({
      textDocument: { uri, languageId: "marko", version: 1, text },
    });
    return documents.get(uri)!;
  };

  // Any open/close bumps projectVersion, invalidating the extraction caches
  // the way a keystroke would.
  const invalidate = () => {
    const uri = URI.file(path.join(appDir, `tick.marko`)).toString();
    documents.doOpen({
      textDocument: {
        uri,
        languageId: "marko",
        version: ++tick,
        text: `<div>${tick}</div>`,
      },
    });
    documents.doClose({ textDocument: { uri } });
  };

  const replaceAt = (
    doc: TextDocument,
    search: string,
    length: number,
    text: string,
  ) => {
    const offset = doc.getText().indexOf(search);
    assert.notEqual(offset, -1, `bench edit target missing: ${search}`);
    documents.doChange({
      textDocument: { uri: doc.uri, version: doc.version + 1 },
      contentChanges: [
        {
          range: {
            start: doc.positionAt(offset),
            end: doc.positionAt(offset + length),
          },
          text,
        },
      ],
    });
    clearMarkoCacheForFile(doc);
  };

  const contentEdits = new WeakMap<TextDocument, number>();
  const contentEdit = (doc: TextDocument) => {
    const n = contentEdits.get(doc) ?? 0;
    contentEdits.set(doc, n + 1);
    replaceAt(doc, n % 2 ? "Note" : "Copy", 4, n % 2 ? "Copy" : "Note");
  };
  const scriptEdit = (doc: TextDocument) =>
    replaceAt(doc, "marker = ", 10, `marker = ${++edit % 10}`);

  const measure = async (
    label: string,
    iterations: number,
    fn: () => unknown,
  ) => {
    for (let i = 0; i < 3; i++) await fn();
    const samples: number[] = [];
    for (let i = 0; i < iterations; i++) {
      const start = performance.now();
      await fn();
      samples.push(performance.now() - start);
    }
    samples.sort((a, b) => a - b);
    const mean = samples.reduce((sum, s) => sum + s, 0) / samples.length;
    console.log(
      `  ${label}: mean ${mean.toFixed(2)}ms | p50 ${samples[
        iterations >> 1
      ].toFixed(2)}ms | min ${samples[0].toFixed(2)}ms`,
    );
  };

  before(function () {
    this.timeout(0);
    // Inside the repo tree so the workspace marko compiler resolves.
    appDir = path.join(__dirname, "../../node_modules/.cache/a11y-bench-app");
    const componentsDir = path.join(appDir, "components");
    fs.rmSync(appDir, { recursive: true, force: true });
    fs.mkdirSync(componentsDir, { recursive: true });

    for (let i = 0; i < LEAVES; i++) {
      fs.writeFileSync(
        path.join(componentsDir, `leaf-${i}.marko`),
        i % 4 === 0
          ? `<li class="leaf">item ${i}</li>\n`
          : i % 4 === 1
            ? `<img src="art-${i}.png" alt="art ${i}">\n`
            : i % 4 === 2
              ? `<button type="button">action ${i}</button>\n`
              : `<span class="badge">badge ${i}</span>\n`,
      );
    }
    for (let i = 0; i < WRAPPERS; i++) {
      fs.writeFileSync(
        path.join(componentsDir, `wrap-${i}.marko`),
        `export interface Input {\n  renderBody: Marko.Body;\n}\n\n` +
          (i % 2 === 0
            ? `<section class="wrap-${i}"><\${input.renderBody}/></section>\n`
            : `<ul class="wrap-${i}"><\${input.renderBody}/></ul>\n`),
      );
    }
  });

  after(() => {
    fs.rmSync(appDir, { recursive: true, force: true });
  });

  const pageSource = (prefix: string) => {
    let body = "";
    for (let s = 0; s < SECTIONS; s++) {
      const w = s % WRAPPERS;
      const listItems = Array.from(
        { length: 4 },
        (_, i) => `      <${prefix}leaf-${(s + i * 4) % LEAVES}/>\n`,
      ).join("");
      body += `<section>
  <h2>Section ${s}</h2>
  <${prefix}wrap-${w}>
${listItems}  </${prefix}wrap-${w}>
  <if=input.expanded>
    <${prefix}leaf-${(s + 1) % LEAVES}/>
  </if>
  <p>Copy for section ${s} with <a href="/s/${s}">details ${s}</a>.</p>
  ${s % 6 === 0 ? `<img src="banner-${s}.png">` : `<img src="banner-${s}.png" alt="banner ${s}">`}
</section>
`;
    }
    return `export interface Input {\n  expanded: boolean;\n}\n\n<script>\n  const marker = 0;\n</script>\n<main>\n${body}</main>\n`;
  };

  it("runs benches", async function () {
    this.timeout(0);
    const inlined = openPage("page-inlined.marko", pageSource(""));
    const legacy = openPage("page-legacy.marko", pageSource("zz-"));

    const inlinedHtml = (
      await HTMLPlugin.commands!["$/showHtmlOutput"](inlined.uri)
    )?.content as string;
    assert.ok(inlinedHtml.length > 10_000, "bench page extraction too small");
    assert.ok(
      inlinedHtml.includes("leaf-0.marko#"),
      "components were not inlined",
    );
    const baseline = (await HTMLPlugin.doValidate!(inlined))!.length;
    assert.ok(baseline > 0, "bench page produced no diagnostics");

    const validated = async (doc: TextDocument) => {
      const diags = (await HTMLPlugin.doValidate!(doc))!;
      assert.ok(diags.length > 0, "bench page lost its diagnostics");
    };

    console.log(
      `  page: ${inlined.getText().length} chars source, ${inlinedHtml.length} chars extracted, ${baseline} diagnostics`,
    );
    await measure("doValidate, content edit, components inlined", 20, () => {
      contentEdit(inlined);
      return validated(inlined);
    });
    await measure("doValidate, content edit, legacy (unresolvable)", 20, () => {
      contentEdit(legacy);
      return HTMLPlugin.doValidate!(legacy);
    });
    await measure("doValidate, script-only edit (axe skipped)", 100, () => {
      scriptEdit(inlined);
      return validated(inlined);
    });
    await measure("extraction only, components inlined", 200, () => {
      invalidate();
      return HTMLPlugin.commands!["$/showHtmlOutput"](inlined.uri);
    });
    await measure("extraction only, legacy (unresolvable)", 200, () => {
      invalidate();
      return HTMLPlugin.commands!["$/showHtmlOutput"](legacy.uri);
    });
  });
});
