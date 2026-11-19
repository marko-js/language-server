export interface Input {}
export default Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const value = Marko._.hoist(() => __marko_internal_hoist__value);
  {
    const value = Marko._.returned(() => __marko_internal_rendered_1);
    const __marko_internal_rendered_1 = __marko_internal_module_1().default._({
      value: "hi",
    });
    Marko._.renderNativeTag("div")({
      id: Marko._.interpolated`test`,
    });
    Marko._.renderNativeTag("div")({
      id: Marko._.interpolated`test-${value}`,
    });
    Marko._.renderNativeTag("div")({
      id: Marko._.interpolated`${value}-test`,
    });
    Marko._.renderNativeTag("div")({
      id: Marko._.interpolated`${value}-test-${value}`,
    });
    Marko._.renderNativeTag("div")({
      class: Marko._.interpolated`test`,
    });
    Marko._.renderNativeTag("div")({
      class: Marko._.interpolated`hello world`,
    });
    Marko._.renderNativeTag("div")({
      class: Marko._.interpolated`test-${value}`,
    });
    Marko._.renderNativeTag("div")({
      class: Marko._.interpolated`${value}-test`,
    });
    Marko._.renderNativeTag("div")({
      class: Marko._.interpolated`${value}-test-${value}`,
    });
    __marko_internal_module_2().default._({
      id: Marko._.interpolated`test`,
    });
    __marko_internal_module_2().default._({
      id: Marko._.interpolated`test-${value}`,
    });
    __marko_internal_module_2().default._({
      id: Marko._.interpolated`${value}-test`,
    });
    __marko_internal_module_2().default._({
      id: Marko._.interpolated`${value}-test-${value}`,
    });
    __marko_internal_module_2().default._({
      class: Marko._.interpolated`test`,
    });
    __marko_internal_module_2().default._({
      class: Marko._.interpolated`hello world`,
    });
    __marko_internal_module_2().default._({
      class: Marko._.interpolated`test-${value}`,
    });
    __marko_internal_module_2().default._({
      class: Marko._.interpolated`${value}-test`,
    });
    __marko_internal_module_2().default._({
      class: Marko._.interpolated`${value}-test-${value}`,
    });
    var __marko_internal_hoist__value = value;
  }
  Marko._.noop({ value, input, $global, $signal });
});
declare function __marko_internal_module_1(): typeof import("@marko/runtime-tags/tags/const.d.marko");
declare function __marko_internal_module_2(): typeof import("./components/test-tag.marko");
