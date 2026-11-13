/**
 * @typedef {{ start: number }} Input
 *//**
 * @extends {Marko.Component<Input>}
 * @abstract
 */
export class Component extends Marko.Component {
  onCreate(/** @type {Input} */ input) {
    this.state = { count: input.start };
  }
}
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
    Marko._.renderNativeTag("div")()()({
      [Marko._.content]: (() => {
        [state.count];
        return () => {
          return Marko._.voidReturn;
        };
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
