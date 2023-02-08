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
          (
            1 as any as Marko.ᜭ.CustomTagRenderer<
              typeof import("../../components/let/index.marko").default
            >
          )({
            /*let*/
            value: 1,
          })
        );
        const { value: x } = Marko.ᜭ.rendered.returns[1];
        (1 as any as Marko.ᜭ.NativeTagRenderer<"div">)({
          /*div*/
          "data-function"() {
            ᜭ.mutate.x++;
          },
        });
        (1 as any as Marko.ᜭ.NativeTagRenderer<"div">)({
          /*div*/
          "data-function"(y = ᜭ.mutate.x++) {
            y;
          },
        });
        (1 as any as Marko.ᜭ.NativeTagRenderer<"div">)({
          /*div*/
          "data-function": () => {
            ᜭ.mutate.x++;
          },
        });
        (1 as any as Marko.ᜭ.NativeTagRenderer<"div">)({
          /*div*/
          "data-function": (y = ᜭ.mutate.x++) => {
            y;
          },
        });
        (1 as any as Marko.ᜭ.NativeTagRenderer<"div">)({
          /*div*/
          "data-function": function () {
            ᜭ.mutate.x++;
          },
        });
        (1 as any as Marko.ᜭ.NativeTagRenderer<"div">)({
          /*div*/
          "data-function": function (y = ᜭ.mutate.x++) {
            y;
          },
        });
        (1 as any as Marko.ᜭ.NativeTagRenderer<"div">)({
          /*div*/
          "data-function"() {
            function testA() {
              ᜭ.mutate.x++;
            }

            function testB(y = ᜭ.mutate.x++) {
              y;
            }

            class TestC {
              constructor() {
                this.#privateMethodA;
                this.#privateMethodB;
              }
              methodA() {
                ᜭ.mutate.x++;
              }
              methodB(y = ᜭ.mutate.x++) {
                y;
              }
              #privateMethodA() {
                ᜭ.mutate.x++;
              }
              #privateMethodB(y = ᜭ.mutate.x++) {
                y;
              }
            }

            testA;
            testB;
            TestC;
          },
        });
        const ᜭ = {
          mutate: Marko.ᜭ.mutable([
            ["x", "value", Marko.ᜭ.rendered.returns[1]],
          ] as const),
        };
        Marko.ᜭ.noop({ x });
        return;
      })();
    }
  }
);
