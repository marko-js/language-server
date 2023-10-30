export const keyboard = {
  /**
   * - Ensures every accesskey attribute value is unique
   * - accesskey attribute value should be unique ([url](https://dequeuniversity.com/rules/axe/4.7/accesskeys?application=axeAPI))
   */
  accesskeys: "accesskeys",
  /**
   * - Ensures each page has at least one mechanism for a user to bypass navigation and jump straight to the content
   * - Page must have means to bypass repeated blocks ([url](https://dequeuniversity.com/rules/axe/4.7/bypass?application=axeAPI))
   */
  bypass: "bypass",
  /**
   * - Ensures elements in the focus order have a role appropriate for interactive content
   * - Elements in the focus order should have an appropriate role ([url](https://dequeuniversity.com/rules/axe/4.7/focus-order-semantics?application=axeAPI))
   */
  focusOrderSemantics: "focus-order-semantics",
  /**
   * - Ensures `<frame>` and `<iframe>` elements with focusable content do not have tabindex=-1
   * - Frames with focusable content must not have tabindex=-1 ([url](https://dequeuniversity.com/rules/axe/4.7/frame-focusable-content?application=axeAPI))
   */
  frameFocusableContent: "frame-focusable-content",
  /**
   * - Ensures interactive controls are not nested as they are not always announced by screen readers or can cause focus problems for assistive technologies
   * - Interactive controls must not be nested ([url](https://dequeuniversity.com/rules/axe/4.7/nested-interactive?application=axeAPI))
   */
  nestedInteractive: "nested-interactive",
  /**
   * - Ensures all page content is contained by landmarks
   * - All page content should be contained by landmarks ([url](https://dequeuniversity.com/rules/axe/4.7/region?application=axeAPI))
   */
  region: "region",
  /**
   * - Ensure elements that have scrollable content are accessible by keyboard
   * - Scrollable region must have keyboard access ([url](https://dequeuniversity.com/rules/axe/4.7/scrollable-region-focusable?application=axeAPI))
   */
  scrollableRegionFocusable: "scrollable-region-focusable",
  /**
   * - Ensure all skip links have a focusable target
   * - The skip-link target should exist and be focusable ([url](https://dequeuniversity.com/rules/axe/4.7/skip-link?application=axeAPI))
   */
  skipLink: "skip-link",
  /**
   * - Ensures tabindex attribute values are not greater than 0
   * - Elements should not have tabindex greater than zero ([url](https://dequeuniversity.com/rules/axe/4.7/tabindex?application=axeAPI))
   */
  tabindex: "tabindex",
} as const;

