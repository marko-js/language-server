import * as r from "./axe-rules";

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;
type AllRules = UnionToIntersection<(typeof r)[keyof typeof r]>;
type RuleId = AllRules[keyof AllRules];

export interface Exceptions {
  dynamicAttrs?: string[];
  attrSpread?: boolean;
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
  | typeof r.tables.tdHasHeader
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
  | typeof r.semantics.pAsHeading
  | typeof r.sensoryAndVisualCues.targetSize
  | typeof r.structure.avoidInlineSpacing
  | typeof r.structure.cssOrientationLock
  | typeof r.structure.hiddenContent
  // handled by TypeScript
  | typeof r.aria.ariaValidAttrValue
  | typeof r.aria.ariaAllowedAttr;

type Whitelist = Exclude<RuleId, Blacklist>;

export const ruleExceptions: { [id in Whitelist]: Exceptions } = {
  [r.aria.ariaAllowedRole]: { dynamicAttrs: ["role"] },
  [r.aria.ariaCommandName]: { unknownBody: true, attrSpread: true },
  [r.aria.ariaDialogName]: { unknownBody: true, attrSpread: true },
  [r.aria.ariaHiddenBody]: {},
  [r.aria.ariaInputFieldName]: { unknownBody: true, attrSpread: true },
  [r.aria.ariaMeterName]: { unknownBody: true, attrSpread: true },
  [r.aria.ariaProgressbarName]: { unknownBody: true, attrSpread: true },
  [r.aria.ariaRequiredAttr]: { attrSpread: true },
  [r.aria.ariaRequiredChildren]: { unknownBody: true },
  [r.aria.ariaRoles]: { dynamicAttrs: ["role"] },
  [r.aria.ariaText]: { unknownBody: true },
  [r.aria.ariaToggleFieldName]: { unknownBody: true, attrSpread: true },
  [r.aria.ariaTooltipName]: { unknownBody: true, attrSpread: true },
  [r.aria.ariaTreeitemName]: { unknownBody: true, attrSpread: true },
  [r.aria.presentationRoleConflict]: {},
  [r.forms.autocompleteValid]: {},
  [r.forms.formFieldMultipleLabels]: {},
  [r.keyboard.accesskeys]: {},
  [r.keyboard.focusOrderSemantics]: {},
  [r.keyboard.frameFocusableContent]: { unknownBody: true },
  [r.keyboard.skipLink]: { unknownBody: true },
  [r.keyboard.tabindex]: {},
  [r.language.htmlHasLang]: { attrSpread: true },
  [r.language.htmlLangValid]: { dynamicAttrs: ["lang"] },
  [r.language.htmlXmlLangMismatch]: {},
  [r.language.validLang]: { dynamicAttrs: ["lang"] },
  [r.nameRoleValue.ariaHiddenFocus]: { unknownBody: true },
  [r.nameRoleValue.buttonName]: { unknownBody: true, attrSpread: true },
  [r.nameRoleValue.emptyHeading]: {},
  [r.nameRoleValue.emptyTableHeader]: { unknownBody: true },
  [r.nameRoleValue.inputButtonName]: {
    unknownBody: true,
    attrSpread: true,
  },
  [r.nameRoleValue.linkName]: { unknownBody: true, attrSpread: true },
  [r.parsing.marquee]: {},
  [r.semantics.identicalLinksSamePurpose]: {},
  [r.semantics.labelContentNameMismatch]: { unknownBody: true },
  [r.semantics.landmarkNoDuplicateBanner]: {},
  [r.semantics.landmarkNoDuplicateContentinfo]: {},
  [r.semantics.landmarkNoDuplicateMain]: {},
  [r.semantics.landmarkUnique]: {},
  [r.sensoryAndVisualCues.metaViewport]: {},
  [r.sensoryAndVisualCues.metaViewportLarge]: {},
  [r.structure.definitionList]: { unknownBody: true },
  [r.structure.list]: { unknownBody: true },
  [r.tables.scopeAttrValid]: {},
  [r.tables.tableDuplicateName]: { unknownBody: true },
  [r.tables.tableFakeCaption]: { unknownBody: true },
  [r.tables.thHasDataCells]: { unknownBody: true },
  [r.textAlternatives.areaAlt]: { attrSpread: true },
  [r.textAlternatives.documentTitle]: { unknownBody: true },
  [r.textAlternatives.frameTitle]: { unknownBody: true },
  [r.textAlternatives.frameTitleUnique]: { unknownBody: true },
  [r.textAlternatives.imageAlt]: { attrSpread: true },
  [r.textAlternatives.imageRedundantAlt]: { attrSpread: true },
  [r.textAlternatives.inputImageAlt]: { attrSpread: true },
  [r.textAlternatives.objectAlt]: { attrSpread: true },
  [r.textAlternatives.roleImgAlt]: { attrSpread: true },
  [r.textAlternatives.serverSideImageMap]: {},
  [r.textAlternatives.svgImgAlt]: { attrSpread: true },
  [r.textAlternatives.videoCaption]: { unknownBody: true },
  [r.timeAndMedia.audioCaption]: { unknownBody: true },
  [r.timeAndMedia.blink]: {},
  [r.timeAndMedia.metaRefresh]: {},
  [r.timeAndMedia.metaRefreshNoExceptions]: {},
  [r.timeAndMedia.noAutoplayAudio]: {},
};
