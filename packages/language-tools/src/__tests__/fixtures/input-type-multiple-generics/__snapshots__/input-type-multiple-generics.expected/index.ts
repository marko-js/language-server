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
function ᜭ<FirstName extends string, LastName extends string, Extra>() {
  const input = 1 as any as Input<FirstName, LastName, Extra>;
  const component = 1 as any as Component<FirstName, LastName, Extra>;
  const out = Marko.ᜭ.out;
  const state = Marko.ᜭ.state(component);
  Marko.ᜭ.noop({ input, out, component, state });
  input.fullName;
  return;
}
export default new (class Template extends Marko.ᜭ.Template<{
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

  /**
   * @internal
   * Do not use or you will be fired.
   */
  ᜭ<FirstName extends string, LastName extends string, Extra, ᜭInput = unknown>(
    input: Marko.ᜭ.Relate<Input<FirstName, LastName, Extra>, ᜭInput>
  ): Marko.ᜭ.ReturnWithScope<
    ᜭInput,
    ReturnType<typeof ᜭ<FirstName, LastName, Extra>>
  >;
}> {})();
