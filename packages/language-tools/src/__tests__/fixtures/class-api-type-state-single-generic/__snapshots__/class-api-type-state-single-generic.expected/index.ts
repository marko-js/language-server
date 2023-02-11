export interface Input<T extends string> {
  name: T;
}
abstract class Component<T extends string> extends Marko.Component<Input<T>> {
  declare state: {
    name: T;
  };
  onCreate(input: Input<T>) {
    this.state = { name: input.name };
  }
  onMount() {
    this.state.name;
  }
}
export { type Component };
function __marko_internal_template<T extends string>(this: void) {
  const input = 1 as any as Input<T>;
  const component = 1 as any as Component<T>;
  const out = Marko._.out;
  const state = Marko._.state(component);
  Marko._.noop({ input, out, component, state });
  state.name;
  return;
}
export default new (class Template extends Marko._.Template<{
  render<T extends string>(
    input: Marko.TemplateInput<Input<T>>,
    stream?: {
      write: (chunk: string) => void;
      end: (chunk?: string) => void;
    }
  ): Marko.Out<Component<T>>;

  renderSync<T extends string>(
    input: Marko.TemplateInput<Input<T>>
  ): Marko.RenderResult<Component<T>>;

  renderToString<T extends string>(
    input: Marko.TemplateInput<Input<T>>
  ): string;

  stream<T extends string>(
    input: Marko.TemplateInput<Input<T>>
  ): ReadableStream<string> & NodeJS.ReadableStream;

  _<T extends string, __marko_internal_input = unknown>(
    input: Marko._.Relate<Input<T>, __marko_internal_input>
  ): Marko._.ReturnWithScope<
    __marko_internal_input,
    ReturnType<typeof __marko_internal_template<T>>
  >;
}> {})();
