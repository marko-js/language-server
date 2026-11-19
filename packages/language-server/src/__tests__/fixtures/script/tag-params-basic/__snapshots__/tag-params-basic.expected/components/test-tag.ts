export interface Input {
  renderBody: Marko.Body<["a", "b"]>;
}
export type Component = Marko.Component<Input>;
const Input: Marko.Template<Input, void> & {
  Component: typeof Marko.Component;
} = Marko._.template((input: Input) => {
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const __marko_internal_tag_1 = input.renderBody;
  Marko._.renderDynamicTag(__marko_internal_tag_1)("a", "b");
  const __marko_internal_tag_2 = input.renderBody;
  Marko._.renderDynamicTag(__marko_internal_tag_2)("a", "c");
  const __marko_internal_tag_3 = input.renderBody;
  Marko._.renderDynamicTag(__marko_internal_tag_3)("a", "b", "c");
  Marko._.noop({ component, state, out, input, $global, $signal });
}, Marko.Component);
export default Input;
