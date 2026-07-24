// Splits a11y validation cost for one file: JSDOM construction vs axe.run,
// plus per-rule axe timings. Usage: tsx phase-timing.ts <file.marko>
import axe from "axe-core";
import fs from "fs";
import { JSDOM } from "jsdom";
import { URI } from "vscode-uri";

import { documents } from "../service";
import HTMLPlugin from "../service/html";
import { ruleExceptions } from "../service/html/axe-rules/rule-exceptions";

const file = process.argv[2];
const uri = URI.file(file).toString();
documents.doOpen({
  textDocument: {
    uri,
    languageId: "marko",
    version: 1,
    text: fs.readFileSync(file, "utf-8"),
  },
});

async function main() {
  const html = (
    (await HTMLPlugin.commands!["$/showHtmlOutput"](uri)) as {
      content: string;
    }
  ).content;
  console.log(`extracted: ${(html.length / 1000).toFixed(1)}kB`);

  const time = async (label: string, n: number, fn: () => unknown) => {
    for (let i = 0; i < 2; i++) await fn();
    const start = performance.now();
    for (let i = 0; i < n; i++) await fn();
    const ms = (performance.now() - start) / n;
    console.log(`${ms.toFixed(1).padStart(8)}ms  ${label}`);
    return ms;
  };

  await time("new JSDOM(includeNodeLocations)", 5, () => {
    new JSDOM(html, { includeNodeLocations: true });
  });
  await time("new JSDOM (no locations)", 5, () => {
    new JSDOM(html);
  });

  const jsdom = new JSDOM(html, { includeNodeLocations: true });
  const rules = Object.keys(ruleExceptions);
  const run = (runOnly: string[]) =>
    axe.run(jsdom.window.document.documentElement, {
      runOnly,
      rules: { "color-contrast": { enabled: false } },
      resultTypes: ["violations"],
      elementRef: true,
      preload: false,
    });

  await time("axe.run all rules (same JSDOM)", 5, () => run(rules));

  const perRule: [string, number][] = [];
  for (const rule of rules) {
    for (let i = 0; i < 1; i++) await run([rule]);
    const start = performance.now();
    for (let i = 0; i < 3; i++) await run([rule]);
    perRule.push([rule, (performance.now() - start) / 3]);
  }
  perRule.sort((a, b) => b[1] - a[1]);
  console.log("\nper-rule (top 15):");
  for (const [rule, ms] of perRule.slice(0, 15)) {
    console.log(`${ms.toFixed(1).padStart(8)}ms  ${rule}`);
  }
  const total = perRule.reduce((a, [, ms]) => a + ms, 0);
  console.log(`  (sum of individual runs: ${total.toFixed(0)}ms)`);
}

main();
