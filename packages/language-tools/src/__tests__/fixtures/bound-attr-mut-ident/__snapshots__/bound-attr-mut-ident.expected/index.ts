import "@marko/language-tools/script.internals";
import "../../lib-fixtures/marko.d.ts";
export interface Input {}
abstract class Component extends Marko.Component<Input> {}
export { type Component };
export default Marko.ᜭ.instance(
  class extends Marko.ᜭ.Template<{
    /** Asynchronously render the template. */
    render(
      input: Marko.TemplateInput<Input>,
      stream?: {
        write: (chunk: string) => void;
        end: (chunk?: string) => void;
      }
    ): Marko.Out<Component>;

    /** Synchronously render the template. */
    renderSync(
      input: Marko.TemplateInput<Input>
    ): Marko.RenderResult<Component>;

    /** Synchronously render a template to a string. */
    renderToString(input: Marko.TemplateInput<Input>): string;

    /** Render a template and return a stream.Readable in nodejs or a ReadableStream in a web worker environment. */
    stream(
      input: Marko.TemplateInput<Input>
    ): ReadableStream<string> & NodeJS.ReadableStream;
  }>() {
    /**
     * @internal
     * Do not use or you will be fired.
     */
    public ᜭ<ᜭ = unknown>(input: Marko.ᜭ.Relate<Input, ᜭ>) {
      return Marko.ᜭ.returnWithScope(input as any as ᜭ, this.#ᜭ());
    }
    #ᜭ() {
      const input = 1 as unknown as Input;
      const component = Marko.ᜭ.instance(Component);
      const out = 1 as unknown as Marko.Out;
      const state = Marko.ᜭ.state(component);
      Marko.ᜭ.noop({ input, out, component, state });
      return (function (this: void) {
        Marko.ᜭ.assertRendered(
          Marko.ᜭ.rendered,
          1,
          Marko.ᜭ.renderTemplate(import("../../components/let/index.marko"))({
            /*let*/
            value: 1,
          })
        );
        const { value: a } = Marko.ᜭ.rendered.returns[1];
        Marko.ᜭ.assertRendered(
          Marko.ᜭ.rendered,
          2,
          Marko.ᜭ.renderTemplate(import("../../components/let/index.marko"))({
            /*let*/
            valueChange(_a) {
              ᜭ.mutate.a = a;
            },
            value: a,
          })
        );
        const { value: b } = Marko.ᜭ.rendered.returns[2];
        Marko.ᜭ.renderNativeTag("div")({
          /*div*/
          onClick() {
            ᜭ.mutate.a++;
            ᜭ.mutate.b++;
          },
        });
        const ᜭ = {
          mutate: Marko.ᜭ.mutable([
            ["a", "value", Marko.ᜭ.rendered.returns[1]],
            ["b", "value", Marko.ᜭ.rendered.returns[2]],
          ] as const),
        };
        Marko.ᜭ.noop({ a, b });
        return;
      })();
    }
  }
);
