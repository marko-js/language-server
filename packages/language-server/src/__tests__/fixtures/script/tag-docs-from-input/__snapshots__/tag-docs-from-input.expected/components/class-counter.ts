/** Counts clicks, with the Class API. */ export interface Input {
  start: number;
}
abstract class Component extends Marko.Component<Input> {
  declare state: { count: number };
  onCreate(input: Input) {
    this.state = { count: input.start };
  }
}
export { type Component };
(function (this: void) {
  const input = Marko._.any as Input;
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  Marko._.renderNativeTag("button")()()({
    onClick() {
      component.state.count++;
    },
    [Marko._.content]: (() => {
      [state.count];
      return () => {
        return Marko._.voidReturn;
      };
    })(),
  });
  Marko._.noop({ component, state, out, input, $global, $signal });
  return;
})();
const __marko_internal_api = "class";
export { __marko_internal_api as "~api" };
class Template extends Marko._.Template<Input, void, "class"> {}
const Input = new Template();
export default Input;
