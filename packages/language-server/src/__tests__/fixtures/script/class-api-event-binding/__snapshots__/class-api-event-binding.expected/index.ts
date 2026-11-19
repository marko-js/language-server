export interface Input {}
abstract class Component extends Marko.Component<Input> {
  handleClick(ev: MouseEvent) {
    console.log(ev);
  }
  specialClick(value: number, ev: MouseEvent) {
    console.log(value, ev);
  }
}
export { type Component };
(function (this: void) {
  const input = Marko._.any as Input;
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  Marko._.renderTemplate(__marko_internal_module_1().default)()()({
    onClick: component.handleClick,
  });
  Marko._.renderTemplate(__marko_internal_module_1().default)()()(
    //                     ^?
    {
      onClick: component.specialClick.bind(component, 1),
    },
  );
  Marko._.renderTemplate(__marko_internal_module_1().default)()()(
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
  return;
})();
const __marko_internal_api = "class";
export { __marko_internal_api as "~api" };
class Template extends Marko._.Template<Input, void, "class"> {}
export default new Template();
declare function __marko_internal_module_1(): typeof import("./components/fancy-button/index.marko");
