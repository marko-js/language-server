export interface Input {}
export default Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const value = Marko._.hoist(() => __marko_internal_hoist__value);
  {
    const value = Marko._.returned(() => __marko_internal_rendered_1);
    const __marko_internal_rendered_1 = __marko_internal_module_1().default._({
      value: 1,
    });
    const __marko_internal_change__value = Marko._.change(
      "value",
      __marko_internal_rendered_1,
    );
    Marko._.renderNativeTag("button")({
      onClick() {
        __marko_internal_change__value.value++;
      },
    });
    var __marko_internal_return = Marko._.returnTag({
      value: value,
    });
    var __marko_internal_hoist__value = value;
  }
  Marko._.noop({ value, input, $global, $signal });
  return __marko_internal_return;
});
declare function __marko_internal_module_1(): typeof import("@marko/runtime-tags/tags/let.d.marko");
