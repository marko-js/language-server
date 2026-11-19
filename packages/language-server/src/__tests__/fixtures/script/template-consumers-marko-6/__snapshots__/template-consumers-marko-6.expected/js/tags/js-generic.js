/**
 * @template T
 * @typedef {{ value: T, format?: (value: T) => string }} Input
 */ const Input = Marko._.templateOf(
  /**
   * @template T
   * @param {Input<T>} input
   */
  (input) => {
    const $signal = /** @type {AbortSignal} */ (Marko._.any);
    const $global = /** @type {Marko.Global} */ (Marko._.any);
    const formatted = Marko._.hoist(() => __marko_internal_hoist__formatted);
    {
      const formatted = Marko._.returned(() => __marko_internal_rendered_1);
      const __marko_internal_rendered_1 = __marko_internal_module_1().default._(
        {
          value: input.format ? input.format(input.value) : String(input.value),
        },
      );
      Marko._.renderNativeTag("div")({
        ["content"]: (() => {
          [formatted];
          return Marko._.voidBody;
        })(),
      });
      var __marko_internal_return = Marko._.returnTag({
        value: input.value,
      });
      var __marko_internal_hoist__formatted = formatted;
    }
    Marko._.noop({ formatted, input, $global, $signal });
    return __marko_internal_return;
  },
);
export default Input;
function __marko_internal_module_1() {
  return /** @type {typeof import("marko/tags/const.d.marko")} */ (Marko._.any);
}
