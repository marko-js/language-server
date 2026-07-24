import {
  extractChildTemplate,
  extractHTML,
  type HTMLExtraction,
  type InlineChildTemplate,
  type InlineRegion,
  type Parsed,
} from "@marko/language-tools";
import axe from "axe-core";
import { JSDOM } from "jsdom";
import path from "path";
import type { Diagnostic } from "vscode-languageserver";
import type { TextDocument } from "vscode-languageserver-textdocument";
import { URI } from "vscode-uri";

import { getMarkoFile, type MarkoFile } from "../../utils/file";
import { get, projectVersion } from "../../utils/text-documents";
import type { Plugin } from "../types";
import { type Exceptions, ruleExceptions } from "./axe-rules/rule-exceptions";

const MAX_INLINE_DEPTH = 3;
const MAX_INLINE_BYTES = 100_000;

type NodeDetails = HTMLExtraction["nodeDetails"];

// Keyed on projectVersion: inlined children can change without a re-parse.
const extractCache = new WeakMap<
  Parsed,
  { version: number; result: HTMLExtraction }
>();
let childTemplateCacheVersion = -1;
let childTemplateCache = new Map<Parsed, InlineChildTemplate | undefined>();

interface ViolationEntry {
  source: string;
  message: string;
  anchor: { generatedStart: number; length: number } | { regionIndex: number };
}

// Axe results depend only on the extraction's content; edits that leave it
// unchanged (scriptlets, event handlers, ...) reuse them, re-mapping offsets.
const validationCache = new WeakMap<
  TextDocument,
  { key: string; entries: ViolationEntry[] }
>();

// Path-independent so extracted output is stable across machines.
const templatePrefixes = new Map<string, string>();
const basenameCounts = new Map<string, number>();
function getNodeIdPrefix(template: string) {
  let prefix = templatePrefixes.get(template);
  if (prefix === undefined) {
    const base = path.basename(template).replace(/[^\w.-]/g, "_");
    const count = basenameCounts.get(base) ?? 0;
    basenameCounts.set(base, count + 1);
    prefix = `${count === 0 ? base : `${base}~${count}`}#`;
    templatePrefixes.set(template, prefix);
  }
  return prefix;
}

const allRules = Object.keys(ruleExceptions);
// Rules gated on an exact document are filtered wholesale when the gate is
// closed; skip running them at all.
const nonDocumentRules = allRules.filter(
  (id) =>
    !ruleExceptions[id as keyof typeof ruleExceptions].requiresExactDocument,
);

