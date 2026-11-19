export interface Input<T extends string> {
  name: T;
}
class Component<T extends string> extends Marko.Component<Input<T>> {
  declare state: {
    name: T;
    //        ^?
  };
  onCreate(input: Input<T>) {
    this.state = { name: input.name };
    //                             ^?
  }
  onMount() {
    this.state.name;
    //             ^?
  }
}
export { type Component };
const Input = Marko._.templateOf(<T extends string>(input: Input<T>) => {
  const component = Marko._.any as Component<T>;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  [state.name];
  Marko._.noop({ component, state, out, input, $global, $signal });
}, Component);
export default Input;
//         ^?
