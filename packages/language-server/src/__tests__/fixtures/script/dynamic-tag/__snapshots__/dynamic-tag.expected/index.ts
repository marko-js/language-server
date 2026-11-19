export interface Input {}
export default Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const size = Marko._.hoist(() => __marko_internal_hoist__size);
  {
    const size = Marko._.returned(() => __marko_internal_rendered_1);
    const __marko_internal_rendered_1 = __marko_internal_module_1().default._({
      value: 1,
    });
    const __marko_internal_tag_2 = Marko._.interpolated`h${size}`;
    Marko._.renderDynamicTag(__marko_internal_tag_2)({
      [Marko._.contentFor(__marko_internal_tag_2)]: Marko._.voidBody,
    });
    const __marko_internal_tag_3 = "hello";
    Marko._.renderDynamicTag(__marko_internal_tag_3)({
      [Marko._.contentFor(__marko_internal_tag_3)]: Marko._.voidBody,
    });
    const __marko_internal_tag_4 = Marko._.interpolated`${"hello"}-world`;
    Marko._.renderDynamicTag(__marko_internal_tag_4)({});
    var __marko_internal_hoist__size = size;
  }
  Marko._.noop({ size, input, $global, $signal });
});
declare function __marko_internal_module_1(): typeof import("@marko/runtime-tags/tags/let.d.marko");
