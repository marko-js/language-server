export interface Input {
  // An attribute of the Tags API's body's name: its body is still its
  // `renderBody`, as it is written in the Class API.
  content: string;
  renderBody?: Marko.Body;
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
      title: input.content,
      [Marko._.content]: (() => {
        const __marko_internal_tag_1 = input.renderBody;
        Marko._.renderDynamicTag(__marko_internal_tag_1)({});
        return Marko._.voidBody;
      })(),
    });
    Marko._.noop({ component, state, out, input, $global, $signal });
  }, Component);
export default Input;
