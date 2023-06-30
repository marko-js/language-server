export interface Input<T, U> {
  data: T;
  renderBody: Marko.Body<[T], U>;
}
abstract class Component<T, U> extends Marko.Component<Input<T, U>> {}
export { type Component };
function __marko_internal_template<T, U>(this: void) {
  const input = Marko._.any as Input<T, U>;
  const component = Marko._.any as Component<T, U>;
  const state = Marko._.state(component);
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context)
  );
  const out = Marko._.out;
  Marko._.noop({ input, component, state, out, $global });
  const __marko_internal_return = {
    return: Marko._.returnTag({
      value: 1 as unknown as U,
    }),
  };
  return __marko_internal_return.return;
}
export default new (class Template extends Marko._.Template<{
  render<T, U>(
    input: Marko.TemplateInput<Input<T, U>>,
    stream?: {
      write: (chunk: string) => void;
      end: (chunk?: string) => void;
    }
  ): Marko.Out<Component<T, U>>;

  render<T, U>(
    input: Marko.TemplateInput<Input<T, U>>,
    cb?: (
      err: Error | null,
      result: Marko.RenderResult<Component<T, U>>
    ) => void
  ): Marko.Out<Component<T, U>>;

  renderSync<T, U>(
    input: Marko.TemplateInput<Input<T, U>>
  ): Marko.RenderResult<Component<T, U>>;

  renderToString<T, U>(input: Marko.TemplateInput<Input<T, U>>): string;

  stream<T, U>(
    input: Marko.TemplateInput<Input<T, U>>
  ): ReadableStream<string> & NodeJS.ReadableStream;

  _<__marko_internal_apply = 1>(): __marko_internal_apply extends 0
    ? <T, U>() => <__marko_internal_input extends unknown>(
        input: Marko.Directives &
          Input<T, U> &
          Marko._.Relate<__marko_internal_input, Marko.Directives & Input<T, U>>
      ) => Marko._.ReturnWithScope<
        __marko_internal_input,
        typeof __marko_internal_template<T, U> extends () => infer Return
          ? Return
          : never
      >
    : () => <__marko_internal_input extends unknown, T, U>(
        input: Marko.Directives &
          Input<T, U> &
          Marko._.Relate<__marko_internal_input, Marko.Directives & Input<T, U>>
      ) => Marko._.ReturnWithScope<
        __marko_internal_input,
        typeof __marko_internal_template<T, U> extends () => infer Return
          ? Return
          : never
      >;
}> {})();