const HTMLService: Partial<Plugin> = {
  commands: {
    "$/showHtmlOutput": async (uri: string) => {
      const doc = get(uri);
      if (doc?.languageId !== "marko") return;

      const { extracted } = extract(doc);

      return {
        language: "html",
        content: extracted.toString(),
      };
    },
  },
  async doValidate(doc) {
    const extraction = extract(doc);
    const { extracted, nodeDetails } = extraction;
    const key = extractionKey(extraction);
    const cached = validationCache.get(doc);
    if (cached?.key === key) {
      return cached.entries.flatMap((entry) => toDiagnostic(extraction, entry));
    }

    const jsdom = new JSDOM(extracted.toString(), {
      includeNodeLocations: true,
    });
    const { documentElement } = jsdom.window.document;
    // jsdom-fabricated `<html>` elements carry no node id.
    const exactDocument =
      extraction.fidelity === "exact" &&
      documentElement.dataset.markoNodeId !== undefined;

    const getViolationNodes = async (runOnly: string[]) =>
      (
        await axe.run(documentElement, {
          runOnly,
          rules: {
            "color-contrast": { enabled: false },
          },
          resultTypes: ["violations"],
          elementRef: true,
          // No enabled rule reads CSS, so skip axe's CSSOM preload.
          preload: false,
        })
      ).violations.flatMap(({ nodes, id }) =>
        nodes.map((node) => ({ ...node, ruleId: id })),
      );

    const release = await acquireMutexLock();
    const violations = await getViolationNodes(
      exactDocument ? allRules : nonDocumentRules,
    );
    release();

    const entries = violations.flatMap((result): ViolationEntry[] => {
      const { element } = result;
      if (!element) return [];
      const ruleId = result.ruleId as keyof typeof ruleExceptions;
      const exceptions = ruleExceptions[ruleId];
      const nodeId = element.dataset.markoNodeId;
      const details = nodeId ? nodeDetails[nodeId] : undefined;

      if (
        details &&
        ((exceptions.attrSpread && details.hasDynamicAttrs) ||
          (exceptions.unknownBody && details.hasDynamicBody) ||
          (exceptions.conditionalContent && details.inConditional) ||
          exceptions.dynamicAttrs?.some(
            (attr) => element.getAttribute(attr) === "dynamic",
          ))
      ) {
        return [];
      }

      if (
        (exceptions.requiresExactDocument && !exactDocument) ||
        (exceptions.requiresKnownParent &&
          !hasKnownParent(element, exceptions.requiresKnownParent, nodeDetails))
      ) {
        return [];
      }

      const generatedLoc = jsdom.nodeLocation(element);
      if (!generatedLoc) return [];

      const anchor = anchorViolation(
        extraction,
        element,
        generatedLoc.startOffset,
        exceptions,
      );
      if (!anchor) return [];

      return [
        {
          source: `axe-core(${ruleId})`,
          message:
            anchor.messagePrefix +
            (result.failureSummary ?? "unknown accessibility issue"),
          anchor: anchor.anchor,
        },
      ];
    });

    validationCache.set(doc, { key, entries });
    return entries.flatMap((entry) => toDiagnostic(extraction, entry));
  },
};

function extractionKey({
  extracted,
  nodeDetails,
  inlineRegions,
  fidelity,
}: HTMLExtraction) {
  let key = `${fidelity}\n${extracted.toString()}`;
  for (const id in nodeDetails) {
    const d = nodeDetails[id];
    key += `\n${id}:${+d.hasDynamicAttrs}${+d.hasDynamicBody}${+d.inConditional}`;
  }
  for (const r of inlineRegions) {
    key += `\n${r.start}-${r.end}:${+r.bodyUncertain}${+r.inConditional}:${r.rootIds.join()}`;
  }
  return key;
}

function toDiagnostic(
  extraction: HTMLExtraction,
  { anchor, source, message }: ViolationEntry,
): Diagnostic[] {
  const range =
    "regionIndex" in anchor
      ? extraction.extracted.parsed.locationAt(
          extraction.inlineRegions[anchor.regionIndex].tagName,
        )
      : extraction.extracted.sourceLocationAt(
          anchor.generatedStart + 1,
          anchor.generatedStart + 1 + anchor.length,
        );
  if (!range) return [];
  return [{ range, severity: 3, source, message }];
}

function extract(doc: TextDocument) {
  const file = getMarkoFile(doc);
  const cached = extractCache.get(file.parsed);
  if (cached && cached.version === projectVersion) return cached.result;

  const result = extractHTML(file.parsed, {
    // Escape hatch used by the project-bench harness to isolate the cost of
    // child template inlining.
    resolveChild: process.env.A11Y_BENCH_NO_INLINE
      ? undefined
      : createChildResolver(
          file,
          new Set(file.filename ? [file.filename] : []),
          { remaining: MAX_INLINE_BYTES },
        ),
  });
  extractCache.set(file.parsed, { version: projectVersion, result });
  return result;
}

function createChildResolver(
  file: MarkoFile,
  stack: Set<string>,
  budget: { remaining: number },
) {
  return (tagName: string): InlineChildTemplate | undefined => {
    if (stack.size > MAX_INLINE_DEPTH) return;

    let template: string | undefined;
    try {
      template = file.lookup.getTag(tagName)?.template;
    } catch {
      return;
    }

    if (!template || !template.endsWith(".marko") || stack.has(template)) {
      return;
    }

    const childTemplate = getChildTemplate(template, stack);
    if (!childTemplate) return;

    const size = childTemplateSize(childTemplate);
    if (size > budget.remaining) return;
    budget.remaining -= size;

    return childTemplate;
  };
}

