export interface Input<T = string> {
  options: T[];
  onChange: (option: T) => unknown;
}
abstract class Component<T = string> extends Marko.Component<Input<T>> {}
export { type Component };
function __marko_internal_template<T = string>(this: void) {
  const input = 1 as any as Input<T>;
  const component = 1 as any as Component<T>;
  const out = Marko._.out;
  const state = Marko._.state(component);
  Marko._.noop({ input, out, component, state });
  input.options;
  input.onChange;
  return;
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

  _<T = string, __marko_internal_input = unknown>(
    input: Marko._.Relate<Input<T>, __marko_internal_input>
  ): Marko._.ReturnWithScope<
    __marko_internal_input,
    ReturnType<typeof __marko_internal_template<T>>
  >;
}> {})();
