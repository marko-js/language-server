export interface Input {}
class Component extends Marko.Component<Input> {
  count = 0;
}
export { type Component };
const Thing: Marko.Template<Input, void> & { Component: typeof Component } =
  Marko._.template((input: Input) => {
    const component = Marko._.any as Component;
    const state = Marko._.state(component);
    const out = Marko._.any as Marko.Out;
    const $signal = Marko._.any as AbortSignal;
    const $global = Marko._.any as Marko.Global;
    Marko._.renderNativeTag("div")({
      [Marko._.content]: (() => {
        [component.count];
        return Marko._.voidBody;
      })(),
    });
    Marko._.noop({ component, state, out, input, $global, $signal });
  }, Component);
export default Thing;
//      ^?
