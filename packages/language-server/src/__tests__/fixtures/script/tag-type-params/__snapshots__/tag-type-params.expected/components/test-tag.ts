export interface Input<T, U> {
  data: T;
  content: Marko.Body<[T], U>;
}
function __marko_internal_template<T, U>(this: void) {
  const input = Marko._.any as Input<T, U>;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  var __marko_internal_return = Marko._.returnTag({
    value: 1 as unknown as U,
  });
  Marko._.noop({ input, $global, $signal });
  return __marko_internal_return;
}
const __marko_internal_api = "tags";
export { __marko_internal_api as "~api" };
class Template extends Marko._.GenericTemplate<
  {
    [__marko_internal_key in keyof Marko._.TemplateMethods]: <T, U>(
      ...args: Marko._.MethodParams<
        Input<T, U>,
        Marko._.ReturnOf<typeof __marko_internal_template<T, U>>,
        __marko_internal_key
      >
    ) => Marko._.MethodReturn<
      Input<T, U>,
      Marko._.ReturnOf<typeof __marko_internal_template<T, U>>,
      __marko_internal_key
    >;
  } & { [Marko._.anyInput]: Input<any, any> },
  <__marko_internal_apply = 1>(
    m?: __marko_internal_apply,
  ) => __marko_internal_apply extends 0 | 2
    ? <T, U>() => Marko._.Renderer<
        Input<T, U>,
        Marko._.ReturnOf<typeof __marko_internal_template<T, U>>,
        __marko_internal_apply
      >
    : __marko_internal_apply extends 1
      ? () => <__marko_internal_input, T, U>(
          input: Marko.Directives &
            Input<T, U> &
            Marko._.Relate<
              __marko_internal_input,
              Marko.Directives & Input<T, U>
            >,
        ) => Marko._.ReturnWithScope<
          __marko_internal_input,
          Marko._.ReturnOf<typeof __marko_internal_template<T, U>>
        >
      : () => <__marko_internal_input, T, U>(
          input: Marko._.TagInput<__marko_internal_input, Input<T, U>>,
        ) => Marko._.ReturnWithRestAttrTagsScope<
          __marko_internal_input,
          Marko._.ReturnOf<typeof __marko_internal_template<T, U>>
        >
> {}
const Input = new Template();
export default Input;
