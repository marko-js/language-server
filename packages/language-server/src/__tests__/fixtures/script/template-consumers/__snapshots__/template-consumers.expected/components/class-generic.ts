export interface Input<T> {
  value: T;
}
class Component<T> extends Marko.Component<Input<T>> {
  declare state: { value: T };
  onCreate(input: Input<T>) {
    this.state = { value: input.value };
  }
}
export { type Component };
const Input = Marko._.templateOf(<T,>(input: Input<T>) => {
  const component = Marko._.any as Component<T>;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  Marko._.renderNativeTag("div")({
    [Marko._.content]: (() => {
      [String(state.value)];
      return Marko._.voidBody;
    })(),
  });
  Marko._.noop({ component, state, out, input, $global, $signal });
}, Component);
export default Input;
