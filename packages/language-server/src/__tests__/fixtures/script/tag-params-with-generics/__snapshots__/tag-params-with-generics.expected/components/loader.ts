export interface Input<TData = string> {
  renderBody: Marko.Body<[TData], void>;
  value?: () => TData;
  key?: string;
}
abstract class Component<TData = string> extends Marko.Component<
  Input<TData>
> {}
export { type Component };
(function <TData = string>(this: void) {
  const input = Marko._.any as Input<TData>;
  const component = Marko._.any as Component<TData>;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  Marko._.noop({ component, state, out, input, $global, $signal });
  return;
})();
const __marko_internal_api = "class";
export { __marko_internal_api as "~api" };
class Template extends Marko._.GenericTemplate<
  {
    [__marko_internal_key in keyof Marko._.TemplateMethods]: <TData = string>(
      ...args: Marko._.MethodParams<Input<TData>, void, __marko_internal_key>
    ) => Marko._.MethodReturn<Input<TData>, void, __marko_internal_key>;
  } & { [Marko._.anyInput]: Input<any> },
  <__marko_internal_apply = 1>(
    m?: __marko_internal_apply,
  ) => __marko_internal_apply extends 0 | 2
    ? <TData = string>() => Marko._.Renderer<
        Input<TData>,
        void,
        __marko_internal_apply
      >
    : __marko_internal_apply extends 1
      ? () => <__marko_internal_input, TData = string>(
          input: Marko.Directives &
            Input<TData> &
            Marko._.Relate<
              __marko_internal_input,
              Marko.Directives & Input<TData>
            >,
        ) => Marko._.ReturnWithScope<__marko_internal_input, void>
      : () => <__marko_internal_input, TData = string>(
          input: Marko._.TagInput<__marko_internal_input, Input<TData>>,
        ) => Marko._.ReturnWithRestAttrTagsScope<__marko_internal_input, void>,
  "class"
> {}
const Input = new Template();
export default Input;
