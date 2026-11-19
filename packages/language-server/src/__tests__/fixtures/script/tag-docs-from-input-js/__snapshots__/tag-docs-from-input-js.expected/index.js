/** @typedef {Record<string, unknown>} Input */
/**
 * @extends {Marko.Component<Input>}
 */
export class Component extends Marko.Component {}
export default Marko._.template(
  /**
   * @param {Input} input
   */
  (input) => {
    const component = /** @type {Component} */ (Marko._.any);
    const state = Marko._.state(component);
    const out = /** @type {Marko.Out} */ (Marko._.any);
    const $signal = /** @type {AbortSignal} */ (Marko._.any);
    const $global = /** @type {Marko.Global} */ (Marko._.any);
    __marko_internal_module_1().default._({
      label: "Go",
    });
    __marko_internal_module_2().default._(
      // ^?
      {
        href: "/",
      },
    );
    __marko_internal_module_3().default._(
      // ^?
      {},
    );
    Marko._.noop({ component, state, out, input, $global, $signal });
  },
  Component,
);
function __marko_internal_module_1() {
  return /** @type {typeof import("./components/js-button.marko")} */ (
    Marko._.any
  );
}
function __marko_internal_module_2() {
  return /** @type {typeof import("./components/js-link.marko")} */ (
    Marko._.any
  );
}
function __marko_internal_module_3() {
  return /** @type {typeof import("./components/js-no-input.marko")} */ (
    Marko._.any
  );
}
// ^?
