export interface Input<T = string> {
  value: T;
}
abstract class Component<T = string> extends Marko.Component<Input<T>> {}
export { type Component };
function __marko_internal_template<T = string>(this: void) {
  const input = 1 as any as Input<T>;
  const component = 1 as any as Component<T>;
  const out = Marko._.out;
  const state = Marko._.state(component);
  Marko._.noop({ input, out, component, state });
  const __marko_internal_return = {
    return: Marko._.returnTag({
      value: input.value,
    }),
  };
  return __marko_internal_return.return;
}
export default new (class Template extends Marko._.Template<{
  render<T = string>(
    input: Marko.TemplateInput<Input<T>>,
    stream?: {
      write: (chunk: string) => void;
      end: (chunk?: string) => void;
    }
  ): Marko.Out<Component<T>>;

  renderSync<T = string>(
    input: Marko.TemplateInput<Input<T>>
  ): Marko.RenderResult<Component<T>>;

  renderToString<T = string>(input: Marko.TemplateInput<Input<T>>): string;

  stream<T = string>(
    input: Marko.TemplateInput<Input<T>>
  ): ReadableStream<string> & NodeJS.ReadableStream;

  _<__marko_internal_apply = 1>(): __marko_internal_apply extends 0
    ? <T = string>() => <__marko_internal_input extends unknown>(
        input: Input<T> & Marko._.Relate<__marko_internal_input, Input<T>>
      ) => Marko._.ReturnWithScope<
        __marko_internal_input,
        typeof __marko_internal_template<T> extends () => infer Return
          ? Return
          : never
      >
    : () => <__marko_internal_input extends unknown, T = string>(
        input: Input<T> & Marko._.Relate<__marko_internal_input, Input<T>>
      ) => Marko._.ReturnWithScope<
        __marko_internal_input,
        typeof __marko_internal_template<T> extends () => infer Return
          ? Return
          : never
      >;
}> {})();
