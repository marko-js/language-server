export interface Input {
  // A Class API attribute tag that requires its body by `renderBody`, while
  // it declares `content` too (eg as native attributes it extends do).
  header: Marko.AttrTag<{ content?: Marko.Body; renderBody: Marko.Body }>;
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
  Marko._.renderNativeTag("table")({});
  Marko._.noop({ component, state, out, input, $global, $signal });
}, Marko.Component);
export default Input;
