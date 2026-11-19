export interface Input {
  start: number;
}
const Input = Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const count = Marko._.hoist(() => __marko_internal_hoist__count);
  {
    const count = Marko._.returned(() => __marko_internal_rendered_1);
    const __marko_internal_rendered_1 = __marko_internal_module_1().default._({
      value: input.start,
    });
    const __marko_internal_change__count = Marko._.change(
      "count",
      "value",
      __marko_internal_rendered_1,
    );
    Marko._.renderNativeTag("button")({
      onClick() {
        __marko_internal_change__count.count++;
      },
      [Marko._.content]: (() => {
        [count];
        return Marko._.voidBody;
      })(),
    });
    var __marko_internal_return = Marko._.returnTag({
      value: count,
    });
    var __marko_internal_hoist__count = count;
  }
  Marko._.noop({ count, input, $global, $signal });
  return __marko_internal_return;
});
export default Input;
declare function __marko_internal_module_1(): typeof import("@marko/runtime-tags/tags/let.d.marko");
