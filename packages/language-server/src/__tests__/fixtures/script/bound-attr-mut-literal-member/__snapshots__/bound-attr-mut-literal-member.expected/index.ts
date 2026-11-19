export interface Input {}
export default Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const a = Marko._.hoist(() => __marko_internal_hoist__a);
  const b = Marko._.hoist(() => __marko_internal_hoist__b);
  {
    const a = Marko._.returned(() => __marko_internal_rendered_1);
    const __marko_internal_rendered_1 = __marko_internal_module_1().default._({
      value: { b: 1, bChange(value: number) {} },
    });
    {
      const b = Marko._.returned(() => __marko_internal_rendered_2);
      const __marko_internal_rendered_2 = __marko_internal_module_1().default._(
        {
          value: a.b,
          valueChange: a.bChange,
        },
      );
      var __marko_internal_hoist__a = a;
      var __marko_internal_hoist__b = b;
    }
  }
  Marko._.noop({ a, b, input, $global, $signal });
});
declare function __marko_internal_module_1(): typeof import("@marko/runtime-tags/tags/let.d.marko");
//   ^?   ^?
