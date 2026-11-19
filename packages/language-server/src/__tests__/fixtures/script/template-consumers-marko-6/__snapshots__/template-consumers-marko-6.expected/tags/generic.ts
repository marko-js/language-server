export interface Input<T> {
  value: T;
  label?: Parameters;
  content?: Marko.Body<[T]>;
}
// Names a template may declare, which its generated type must not read.
export interface Parameters {
  text: string;
}
export type ReturnType = never;
const Input = Marko._.templateOf(<T,>(input: Input<T>) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const current = Marko._.hoist(() => __marko_internal_hoist__current);
  {
    const current = Marko._.returned(() => __marko_internal_rendered_1);
    const __marko_internal_rendered_1 = __marko_internal_module_1().default._({
      value: input.value,
    });
    const __marko_internal_change__current = Marko._.change(
      "current",
      "value",
      __marko_internal_rendered_1,
    );
    const __marko_internal_tag_2 = input.content;
    Marko._.renderDynamicTag(__marko_internal_tag_2)(current);
    var __marko_internal_return = Marko._.returnTag({
      value: current,
      valueChange(next: T) {
        __marko_internal_change__current.current = next;
      },
    });
    var __marko_internal_hoist__current = current;
  }
  Marko._.noop({ current, input, $global, $signal });
  return __marko_internal_return;
});
export default Input;
declare function __marko_internal_module_1(): typeof import("marko/tags/let.d.marko");
