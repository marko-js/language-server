export interface Input {}
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const value = Marko._.hoist(() => __marko_internal_hoist__value);
  const __marko_internal_tag_1 = Marko._.resolveTemplate(
    import("@marko/runtime-tags/tags/const.d.marko"),
  ).default;
  {
    const value = Marko._.returned(() => __marko_internal_rendered_1);
    const __marko_internal_rendered_1 = Marko._.renderTemplate(
      __marko_internal_tag_1,
    )()()({
      value: "primary",
    });
    Marko._.renderNativeTag("div")()()({
      class: Marko._.mergeClasses(Marko._.interpolated`btn`, "foo"),
    });
    Marko._.renderNativeTag("div")()()({
      class: Marko._.mergeClasses(Marko._.interpolated`btn other`, "foo"),
    });
    Marko._.renderNativeTag("div")()()({
      class: Marko._.mergeClasses(Marko._.interpolated`btn`, value),
    });
    Marko._.renderNativeTag("div")()()({
      class: Marko._.mergeClasses(Marko._.interpolated`btn`, ["a", "b"]),
    });
    Marko._.renderNativeTag("div")()()({
      class: Marko._.mergeClasses(Marko._.interpolated`btn`, { active: true }),
    });
    Marko._.renderNativeTag("div")()()({
      class: Marko._.mergeClasses(Marko._.interpolated`${value}`, "foo"),
    });
    Marko._.renderNativeTag("div")()()({
      class: Marko._.mergeClasses(Marko._.interpolated`${value} other`, value),
    });
    Marko._.renderNativeTag("div")()()({
      class: Marko._.mergeClasses(Marko._.interpolated`btn`, 123),
    });
    const __marko_internal_tag_2 = Marko._.resolveTemplate(
      import("./components/test-tag.marko"),
    ).default;
    Marko._.renderTemplate(__marko_internal_tag_2)()()({
      class: Marko._.mergeClasses(Marko._.interpolated`btn`, "foo"),
    });
    const __marko_internal_tag_3 = Marko._.resolveTemplate(
      import("./components/test-tag.marko"),
    ).default;
    Marko._.renderTemplate(__marko_internal_tag_3)()()({
      class: Marko._.mergeClasses(Marko._.interpolated`btn other`, value),
    });
    var __marko_internal_hoist__value = value;
  }
  Marko._.noop({ value, input, $global, $signal });
  return;
})();
const __marko_internal_api = "tags";
export { __marko_internal_api as "~api" };
class Template extends Marko._.Template<Input> {}
export default new Template();
