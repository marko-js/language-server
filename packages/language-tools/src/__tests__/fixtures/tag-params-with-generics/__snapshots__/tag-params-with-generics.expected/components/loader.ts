export interface Input<TData = string> {
  renderBody: Marko.Body<[TData], void>;
  value?: () => TData;
  key?: string;
}
abstract class Component<TData = string> extends Marko.Component<
  Input<TData>
> {}
export { type Component };
function __marko_internal_template<TData = string>(this: void) {
  const input = 1 as any as Input<TData>;
  const component = 1 as any as Component<TData>;
  const out = Marko._.out;
  const state = Marko._.state(component);
  Marko._.noop({ input, out, component, state });
  return;
}
export default new (class Template extends Marko._.Template<{
  render<TData = string>(
    input: Marko.TemplateInput<Input<TData>>,
    stream?: {
      write: (chunk: string) => void;
      end: (chunk?: string) => void;
    }
  ): Marko.Out<Component<TData>>;

  renderSync<TData = string>(
    input: Marko.TemplateInput<Input<TData>>
  ): Marko.RenderResult<Component<TData>>;

  renderToString<TData = string>(
    input: Marko.TemplateInput<Input<TData>>
  ): string;

  stream<TData = string>(
    input: Marko.TemplateInput<Input<TData>>
  ): ReadableStream<string> & NodeJS.ReadableStream;

  _<__marko_internal_apply = 1>(): __marko_internal_apply extends 0
    ? <TData = string>() => <__marko_internal_input extends unknown>(
        input: Input<TData> &
          Marko._.Relate<__marko_internal_input, Input<TData>>
      ) => Marko._.ReturnWithScope<
        __marko_internal_input,
        ReturnType<typeof __marko_internal_template<TData>>
      >
    : () => <__marko_internal_input extends unknown, TData = string>(
        input: Input<TData> &
          Marko._.Relate<__marko_internal_input, Input<TData>>
      ) => Marko._.ReturnWithScope<
        __marko_internal_input,
        ReturnType<typeof __marko_internal_template<TData>>
      >;
}> {})();
