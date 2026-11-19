/** @typedef {Record<string, unknown>} Input */
/**
 * @extends {Marko.Component<Input>}
 */
export class Component extends Marko.Component {}
(
  /**
   * @this {void}
   */
  function () {
    const input = /** @type {Input} */ (Marko._.any);
    const component = /** @type {Component} */ (Marko._.any);
    const state = Marko._.state(component);
    const out = /** @type {Marko.Out} */ (Marko._.any);
    const $signal = /** @type {AbortSignal} */ (Marko._.any);
    const $global = /** @type {Marko.Global} */ (Marko._.any);
    Marko._.renderTemplate(__marko_internal_module_1().default)()()({
      label: "Go",
    });
    Marko._.renderTemplate(__marko_internal_module_2().default)()()(
      // ^?
      {
        href: "/",
      },
    );
    Marko._.renderTemplate(__marko_internal_module_3().default)()()(
      // ^?
      {},
    );
    Marko._.noop({ component, state, out, input, $global, $signal });
    return;
  }
)();
const __marko_internal_api = "class";
export { __marko_internal_api as "~api" };
/**
 * @extends { Marko._.Template<Input, void, "class">}
 */
class Template extends Marko._.Template {}
export default new Template();
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
