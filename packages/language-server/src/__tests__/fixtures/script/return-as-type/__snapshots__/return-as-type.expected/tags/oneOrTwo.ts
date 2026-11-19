export interface Input {}
const OneOrTwo = Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const x = Marko._.hoist(() => __marko_internal_hoist__x);
  {
    const x = Marko._.returned(() => __marko_internal_rendered_1);
    const __marko_internal_rendered_1 = __marko_internal_module_1().default._({
      value: 1,
    });
    const __marko_internal_change__x = Marko._.change(
      "x",
      "value",
      __marko_internal_rendered_1,
    );
    var __marko_internal_return = Marko._.returnTag({
      value: x as 1 | 2,
      valueChange(
        // @ts-ignore
        _x,
      ) {
        __marko_internal_change__x.x = _x;
      },
    });
    var __marko_internal_hoist__x = x;
  }
  Marko._.noop({ x, input, $global, $signal });
  return __marko_internal_return;
});
export default OneOrTwo;
declare function __marko_internal_module_1(): typeof import("@marko/runtime-tags/tags/let.d.marko");
// ^?
