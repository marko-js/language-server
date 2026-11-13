/** @typedef {Record<string, unknown>} Input */
/**
 * @extends {Marko.Component<Input>}
 * @abstract
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
    const $global = Marko._.getGlobal(
      // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
      (Marko._.error, /** @type {MarkoRun.Context} */ (Marko._.any)),
    );
    const __marko_internal_tag_1 = Marko._.resolveTemplate(
      import("./components/js-button.marko"),
    ).default;
    Marko._.renderTemplate(__marko_internal_tag_1)()()({
      label: "Go",
    });
    const __marko_internal_tag_2 = Marko._.resolveTemplate(
      import("./components/js-link.marko"),
    ).default;
    Marko._.renderTemplate(__marko_internal_tag_2)()()(
      // ^?
      {
        href: "/",
      },
    );
    const __marko_internal_tag_3 = Marko._.resolveTemplate(
      import("./components/js-no-input.marko"),
    ).default;
    Marko._.renderTemplate(__marko_internal_tag_3)()()(
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
// ^?
