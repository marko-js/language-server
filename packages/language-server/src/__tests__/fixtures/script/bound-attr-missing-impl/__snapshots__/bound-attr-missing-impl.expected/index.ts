export interface Input {}
export default Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const b = Marko._.hoist(() => __marko_internal_hoist__b);
  {
    const b = Marko._.returned(() => __marko_internal_rendered_1);
    const __marko_internal_rendered_1 = __marko_internal_module_1().default._({
      value: 1,
    });
    const __marko_internal_change__b = Marko._.change(
      "b",
      "value",
      __marko_internal_rendered_1,
    );
    __marko_internal_module_2().default._(
      //   ^?  ^?
      {
        value: b,
        valueChange(
          // @ts-ignore
          _b,
        ) {
          __marko_internal_change__b.b = _b;
        },
      },
    );
    var __marko_internal_hoist__b = b;
  }
  Marko._.noop({ b, input, $global, $signal });
});
declare function __marko_internal_module_1(): typeof import("@marko/runtime-tags/tags/let.d.marko");
declare function __marko_internal_module_2(): typeof import("./tags/child.marko");