export const textAlternatives = {
  /**
   * - Ensures `<area>` elements of image maps have alternate text
   * - Active `<area>` elements must have alternate text ([url](https://dequeuniversity.com/rules/axe/4.7/area-alt?application=axeAPI))
   */
  areaAlt: "area-alt",
  /**
   * - Ensures each HTML document contains a non-empty `<title>` element
   * - Documents must have `<title>` element to aid in navigation ([url](https://dequeuniversity.com/rules/axe/4.7/document-title?application=axeAPI))
   */
  documentTitle: "document-title",
  /**
   * - Ensures `<iframe>` and `<frame>` elements contain a unique title attribute
   * - Frames must have a unique title attribute ([url](https://dequeuniversity.com/rules/axe/4.7/frame-title-unique?application=axeAPI))
   */
  frameTitleUnique: "frame-title-unique",
  /**
   * - Ensures `<iframe>` and `<frame>` elements have an accessible name
   * - Frames must have an accessible name ([url](https://dequeuniversity.com/rules/axe/4.7/frame-title?application=axeAPI))
   */
  frameTitle: "frame-title",
  /**
   * - Ensures `<img>` elements have alternate text or a role of none or presentation
   * - Images must have alternate text ([url](https://dequeuniversity.com/rules/axe/4.7/image-alt?application=axeAPI))
   */
  imageAlt: "image-alt",
  /**
   * - Ensure image alternative is not repeated as text
   * - Alternative text of images should not be repeated as text ([url](https://dequeuniversity.com/rules/axe/4.7/image-redundant-alt?application=axeAPI))
   */
  imageRedundantAlt: "image-redundant-alt",
  /**
   * - Ensures `<input type="image">` elements have alternate text
   * - Image buttons must have alternate text ([url](https://dequeuniversity.com/rules/axe/4.7/input-image-alt?application=axeAPI))
   */
  inputImageAlt: "input-image-alt",
  /**
   * - Ensures `<object>` elements have alternate text
   * - `<object>` elements must have alternate text ([url](https://dequeuniversity.com/rules/axe/4.7/object-alt?application=axeAPI))
   */
  objectAlt: "object-alt",
  /**
   * - Ensures [role='img'] elements have alternate text
   * - [role='img'] elements must have an alternative text ([url](https://dequeuniversity.com/rules/axe/4.7/role-img-alt?application=axeAPI))
   */
  roleImgAlt: "role-img-alt",
  /**
   * - Ensures that server-side image maps are not used
   * - Server-side image maps must not be used ([url](https://dequeuniversity.com/rules/axe/4.7/server-side-image-map?application=axeAPI))
   */
  serverSideImageMap: "server-side-image-map",
  /**
   * - Ensures `<svg>` elements with an img, graphics-document or graphics-symbol role have an accessible text
   * - `<svg>` elements with an img role must have an alternative text ([url](https://dequeuniversity.com/rules/axe/4.7/svg-img-alt?application=axeAPI))
   */
  svgImgAlt: "svg-img-alt",
  /**
   * - Ensures `<video>` elements have captions
   * - `<video>` elements must have captions ([url](https://dequeuniversity.com/rules/axe/4.7/video-caption?application=axeAPI))
   */
  videoCaption: "video-caption",
} as const;

