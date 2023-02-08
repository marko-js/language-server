import "@marko/language-tools/script.internals";
import "../../lib-fixtures/marko.d.ts";
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
export default Marko.ᜭ.instance(
  class extends Marko.ᜭ.Template<{
    /** Asynchronously render the template. */
    render<T extends string>(
      input: Marko.TemplateInput<Input<T>>,
      stream?: {
        write: (chunk: string) => void;
        end: (chunk?: string) => void;
      }
    ): Marko.Out<Component<T>>;

    /** Synchronously render the template. */
    renderSync<T extends string>(
      input: Marko.TemplateInput<Input<T>>
    ): Marko.RenderResult<Component<T>>;

    /** Synchronously render a template to a string. */
    renderToString<T extends string>(
      input: Marko.TemplateInput<Input<T>>
    ): string;

    /** Render a template and return a stream.Readable in nodejs or a ReadableStream in a web worker environment. */
    stream<T extends string>(
      input: Marko.TemplateInput<Input<T>>
    ): ReadableStream<string> & NodeJS.ReadableStream;
  }>() {
    /**
     * @internal
     * Do not use or you will be fired.
     */
    public ᜭ<T extends string, ᜭ = unknown>(
      input: Marko.ᜭ.Relate<Input<T>, ᜭ>
    ) {
      return Marko.ᜭ.returnWithScope(input as any as ᜭ, this.#ᜭ<T>());
    }
    #ᜭ<T extends string>() {
      const input = 1 as unknown as Input<T>;
      const component = Marko.ᜭ.instance(Component<T>);
      const out = 1 as unknown as Marko.Out;
      const state = Marko.ᜭ.state(component);
      Marko.ᜭ.noop({ input, out, component, state });
      return (function (this: void) {
        state.name;
        return;
      })();
    }
  }
);
