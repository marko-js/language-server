export interface Input {}
export default Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const value = Marko._.hoist(() => __marko_internal_hoist__value);
  {
    const value = Marko._.returned(() => __marko_internal_rendered_1);
    const __marko_internal_rendered_1 = __marko_internal_module_1().default._({
      value: "primary",
    });
    Marko._.renderNativeTag("div")({
      class: Marko._.mergeClasses(Marko._.interpolated`btn`, "foo"),
    });
    Marko._.renderNativeTag("div")({
      class: Marko._.mergeClasses(Marko._.interpolated`btn other`, "foo"),
    });
    Marko._.renderNativeTag("div")({
      class: Marko._.mergeClasses(Marko._.interpolated`btn`, value),
    });
    Marko._.renderNativeTag("div")({
      class: Marko._.mergeClasses(Marko._.interpolated`btn`, ["a", "b"]),
    });
    Marko._.renderNativeTag("div")({
      class: Marko._.mergeClasses(Marko._.interpolated`btn`, { active: true }),
    });
    Marko._.renderNativeTag("div")({
      class: Marko._.mergeClasses(Marko._.interpolated`${value}`, "foo"),
    });
    Marko._.renderNativeTag("div")({
      class: Marko._.mergeClasses(Marko._.interpolated`${value} other`, value),
    });
    Marko._.renderNativeTag("div")({
      class: Marko._.mergeClasses(Marko._.interpolated`btn`, 123),
    });
    __marko_internal_module_2().default._({
      class: Marko._.mergeClasses(Marko._.interpolated`btn`, "foo"),
    });
    __marko_internal_module_2().default._({
      class: Marko._.mergeClasses(Marko._.interpolated`btn other`, value),
    });
    var __marko_internal_hoist__value = value;
  }
  Marko._.noop({ value, input, $global, $signal });
});
declare function __marko_internal_module_1(): typeof import("@marko/runtime-tags/tags/const.d.marko");
declare function __marko_internal_module_2(): typeof import("./components/test-tag.marko");
