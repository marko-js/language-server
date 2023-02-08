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
                      typeof import("../../components/let/index.marko").default
                    >
                  )({
                    /*let*/
                    value: {
                      a: 1,
                      b: "hello!",
                      c: undefined,
                      nested: {
                        d: 2,
                        dChange(v: number) {},
                      },
                      "some-alias": 3,
                      computed: 4,
                      other: true,
                    } as const,
                  })
                );
                const {
                  value: {
                    a,
                    b,
                    c = "default" as const,
                    nested: { d },
                    "some-alias": e,
                    ["computed"]: f,
                    ...g
                  },
                } = Marko.ᜭ.rendered.returns[2];
                Marko.ᜭ.assertRendered(
                  Marko.ᜭ.rendered,
                  3,
                  (
                    1 as any as Marko.ᜭ.CustomTagRenderer<
                      typeof import("../../components/let/index.marko").default
                    >
                  )({
                    /*let*/
                    value: [1, 2, 3, 4, 5] as const,
                  })
                );
                const {
                  value: [h, i, , ...j],
                } = Marko.ᜭ.rendered.returns[3];
                return {
                  scope: { a, b, c, d, e, f, g, h, i, j },
                };
              })()
            ),
          })
        );
        () => {
          a;
          b;
          c;
          d;
          e;
          f;
          g;
          h;
          i;
          j;
        };
        const { a, b, c, d, e, f, g, h, i, j } = Marko.ᜭ.readScopes(
          Marko.ᜭ.rendered
        );
        Marko.ᜭ.noop({ a, b, c, d, e, f, g, h, i, j });
        return;
      })();
    }
  }
);
