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
}

type Blacklist =
  // Explicitly blacklisted for Marko Language Server
  | typeof r.structure.frameTested
  // Requires a parent component to validate; we can potentially add support with child component analysis
  | typeof r.aria.ariaRequiredParent
  | typeof r.forms.label
  | typeof r.forms.labelTitleOnly
  | typeof r.forms.selectName
  | typeof r.keyboard.bypass
  | typeof r.keyboard.nestedInteractive
  | typeof r.keyboard.region
  | typeof r.semantics.headingOrder
  | typeof r.semantics.landmarkBannerIsTopLevel
  | typeof r.semantics.landmarkComplementaryIsTopLevel
  | typeof r.semantics.landmarkContentinfoIsTopLevel
  | typeof r.semantics.landmarkMainIsTopLevel
  | typeof r.semantics.landmarkOneMain
  | typeof r.semantics.pageHasHeadingOne
  | typeof r.structure.dlitem
  | typeof r.structure.listitem
  | typeof r.tables.tdHeadersAttr
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
  [r.aria.ariaRoles]: { dynamicAttrs: ["role"] },
  [r.aria.ariaText]: { unknownBody },
  [r.aria.ariaToggleFieldName]: { unknownBody, attrSpread },
  [r.aria.ariaTooltipName]: { unknownBody, attrSpread },
  [r.aria.ariaTreeitemName]: { unknownBody, attrSpread },
  [r.aria.presentationRoleConflict]: {},
  [r.forms.autocompleteValid]: {},
  [r.forms.formFieldMultipleLabels]: {},
  [r.keyboard.accesskeys]: {},
  [r.keyboard.frameFocusableContent]: { unknownBody },
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
  [r.semantics.identicalLinksSamePurpose]: {},
  [r.semantics.landmarkNoDuplicateBanner]: {},
  [r.semantics.landmarkNoDuplicateContentinfo]: {},
  [r.semantics.landmarkNoDuplicateMain]: {},
  [r.semantics.landmarkUnique]: {},
  [r.sensoryAndVisualCues.metaViewport]: {},
  [r.sensoryAndVisualCues.metaViewportLarge]: {},
  [r.structure.definitionList]: { unknownBody },
  [r.structure.list]: { unknownBody },
  [r.tables.scopeAttrValid]: {},
  [r.tables.tableDuplicateName]: { unknownBody },
  [r.tables.thHasDataCells]: { unknownBody },
  [r.textAlternatives.areaAlt]: { attrSpread },
  [r.textAlternatives.documentTitle]: { unknownBody },
  [r.textAlternatives.frameTitle]: { unknownBody },
  [r.textAlternatives.frameTitleUnique]: { unknownBody },
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
