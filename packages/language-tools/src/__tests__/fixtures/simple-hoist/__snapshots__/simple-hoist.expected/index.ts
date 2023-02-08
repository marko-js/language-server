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
          Marko.ᜭ.renderNativeTag("div")({
            /*div*/
            /*div*/
            ["renderBody"]: Marko.ᜭ.inlineBody(
              (() => {
                Marko.ᜭ.assertRendered(
                  Marko.ᜭ.rendered,
                  2,
                  Marko.ᜭ.renderTemplate(
                    import("../../components/let/index.marko")
                  )({
                    /*let*/
                    value: 1,
                  })
                );
                const { value: x } = Marko.ᜭ.rendered.returns[2];
                x;
                Marko.ᜭ.assertRendered(
                  Marko.ᜭ.rendered,
                  3,
                  Marko.ᜭ.renderNativeTag("button")({
                    /*button*/
                    onClick() {
                      ᜭ.mutate.x = 2;
                      ᜭ.mutate.x++;
                      ++ᜭ.mutate.x;
                    },
                  })
                );
                const { value: el } = Marko.ᜭ.rendered.returns[3];
                const ᜭ = {
                  mutate: Marko.ᜭ.mutable([
                    ["x", "value", Marko.ᜭ.rendered.returns[2]],
                  ] as const),
                };
                Marko.ᜭ.noop({ x });
                return {
                  scope: { x, el },
                };
              })()
            ),
          })
        );
        Marko.ᜭ.renderDynamicTag(effect)({
          /*effect*/
          value() {
            console.log(el());
          },
        });
        x;
        const { x, el } = Marko.ᜭ.readScopes(Marko.ᜭ.rendered);
        Marko.ᜭ.noop({ x, el });
        return;
      })();
    }
  }
);
