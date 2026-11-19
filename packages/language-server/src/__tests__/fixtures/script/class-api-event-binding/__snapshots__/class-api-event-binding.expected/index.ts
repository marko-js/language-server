export interface Input {}
class Component extends Marko.Component<Input> {
  handleClick(ev: MouseEvent) {
    console.log(ev);
  }
  specialClick(value: number, ev: MouseEvent) {
    console.log(value, ev);
  }
}
export { type Component };
export default Marko._.template((input: Input) => {
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  __marko_internal_module_1().default._({
    onClick: component.handleClick,
  });
  __marko_internal_module_1().default._(
    //                     ^?
    {
      onClick: component.specialClick.bind(component, 1),
    },
  );
  __marko_internal_module_1().default._(
    //                     ^?
    {
      onClick: Marko._.bind(component, (ev) => {
        //                     ^?
        console.log(ev);
        //              ^?
      }),
    },
  );
  Marko._.noop({ component, state, out, input, $global, $signal });
}, Component);
declare function __marko_internal_module_1(): typeof import("./components/fancy-button/index.marko");
