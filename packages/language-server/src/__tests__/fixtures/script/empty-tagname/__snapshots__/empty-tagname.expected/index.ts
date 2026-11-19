export interface Input {}
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const $el = Marko._.hoist(() => __marko_internal_hoist__$el);
  {
    const $el = Marko._.el("div");
    Marko._.renderNativeTag("div")({
      class: Marko._.interpolated`hello`,
    });
    Marko._.renderTemplate(__marko_internal_module_1().default)()()(
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
declare function __marko_internal_module_1(): typeof import("marko/src/core-tags/core/script.d.marko");
