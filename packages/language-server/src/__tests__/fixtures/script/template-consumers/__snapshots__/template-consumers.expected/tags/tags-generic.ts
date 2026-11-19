export interface Input<T> {
  value: T;
}
const Input = Marko._.templateOf(<T,>(input: Input<T>) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const current = Marko._.hoist(() => __marko_internal_hoist__current);
  {
    const current = Marko._.returned(() => __marko_internal_rendered_1);
    const __marko_internal_rendered_1 = __marko_internal_module_1().default._({
      value: input.value,
    });
    var __marko_internal_return = Marko._.returnTag({
      value: current,
    });
    var __marko_internal_hoist__current = current;
  }
  Marko._.noop({ current, input, $global, $signal });
  return __marko_internal_return;
});
export default Input;
declare function __marko_internal_module_1(): typeof import("@marko/runtime-tags/tags/let.d.marko");
