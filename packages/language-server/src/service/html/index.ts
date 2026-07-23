import {
  extractChildTemplate,
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
let childTemplateCacheVersion = -1;
let childTemplateCache = new Map<Parsed, InlineChildTemplate | undefined>();

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
    const { extracted, nodeDetails } = extraction;

    const jsdom = new JSDOM(extracted.toString(), {
      includeNodeLocations: true,
    });
    const { documentElement } = jsdom.window.document;
    // Page-scoped rules only run when the extraction is exactly the rendered
    // output and covers the whole document (an authored `<html>`).
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
          range: anchor.range,
          severity: 3,
          source: `axe-core(${ruleId})`,
          message:
            anchor.messagePrefix +
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
  childTemplateCache.set(file.parsed, undefined);

  const candidate = extractChildTemplate(file.parsed, {
    nodeIdPrefix: getNodeIdPrefix(template),
    // Each cached template gets its own budget; usage sites re-check the
    // composed size against theirs.
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

// Source anchor for a violation: the element itself when it maps into this
// document, else the usage site of the inlined child whose root rendered it.
function anchorViolation(
  extraction: Extraction,
  element: HTMLElement,
  generatedOffset: number,
  exceptions: Exceptions,
) {
  const { extracted, inlineRegions } = extraction;
  const range = extracted.sourceLocationAt(
    generatedOffset + 1,
    generatedOffset + 1 + element.tagName.length,
  );
  if (range) return { range, messagePrefix: "" };

  const region = innermostRegionAt(inlineRegions, generatedOffset);
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
    range: extracted.parsed.locationAt(region.tagName),
    messagePrefix: `This tag renders a \`<${element.tagName.toLowerCase()}>\` element here — `,
  };
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

  if (mode === "div-wrapped" && parent.tagName === "DIV") {
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
