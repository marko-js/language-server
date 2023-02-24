export interface Input<A> {
  value: A;
}
abstract class Component<A> extends Marko.Component<Input<A>> {}
export { type Component };
function __marko_internal_template<A>(this: void) {
  const input = 1 as any as Input<A>;
  const component = 1 as any as Component<A>;
  const out = Marko._.out;
  const state = Marko._.state(component);
  Marko._.noop({ input, out, component, state });
  const __marko_internal_return = {
    return: Marko._.returnTag({
      ...(1 as any as {
        value: A;
      }),
    }),
  };
  return __marko_internal_return.return;
}
export default new (class Template extends Marko._.Template<{
  render<A>(
    input: Marko.TemplateInput<Input<A>>,
    stream?: {
      write: (chunk: string) => void;
      end: (chunk?: string) => void;
    }
  ): Marko.Out<Component<A>>;

  renderSync<A>(
    input: Marko.TemplateInput<Input<A>>
  ): Marko.RenderResult<Component<A>>;

  renderToString<A>(input: Marko.TemplateInput<Input<A>>): string;

  stream<A>(
    input: Marko.TemplateInput<Input<A>>
  ): ReadableStream<string> & NodeJS.ReadableStream;

  _<__marko_internal_apply = 1>(): __marko_internal_apply extends 0
    ? <A>() => <__marko_internal_input extends unknown>(
        input: Input<A> & Marko._.Relate<__marko_internal_input, Input<A>>
      ) => Marko._.ReturnWithScope<
        __marko_internal_input,
        ReturnType<typeof __marko_internal_template<A>>
      >
    : () => <__marko_internal_input extends unknown, A>(
        input: Input<A> & Marko._.Relate<__marko_internal_input, Input<A>>
      ) => Marko._.ReturnWithScope<
        __marko_internal_input,
        ReturnType<typeof __marko_internal_template<A>>
      >;
}> {})();
