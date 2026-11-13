export interface Input<T = string> {
  //                     ^?
  options: T[];
  //         ^?
  onChange: (option: T) => unknown;
  //                   ^?
}
abstract class Component<T = string> extends Marko.Component<Input<T>> {}
export { type Component };
(function <T = string>(this: void) {
  const input = Marko._.any as Input<T>;
  const component = Marko._.any as Component<T>;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  [input.options];
  //         ^?
  [input.onChange];
  Marko._.noop({ component, state, out, input, $global, $signal });
  return;
})();
const __marko_internal_api = "class";
export { __marko_internal_api as "~api" };
class Template extends Marko._.GenericTemplate<
  {
    [__marko_internal_key in keyof Marko._.TemplateMethods]: <T = string>(
      ...args: Marko._.MethodParams<Input<T>, void, __marko_internal_key>
    ) => Marko._.MethodReturn<Input<T>, void, __marko_internal_key>;
  } & { [Marko._.anyInput]: Input<any> },
  <__marko_internal_apply = 1>(
    m?: __marko_internal_apply,
  ) => __marko_internal_apply extends 0 | 2
    ? <T = string>() => Marko._.Renderer<Input<T>, void, __marko_internal_apply>
    : __marko_internal_apply extends 1
      ? () => <__marko_internal_input, T = string>(
          input: Marko.Directives &
            Input<T> &
            Marko._.Relate<__marko_internal_input, Marko.Directives & Input<T>>,
        ) => Marko._.ReturnWithScope<__marko_internal_input, void>
      : () => <__marko_internal_input, T = string>(
          input: Marko._.TagInput<__marko_internal_input, Input<T>>,
        ) => Marko._.ReturnWithRestAttrTagsScope<__marko_internal_input, void>,
  "class"
> {}
const Input = new Template();
export default Input;
//         ^?
