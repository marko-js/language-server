import type { DiagnosticSeverity } from "vscode-languageserver";
import type { TextDocument } from "vscode-languageserver-textdocument";
import axe from "axe-core";
import { type Parsed, extractHTML } from "@marko/language-tools";
import { JSDOM } from "jsdom";
import type { Plugin } from "../types";
import { getMarkoFile } from "../../utils/file";
import { get } from "../../utils/text-documents";
import rules from "./axe-rules/separated-rules";

const extractCache = new WeakMap<Parsed, ReturnType<typeof extractHTML>>();

const axeViolationImpact: {
  [impact in NonNullable<axe.ImpactValue>]: DiagnosticSeverity;
} = {
  minor: 1,
  moderate: 2,
  serious: 3,
  critical: 4,
};

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
        nodes.map((node) => ({ ...node, ruleId: id }))
      );

    const release = await acquireMutexLock();
    const violations = await getViolationNodes(rules.alwaysAllowed);
    const requiresAttrs = await getViolationNodes(rules.requiresAttrs);
    const requiresChildren = await getViolationNodes(rules.requiresChildren);
    const requiresAttrsOrChildren = await getViolationNodes(
      rules.requiresAttrsOrChildren
    );
    release();

    violations.push(
      ...requiresAttrs.filter(
        ({ element }) =>
          element?.dataset.markoAxeNodeId &&
          !nodeDetails[element.dataset.markoAxeNodeId].hasDynamicAttrs
      )
    );
    violations.push(
      ...requiresChildren.filter(
        ({ element }) =>
          element?.dataset.markoAxeNodeId &&
          !nodeDetails[element.dataset.markoAxeNodeId].hasDynamicBody
      )
    );
    violations.push(
      ...requiresAttrsOrChildren.filter(
        ({ element }) =>
          element?.dataset.markoAxeNodeId &&
          !nodeDetails[element.dataset.markoAxeNodeId].hasDynamicAttrs &&
          !nodeDetails[element.dataset.markoAxeNodeId].hasDynamicBody
      )
    );

    return violations.flatMap((result) => {
      const { element } = result;
      if (!element) return [];

      const generatedLoc = jsdom.nodeLocation(element);
      if (!generatedLoc) return [];

      const sourceRange = extracted.sourceLocationAt(
        generatedLoc.startOffset,
        generatedLoc.endOffset
      );
      if (!sourceRange) return [];

      return [
        {
          range: sourceRange,
          severity: axeViolationImpact[result.impact ?? "moderate"],
          source: `axe-core(${result.ruleId})`,
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
