/**
 * @typedef {{ start: number }} Input
 *//**
 * @extends {Marko.Component<Input>}
 */
export class Component extends Marko.Component {
  onCreate(/** @type {Input} */ input) {
    this.state = { count: input.start };
  }
}
const Input = Marko._.template(
  /**
   * @param {Input} input
   */
  (input) => {
    const component = /** @type {Component} */ (Marko._.any);
    const state = Marko._.state(component);
    const out = /** @type {Marko.Out} */ (Marko._.any);
    const $signal = /** @type {AbortSignal} */ (Marko._.any);
    const $global = /** @type {Marko.Global} */ (Marko._.any);
    Marko._.renderNativeTag("div")({
      [Marko._.content]: (() => {
        [state.count];
        return Marko._.voidBody;
      })(),
    });
    Marko._.noop({ component, state, out, input, $global, $signal });
  },
  Component,
);
export default Input;
