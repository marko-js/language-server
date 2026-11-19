export interface Input {}
export default Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const y = Marko._.hoist(() => __marko_internal_hoist__y);
  {
    const y = Marko._.returned(() => __marko_internal_rendered_1);
    const __marko_internal_rendered_1 = __marko_internal_module_1().default._(
      {},
    );
    var __marko_internal_hoist__y = y;
  }
  Marko._.noop({ y, input, $global, $signal });
});
declare function __marko_internal_module_1(): typeof import("./tags/oneOrTwo.marko");
