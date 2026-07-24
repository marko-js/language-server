import {
  extractChildTemplate,
  extractHTML,
  type HTMLExtraction,
  type InlineChildTemplate,
  type InlineRegion,
  type Parsed,
} from "@marko/language-tools";
import axe from "axe-core";
import { Window } from "happy-dom";
import path from "path";
import type { Diagnostic } from "vscode-languageserver";
import type { TextDocument } from "vscode-languageserver-textdocument";
import { URI } from "vscode-uri";

import { getMarkoFile, type MarkoFile } from "../../utils/file";
import { get, onFileChange } from "../../utils/text-documents";
import type { Plugin } from "../types";
import { type Exceptions, ruleExceptions } from "./axe-rules/rule-exceptions";

const MAX_INLINE_DEPTH = 3;
const MAX_INLINE_BYTES = 100_000;

type NodeDetails = HTMLExtraction["nodeDetails"];

// Cached extractions stay valid while every template they inlined still has
// the same parse. Watched-file events can change tag resolution, which the
// dependency set cannot see, so those flush everything via the generation.
interface ExtractionDeps {
  deps: Map<string, Parsed | undefined>;
  generation: number;
}
let cacheGeneration = 0;
const extractCache = new WeakMap<
  Parsed,
  ExtractionDeps & { result: HTMLExtraction }
>();
const childTemplateCache = new Map<
  string,
  ExtractionDeps & { childTemplate: InlineChildTemplate | undefined }
>();
onFileChange((doc) => {
  if (!doc) {
    cacheGeneration++;
    childTemplateCache.clear();
  }
});

function currentParsed(template: string) {
  const doc = get(URI.file(template).toString());
  return doc && getMarkoFile(doc).parsed;
}

function isFresh({ deps, generation }: ExtractionDeps) {
  if (generation !== cacheGeneration) return false;
  for (const [template, parsed] of deps) {
    if (currentParsed(template) !== parsed) return false;
  }
  return true;
}

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

    const dom = createDom(extracted.toString());
    const { documentElement } = dom;
    // Fabricated `<html>` elements carry no node id.
    const exactDocument =
      extraction.fidelity === "exact" &&
      documentElement.dataset.markoNodeId !== undefined;

    const getViolationNodes = async (
      runOnly: string[],
      exclusions: HTMLElement[],
    ) =>
      (
        await runAxe(documentElement, exclusions, {
          runOnly,
          rules: {
            "color-contrast": { enabled: false },
          },
          resultTypes: ["violations"],
          elementRef: true,
          // Result nodes are consumed via elementRef.
          selectors: false,
          // No enabled rule reads CSS, so skip axe's CSSOM preload.
          preload: false,
        })
      ).violations.flatMap(({ nodes, id }) =>
        nodes.map((node) => ({ ...node, ruleId: id })),
      );

    const release = await acquireMutexLock();
    let violations;
    try {
      violations = await getViolationNodes(
        exactDocument ? allRules : nonDocumentRules,
        collectPrunableSubtrees(documentElement, extraction),
      );
    } finally {
      release();
    }

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

      const generatedStart = dom.locate(element);
      if (generatedStart === undefined) return [];

      const anchor = anchorViolation(
        extraction,
        element,
        generatedStart,
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

const nodeIdAttrReg = /\sdata-marko-node-id="/g;

interface A11yDom {
  documentElement: HTMLElement;
  locate(element: HTMLElement): number | undefined;
}

function createDom(html: string): A11yDom {
  const window = new Window({
    settings: { disableJavaScriptEvaluation: true },
  });
  window.document.write(html);
  const documentElement = window.document
    .documentElement as unknown as HTMLElement;
  let offsets: WeakMap<Element, number> | undefined;
  return {
    documentElement,
    locate(element) {
      if (!offsets) {
        // happy-dom has no node locations; the nth data-marko-node-id in the
        // extraction belongs to the nth such element in document order.
        offsets = new WeakMap();
        const elements = documentElement.ownerDocument.querySelectorAll(
          "[data-marko-node-id]",
        );
        let match: RegExpExecArray | null;
        let i = 0;
        nodeIdAttrReg.lastIndex = 0;
        while ((match = nodeIdAttrReg.exec(html)) && i < elements.length) {
          offsets.set(elements[i++], html.lastIndexOf("<", match.index));
        }
      }
      return offsets.get(element);
    },
  };
}

// Two FNV-1a seeds: a collision would silently reuse stale axe results.
function extractionKey({
  extracted,
  nodeDetails,
  inlineRegions,
  fidelity,
}: HTMLExtraction) {
  let h1 = 0x811c9dc5;
  let h2 = 0x01000193;
  const mix = (part: string) => {
    for (let i = 0; i < part.length; i++) {
      const c = part.charCodeAt(i);
      h1 = ((h1 ^ c) * 0x01000193) >>> 0;
      h2 = ((h2 ^ c) * 0x01000193) >>> 0;
    }
    h1 = ((h1 ^ 0x1f) * 0x01000193) >>> 0;
    h2 = ((h2 ^ 0x1f) * 0x01000193) >>> 0;
  };

  mix(fidelity);
  mix(extracted.toString());
  for (const id in nodeDetails) {
    const d = nodeDetails[id];
    mix(`${id}:${+d.hasDynamicAttrs}${+d.hasDynamicBody}${+d.inConditional}`);
  }
  for (const r of inlineRegions) {
    mix(
      `${r.start}-${r.end}:${+r.bodyUncertain}${+r.inConditional}:${r.rootIds.join()}`,
    );
  }
  return `${h1.toString(36)}:${h2.toString(36)}`;
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
  if (cached && isFresh(cached)) return cached.result;

  const deps = new Map<string, Parsed | undefined>();
  const result = extractHTML(file.parsed, {
    resolveChild: createChildResolver(
      file,
      new Set(file.filename ? [file.filename] : []),
      { remaining: MAX_INLINE_BYTES },
      deps,
    ),
  });
  extractCache.set(file.parsed, { generation: cacheGeneration, deps, result });
  return result;
}

function createChildResolver(
  file: MarkoFile,
  stack: Set<string>,
  budget: { remaining: number },
  deps: Map<string, Parsed | undefined>,
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

    const entry = getChildTemplate(template, stack);
    deps.set(template, currentParsed(template));
    if (entry) for (const [dep, parsed] of entry.deps) deps.set(dep, parsed);

    const childTemplate = entry?.childTemplate;
    if (!childTemplate) return;

    const size = childTemplateSize(childTemplate);
    if (size > budget.remaining) return;
    budget.remaining -= size;

    return childTemplate;
  };
}

