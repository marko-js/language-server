import "@marko/language-tools/script.internals";
import "../../../lib-fixtures/marko.d.ts";
export interface Input<T, U> {
  data: T;
  renderBody: Marko.Body<[T], U>;
}
abstract class Component<T, U> extends Marko.Component<Input<T, U>> {}
export { type Component };
function ᜭ<T, U>() {
  const input = 1 as any as Input<T, U>;
  const component = 1 as any as Component<T, U>;
  const out = Marko.ᜭ.out;
  const state = Marko.ᜭ.state(component);
  Marko.ᜭ.noop({ input, out, component, state });
  const ᜭᜭ = {
    return: Marko.ᜭ.returnTag({
      /*return*/
      value: 1 as unknown as U,
    }),
  };
  return ᜭᜭ.return;
}
export default new (class Template extends Marko.ᜭ.Template<{
  /** Asynchronously render the template. */
  render<T, U>(
    input: Marko.TemplateInput<Input<T, U>>,
    stream?: {
      write: (chunk: string) => void;
      end: (chunk?: string) => void;
    }
  ): Marko.Out<Component<T, U>>;

  /** Synchronously render the template. */
  renderSync<T, U>(
    input: Marko.TemplateInput<Input<T, U>>
  ): Marko.RenderResult<Component<T, U>>;

  /** Synchronously render a template to a string. */
  renderToString<T, U>(input: Marko.TemplateInput<Input<T, U>>): string;

  /** Render a template and return a stream.Readable in nodejs or a ReadableStream in a web worker environment. */
  stream<T, U>(
    input: Marko.TemplateInput<Input<T, U>>
  ): ReadableStream<string> & NodeJS.ReadableStream;

  /**
   * @internal
   * Do not use or you will be fired.
   */
  ᜭ<T, U, ᜭInput = unknown>(
    input: Marko.ᜭ.Relate<Input<T, U>, ᜭInput>
  ): Marko.ᜭ.ReturnWithScope<ᜭInput, ReturnType<typeof ᜭ<T, U>>>;
}> {})();
