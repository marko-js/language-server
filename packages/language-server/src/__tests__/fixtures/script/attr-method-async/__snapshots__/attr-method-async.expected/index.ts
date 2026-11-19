export interface Input {}
export default Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const count = Marko._.hoist(() => __marko_internal_hoist__count);
  {
    const count = Marko._.returned(() => __marko_internal_rendered_1);
    const __marko_internal_rendered_1 = __marko_internal_module_1().default._({
      value: 0,
    });
    const __marko_internal_change__count = Marko._.change(
      "count",
      "value",
      __marko_internal_rendered_1,
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
    __marko_internal_module_2().default._({
      async value(value: number) {
        __marko_internal_change__count.count = await Promise.resolve(value);
      },
    });
    var __marko_internal_hoist__count = count;
  }
  Marko._.noop({ count, input, $global, $signal });
});
declare function __marko_internal_module_1(): typeof import("@marko/runtime-tags/tags/let.d.marko");
declare function __marko_internal_module_2(): typeof import("./components/my-tag.marko");
