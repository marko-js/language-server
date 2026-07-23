import {
  extractHTML,
  type InlineChildTemplate,
  type InlineRegion,
  type Parsed,
} from "@marko/language-tools";
import axe from "axe-core";
import { JSDOM } from "jsdom";
import path from "path";
import type { TextDocument } from "vscode-languageserver-textdocument";
import { URI } from "vscode-uri";

import { getMarkoFile, type MarkoFile } from "../../utils/file";
import { get, projectVersion } from "../../utils/text-documents";
import type { Plugin } from "../types";
import { type Exceptions, ruleExceptions } from "./axe-rules/rule-exceptions";

const MAX_INLINE_DEPTH = 3;
const MAX_INLINE_BYTES = 100_000;

type Extraction = ReturnType<typeof extractHTML>;
type NodeDetails = Extraction["nodeDetails"];

// Keyed on projectVersion: inlined children can change without a re-parse.
const extractCache = new WeakMap<
  Parsed,
  { version: number; result: Extraction }
>();
let skeletonCacheVersion = -1;
let skeletonCache = new Map<Parsed, InlineChildTemplate | undefined>();

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
    const { extracted, nodeDetails, inlineRegions } = extraction;

    const jsdom = new JSDOM(extracted.toString(), {
      includeNodeLocations: true,
    });
    const { documentElement } = jsdom.window.document;
    const exactDocument = isExactFullDocument(extraction, documentElement);

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
        (exceptions.requiresFullDocument && !exactDocument) ||
        (exceptions.requiresKnownParent &&
          !hasKnownParent(element, exceptions.requiresKnownParent, nodeDetails))
      ) {
        return [];
      }

      const generatedLoc = jsdom.nodeLocation(element);
      if (!generatedLoc) return [];

      let messagePrefix = "";
      let sourceRange = extracted.sourceLocationAt(
        generatedLoc.startOffset + 1,
        generatedLoc.startOffset + 1 + element.tagName.length,
      );

      if (!sourceRange) {
        // Unmapped elements come from an inlined child; only its top-level
        // elements re-anchor to the usage site.
        const region = innermostRegionAt(
          inlineRegions,
          generatedLoc.startOffset,
        );
        if (
          !region ||
          !nodeId ||
          !region.rootIds.includes(nodeId) ||
          (exceptions.unknownBody && region.bodyUncertain) ||
          (exceptions.conditionalContent && region.inConditional)
        ) {
          return [];
        }

        sourceRange = extracted.parsed.locationAt(region.tagName);
        messagePrefix = `This tag renders a \`<${element.tagName.toLowerCase()}>\` element here — `;
      }

      return [
        {
          range: sourceRange,
          severity: 3,
          source: `axe-core(${ruleId})`,
          message:
            messagePrefix +
            (result.failureSummary ?? "unknown accessibility issue"),
        },
      ];
    });
  },
};

function extract(doc: TextDocument) {
  const file = getMarkoFile(doc);
  const cached = extractCache.get(file.parsed);
  if (cached && cached.version === projectVersion) return cached.result;

  const result = extractHTML(file.parsed, {
    resolveChild: createChildResolver(
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

    const skeleton = getSkeleton(template, stack);
    if (!skeleton) return;

    const size =
      skeleton.segments[0].length + (skeleton.segments[1]?.length ?? 0);
    if (size > budget.remaining) return;
    budget.remaining -= size;

    return skeleton;
  };
}

function getSkeleton(
  template: string,
  stack: Set<string>,
): InlineChildTemplate | undefined {
  const doc = get(URI.file(template).toString());
  if (!doc) return;
  const file = getMarkoFile(doc);

  if (skeletonCacheVersion !== projectVersion) {
    skeletonCacheVersion = projectVersion;
    skeletonCache = new Map();
  }
  if (skeletonCache.has(file.parsed)) return skeletonCache.get(file.parsed);
  skeletonCache.set(file.parsed, undefined);

  const {
    extracted,
    nodeDetails,
    uncertain,
    hasPlaceholders,
    bodySlots,
    rootIds,
  } = extractHTML(file.parsed, {
    nodeIdPrefix: getNodeIdPrefix(template),
    trackBodySlot: true,
    resolveChild: createChildResolver(file, new Set(stack).add(template), {
      remaining: MAX_INLINE_BYTES,
    }),
  });

  const html = extracted.toString();
  let skeleton: InlineChildTemplate | undefined;
  if (html.length <= MAX_INLINE_BYTES) {
    const slot = bodySlots.length === 1 ? bodySlots[0] : undefined;
    skeleton = {
      segments: slot
        ? [html.slice(0, slot.offset), html.slice(slot.offset)]
        : [html],
      bodySlotDepth: slot?.depth ?? 0,
      bodySlotConditional: slot?.inConditional ?? false,
      uncertain,
      hasPlaceholders,
      nodeDetails,
      rootIds,
    };
  }

  skeletonCache.set(file.parsed, skeleton);
  return skeleton;
}

// The extraction is exact when the file renders a whole document (an authored
// `<html>`) containing nothing dynamic; page-scoped rules can then run safely.
function isExactFullDocument(extraction: Extraction, documentElement: Element) {
  return (
    !extraction.uncertain &&
    !extraction.hasPlaceholders &&
    (documentElement as HTMLElement).dataset.markoNodeId !== undefined &&
    !extraction.extracted.toString().includes('="dynamic"') &&
    Object.values(extraction.nodeDetails).every(
      (details) => !details.hasDynamicAttrs,
    )
  );
}

function innermostRegionAt(regions: InlineRegion[], offset: number) {
  let match: InlineRegion | undefined;
  for (const region of regions) {
    if (
      region.start <= offset &&
      offset < region.end &&
      (!match || region.start >= match.start)
    ) {
      match = region;
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

  if (mode === "div-wrapped" && parent!.tagName === "DIV") {
    const role = parent!.getAttribute("role");
    if (!role || role === "presentation" || role === "none") {
      // axe looks through presentational div wrappers to the grandparent.
      return isKnownElement(parent!.parentElement, nodeDetails);
    }
  }

  return true;
}

function isKnownElement(element: HTMLElement | null, nodeDetails: NodeDetails) {
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
