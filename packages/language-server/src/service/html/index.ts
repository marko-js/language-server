import type { TextDocument } from "vscode-languageserver-textdocument";
import axe from "axe-core";
import { type Parsed, extractHTML } from "@marko/language-tools";
import { JSDOM } from "jsdom";
import type { Plugin } from "../types";
import { getMarkoFile } from "../../utils/file";
import { get } from "../../utils/text-documents";
import { ruleExceptions } from "./axe-rules/rule-exceptions";

const extractCache = new WeakMap<Parsed, ReturnType<typeof extractHTML>>();

// const axeViolationImpact: {
//   [impact in NonNullable<axe.ImpactValue>]: DiagnosticSeverity;
// } = {
//   minor: 1,
//   moderate: 2,
//   serious: 3,
//   critical: 4,
// };

const HTMLService: Partial<Plugin> = {
  commands: {
    "$/showHtmlOutput": async (uri: string) => {
      const doc = get(uri);
      if (!doc) return;

      const { extracted } = extract(doc);

      return {
        language: "html",
        content: extracted.toString(),
      };
    },
  },
  async doValidate(doc) {
    const { extracted, nodeDetails } = extract(doc);

    const jsdom = new JSDOM(extracted.toString(), {
      includeNodeLocations: true,
    });
    const { documentElement } = jsdom.window.document;

    const getViolationNodes = async (runOnly: string[]) =>
      (
        await axe.run(documentElement, {
          runOnly,
          rules: {
            "color-contrast": { enabled: false },
          },
          resultTypes: ["violations"],
          elementRef: true,
        })
      ).violations.flatMap(({ nodes, id }) =>
        nodes.map((node) => ({ ...node, ruleId: id })),
      );

    const release = await acquireMutexLock();
    const violations = await getViolationNodes(Object.keys(ruleExceptions));
    release();

    return violations.flatMap((result) => {
      const { element } = result;
      if (!element) return [];
      const ruleId = result.ruleId as keyof typeof ruleExceptions;

      if (element.dataset.markoNodeId) {
        const details = nodeDetails[element.dataset.markoNodeId];
        if (
          (ruleExceptions[ruleId].attrSpread && details.hasDynamicAttrs) ||
          (ruleExceptions[ruleId].unknownBody && details.hasDynamicBody) ||
          ruleExceptions[ruleId].dynamicAttrs?.some(
            (attr) => element.getAttribute(attr) === "dynamic",
          )
        ) {
          return [];
        }
      }

      const generatedLoc = jsdom.nodeLocation(element);
      if (!generatedLoc) return [];

      const sourceRange = extracted.sourceLocationAt(
        generatedLoc.startOffset + 1,
        generatedLoc.startOffset + 1 + element.tagName.length,
      );
      if (!sourceRange) return [];

      return [
        {
          range: sourceRange,
          severity: 3,
          source: `axe-core(${ruleId})`,
          message: result.failureSummary ?? "unknown accessibility issue",
        },
      ];
    });
  },
};

function extract(doc: TextDocument) {
  const { parsed } = getMarkoFile(doc);
  let cached = extractCache.get(parsed);

  if (!cached) {
    cached = extractHTML(parsed);
    extractCache.set(parsed, cached);
  }

  return cached;
}

let lock: Promise<void> | undefined;
async function acquireMutexLock() {
  const currLock = lock;
  let resolve!: () => void;
  lock = new Promise((_) => (resolve = _));
  await currLock;
  return resolve;
}

export default HTMLService;
