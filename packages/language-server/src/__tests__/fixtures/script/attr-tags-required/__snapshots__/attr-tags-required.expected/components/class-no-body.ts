export interface Input {
  title?: string;
}
class Component extends Marko.Component<Input> {}
export { type Component };
const Input: Marko.Template<Input, void> & { Component: typeof Component } =
  Marko._.template((input: Input) => {
    const component = Marko._.any as Component;
    const state = Marko._.state(component);
    const out = Marko._.any as Marko.Out;
    const $signal = Marko._.any as AbortSignal;
    const $global = Marko._.any as Marko.Global;
    Marko._.renderNativeTag("div")({
      title: input.title,
    });
    Marko._.noop({ component, state, out, input, $global, $signal });
  }, Component);
export default Input;
