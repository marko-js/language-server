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
  /** True inside a control flow branch, which may render zero or many times. */
  inConditional: boolean;
}

export interface HTMLBodySlot {
  /** Offset in the generated HTML where default body content is rendered. */
  offset: number;
  /** Number of elements the slot is nested under within the template. */
  depth: number;
  /** True when the slot itself is inside a control flow branch. */
  inConditional: boolean;
}

/** A pre-extracted child template that can be inlined where a custom tag is used. */
export interface InlineChildTemplate {
  /** The HTML skeleton, split at the default body slot when exactly one exists. */
  segments: [string] | [string, string];
  /** Element depth of the body slot (only when `segments.length === 2`). */
  bodySlotDepth: number;
  /** True when the body slot is inside a control flow branch. */
  bodySlotConditional: boolean;
  /** True when the skeleton may not match rendered output; propagated to the
   * usage site's ancestors so `unknownBody` rule exceptions still apply. */
  uncertain: boolean;
  /** Details for elements of the skeleton, keyed by (prefixed) node id. */
  nodeDetails: Record<string, HTMLNodeDetails>;
  /** Node ids of the top-level elements of the skeleton. */
  rootIds: string[];
}

/** A generated range produced by inlining a child template. */
export interface InlineRegion {
  start: number;
  end: number;
  /** Source range of the custom tag name, used to re-anchor diagnostics. */
  tagName: Range;
  /** True when body content spliced into this instance is dynamic. */
  bodyUncertain: boolean;
  /** True when the usage site is inside a control flow branch. */
  inConditional: boolean;
  /** Top-level element node ids of the inlined skeleton. */
  rootIds: string[];
}

export interface ExtractHTMLOptions {
  /** Unique-per-template prefix for node ids so merged details can't collide. */
  nodeIdPrefix?: string;
  /** Report bodyless `<${input.renderBody}/>` tags as body slots instead of
   * unknown content; enable only when extracting a template for inlining. */
  trackBodySlot?: boolean;
  /** Resolve a custom tag to a child template skeleton to inline. */
  resolveChild?(tagName: string): InlineChildTemplate | undefined;
}

const bodySlotReg = /^\$\{\s*input\.(?:renderBody|content)\s*\}$/;

export function extractHTML(parsed: Parsed, options: ExtractHTMLOptions = {}) {
  return new HTMLExtractor(parsed, options).end();
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

  constructor(parsed: Parsed, options: ExtractHTMLOptions) {
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
    parsed.program.body.forEach((node) => {
      if (this.#visitNode(node)) this.#uncertain = true;
    });
  }

  end() {
    return {
      extracted: this.#extractor.end(),
      nodeDetails: this.#nodeDetails,
      uncertain: this.#uncertain,
      bodySlots: this.#bodySlots,
      inlineRegions: this.#inlineRegions,
      rootIds: this.#rootIds,
    };
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
          // Control flow renders no element of its own; emit the body directly
          // so structural rules see the true parent/child relationships.
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

  /** Handles tags that are not plain HTML elements (custom/dynamic tags). */
  #writeDynamicTag(node: Node.Tag): boolean {
    // `<${input.renderBody}/>` — where a template renders its default body.
    if (
      !node.nameText &&
      !node.body &&
      bodySlotReg.test(this.#read(node.name))
    ) {
      if (this.#options.trackBodySlot) {
        this.#bodySlots.push({
          offset: this.#extractor.length,
          depth: this.#domDepth,
          inConditional: this.#conditionalDepth > 0,
        });
        return false;
      }

      // Without a usage site the body is unknown content.
      return true;
    }

    const child =
      node.nameText && this.#options.resolveChild
        ? this.#options.resolveChild(node.nameText)
        : undefined;

    if (
      child &&
      // Named content (`<@foo>`) can't be placed within the child skeleton.
      !node.hasAttrTags &&
      // A body needs a known slot to splice into.
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
    if (this.#domDepth === 0) this.#rootIds.push(...child.rootIds);
    Object.assign(this.#nodeDetails, child.nodeDetails);

    this.#extractor.write(child.segments[0]);

    let bodyUncertain = false;
    if (node.body && child.segments.length === 2) {
      this.#domDepth += child.bodySlotDepth;
      if (child.bodySlotConditional) this.#conditionalDepth++;
      node.body.forEach((c) => {
        if (this.#visitNode(c)) bodyUncertain = true;
      });
      if (child.bodySlotConditional) this.#conditionalDepth--;
      this.#domDepth -= child.bodySlotDepth;
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

    return child.uncertain || bodyUncertain;
  }

  #writeHTMLTag(node: Node.Tag, id: string) {
    let hasDynamicAttrs = false,
      hasDynamicBody = false;
    if (this.#domDepth === 0) this.#rootIds.push(id);
    // <[node name]
    this.#extractor.write("<");
    this.#extractor.copy(isEmptyRange(node.name) ? node.nameText : node.name);

    this.#extractor.write(` data-marko-node-id="${id}"`);
    // [node attributes]
    node.attrs?.forEach((attr) => {
      if (attr.type === NodeType.AttrNamed) this.#writeAttrNamed(attr);
      else if (attr.type === NodeType.AttrSpread) hasDynamicAttrs = true;
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
      case AttributeValueType.QuotedString:
        this.#extractor.write('="');
        this.#extractor.copy({
          start: attr.value.start + valueString.search(/[^=\s]/g) + 1,
          end: attr.value.end - 1,
        });
        this.#extractor.write('"');
        break;
      case AttributeValueType.Dynamic:
        // Replace all dynamic values with the string "dynamic" with a counter instead of removing them
        // Subject to change-- axe-core might require "true" for aria attributes or something
        this.#extractor.write(`="dynamic"`);
        break;
    }
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
