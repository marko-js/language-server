export interface Input {}
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const count = Marko._.hoist(() => __marko_internal_hoist__count);
  {
    const count = Marko._.returned(() => __marko_internal_rendered_1);
    const __marko_internal_rendered_1 = Marko._.renderTemplate(
      __marko_internal_module_1().default,
    )()()({
      value: 0,
    });
    const __marko_internal_change__count = Marko._.change(
      "count",
      "value",
      __marko_internal_rendered_1.return,
    );
    Marko._.renderNativeTag("button")({
      async onClick() {
        __marko_internal_change__count.count = await Promise.resolve(1);
      },
      [Marko._.content]: Marko._.voidBody,
    });
    Marko._.renderNativeTag("button")({
      async onClick<T extends PointerEvent>(event: T) {
        __marko_internal_change__count.count = await Promise.resolve(
          event.detail,
        );
      },
      [Marko._.content]: Marko._.voidBody,
    });
    Marko._.renderTemplate(__marko_internal_module_2().default)()()({
      async value(value: number) {
        __marko_internal_change__count.count = await Promise.resolve(value);
      },
    });
    var __marko_internal_hoist__count = count;
  }
  Marko._.noop({ count, input, $global, $signal });
  return;
})();
const __marko_internal_api = "tags";
export { __marko_internal_api as "~api" };
class Template extends Marko._.Template<Input> {}
export default new Template();
declare function __marko_internal_module_1(): typeof import("@marko/runtime-tags/tags/let.d.marko");
declare function __marko_internal_module_2(): typeof import("./components/my-tag.marko");
