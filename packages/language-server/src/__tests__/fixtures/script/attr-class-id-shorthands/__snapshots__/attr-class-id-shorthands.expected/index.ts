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
      value: "hi",
    });
    Marko._.renderNativeTag("div")()()({
      id: Marko._.interpolated`test`,
    });
    Marko._.renderNativeTag("div")()()({
      id: Marko._.interpolated`test-${value}`,
    });
    Marko._.renderNativeTag("div")()()({
      id: Marko._.interpolated`${value}-test`,
    });
    Marko._.renderNativeTag("div")()()({
      id: Marko._.interpolated`${value}-test-${value}`,
    });
    Marko._.renderNativeTag("div")()()({
      class: Marko._.interpolated`test`,
    });
    Marko._.renderNativeTag("div")()()({
      class: Marko._.interpolated`hello world`,
    });
    Marko._.renderNativeTag("div")()()({
      class: Marko._.interpolated`test-${value}`,
    });
    Marko._.renderNativeTag("div")()()({
      class: Marko._.interpolated`${value}-test`,
    });
    Marko._.renderNativeTag("div")()()({
      class: Marko._.interpolated`${value}-test-${value}`,
    });
    const __marko_internal_tag_2 = Marko._.resolveTemplate(
      import("./components/test-tag.marko"),
    ).default;
    Marko._.renderTemplate(__marko_internal_tag_2)()()({
      id: Marko._.interpolated`test`,
    });
    const __marko_internal_tag_3 = Marko._.resolveTemplate(
      import("./components/test-tag.marko"),
    ).default;
    Marko._.renderTemplate(__marko_internal_tag_3)()()({
      id: Marko._.interpolated`test-${value}`,
    });
    const __marko_internal_tag_4 = Marko._.resolveTemplate(
      import("./components/test-tag.marko"),
    ).default;
    Marko._.renderTemplate(__marko_internal_tag_4)()()({
      id: Marko._.interpolated`${value}-test`,
    });
    const __marko_internal_tag_5 = Marko._.resolveTemplate(
      import("./components/test-tag.marko"),
    ).default;
    Marko._.renderTemplate(__marko_internal_tag_5)()()({
      id: Marko._.interpolated`${value}-test-${value}`,
    });
    const __marko_internal_tag_6 = Marko._.resolveTemplate(
      import("./components/test-tag.marko"),
    ).default;
    Marko._.renderTemplate(__marko_internal_tag_6)()()({
      class: Marko._.interpolated`test`,
    });
    const __marko_internal_tag_7 = Marko._.resolveTemplate(
      import("./components/test-tag.marko"),
    ).default;
    Marko._.renderTemplate(__marko_internal_tag_7)()()({
      class: Marko._.interpolated`hello world`,
    });
    const __marko_internal_tag_8 = Marko._.resolveTemplate(
      import("./components/test-tag.marko"),
    ).default;
    Marko._.renderTemplate(__marko_internal_tag_8)()()({
      class: Marko._.interpolated`test-${value}`,
    });
    const __marko_internal_tag_9 = Marko._.resolveTemplate(
      import("./components/test-tag.marko"),
    ).default;
    Marko._.renderTemplate(__marko_internal_tag_9)()()({
      class: Marko._.interpolated`${value}-test`,
    });
    const __marko_internal_tag_10 = Marko._.resolveTemplate(
      import("./components/test-tag.marko"),
    ).default;
    Marko._.renderTemplate(__marko_internal_tag_10)()()({
      class: Marko._.interpolated`${value}-test-${value}`,
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
