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
export default Marko.ᜭ.instance(
  class extends Marko.ᜭ.Template<{
    /** Asynchronously render the template. */
    render<T extends { name: string }>(
      input: Marko.TemplateInput<Input<T>>,
      stream?: {
        write: (chunk: string) => void;
        end: (chunk?: string) => void;
      }
    ): Marko.Out<Component<T>>;

    /** Synchronously render the template. */
    renderSync<T extends { name: string }>(
      input: Marko.TemplateInput<Input<T>>
    ): Marko.RenderResult<Component<T>>;

    /** Synchronously render a template to a string. */
    renderToString<T extends { name: string }>(
      input: Marko.TemplateInput<Input<T>>
    ): string;

    /** Render a template and return a stream.Readable in nodejs or a ReadableStream in a web worker environment. */
    stream<T extends { name: string }>(
      input: Marko.TemplateInput<Input<T>>
    ): ReadableStream<string> & NodeJS.ReadableStream;
  }>() {
    /**
     * @internal
     * Do not use or you will be fired.
     */
    public ᜭ<T extends { name: string }, ᜭ = unknown>(
      input: Marko.ᜭ.Relate<Input<T>, ᜭ>
    ) {
      return Marko.ᜭ.returnWithScope(input as any as ᜭ, this.#ᜭ<T>());
    }
    #ᜭ<T extends { name: string }>() {
      const input = 1 as unknown as Input<T>;
      const component = Marko.ᜭ.instance(Component<T>);
      const out = 1 as unknown as Marko.Out;
      const state = Marko.ᜭ.state(component);
      Marko.ᜭ.noop({ input, out, component, state });
      return (function (this: void) {
        input.options;
        input.onChange;
        return;
      })();
    }
  }
);
