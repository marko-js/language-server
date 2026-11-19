export interface Input<T> {
  value: T;
}
function __marko_internal_template<T>(this: void) {
  const input = Marko._.any as Input<T>;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const current = Marko._.hoist(() => __marko_internal_hoist__current);
  {
    const current = Marko._.returned(() => __marko_internal_rendered_1);
    const __marko_internal_rendered_1 = Marko._.renderTemplate(
      __marko_internal_module_1().default,
    )()()({
      value: input.value,
    });
    var __marko_internal_return = Marko._.returnTag({
      value: current,
    });
    var __marko_internal_hoist__current = current;
  }
  Marko._.noop({ current, input, $global, $signal });
  return __marko_internal_return;
}
const __marko_internal_api = "tags";
export { __marko_internal_api as "~api" };
class Template extends Marko._.GenericTemplate<
  {
    [__marko_internal_key in keyof Marko._.TemplateMethods]: <T>(
      ...args: Marko._.MethodParams<
        Input<T>,
        Marko._.ReturnOf<typeof __marko_internal_template<T>>,
        __marko_internal_key
      >
    ) => Marko._.MethodReturn<
      Input<T>,
      Marko._.ReturnOf<typeof __marko_internal_template<T>>,
      __marko_internal_key
    >;
  } & { [Marko._.anyInput]: Input<any> },
  <__marko_internal_apply = 1>(
    m?: __marko_internal_apply,
  ) => __marko_internal_apply extends 0 | 2
    ? <T>() => Marko._.Renderer<
        Input<T>,
        Marko._.ReturnOf<typeof __marko_internal_template<T>>,
        __marko_internal_apply
      >
    : __marko_internal_apply extends 1
      ? () => <__marko_internal_input, T>(
          input: Input<T> & Marko._.Relate<__marko_internal_input, Input<T>>,
        ) => Marko._.ReturnWithScope<
          __marko_internal_input,
          Marko._.ReturnOf<typeof __marko_internal_template<T>>
        >
      : () => <__marko_internal_input, T>(
          input: Marko._.TagInput<__marko_internal_input, Input<T>>,
        ) => Marko._.ReturnWithRestAttrTagsScope<
          __marko_internal_input,
          Marko._.ReturnOf<typeof __marko_internal_template<T>>
        >
> {}
const Input = new Template();
export default Input;
declare function __marko_internal_module_1(): typeof import("@marko/runtime-tags/tags/let.d.marko");
