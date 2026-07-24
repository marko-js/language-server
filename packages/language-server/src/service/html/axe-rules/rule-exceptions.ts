import * as r from "./axe-rules";

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;
type AllRules = UnionToIntersection<(typeof r)[keyof typeof r]>;
type RuleId = AllRules[keyof AllRules];

export interface Exceptions {
  /**
   * Exclude if the listed attributes have a dynamic value
   */
  dynamicAttrs?: string[];
  /**
   * Exclude if the tag has a spread attribute
   */
  attrSpread?: boolean;
  /**
   * Exclude if the body content can't be determined
   */
  unknownBody?: boolean;
  /**
   * Exclude if inside a control flow branch (branches never coexist)
   */
  conditionalContent?: boolean;
  /**
   * Exclude unless the parent chain axe consults is fully known; written
   * against axe-core 4.12's checks — re-verify on axe upgrades
   */
  requiresKnownParent?: "direct" | "through-presentational-wrappers";
  /**
   * Exclude unless the file renders a complete document (authored `<html>`)
   * whose extraction exactly matches rendered output
   */
  requiresExactDocument?: boolean;
}

type Blacklist =
  // Explicitly blacklisted for Marko Language Server
  | typeof r.structure.frameTested
  // Seemingly broken in axe-core or JSDom
  | typeof r.aria.ariaRoledescription
  | typeof r.aria.ariaValidAttr
  | typeof r.color.colorContrast
  | typeof r.color.colorContrastEnhanced
  | typeof r.color.linkInTextBlock
  | typeof r.keyboard.scrollableRegionFocusable
  | typeof r.parsing.duplicateId
  | typeof r.parsing.duplicateIdActive
  | typeof r.parsing.duplicateIdAria
  | typeof r.sensoryAndVisualCues.targetSize
  | typeof r.structure.avoidInlineSpacing
  // handled by TypeScript
  | typeof r.aria.ariaValidAttrValue
  | typeof r.aria.ariaAllowedAttr
  // blacklisted as the rules are in axe-core experimental phase
  | typeof r.structure.cssOrientationLock
  | typeof r.keyboard.focusOrderSemantics
  | typeof r.structure.hiddenContent
  | typeof r.semantics.labelContentNameMismatch
  | typeof r.semantics.pAsHeading
  | typeof r.tables.tableFakeCaption
  | typeof r.tables.tdHasHeader;

type Whitelist = Exclude<RuleId, Blacklist>;

// utility variables so the objects don't all need `: true` everywhere
const unknownBody = true;
const attrSpread = true;
const conditionalContent = true;
const requiresExactDocument = true;

