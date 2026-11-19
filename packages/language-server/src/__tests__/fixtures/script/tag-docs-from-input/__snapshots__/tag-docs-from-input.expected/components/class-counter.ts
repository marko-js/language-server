/** Counts clicks, with the Class API. */ export interface Input {
  start: number;
}
class Component extends Marko.Component<Input> {
  declare state: { count: number };
  onCreate(input: Input) {
    this.state = { count: input.start };
  }
}
export { type Component };
const Input: Marko.Template<Input, void> & { Component: typeof Component } =
  Marko._.template((input: Input) => {
    const component = Marko._.any as Component;
    const state = Marko._.state(component);
    const out = Marko._.any as Marko.Out;
    const $signal = Marko._.any as AbortSignal;
    const $global = Marko._.any as Marko.Global;
    Marko._.renderNativeTag("button")({
      onClick() {
        component.state.count++;
      },
      [Marko._.content]: (() => {
        [state.count];
        return Marko._.voidBody;
      })(),
    });
    Marko._.noop({ component, state, out, input, $global, $signal });
  }, Component);
export default Input;
