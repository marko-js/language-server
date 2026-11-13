export interface Input {}
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const $el = Marko._.hoist(() => __marko_internal_hoist__$el);
  {
    const $el = Marko._.el("div");
    Marko._.renderNativeTag("div")()()({
      class: Marko._.interpolated`hello`,
    });
    const __marko_internal_tag_2 = Marko._.resolveTemplate(
      import("marko/src/core-tags/core/script.d.marko"),
    ).default;
    Marko._.renderTemplate(__marko_internal_tag_2)()()(
      //      ^?
      {
        async value() {
          const el = $el();
          //    ^?
        },
      },
    );
    var __marko_internal_hoist__$el = $el;
  }
  Marko._.noop({ $el, input, $global, $signal });
  return;
})();
const __marko_internal_api = "tags";
export { __marko_internal_api as "~api" };
class Template extends Marko._.Template<Input> {}
export default new Template();