export const aria = {
  /**
   * - Ensures ARIA attributes are allowed for an element's role
   * - Elements must only use allowed ARIA attributes ([url](https://dequeuniversity.com/rules/axe/4.7/aria-allowed-attr?application=axeAPI))
   */
  ariaAllowedAttr: "aria-allowed-attr",
  /**
   * - Ensures role attribute has an appropriate value for the element
   * - ARIA role should be appropriate for the element ([url](https://dequeuniversity.com/rules/axe/4.7/aria-allowed-role?application=axeAPI))
   */
  ariaAllowedRole: "aria-allowed-role",
  /**
   * - Ensures every ARIA button, link and menuitem has an accessible name
   * - ARIA commands must have an accessible name ([url](https://dequeuniversity.com/rules/axe/4.7/aria-command-name?application=axeAPI))
   */
  ariaCommandName: "aria-command-name",
  /**
   * - Ensures every ARIA dialog and alertdialog node has an accessible name
   * - ARIA dialog and alertdialog nodes should have an accessible name ([url](https://dequeuniversity.com/rules/axe/4.7/aria-dialog-name?application=axeAPI))
   */
  ariaDialogName: "aria-dialog-name",
  /**
   * - Ensures aria-hidden='true' is not present on the document body.
   * - aria-hidden='true' must not be present on the document body ([url](https://dequeuniversity.com/rules/axe/4.7/aria-hidden-body?application=axeAPI))
   */
  ariaHiddenBody: "aria-hidden-body",
  /**
   * - Ensures every ARIA input field has an accessible name
   * - ARIA input fields must have an accessible name ([url](https://dequeuniversity.com/rules/axe/4.7/aria-input-field-name?application=axeAPI))
   */
  ariaInputFieldName: "aria-input-field-name",
  /**
   * - Ensures every ARIA meter node has an accessible name
   * - ARIA meter nodes must have an accessible name ([url](https://dequeuniversity.com/rules/axe/4.7/aria-meter-name?application=axeAPI))
   */
  ariaMeterName: "aria-meter-name",
  /**
   * - Ensures every ARIA progressbar node has an accessible name
   * - ARIA progressbar nodes must have an accessible name ([url](https://dequeuniversity.com/rules/axe/4.7/aria-progressbar-name?application=axeAPI))
   */
  ariaProgressbarName: "aria-progressbar-name",
  /**
   * - Ensures elements with ARIA roles have all required ARIA attributes
   * - Required ARIA attributes must be provided ([url](https://dequeuniversity.com/rules/axe/4.7/aria-required-attr?application=axeAPI))
   */
  ariaRequiredAttr: "aria-required-attr",
  /**
   * - Ensures elements with an ARIA role that require child roles contain them
   * - Certain ARIA roles must contain particular children ([url](https://dequeuniversity.com/rules/axe/4.7/aria-required-children?application=axeAPI))
   */
  ariaRequiredChildren: "aria-required-children",
  /**
   * - Ensures elements with an ARIA role that require parent roles are contained by them
   * - Certain ARIA roles must be contained by particular parents ([url](https://dequeuniversity.com/rules/axe/4.7/aria-required-parent?application=axeAPI))
   */
  ariaRequiredParent: "aria-required-parent",
  /**
   * - Ensure aria-roledescription is only used on elements with an implicit or explicit role
   * - aria-roledescription must be on elements with a semantic role ([url](https://dequeuniversity.com/rules/axe/4.7/aria-roledescription?application=axeAPI))
   */
  ariaRoledescription: "aria-roledescription",
  /**
   * - Ensures all elements with a role attribute use a valid value
   * - ARIA roles used must conform to valid values ([url](https://dequeuniversity.com/rules/axe/4.7/aria-roles?application=axeAPI))
   */
  ariaRoles: "aria-roles",
  /**
   * - Ensures "role=text" is used on elements with no focusable descendants
   * - "role=text" should have no focusable descendants ([url](https://dequeuniversity.com/rules/axe/4.7/aria-text?application=axeAPI))
   */
  ariaText: "aria-text",
  /**
   * - Ensures every ARIA toggle field has an accessible name
   * - ARIA toggle fields must have an accessible name ([url](https://dequeuniversity.com/rules/axe/4.7/aria-toggle-field-name?application=axeAPI))
   */
  ariaToggleFieldName: "aria-toggle-field-name",
  /**
   * - Ensures every ARIA tooltip node has an accessible name
   * - ARIA tooltip nodes must have an accessible name ([url](https://dequeuniversity.com/rules/axe/4.7/aria-tooltip-name?application=axeAPI))
   */
  ariaTooltipName: "aria-tooltip-name",
  /**
   * - Ensures every ARIA treeitem node has an accessible name
   * - ARIA treeitem nodes should have an accessible name ([url](https://dequeuniversity.com/rules/axe/4.7/aria-treeitem-name?application=axeAPI))
   */
  ariaTreeitemName: "aria-treeitem-name",
  /**
   * - Ensures all ARIA attributes have valid values
   * - ARIA attributes must conform to valid values ([url](https://dequeuniversity.com/rules/axe/4.7/aria-valid-attr-value?application=axeAPI))
   */
  ariaValidAttrValue: "aria-valid-attr-value",
  /**
   * - Ensures attributes that begin with aria- are valid ARIA attributes
   * - ARIA attributes must conform to valid names ([url](https://dequeuniversity.com/rules/axe/4.7/aria-valid-attr?application=axeAPI))
   */
  ariaValidAttr: "aria-valid-attr",
  /**
   * - Elements marked as presentational should not have global ARIA or tabindex to ensure all screen readers ignore them
   * - Ensure elements marked as presentational are consistently ignored ([url](https://dequeuniversity.com/rules/axe/4.7/presentation-role-conflict?application=axeAPI))
   */
  presentationRoleConflict: "presentation-role-conflict",
} as const;

