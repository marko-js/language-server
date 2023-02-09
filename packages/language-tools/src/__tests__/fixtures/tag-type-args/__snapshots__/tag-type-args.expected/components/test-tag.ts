import "@marko/language-tools/script.internals";
import "../../../lib-fixtures/marko.d.ts";
export interface Input<T> {
  a: T;
}
abstract class Component<T> extends Marko.Component<Input<T>> {}
export { type Component };
function ᜭ<T>() {
  const input = 1 as any as Input<T>;
  const component = 1 as any as Component<T>;
  const out = Marko.ᜭ.out;
  const state = Marko.ᜭ.state(component);
  Marko.ᜭ.noop({ input, out, component, state });
  return;
}
export default new (class Template extends Marko.ᜭ.Template<{
  /** Asynchronously render the template. */
  render<T>(
    input: Marko.TemplateInput<Input<T>>,
    stream?: {
      write: (chunk: string) => void;
      end: (chunk?: string) => void;
    }
  ): Marko.Out<Component<T>>;

  /** Synchronously render the template. */
  renderSync<T>(
    input: Marko.TemplateInput<Input<T>>
  ): Marko.RenderResult<Component<T>>;

  /** Synchronously render a template to a string. */
  renderToString<T>(input: Marko.TemplateInput<Input<T>>): string;

  /** Render a template and return a stream.Readable in nodejs or a ReadableStream in a web worker environment. */
  stream<T>(
    input: Marko.TemplateInput<Input<T>>
  ): ReadableStream<string> & NodeJS.ReadableStream;

  /**
   * @internal
   * Do not use or you will be fired.
   */
  ᜭ<T, ᜭInput = unknown>(
    input: Marko.ᜭ.Relate<Input<T>, ᜭInput>
  ): Marko.ᜭ.ReturnWithScope<ᜭInput, ReturnType<typeof ᜭ<T>>>;
}> {})();