export const ruleExceptions: { [id in Whitelist]: Exceptions } = {
  [r.aria.ariaAllowedRole]: { dynamicAttrs: ["role"] },
  [r.aria.ariaBrailleEquivalent]: { attrSpread },
  [r.aria.ariaCommandName]: { unknownBody, attrSpread },
  [r.aria.ariaConditionalAttr]: { unknownBody, attrSpread },
  [r.aria.ariaDeprecatedRole]: { dynamicAttrs: ["role"] },
  [r.aria.ariaDialogName]: { unknownBody, attrSpread },
  [r.aria.ariaHiddenBody]: {},
  [r.aria.ariaInputFieldName]: { unknownBody, attrSpread },
  [r.aria.ariaMeterName]: { unknownBody, attrSpread },
  [r.aria.ariaProgressbarName]: { unknownBody, attrSpread },
  [r.aria.ariaProhibitedAttr]: { dynamicAttrs: ["role"] },
  [r.aria.ariaRequiredAttr]: { attrSpread },
  [r.aria.ariaRequiredChildren]: { unknownBody },
  [r.aria.ariaRequiredParent]: { requiresExactDocument },
  [r.aria.ariaRoles]: { dynamicAttrs: ["role"] },
  [r.aria.ariaTabName]: { unknownBody, attrSpread },
  [r.aria.ariaText]: { unknownBody },
  [r.aria.ariaToggleFieldName]: { unknownBody, attrSpread },
  [r.aria.ariaTooltipName]: { unknownBody, attrSpread },
  [r.aria.ariaTreeitemName]: { unknownBody, attrSpread },
  [r.aria.presentationRoleConflict]: {},
  [r.forms.autocompleteValid]: {},
  [r.forms.formFieldMultipleLabels]: {},
  [r.forms.label]: { requiresExactDocument },
  [r.forms.labelTitleOnly]: { requiresExactDocument },
  [r.forms.selectName]: { requiresExactDocument },
  [r.keyboard.accesskeys]: { conditionalContent },
  [r.keyboard.bypass]: { requiresExactDocument },
  [r.keyboard.frameFocusableContent]: { unknownBody },
  [r.keyboard.nestedInteractive]: { requiresExactDocument },
  [r.keyboard.region]: { requiresExactDocument },
  [r.keyboard.skipLink]: { unknownBody },
  [r.keyboard.tabindex]: {},
  [r.language.htmlHasLang]: { attrSpread },
  [r.language.htmlLangValid]: { dynamicAttrs: ["lang"] },
  [r.language.htmlXmlLangMismatch]: {},
  [r.language.validLang]: { dynamicAttrs: ["lang"] },
  [r.nameRoleValue.ariaHiddenFocus]: { unknownBody },
  [r.nameRoleValue.buttonName]: { unknownBody, attrSpread },
  [r.nameRoleValue.emptyHeading]: { unknownBody, attrSpread },
  [r.nameRoleValue.emptyTableHeader]: { unknownBody, attrSpread },
  [r.nameRoleValue.inputButtonName]: {
    unknownBody,
    attrSpread,
  },
  [r.nameRoleValue.linkName]: { unknownBody, attrSpread },
  [r.nameRoleValue.summaryName]: { unknownBody, attrSpread },
  [r.parsing.marquee]: {},
  [r.semantics.headingOrder]: { requiresExactDocument },
  [r.semantics.identicalLinksSamePurpose]: { conditionalContent },
  [r.semantics.landmarkBannerIsTopLevel]: { requiresExactDocument },
  [r.semantics.landmarkComplementaryIsTopLevel]: { requiresExactDocument },
  [r.semantics.landmarkContentinfoIsTopLevel]: { requiresExactDocument },
  [r.semantics.landmarkMainIsTopLevel]: { requiresExactDocument },
  [r.semantics.landmarkNoDuplicateBanner]: { conditionalContent },
  [r.semantics.landmarkNoDuplicateContentinfo]: { conditionalContent },
  [r.semantics.landmarkNoDuplicateMain]: { conditionalContent },
  [r.semantics.landmarkUnique]: { conditionalContent },
  [r.semantics.landmarkOneMain]: { requiresExactDocument },
  [r.semantics.pageHasHeadingOne]: { requiresExactDocument },
  [r.sensoryAndVisualCues.metaViewport]: {},
  [r.sensoryAndVisualCues.metaViewportLarge]: {},
  [r.structure.definitionList]: { unknownBody },
  [r.structure.dlitem]: {
    requiresKnownParent: "through-presentational-wrappers",
    dynamicAttrs: ["role"],
    attrSpread,
  },
  [r.structure.list]: { unknownBody },
  [r.structure.listitem]: {
    requiresKnownParent: "direct",
    dynamicAttrs: ["role"],
    attrSpread,
  },
  [r.tables.scopeAttrValid]: {},
  [r.tables.tableDuplicateName]: { unknownBody },
  [r.tables.tdHeadersAttr]: { requiresExactDocument },
  [r.tables.thHasDataCells]: { unknownBody },
  [r.textAlternatives.areaAlt]: { attrSpread },
  [r.textAlternatives.documentTitle]: { unknownBody },
  [r.textAlternatives.frameTitle]: { unknownBody },
  [r.textAlternatives.frameTitleUnique]: { unknownBody, conditionalContent },
  [r.textAlternatives.imageAlt]: { attrSpread },
  [r.textAlternatives.imageRedundantAlt]: { attrSpread },
  [r.textAlternatives.inputImageAlt]: { attrSpread },
  [r.textAlternatives.objectAlt]: { attrSpread },
  [r.textAlternatives.roleImgAlt]: { attrSpread },
  [r.textAlternatives.serverSideImageMap]: {},
  [r.textAlternatives.svgImgAlt]: { attrSpread },
  [r.textAlternatives.videoCaption]: { unknownBody },
  [r.timeAndMedia.audioCaption]: { unknownBody },
  [r.timeAndMedia.blink]: {},
  [r.timeAndMedia.metaRefresh]: {},
  [r.timeAndMedia.metaRefreshNoExceptions]: {},
  [r.timeAndMedia.noAutoplayAudio]: {},
};