export const nameRoleValue = {
  /**
   * - Ensures aria-hidden elements are not focusable nor contain focusable elements
   * - ARIA hidden element must not be focusable or contain focusable elements ([url](https://dequeuniversity.com/rules/axe/4.7/aria-hidden-focus?application=axeAPI))
   */
  ariaHiddenFocus: "aria-hidden-focus",
  /**
   * - Ensures buttons have discernible text
   * - Buttons must have discernible text ([url](https://dequeuniversity.com/rules/axe/4.7/button-name?application=axeAPI))
   */
  buttonName: "button-name",
  /**
   * - Ensures headings have discernible text
   * - Headings should not be empty ([url](https://dequeuniversity.com/rules/axe/4.7/empty-heading?application=axeAPI))
   */
  emptyHeading: "empty-heading",
  /**
   * - Ensures table headers have discernible text
   * - Table header text should not be empty ([url](https://dequeuniversity.com/rules/axe/4.7/empty-table-header?application=axeAPI))
   */
  emptyTableHeader: "empty-table-header",
  /**
   * - Ensures input buttons have discernible text
   * - Input buttons must have discernible text ([url](https://dequeuniversity.com/rules/axe/4.7/input-button-name?application=axeAPI))
   */
  inputButtonName: "input-button-name",
  /**
   * - Ensures links have discernible text
   * - Links must have discernible text ([url](https://dequeuniversity.com/rules/axe/4.7/link-name?application=axeAPI))
   */
  linkName: "link-name",
} as const;

export const timeAndMedia = {
  /**
   * - Ensures `<audio>` elements have captions
   * - `<audio>` elements must have a captions track ([url](https://dequeuniversity.com/rules/axe/4.7/audio-caption?application=axeAPI))
   */
  audioCaption: "audio-caption",
  /**
   * - Ensures `<blink>` elements are not used
   * - `<blink>` elements are deprecated and must not be used ([url](https://dequeuniversity.com/rules/axe/4.7/blink?application=axeAPI))
   */
  blink: "blink",
  /**
   * - Ensures `<meta http-equiv="refresh">` is not used for delayed refresh
   * - Delayed refresh must not be used ([url](https://dequeuniversity.com/rules/axe/4.7/meta-refresh-no-exceptions?application=axeAPI))
   */
  metaRefreshNoExceptions: "meta-refresh-no-exceptions",
  /**
   * - Ensures `<meta http-equiv="refresh">` is not used for delayed refresh
   * - Delayed refresh under 20 hours must not be used ([url](https://dequeuniversity.com/rules/axe/4.7/meta-refresh?application=axeAPI))
   */
  metaRefresh: "meta-refresh",
  /**
   * - Ensures `<video>` or `<audio>` elements do not autoplay audio for more than 3 seconds without a control mechanism to stop or mute the audio
   * - `<video>` or `<audio>` elements must not play automatically ([url](https://dequeuniversity.com/rules/axe/4.7/no-autoplay-audio?application=axeAPI))
   */
  noAutoplayAudio: "no-autoplay-audio",
} as const;

export const forms = {
  /**
   * - Ensure the autocomplete attribute is correct and suitable for the form field
   * - autocomplete attribute must be used correctly ([url](https://dequeuniversity.com/rules/axe/4.7/autocomplete-valid?application=axeAPI))
   */
  autocompleteValid: "autocomplete-valid",
  /**
   * - Ensures form field does not have multiple label elements
   * - Form field must not have multiple label elements ([url](https://dequeuniversity.com/rules/axe/4.7/form-field-multiple-labels?application=axeAPI))
   */
  formFieldMultipleLabels: "form-field-multiple-labels",
  /**
   * - Ensures that every form element has a visible label and is not solely labeled using hidden labels, or the title or aria-describedby attributes
   * - Form elements should have a visible label ([url](https://dequeuniversity.com/rules/axe/4.7/label-title-only?application=axeAPI))
   */
  labelTitleOnly: "label-title-only",
  /**
   * - Ensures every form element has a label
   * - Form elements must have labels ([url](https://dequeuniversity.com/rules/axe/4.7/label?application=axeAPI))
   */
  label: "label",
  /**
   * - Ensures select element has an accessible name
   * - Select element must have an accessible name ([url](https://dequeuniversity.com/rules/axe/4.7/select-name?application=axeAPI))
   */
  selectName: "select-name",
} as const;

