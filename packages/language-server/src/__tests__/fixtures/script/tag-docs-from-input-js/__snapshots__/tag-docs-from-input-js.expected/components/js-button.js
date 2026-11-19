/**
 * A button, typed with JSDoc.
 * @deprecated Use `<js-link>` instead.
 * @typedef {{ label: string; end?: "}" }} Input
 *//**
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
    const $global = /** @type {Marko.Global} */ (Marko._.any);
    Marko._.renderNativeTag("button")({
      [Marko._.content]: (() => {
        [input.label];
        return Marko._.voidBody;
      })(),
    });
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
const Input = new Template();
export default Input;
