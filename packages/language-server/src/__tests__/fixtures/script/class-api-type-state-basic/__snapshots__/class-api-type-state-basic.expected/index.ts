export interface Input {}
class Component extends Marko.Component<Input> {
  declare state: {
    name: string;
  };
  onMount() {
    this.state.name;
    //             ^?
  }
}
export { type Component };
export default Marko._.template((input: Input) => {
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  [state.name];
  Marko._.noop({ component, state, out, input, $global, $signal });
}, Component);
//         ^?