export const structure = {
  /**
   * - Ensure that text spacing set through style attributes can be adjusted with custom stylesheets
   * - Inline text spacing must be adjustable with custom stylesheets ([url](https://dequeuniversity.com/rules/axe/4.7/avoid-inline-spacing?application=axeAPI))
   */
  avoidInlineSpacing: "avoid-inline-spacing",
  /**
   * - Ensures content is not locked to any specific display orientation, and the content is operable in all display orientations
   * - CSS Media queries must not lock display orientation ([url](https://dequeuniversity.com/rules/axe/4.7/css-orientation-lock?application=axeAPI))
   */
  cssOrientationLock: "css-orientation-lock",
  /**
   * - Ensures `<dl>` elements are structured correctly
   * - `<dl>` elements must only directly contain properly-ordered `<dt>` and `<dd>` groups, `<script>`, `<template>` or `<div>` elements ([url](https://dequeuniversity.com/rules/axe/4.7/definition-list?application=axeAPI))
   */
  definitionList: "definition-list",
  /**
   * - Ensures `<dt>` and `<dd>` elements are contained by a `<dl>`
   * - `<dt>` and `<dd>` elements must be contained by a `<dl>` ([url](https://dequeuniversity.com/rules/axe/4.7/dlitem?application=axeAPI))
   */
  dlitem: "dlitem",
  /**
   * - Ensures `<iframe>` and `<frame>` elements contain the axe-core script
   * - Frames should be tested with axe-core ([url](https://dequeuniversity.com/rules/axe/4.7/frame-tested?application=axeAPI))
   */
  frameTested: "frame-tested",
  /**
   * - Informs users about hidden content.
   * - Hidden content on the page should be analyzed ([url](https://dequeuniversity.com/rules/axe/4.7/hidden-content?application=axeAPI))
   */
  hiddenContent: "hidden-content",
  /**
   * - Ensures that lists are structured correctly
   * - `<ul>` and `<ol>` must only directly contain `<li>`, `<script>` or `<template>` elements ([url](https://dequeuniversity.com/rules/axe/4.7/list?application=axeAPI))
   */
  list: "list",
  /**
   * - Ensures `<li>` elements are used semantically
   * - `<li>` elements must be contained in a `<ul>` or `<ol>` ([url](https://dequeuniversity.com/rules/axe/4.7/listitem?application=axeAPI))
   */
  listitem: "listitem",
} as const;

export const color = {
  /**
   * - Ensures the contrast between foreground and background colors meets WCAG 2 AAA enhanced contrast ratio thresholds
   * - Elements must meet enhanced color contrast ratio thresholds ([url](https://dequeuniversity.com/rules/axe/4.7/color-contrast-enhanced?application=axeAPI))
   */
  colorContrastEnhanced: "color-contrast-enhanced",
  /**
   * - Ensures the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
   * - Elements must meet minimum color contrast ratio thresholds ([url](https://dequeuniversity.com/rules/axe/4.7/color-contrast?application=axeAPI))
   */
  colorContrast: "color-contrast",
  /**
   * - Ensure links are distinguished from surrounding text in a way that does not rely on color
   * - Links must be distinguishable without relying on color ([url](https://dequeuniversity.com/rules/axe/4.7/link-in-text-block?application=axeAPI))
   */
  linkInTextBlock: "link-in-text-block",
} as const;

export const parsing = {
  /**
   * - Ensures every id attribute value of active elements is unique
   * - IDs of active elements must be unique ([url](https://dequeuniversity.com/rules/axe/4.7/duplicate-id-active?application=axeAPI))
   */
  duplicateIdActive: "duplicate-id-active",
  /**
   * - Ensures every id attribute value used in ARIA and in labels is unique
   * - IDs used in ARIA and labels must be unique ([url](https://dequeuniversity.com/rules/axe/4.7/duplicate-id-aria?application=axeAPI))
   */
  duplicateIdAria: "duplicate-id-aria",
  /**
   * - Ensures every id attribute value is unique
   * - id attribute value must be unique ([url](https://dequeuniversity.com/rules/axe/4.7/duplicate-id?application=axeAPI))
   */
  duplicateId: "duplicate-id",
  /**
   * - Ensures `<marquee>` elements are not used
   * - `<marquee>` elements are deprecated and must not be used ([url](https://dequeuniversity.com/rules/axe/4.7/marquee?application=axeAPI))
   */
  marquee: "marquee",
} as const;

