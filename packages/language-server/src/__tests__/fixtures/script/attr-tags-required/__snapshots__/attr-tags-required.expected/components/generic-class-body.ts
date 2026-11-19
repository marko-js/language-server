export interface Input<T> {
  value: T;
  content: string;
  renderBody?: Marko.Body<[T]>;
}
class Component<T> extends Marko.Component<Input<T>> {}
export { type Component };
const Input = Marko._.templateOf(<T,>(input: Input<T>) => {
  const component = Marko._.any as Component<T>;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  Marko._.renderNativeTag("div")({
    [Marko._.content]: (() => {
      const __marko_internal_tag_1 = input.renderBody;
      Marko._.renderDynamicTag(__marko_internal_tag_1)(input.value);
      return Marko._.voidBody;
    })(),
  });
  Marko._.noop({ component, state, out, input, $global, $signal });
}, Component);
export default Input;
