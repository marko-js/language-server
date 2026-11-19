export interface Input {}
export default Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const $el = Marko._.hoist(() => __marko_internal_hoist__$el);
  {
    const $el = Marko._.el("div");
    Marko._.renderNativeTag("div")({
      class: Marko._.interpolated`hello`,
    });
    __marko_internal_module_1().default._(
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
});
declare function __marko_internal_module_1(): typeof import("marko/src/core-tags/core/script.d.marko");
