import "@marko/language-tools/script.internals";
import "../../lib-fixtures/marko.d.ts";
import CustomTagA from "./components/TestTagA.marko";
import CustomTagB from "./components/TestTagB.marko";
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
              typeof import("../../components/const/index.marko").default
            >
          )({
            /*const*/
            value: CustomTagA,
          })
        );
        const { value: TestTagA } = Marko.ᜭ.rendered.returns[1];
        Marko.ᜭ.render(
          // @ts-expect-error We expect the compiler to error because we are checking if the tag is defined.
          1 as unknown as MARKO_NOT_DECLARED extends any
            ? 0 extends 1 & typeof TestTagA
              ? Marko.ᜭ.CustomTagRenderer<
                  typeof import("./components/TestTagA.marko").default
                >
              : typeof TestTagA
            : never
        )({
          /*TestTagA*/
          a: "hello",
        });
        Marko.ᜭ.render(
          // @ts-expect-error We expect the compiler to error because we are checking if the tag is defined.
          1 as unknown as MARKO_NOT_DECLARED extends any
            ? 0 extends 1 & typeof TestTagB
              ? Marko.ᜭ.CustomTagRenderer<
                  typeof import("./components/TestTagB.marko").default
                >
              : typeof TestTagB
            : never
        )({
          /*TestTagB*/
          b: "hello",
        });
        (1 as any as Marko.ᜭ.NativeTagRenderer<"div">)({
          /*div*/
          /*div*/
          ["renderBody"]: Marko.ᜭ.inlineBody(
            (() => {
              Marko.ᜭ.assertRendered(
                Marko.ᜭ.rendered,
                2,
                (
                  1 as any as Marko.ᜭ.CustomTagRenderer<
                    typeof import("../../components/const/index.marko").default
                  >
                )({
                  /*const*/
                  value: CustomTagB,
                })
              );
              const { value: TestTagA } = Marko.ᜭ.rendered.returns[2];
              Marko.ᜭ.render(
                // @ts-expect-error We expect the compiler to error because we are checking if the tag is defined.
                1 as unknown as MARKO_NOT_DECLARED extends any
                  ? 0 extends 1 & typeof TestTagA
                    ? Marko.ᜭ.CustomTagRenderer<
                        typeof import("./components/TestTagA.marko").default
                      >
                    : typeof TestTagA
                  : never
              )({
                /*TestTagA*/
                a: "hello",
              });
            })()
          ),
        });
        Marko.ᜭ.render(
          // @ts-expect-error We expect the compiler to error because we are checking if the tag is defined.
          1 as unknown as MARKO_NOT_DECLARED extends any
            ? 0 extends 1 & typeof TestTagA
              ? Marko.ᜭ.CustomTagRenderer<
                  typeof import("./components/TestTagA.marko").default
                >
              : typeof TestTagA
            : never
        )({
          /*TestTagA*/
          a: "hello",
        });
        return;
      })();
    }
  }
);
