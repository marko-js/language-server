export interface Input {}
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const a = Marko._.hoist(() => __marko_internal_hoist__a);
  {
    const a = Marko._.returned(() => __marko_internal_rendered_1);
    const __marko_internal_rendered_1 = Marko._.renderTemplate(
      __marko_internal_module_1().default,
    )()()({
      value: { b: 1, bChange(_value: number) {} },
    });
    Marko._.renderTemplate(__marko_internal_module_2().default)()()({
      value: a.b,
      valueChange:
        a.bChange &&
        ((
          // @ts-ignore
          _,
        ) => {
          a.bChange(parseInt(_));
        }),
    });
    Marko._.renderTemplate(__marko_internal_module_2().default)()()(
      //      ^?    ^?
      {
        value: a.b,
        valueChange:
          a.bChange &&
          ((
            // @ts-ignore
            _,
          ) => {
            a.bChange(Boolean(_));
          }),
      },
    );
    var __marko_internal_hoist__a = a;
  }
  Marko._.noop({ a, input, $global, $signal });
  return;
})();
const __marko_internal_api = "tags";
export { __marko_internal_api as "~api" };
class Template extends Marko._.Template<Input> {}
export default new Template();
declare function __marko_internal_module_1(): typeof import("@marko/runtime-tags/tags/let.d.marko");
declare function __marko_internal_module_2(): typeof import("./tags/child.marko");
//      ^?    ^?
