import {
  isControlFlowTag,
  type Node,
  NodeType,
  type Parsed,
  type Range,
} from "../../parser";
import { Extractor } from "../../util/extractor";
import {
  AttributeValueType,
  getAttributeValueType,
  isHTMLTag,
} from "./keywords";

export interface HTMLNodeDetails {
  hasDynamicAttrs: boolean;
  hasDynamicBody: boolean;
  inConditional: boolean;
}

interface HTMLBodySlot {
  offset: number;
  depth: number;
  inConditional: boolean;
}

/** How faithfully extracted HTML reflects rendered output, best to worst:
 * exact match; right structure with stand-in values; unknown structure. */
export type ExtractionFidelity = "exact" | "approximate" | "uncertain";

export interface InlineChildTemplate {
  /** The HTML skeleton, split at the default body slot when exactly one exists. */
  segments: [string] | [string, string];
  bodySlot?: { depth: number; inConditional: boolean };
  fidelity: ExtractionFidelity;
  nodeDetails: Record<string, HTMLNodeDetails>;
  rootIds: string[];
}

export interface InlineRegion {
  start: number;
  end: number;
  tagName: Range;
  bodyUncertain: boolean;
  inConditional: boolean;
  rootIds: string[];
}

export interface ExtractHTMLOptions {
  nodeIdPrefix?: string;
  resolveChild?(tagName: string): InlineChildTemplate | undefined;
}

const bodySlotReg = /^\$\{\s*input\.(?:renderBody|content)\s*\}$/;

export function extractHTML(parsed: Parsed, options: ExtractHTMLOptions = {}) {
  return new HTMLExtractor(parsed, options, false).end();
}

/** Extracts a template as a skeleton that can be inlined at its usage sites. */
export function extractChildTemplate(
  parsed: Parsed,
  options: ExtractHTMLOptions = {},
) {
  return new HTMLExtractor(parsed, options, true).endChildTemplate();
}

class HTMLExtractor {
  #extractor: Extractor;
  #read: Parsed["read"];
  #options: ExtractHTMLOptions;
  #nodeDetails: Record<string, HTMLNodeDetails>;
  #nodeIdCounter: number;
  #domDepth: number;
  #conditionalDepth: number;
  #uncertain: boolean;
  #rootIds: string[];
  #bodySlots: HTMLBodySlot[];
  #inlineRegions: InlineRegion[];
  #approximate: boolean;
  #trackBodySlot: boolean;

