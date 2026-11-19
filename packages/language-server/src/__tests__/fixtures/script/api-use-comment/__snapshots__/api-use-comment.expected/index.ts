export interface Input {}
export type Component = Marko.Component<Input>;
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
  Marko._.renderTemplate(__marko_internal_module_1().default)()()(
    // A `use tags` (or `use class`) comment at the start of a template says the
    // api it is written in: each of these is in a `components` dir, and written
    // in the Tags API.
    {},
  );
  Marko._.renderTemplate(__marko_internal_module_2().default)()()({});
  Marko._.renderTemplate(__marko_internal_module_3().default)()()({});
  Marko._.noop({ component, state, out, input, $global, $signal });
  return;
})();
const __marko_internal_api = "class";
export { __marko_internal_api as "~api" };
class Template extends Marko._.Template<Input, void, "class"> {}
export default new Template();
declare function __marko_internal_module_1(): typeof import("./components/first.marko");
declare function __marko_internal_module_2(): typeof import("./components/before-export.marko");
declare function __marko_internal_module_3(): typeof import("./components/line.marko");
