import {
  aria,
  forms,
  keyboard,
  language,
  nameRoleValue,
  parsing,
  semantics,
  sensoryAndVisualCues,
  structure,
  tables,
  textAlternatives,
  timeAndMedia,
} from "./axe-rules";

/**
 * This is a manually curated list of rules in `axe-core`,
 * separated by their dependence on dynamic content instead
 * of static HTML.
 *
 * Each rule should be placed in one and only one category.
 * Categories are in order of least to most restrictive, so
 * rules should be placed in the earliest category where they
 * are still properly ignored near dynamic content
 */
const rules = {
  /**
   * These rules can be evaluated against any component.
   */
  alwaysAllowed: [
    aria.ariaAllowedAttr,
    aria.ariaAllowedRole,
    aria.ariaHiddenBody,
    aria.ariaRoles,
    aria.ariaDeprecatedRole,
    aria.presentationRoleConflict,
    forms.autocompleteValid,
    forms.formFieldMultipleLabels, // Could not find error state
    keyboard.accesskeys,
    keyboard.focusOrderSemantics,
    keyboard.tabindex,
    language.htmlLangValid,
    language.htmlXmlLangMismatch,
    language.validLang,
    nameRoleValue.ariaHiddenFocus, // Could not find error state
    nameRoleValue.emptyHeading,
    parsing.marquee,
    semantics.identicalLinksSamePurpose, // Could not find error state
    semantics.landmarkNoDuplicateBanner,
    semantics.landmarkNoDuplicateContentinfo,
    semantics.landmarkNoDuplicateMain,
    semantics.landmarkUnique,
    sensoryAndVisualCues.metaViewportLarge, // Could not find error state
    sensoryAndVisualCues.metaViewport, // Could not find error state
    tables.scopeAttrValid, // Could not find error state
    textAlternatives.serverSideImageMap, // Could not find error state
    timeAndMedia.blink,
    timeAndMedia.metaRefresh, // Could not find error state
    timeAndMedia.noAutoplayAudio, // Could not find error state
  ],

  /**
   * These rules can't be resolved with a spread operator
   * in the node's attributes
   */
  requiresAttrs: [
    aria.ariaRequiredAttr,
    aria.ariaProhibitedAttr,
    language.htmlHasLang,
    textAlternatives.areaAlt,
    textAlternatives.imageAlt,
    textAlternatives.imageRedundantAlt,
    textAlternatives.inputImageAlt,
    textAlternatives.objectAlt,
    textAlternatives.roleImgAlt,
    textAlternatives.svgImgAlt,
  ],

  /**
   * These rules can't be resolved with dynamic content
   * in the body of the node
   */
  requiresChildren: [
    aria.ariaRequiredChildren,
    aria.ariaText,
    aria.ariaValidAttrValue,
    nameRoleValue.emptyTableHeader,
    keyboard.frameFocusableContent,
    keyboard.skipLink,
    nameRoleValue.ariaHiddenFocus,
    semantics.labelContentNameMismatch,
    structure.definitionList,
    structure.list,
    tables.tableDuplicateName,
    tables.tableFakeCaption,
    tables.thHasDataCells,
    textAlternatives.documentTitle,
    textAlternatives.frameTitleUnique,
    textAlternatives.frameTitle,
    textAlternatives.videoCaption,
  ],

  /**
   * These rules can be resolved by changing content in
   * either the node body or its attributes
   */
  requiresAttrsOrChildren: [
    aria.ariaCommandName,
    aria.ariaDialogName,
    aria.ariaInputFieldName,
    aria.ariaMeterName,
    aria.ariaProgressbarName,
    aria.ariaToggleFieldName,
    aria.ariaTooltipName,
    aria.ariaTreeitemName,
    nameRoleValue.inputButtonName,
    nameRoleValue.linkName,
  ],

  /**
   * These rules cannot be supported until multiple files
   * are analyzed at once. For now they are ignored.
   */
  requiresParent: [
    aria.ariaRequiredParent,
    forms.label,
    forms.labelTitleOnly,
    forms.selectName,
    keyboard.bypass,
    keyboard.nestedInteractive,
    keyboard.region,
    semantics.headingOrder,
    semantics.landmarkBannerIsTopLevel,
    semantics.landmarkComplementaryIsTopLevel,
    semantics.landmarkContentinfoIsTopLevel,
    semantics.landmarkMainIsTopLevel,
    semantics.landmarkOneMain,
    semantics.pageHasHeadingOne,
    structure.dlitem,
    structure.listitem,
    tables.tdHasHeader,
    tables.tdHeadersAttr,
  ],

  /**
   * These rules should not be enforced to all users of
   * the official Marko language server.
   */
  blacklist: [structure.frameTested],

  /**
   * These are rules that cannot currently be validated, either
   * because of limitations with JSDom + axe-core or with the
   * current implementation of the language server.
   */
  cannotValidate: [
    parsing.duplicateIdAria,
    keyboard.scrollableRegionFocusable,
    semantics.pAsHeading,
    structure.avoidInlineSpacing,
    structure.cssOrientationLock,
    structure.hiddenContent,
    sensoryAndVisualCues.targetSize,
  ],
};

export default rules;
