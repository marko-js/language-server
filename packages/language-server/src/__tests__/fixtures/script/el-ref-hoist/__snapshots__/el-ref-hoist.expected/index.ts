export interface Input {}
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const $hoistedEl = Marko._.hoist(() => __marko_internal_hoist__$hoistedEl);
  const $el = Marko._.hoist(() => __marko_internal_hoist__$el);
  {
    const $hoistedEl = Marko._.returned(() => __marko_internal_rendered_1);
    const __marko_internal_rendered_1 = Marko._.renderTemplate(
      __marko_internal_module_1().default,
    )()()({
      value: $el,
    });
    {
      const $el = Marko._.el("div");
      Marko._.renderNativeTag("div")({});
      Marko._.renderTemplate(__marko_internal_module_2().default)()()({
        async value() {
          $el;
          //^?
          $hoistedEl;
          //^?
        },
      });
      var __marko_internal_hoist__$hoistedEl = $hoistedEl;
      var __marko_internal_hoist__$el = $el;
    }
  }
  Marko._.noop({ $hoistedEl, $el, input, $global, $signal });
  return;
})();
const __marko_internal_api = "tags";
export { __marko_internal_api as "~api" };
class Template extends Marko._.Template<Input> {}
export default new Template();
declare function __marko_internal_module_1(): typeof import("@marko/runtime-tags/tags/const.d.marko");
declare function __marko_internal_module_2(): typeof import("marko/src/core-tags/core/script.d.marko");