  constructor(
    parsed: Parsed,
    options: ExtractHTMLOptions,
    trackBodySlot: boolean,
  ) {
    this.#extractor = new Extractor(parsed);
    this.#read = parsed.read.bind(parsed);
    this.#options = options;
    this.#nodeDetails = {};
    this.#nodeIdCounter = 0;
    this.#domDepth = 0;
    this.#conditionalDepth = 0;
    this.#uncertain = false;
    this.#rootIds = [];
    this.#bodySlots = [];
    this.#inlineRegions = [];
    this.#approximate = false;
    this.#trackBodySlot = trackBodySlot;
    parsed.program.body.forEach((node) => {
      if (this.#visitNode(node)) this.#uncertain = true;
    });
  }

  end() {
    return {
      extracted: this.#extractor.end(),
      nodeDetails: this.#nodeDetails,
      inlineRegions: this.#inlineRegions,
      fidelity: this.#fidelity(),
    };
  }

  endChildTemplate(): InlineChildTemplate {
    const html = this.#extractor.end().toString();
    const slot = this.#bodySlots.length === 1 ? this.#bodySlots[0] : undefined;
    return {
      segments: slot
        ? [html.slice(0, slot.offset), html.slice(slot.offset)]
        : [html],
      bodySlot: slot && {
        depth: slot.depth,
        inConditional: slot.inConditional,
      },
      fidelity: this.#fidelity(),
      nodeDetails: this.#nodeDetails,
      rootIds: this.#rootIds,
    };
  }

  #fidelity(): ExtractionFidelity {
    if (this.#uncertain) return "uncertain";
    return this.#approximate ? "approximate" : "exact";
  }

  #visitNode(node: Node.ChildNode): boolean {
    let hasDynamicBody = false,
      hasDynamicAttrs = false,
      isDynamic = false;
    switch (node.type) {
      case NodeType.AttrTag:
        node.body?.forEach((child) => {
          if (this.#visitNode(child)) hasDynamicBody = true;
        });
        break;
      case NodeType.Tag: {
        if (node.nameText === "script" || node.nameText === "style") {
          break;
        }

        if (isControlFlowTag(node)) {
          // Emitted inline: control flow renders no element of its own.
          this.#conditionalDepth++;
          node.body?.forEach((child) => this.#visitNode(child));
          this.#conditionalDepth--;
          isDynamic = true;
          break;
        }

        if (!node.nameText || !isHTMLTag(node.nameText)) {
          isDynamic = this.#writeDynamicTag(node);
          break;
        }

        const nodeId = `${this.#options.nodeIdPrefix ?? ""}${this
          .#nodeIdCounter++}`;
        ({ hasDynamicAttrs, hasDynamicBody } = this.#writeHTMLTag(
          node,
          nodeId,
        ));
        this.#nodeDetails[nodeId] = {
          hasDynamicAttrs,
          hasDynamicBody,
          inConditional: this.#conditionalDepth > 0,
        };
        break;
      }
      case NodeType.Text:
        this.#extractor.copy(node);
        break;
      case NodeType.Placeholder:
        // Placeholder text stands in for unknown (possibly empty) content.
        this.#approximate = true;
        isDynamic =
          this.#read({
            start: node.start + 1,
            end: node.start + 2,
          }) === "!";
        this.#extractor.write("placeholder");
        break;
    }

    return isDynamic || hasDynamicBody;
  }

  #writeDynamicTag(node: Node.Tag): boolean {
    if (
      !node.nameText &&
      !node.body &&
      bodySlotReg.test(this.#read(node.name))
    ) {
      // Without a usage site the default body is unknown content.
      if (!this.#trackBodySlot) return true;

      this.#bodySlots.push({
        offset: this.#extractor.length,
        depth: this.#domDepth,
        inConditional: this.#conditionalDepth > 0,
      });
      return false;
    }

    const child =
      node.nameText && this.#options.resolveChild
        ? this.#options.resolveChild(node.nameText)
        : undefined;

    if (
      child &&
      !node.hasAttrTags &&
      (!node.body || child.segments.length === 2)
    ) {
      return this.#inlineChild(node, child);
    }

    // Replace unknown and unresolvable tags with a `div` wrapping their body.
    if (node.body) {
      this.#extractor.write("<div>");
      this.#domDepth++;
      node.body.forEach((child) => this.#visitNode(child));
      this.#domDepth--;
      this.#extractor.write("</div>");
    }

    return true;
  }

  #inlineChild(node: Node.Tag, child: InlineChildTemplate): boolean {
    const start = this.#extractor.length;
    if (child.fidelity !== "exact") this.#approximate = true;
    if (this.#domDepth === 0) this.#rootIds.push(...child.rootIds);
    Object.assign(this.#nodeDetails, child.nodeDetails);

    this.#extractor.write(child.segments[0]);

    let bodyUncertain = false;
    if (node.body && child.bodySlot) {
      const { depth, inConditional } = child.bodySlot;
      this.#domDepth += depth;
      if (inConditional) this.#conditionalDepth++;
      node.body.forEach((c) => {
        if (this.#visitNode(c)) bodyUncertain = true;
      });
      if (inConditional) this.#conditionalDepth--;
      this.#domDepth -= depth;
    }

    if (child.segments.length === 2) this.#extractor.write(child.segments[1]);

    this.#inlineRegions.push({
      start,
      end: this.#extractor.length,
      tagName: node.name,
      bodyUncertain,
      inConditional: this.#conditionalDepth > 0,
      rootIds: child.rootIds,
    });

    return child.fidelity === "uncertain" || bodyUncertain;
  }

  #writeHTMLTag(node: Node.Tag, id: string) {
    let hasDynamicAttrs = false,
      hasDynamicBody = false;
    if (this.#domDepth === 0) this.#rootIds.push(id);
    // <[node name]
    this.#extractor.write("<");
    this.#extractor.copy(isEmptyRange(node.name) ? node.nameText : node.name);

    this.#extractor.write(` data-marko-node-id="${id}"`);
    this.#writeShorthands(node);
    // [node attributes]
    node.attrs?.forEach((attr) => {
      if (attr.type === NodeType.AttrNamed) this.#writeAttrNamed(attr);
      else if (attr.type === NodeType.AttrSpread) {
        hasDynamicAttrs = true;
        this.#approximate = true;
      }
    });
    // [body or self-closing `/`]
    this.#extractor.write(">");

    if (!isVoidTag(node.nameText)) {
      this.#domDepth++;
      node.body?.forEach((child) => {
        if (this.#visitNode(child)) hasDynamicBody = true;
      });
      this.#domDepth--;
      this.#extractor.write(`</${node.nameText}>`);
    }

    return { hasDynamicAttrs, hasDynamicBody };
  }

  #writeShorthands(node: Node.Tag) {
    const { shorthandId, shorthandClassNames } = node;
    if (shorthandId) {
      this.#extractor.write(' id="');
      if (shorthandId.expressions.length) {
        this.#writeDynamic();
      } else {
        this.#extractor.copy({
          start: shorthandId.start + 1,
          end: shorthandId.end,
        });
      }
      this.#extractor.write('"');
    }

    if (shorthandClassNames) {
      this.#extractor.write(' class="');
      shorthandClassNames.forEach((shorthandClass, i) => {
        if (i) this.#extractor.write(" ");
        if (shorthandClass.expressions.length) {
          this.#writeDynamic();
        } else {
          this.#extractor.copy({
            start: shorthandClass.start + 1,
            end: shorthandClass.end,
          });
        }
      });
      this.#extractor.write('"');
    }
  }

  #writeAttrNamed(attr: Node.AttrNamed) {
    this.#extractor.write(" ");
    const nameString = this.#read(attr.name);
    if (/:(?:scoped|(?:no-update(?:-if)?))$/.test(nameString)) {
      this.#extractor.copy({
        start: attr.name.start,
        end: attr.name.start + nameString.lastIndexOf(":"),
      });
    } else {
      this.#extractor.copy(attr.name);
    }

    if (
      attr.value === undefined ||
      attr.name.start === attr.name.end ||
      attr.value.type === NodeType.AttrMethod
    ) {
      return;
    }

    const valueString = this.#read(attr.value);
    const valueType = getAttributeValueType(valueString);
    if (valueType === undefined) return;

    switch (valueType) {
      case AttributeValueType.True:
        break;
      case AttributeValueType.Literal:
        this.#extractor.write('="');
        this.#extractor.copy({
          start: attr.value.start + valueString.search(/[^=\s]/g),
          end: attr.value.end,
        });
        this.#extractor.write('"');
        break;
      case AttributeValueType.QuotedString: {
        const start = valueString.search(/[^=\s]/g) + 1;
        // A raw `"` in the value would terminate the generated attribute.
        if (valueString.slice(start, -1).includes('"')) {
          this.#extractor.write('="');
          this.#writeDynamic();
          this.#extractor.write('"');
          break;
        }
        this.#extractor.write('="');
        this.#extractor.copy({
          start: attr.value.start + start,
          end: attr.value.end - 1,
        });
        this.#extractor.write('"');
        break;
      }
      case AttributeValueType.Dynamic:
        this.#extractor.write('="');
        this.#writeDynamic();
        this.#extractor.write('"');
        break;
    }
  }

  /** Stands in for values only known at runtime (vs removing the attribute). */
  #writeDynamic() {
    this.#extractor.write("dynamic");
    this.#approximate = true;
  }
}

function isVoidTag(tagName: string | undefined) {
  switch (tagName) {
    case "area":
    case "base":
    case "br":
    case "col":
    case "embed":
    case "hr":
    case "img":
    case "input":
    case "link":
    case "meta":
    case "param":
    case "source":
    case "track":
    case "wbr":
      return true;
    default:
      return false;
  }
}

function isEmptyRange(range: Range) {
  return range.start === range.end;
}
