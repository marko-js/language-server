/**
 * @typedef {{ name: string }} Input
 */ const Input = Marko._.template(
  /**
   * @param {Input} input
   */
  (input) => {
    const $signal = /** @type {AbortSignal} */ (Marko._.any);
    const $global = /** @type {Marko.Global} */ (Marko._.any);
    const name = Marko._.hoist(() => __marko_internal_hoist__name);
    {
      const name = Marko._.returned(() => __marko_internal_rendered_1);
      const __marko_internal_rendered_1 = __marko_internal_module_1().default._(
        {
          value: input.name,
        },
      );
      var __marko_internal_return = Marko._.returnTag({
        value: name,
      });
      var __marko_internal_hoist__name = name;
    }
    Marko._.noop({ name, input, $global, $signal });
    return __marko_internal_return;
  },
);
export default Input;
function __marko_internal_module_1() {
  return /** @type {typeof import("marko/tags/let.d.marko")} */ (Marko._.any);
}
