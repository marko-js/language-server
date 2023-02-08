import "@marko/language-tools/script.internals";
import "../../../lib-fixtures/marko.d.ts";
export interface Input<T, U> {
  data: T;
  renderBody: Marko.Body<[T], U>;
}
abstract class Component<T, U> extends Marko.Component<Input<T, U>> {}
export { type Component };
export default Marko.ᜭ.instance(
  class extends Marko.ᜭ.Template<{
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
  }>() {
    /**
     * @internal
     * Do not use or you will be fired.
     */
    public ᜭ<T, U, ᜭ = unknown>(input: Marko.ᜭ.Relate<Input<T, U>, ᜭ>) {
      return Marko.ᜭ.returnWithScope(input as any as ᜭ, this.#ᜭ<T, U>());
    }
    #ᜭ<T, U>() {
      const input = 1 as unknown as Input<T, U>;
      const component = Marko.ᜭ.instance(Component<T, U>);
      const out = 1 as unknown as Marko.Out;
      const state = Marko.ᜭ.state(component);
      Marko.ᜭ.noop({ input, out, component, state });
      return (function (this: void) {
        const ᜭ = {
          return: Marko.ᜭ.returnTag({
            /*return*/
            value: 1 as unknown as U,
          }),
        };
        return ᜭ.return;
      })();
    }
  }
);