function getChildTemplate(
  template: string,
  stack: Set<string>,
): InlineChildTemplate | undefined {
  const doc = get(URI.file(template).toString());
  if (!doc) return;
  const file = getMarkoFile(doc);

  if (childTemplateCacheVersion !== projectVersion) {
    childTemplateCacheVersion = projectVersion;
    childTemplateCache = new Map();
  }
  if (childTemplateCache.has(file.parsed))
    return childTemplateCache.get(file.parsed);
  // In-progress marker; breaks the recursion for circular templates.
  childTemplateCache.set(file.parsed, undefined);

  const candidate = extractChildTemplate(file.parsed, {
    nodeIdPrefix: getNodeIdPrefix(template),
    // Fresh budget: cached templates are shared, usage sites re-check size.
    resolveChild: createChildResolver(file, new Set(stack).add(template), {
      remaining: MAX_INLINE_BYTES,
    }),
  });
  const childTemplate =
    childTemplateSize(candidate) <= MAX_INLINE_BYTES ? candidate : undefined;

  childTemplateCache.set(file.parsed, childTemplate);
  return childTemplate;
}

function childTemplateSize(childTemplate: InlineChildTemplate) {
  return (
    childTemplate.segments[0].length + (childTemplate.segments[1]?.length ?? 0)
  );
}

function anchorViolation(
  extraction: HTMLExtraction,
  element: HTMLElement,
  generatedOffset: number,
  exceptions: Exceptions,
) {
  const { extracted, inlineRegions } = extraction;
  const length = element.tagName.length;
  if (
    extracted.sourceLocationAt(
      generatedOffset + 1,
      generatedOffset + 1 + length,
    )
  ) {
    return {
      anchor: { generatedStart: generatedOffset, length },
      messagePrefix: "",
    };
  }

  const regionIndex = innermostRegionIndexAt(inlineRegions, generatedOffset);
  const region = inlineRegions[regionIndex];
  const nodeId = element.dataset.markoNodeId;
  if (
    !region ||
    !nodeId ||
    !region.rootIds.includes(nodeId) ||
    (exceptions.unknownBody && region.bodyUncertain) ||
    (exceptions.conditionalContent && region.inConditional)
  ) {
    return;
  }

  return {
    anchor: { regionIndex },
    messagePrefix: `This tag renders a \`<${element.tagName.toLowerCase()}>\` element here — `,
  };
}

function innermostRegionIndexAt(regions: InlineRegion[], offset: number) {
  let match = -1;
  for (let i = 0; i < regions.length; i++) {
    const region = regions[i];
    if (
      region.start <= offset &&
      offset < region.end &&
      (match === -1 || region.start >= regions[match].start)
    ) {
      match = i;
    }
  }
  return match;
}

function hasKnownParent(
  element: HTMLElement,
  mode: NonNullable<Exceptions["requiresKnownParent"]>,
  nodeDetails: NodeDetails,
) {
  // An id could be `aria-owns` re-parented from a template we can't see.
  if (element.hasAttribute("id")) return false;

  const parent = element.parentElement;
  if (!isKnownElement(parent, nodeDetails)) return false;

  if (mode === "through-presentational-wrappers" && parent.tagName === "DIV") {
    const role = parent.getAttribute("role");
    if (!role || role === "presentation" || role === "none") {
      // axe looks through presentational div wrappers to the grandparent.
      return isKnownElement(parent.parentElement, nodeDetails);
    }
  }

  return true;
}

function isKnownElement(
  element: HTMLElement | null,
  nodeDetails: NodeDetails,
): element is HTMLElement {
  if (!element) return false;
  const nodeId = element.dataset.markoNodeId;
  if (!nodeId) return false;
  const details = nodeDetails[nodeId];
  return (
    !!details &&
    !details.hasDynamicAttrs &&
    element.getAttribute("role") !== "dynamic"
  );
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
