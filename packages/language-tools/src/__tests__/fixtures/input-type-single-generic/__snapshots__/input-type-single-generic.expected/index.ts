import "@marko/language-tools/script.internals";
import "../../lib-fixtures/marko.d.ts";
export interface Input<T extends { name: string }> {
  options: T[];
  onChange: (option: T) => unknown;
}
abstract class Component<T extends { name: string }> extends Marko.Component<
  Input<T>
> {}
export { type Component };
function __marko_internal_template<T extends { name: string }>(this: void) {
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
  render<T extends { name: string }>(
    input: Marko.TemplateInput<Input<T>>,
    stream?: {
      write: (chunk: string) => void;
      end: (chunk?: string) => void;
    }
  ): Marko.Out<Component<T>>;

  renderSync<T extends { name: string }>(
    input: Marko.TemplateInput<Input<T>>
  ): Marko.RenderResult<Component<T>>;

  renderToString<T extends { name: string }>(
    input: Marko.TemplateInput<Input<T>>
  ): string;

  stream<T extends { name: string }>(
    input: Marko.TemplateInput<Input<T>>
  ): ReadableStream<string> & NodeJS.ReadableStream;

  _<T extends { name: string }, __marko_internal_input = unknown>(
    input: Marko._.Relate<Input<T>, __marko_internal_input>
  ): Marko._.ReturnWithScope<
    __marko_internal_input,
    ReturnType<typeof __marko_internal_template<T>>
  >;
}> {})();