export const semantics = {
  /**
   * - Ensures the order of headings is semantically correct
   * - Heading levels should only increase by one ([url](https://dequeuniversity.com/rules/axe/4.7/heading-order?application=axeAPI))
   */
  headingOrder: "heading-order",
  /**
   * - Ensure that links with the same accessible name serve a similar purpose
   * - Links with the same name must have a similar purpose ([url](https://dequeuniversity.com/rules/axe/4.7/identical-links-same-purpose?application=axeAPI))
   */
  identicalLinksSamePurpose: "identical-links-same-purpose",
  /**
   * - Ensures that elements labelled through their content must have their visible text as part of their accessible name
   * - Elements must have their visible text as part of their accessible name ([url](https://dequeuniversity.com/rules/axe/4.7/label-content-name-mismatch?application=axeAPI))
   */
  labelContentNameMismatch: "label-content-name-mismatch",
  /**
   * - Ensures the banner landmark is at top level
   * - Banner landmark should not be contained in another landmark ([url](https://dequeuniversity.com/rules/axe/4.7/landmark-banner-is-top-level?application=axeAPI))
   */
  landmarkBannerIsTopLevel: "landmark-banner-is-top-level",
  /**
   * - Ensures the complementary landmark or aside is at top level
   * - Aside should not be contained in another landmark ([url](https://dequeuniversity.com/rules/axe/4.7/landmark-complementary-is-top-level?application=axeAPI))
   */
  landmarkComplementaryIsTopLevel: "landmark-complementary-is-top-level",
  /**
   * - Ensures the contentinfo landmark is at top level
   * - Contentinfo landmark should not be contained in another landmark ([url](https://dequeuniversity.com/rules/axe/4.7/landmark-contentinfo-is-top-level?application=axeAPI))
   */
  landmarkContentinfoIsTopLevel: "landmark-contentinfo-is-top-level",
  /**
   * - Ensures the main landmark is at top level
   * - Main landmark should not be contained in another landmark ([url](https://dequeuniversity.com/rules/axe/4.7/landmark-main-is-top-level?application=axeAPI))
   */
  landmarkMainIsTopLevel: "landmark-main-is-top-level",
  /**
   * - Ensures the document has at most one banner landmark
   * - Document should not have more than one banner landmark ([url](https://dequeuniversity.com/rules/axe/4.7/landmark-no-duplicate-banner?application=axeAPI))
   */
  landmarkNoDuplicateBanner: "landmark-no-duplicate-banner",
  /**
   * - Ensures the document has at most one contentinfo landmark
   * - Document should not have more than one contentinfo landmark ([url](https://dequeuniversity.com/rules/axe/4.7/landmark-no-duplicate-contentinfo?application=axeAPI))
   */
  landmarkNoDuplicateContentinfo: "landmark-no-duplicate-contentinfo",
  /**
   * - Ensures the document has at most one main landmark
   * - Document should not have more than one main landmark ([url](https://dequeuniversity.com/rules/axe/4.7/landmark-no-duplicate-main?application=axeAPI))
   */
  landmarkNoDuplicateMain: "landmark-no-duplicate-main",
  /**
   * - Ensures the document has a main landmark
   * - Document should have one main landmark ([url](https://dequeuniversity.com/rules/axe/4.7/landmark-one-main?application=axeAPI))
   */
  landmarkOneMain: "landmark-one-main",
  /**
   * - Landmarks should have a unique role or role/label/title (i.e. accessible name) combination
   * - Ensures landmarks are unique ([url](https://dequeuniversity.com/rules/axe/4.7/landmark-unique?application=axeAPI))
   */
  landmarkUnique: "landmark-unique",
  /**
   * - Ensure bold, italic text and font-size is not used to style `<p>` elements as a heading
   * - Styled `<p>` elements must not be used as headings ([url](https://dequeuniversity.com/rules/axe/4.7/p-as-heading?application=axeAPI))
   */
  pAsHeading: "p-as-heading",
  /**
   * - Ensure that the page, or at least one of its frames contains a level-one heading
   * - Page should contain a level-one heading ([url](https://dequeuniversity.com/rules/axe/4.7/page-has-heading-one?application=axeAPI))
   */
  pageHasHeadingOne: "page-has-heading-one",
} as const;

