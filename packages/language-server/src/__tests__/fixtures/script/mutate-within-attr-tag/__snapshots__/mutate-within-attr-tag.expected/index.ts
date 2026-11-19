export interface Input {}
export default Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const count = Marko._.hoist(() => __marko_internal_hoist__count);
  {
    const count = Marko._.returned(() => __marko_internal_rendered_1);
    const __marko_internal_rendered_1 = __marko_internal_module_1().default._({
      value: 1,
    });
    const __marko_internal_change__count = Marko._.change(
      "count",
      "value",
      __marko_internal_rendered_1,
    );
    const __marko_internal_tag_2 = Marko._.interpolated`foo`;
    Marko._.attrTagNames(__marko_internal_tag_2, (input) => {
      input["@nested"];
    });
    Marko._.renderDynamicTag(__marko_internal_tag_2)({
      nested: {
        onClick() {
          __marko_internal_change__count.count++;
        },
        [Symbol.iterator]: Marko._.any,
      },
    });
    var __marko_internal_hoist__count = count;
  }
  Marko._.noop({ count, input, $global, $signal });
});
declare function __marko_internal_module_1(): typeof import("@marko/runtime-tags/tags/let.d.marko");
