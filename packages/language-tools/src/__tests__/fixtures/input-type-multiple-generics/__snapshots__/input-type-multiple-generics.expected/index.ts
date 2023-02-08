import "@marko/language-tools/script.internals";
import "../../lib-fixtures/marko.d.ts";
export interface Input<
  FirstName extends string,
  LastName extends string,
  Extra
> {
  firstName: FirstName;
  lastName: LastName;
  fullName: `${FirstName} ${LastName}`;
}
abstract class Component<
  FirstName extends string,
  LastName extends string,
  Extra
> extends Marko.Component<Input<FirstName, LastName, Extra>> {}
export { type Component };
export default Marko.ᜭ.instance(
  class extends Marko.ᜭ.Template<{
    /** Asynchronously render the template. */
    render<FirstName extends string, LastName extends string, Extra>(
      input: Marko.TemplateInput<Input<FirstName, LastName, Extra>>,
      stream?: {
        write: (chunk: string) => void;
        end: (chunk?: string) => void;
      }
    ): Marko.Out<Component<FirstName, LastName, Extra>>;

    /** Synchronously render the template. */
    renderSync<FirstName extends string, LastName extends string, Extra>(
      input: Marko.TemplateInput<Input<FirstName, LastName, Extra>>
    ): Marko.RenderResult<Component<FirstName, LastName, Extra>>;

    /** Synchronously render a template to a string. */
    renderToString<FirstName extends string, LastName extends string, Extra>(
      input: Marko.TemplateInput<Input<FirstName, LastName, Extra>>
    ): string;

    /** Render a template and return a stream.Readable in nodejs or a ReadableStream in a web worker environment. */
    stream<FirstName extends string, LastName extends string, Extra>(
      input: Marko.TemplateInput<Input<FirstName, LastName, Extra>>
    ): ReadableStream<string> & NodeJS.ReadableStream;
  }>() {
    /**
     * @internal
     * Do not use or you will be fired.
     */
    public ᜭ<
      FirstName extends string,
      LastName extends string,
      Extra,
      ᜭ = unknown
    >(input: Marko.ᜭ.Relate<Input<FirstName, LastName, Extra>, ᜭ>) {
      return Marko.ᜭ.returnWithScope(
        input as any as ᜭ,
        this.#ᜭ<FirstName, LastName, Extra>()
      );
    }
    #ᜭ<FirstName extends string, LastName extends string, Extra>() {
      const input = 1 as unknown as Input<FirstName, LastName, Extra>;
      const component = Marko.ᜭ.instance(Component<FirstName, LastName, Extra>);
      const out = 1 as unknown as Marko.Out;
      const state = Marko.ᜭ.state(component);
      Marko.ᜭ.noop({ input, out, component, state });
      return (function (this: void) {
        input.fullName;
        return;
      })();
    }
  }
);