export const language = {
  /**
   * - Ensures every HTML document has a lang attribute
   * - `<html>` element must have a lang attribute ([url](https://dequeuniversity.com/rules/axe/4.7/html-has-lang?application=axeAPI))
   */
  htmlHasLang: "html-has-lang",
  /**
   * - Ensures the lang attribute of the `<html>` element has a valid value
   * - `<html>` element must have a valid value for the lang attribute ([url](https://dequeuniversity.com/rules/axe/4.7/html-lang-valid?application=axeAPI))
   */
  htmlLangValid: "html-lang-valid",
  /**
   * - Ensure that HTML elements with both valid lang and xml:lang attributes agree on the base language of the page
   * - HTML elements with lang and xml:lang must have the same base language ([url](https://dequeuniversity.com/rules/axe/4.7/html-xml-lang-mismatch?application=axeAPI))
   */
  htmlXmlLangMismatch: "html-xml-lang-mismatch",
  /**
   * - Ensures lang attributes have valid values
   * - lang attribute must have a valid value ([url](https://dequeuniversity.com/rules/axe/4.7/valid-lang?application=axeAPI))
   */
  validLang: "valid-lang",
} as const;

export const sensoryAndVisualCues = {
  /**
   * - Ensures `<meta name="viewport">` can scale a significant amount
   * - Users should be able to zoom and scale the text up to 500% ([url](https://dequeuniversity.com/rules/axe/4.7/meta-viewport-large?application=axeAPI))
   */
  metaViewportLarge: "meta-viewport-large",
  /**
   * - Ensures `<meta name="viewport">` does not disable text scaling and zooming
   * - Zooming and scaling must not be disabled ([url](https://dequeuniversity.com/rules/axe/4.7/meta-viewport?application=axeAPI))
   */
  metaViewport: "meta-viewport",
  /**
   * - Ensure touch target have sufficient size and space
   * - All touch targets must be 24px large, or leave sufficient space ([url](https://dequeuniversity.com/rules/axe/4.7/target-size?application=axeAPI))
   */
  targetSize: "target-size",
} as const;

export const tables = {
  /**
   * - Ensures the scope attribute is used correctly on tables
   * - scope attribute should be used correctly ([url](https://dequeuniversity.com/rules/axe/4.7/scope-attr-valid?application=axeAPI))
   */
  scopeAttrValid: "scope-attr-valid",
  /**
   * - Ensure the `<caption>` element does not contain the same text as the summary attribute
   * - tables should not have the same summary and caption ([url](https://dequeuniversity.com/rules/axe/4.7/table-duplicate-name?application=axeAPI))
   */
  tableDuplicateName: "table-duplicate-name",
  /**
   * - Ensure that tables with a caption use the `<caption>` element.
   * - Data or header cells must not be used to give caption to a data table. ([url](https://dequeuniversity.com/rules/axe/4.7/table-fake-caption?application=axeAPI))
   */
  tableFakeCaption: "table-fake-caption",
  /**
   * - Ensure that each non-empty data cell in a `<table>` larger than 3 by 3  has one or more table headers
   * - Non-empty `<td>` elements in larger `<table>` must have an associated table header ([url](https://dequeuniversity.com/rules/axe/4.7/td-has-header?application=axeAPI))
   */
  tdHasHeader: "td-has-header",
  /**
   * - Ensure that each cell in a table that uses the headers attribute refers only to other cells in that table
   * - Table cells that use the headers attribute must only refer to cells in the same table ([url](https://dequeuniversity.com/rules/axe/4.7/td-headers-attr?application=axeAPI))
   */
  tdHeadersAttr: "td-headers-attr",
  /**
   * - Ensure that `<th>` elements and elements with role=columnheader/rowheader have data cells they describe
   * - Table headers in a data table must refer to data cells ([url](https://dequeuniversity.com/rules/axe/4.7/th-has-data-cells?application=axeAPI))
   */
  thHasDataCells: "th-has-data-cells",
} as const;