function getChildTemplate(template: string, stack: Set<string>) {
  const doc = get(URI.file(template).toString());
  if (!doc) return;
  const file = getMarkoFile(doc);

  // A template extracted near the depth limit resolves fewer of its own
  // children, so shallower results only apply at the same depth.
  const cacheKey = `${stack.size}:${template}`;
  const cached = childTemplateCache.get(cacheKey);
  if (cached && isFresh(cached)) return cached;

  const deps = new Map<string, Parsed | undefined>([[template, file.parsed]]);
  // In-progress marker; breaks the recursion for circular templates.
  const entry = {
    childTemplate: undefined as InlineChildTemplate | undefined,
    deps,
    generation: cacheGeneration,
  };
  childTemplateCache.set(cacheKey, entry);

  const candidate = extractChildTemplate(file.parsed, {
    nodeIdPrefix: getNodeIdPrefix(template),
    // Fresh budget: cached templates are shared, usage sites re-check size.
    resolveChild: createChildResolver(
      file,
      new Set(stack).add(template),
      { remaining: MAX_INLINE_BYTES },
      deps,
    ),
  });
  entry.childTemplate =
    childTemplateSize(candidate) <= MAX_INLINE_BYTES ? candidate : undefined;
  return entry;
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

// An {include, exclude} context object skips the globals deduction axe does
// for a plain element argument, so it needs an explicit axe.setup() first.
async function runAxe(
  documentElement: HTMLElement,
  exclusions: HTMLElement[],
  options: axe.RunOptions,
) {
  if (!exclusions.length) return axe.run(documentElement, options);

  axe.setup(documentElement.ownerDocument);
  try {
    return await axe.run(
      { include: documentElement, exclude: exclusions } as never,
      options,
    );
  } finally {
    try {
      axe.teardown();
    } catch {
      // axe.run tears down on success; a second teardown throws.
    }
  }
}

// Excluding is only worth axe's slower context-object path when a few large
// subtrees cover most of the document.
const PRUNE_MIN_ELEMENTS = 50;
const PRUNE_MIN_SHARE = 0.5;
const PRUNE_MAX_SUBTREES = 16;

// Maximal subtrees where nothing can anchor a diagnostic: no host element
// (unprefixed node id) and no region root.
function collectPrunableSubtrees(
  documentElement: HTMLElement,
  extraction: HTMLExtraction,
): HTMLElement[] {
  const { inlineRegions, nodeDetails } = extraction;
  if (!inlineRegions.length) return [];

  let inlinedIds = 0;
  for (const id in nodeDetails) if (id.includes("#")) inlinedIds++;
  if (inlinedIds < PRUNE_MIN_ELEMENTS / 2) return [];

  const rootIds = new Set(inlineRegions.flatMap((region) => region.rootIds));

  const containsHost = new Map<Element, boolean>();
  const subtreeSize = new Map<Element, number>();
  const measure = (element: Element) => {
    const id = element.getAttribute("data-marko-node-id");
    let host = id !== null && !id.includes("#");
    let size = 1;
    for (const child of element.children) {
      measure(child);
      host = containsHost.get(child)! || host;
      size += subtreeSize.get(child)!;
    }
    containsHost.set(element, host);
    subtreeSize.set(element, size);
  };
  measure(documentElement);

  const exclusions: { element: HTMLElement; size: number }[] = [];
  const visit = (element: Element) => {
    const id = element.getAttribute("data-marko-node-id");
    if (
      (id === null || id.includes("#")) &&
      !(id !== null && rootIds.has(id)) &&
      !containsHost.get(element)
    ) {
      exclusions.push({
        element: element as HTMLElement,
        size: subtreeSize.get(element)!,
      });
      return;
    }
    for (const child of element.children) visit(child);
  };
  visit(documentElement);

  exclusions.sort((a, b) => b.size - a.size);
  exclusions.length = Math.min(exclusions.length, PRUNE_MAX_SUBTREES);
  const pruned = exclusions.reduce((sum, e) => sum + e.size, 0);
  if (
    pruned < PRUNE_MIN_ELEMENTS ||
    pruned < PRUNE_MIN_SHARE * subtreeSize.get(documentElement)!
  ) {
    return [];
  }
  return exclusions.map((e) => e.element);
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
