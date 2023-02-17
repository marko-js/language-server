export interface Input<T, U> {
  data: T;
  renderBody: Marko.Body<[T], U>;
}
abstract class Component<T, U> extends Marko.Component<Input<T, U>> {}
export { type Component };
function __marko_internal_template<T, U>(this: void) {
  const input = 1 as any as Input<T, U>;
  const component = 1 as any as Component<T, U>;
  const out = Marko._.out;
  const state = Marko._.state(component);
  Marko._.noop({ input, out, component, state });
  const __marko_internal_return = {
    return: Marko._.returnTag({
      /*return*/
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

  renderSync<T, U>(
    input: Marko.TemplateInput<Input<T, U>>
  ): Marko.RenderResult<Component<T, U>>;

  renderToString<T, U>(input: Marko.TemplateInput<Input<T, U>>): string;

  stream<T, U>(
    input: Marko.TemplateInput<Input<T, U>>
  ): ReadableStream<string> & NodeJS.ReadableStream;

  _<__marko_internal_apply>(): __marko_internal_apply extends 0
    ? <T, U>() => <__marko_internal_input>(
        input: Input<T, U> & Marko._.Relate<__marko_internal_input, Input<T, U>>
      ) => Marko._.ReturnWithScope<
        __marko_internal_input,
        ReturnType<typeof __marko_internal_template<T, U>>
      >
    : () => <__marko_internal_input, T, U>(
        input: Input<T, U> & Marko._.Relate<__marko_internal_input, Input<T, U>>
      ) => Marko._.ReturnWithScope<
        __marko_internal_input,
        ReturnType<typeof __marko_internal_template<T, U>>
      >;
}> {})();
