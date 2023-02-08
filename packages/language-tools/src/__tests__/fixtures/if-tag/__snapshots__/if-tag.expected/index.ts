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
            value: true,
          })
        );
        const { value: show } = Marko.ᜭ.rendered.returns[1];
        Marko.ᜭ.assertRendered(
          Marko.ᜭ.rendered,
          2,
          (
            1 as any as Marko.ᜭ.CustomTagRenderer<
              typeof import("../../components/let/index.marko").default
            >
          )({
            /*let*/
            value: false,
          })
        );
        const { value: showAlt } = Marko.ᜭ.rendered.returns[2];
        if (undefined) {
        }
        if (show) {
        }
        if (show) {
        }
        (1 as any as Marko.ᜭ.NativeTagRenderer<"div">)({
          /*div*/
          /*div*/
          ["renderBody"]: Marko.ᜭ.inlineBody(
            (() => {
              if (undefined) {
              }
            })()
          ),
        });
        if (show) {
        } else {
        }
        Marko.ᜭ.assertRendered(
          Marko.ᜭ.rendered,
          3,
          (() => {
            if (show) {
              Marko.ᜭ.assertRendered(
                Marko.ᜭ.rendered,
                4,
                (
                  1 as any as Marko.ᜭ.CustomTagRenderer<
                    typeof import("../../components/const/index.marko").default
                  >
                )({
                  /*const*/
                  value: 0 as const,
                })
              );
              const { value: a } = Marko.ᜭ.rendered.returns[4];
              return {
                scope: { a },
              };
            } else {
              return undefined;
            }
          })()
        );
        Marko.ᜭ.assertRendered(
          Marko.ᜭ.rendered,
          5,
          (() => {
            if (show) {
              Marko.ᜭ.assertRendered(
                Marko.ᜭ.rendered,
                6,
                (
                  1 as any as Marko.ᜭ.CustomTagRenderer<
                    typeof import("../../components/const/index.marko").default
                  >
                )({
                  /*const*/
                  value: 1 as const,
                })
              );
              const { value: b } = Marko.ᜭ.rendered.returns[6];
              return {
                scope: { b },
              };
            } else if (showAlt) {
              Marko.ᜭ.assertRendered(
                Marko.ᜭ.rendered,
                7,
                (
                  1 as any as Marko.ᜭ.CustomTagRenderer<
                    typeof import("../../components/const/index.marko").default
                  >
                )({
                  /*const*/
                  value: 2 as const,
                })
              );
              const { value: c } = Marko.ᜭ.rendered.returns[7];
              return {
                scope: { c },
              };
            } else {
              Marko.ᜭ.assertRendered(
                Marko.ᜭ.rendered,
                8,
                (
                  1 as any as Marko.ᜭ.CustomTagRenderer<
                    typeof import("../../components/const/index.marko").default
                  >
                )({
                  /*const*/
                  value: 3 as const,
                })
              );
              const { value: d } = Marko.ᜭ.rendered.returns[8];
              return {
                scope: { d },
              };
            }
          })()
        );
        Marko.ᜭ.assertRendered(
          Marko.ᜭ.rendered,
          9,
          (() => {
            if (show) {
            } else {
              Marko.ᜭ.assertRendered(
                Marko.ᜭ.rendered,
                10,
                (
                  1 as any as Marko.ᜭ.CustomTagRenderer<
                    typeof import("../../components/const/index.marko").default
                  >
                )({
                  /*const*/
                  value: 4 as const,
                })
              );
              const { value: e } = Marko.ᜭ.rendered.returns[10];
              return {
                scope: { e },
              };
            }
          })()
        );
        Marko.ᜭ.assertRendered(
          Marko.ᜭ.rendered,
          11,
          (() => {
            if (show) {
            } else if (showAlt) {
            } else {
              Marko.ᜭ.assertRendered(
                Marko.ᜭ.rendered,
                12,
                (
                  1 as any as Marko.ᜭ.CustomTagRenderer<
                    typeof import("../../components/const/index.marko").default
                  >
                )({
                  /*const*/
                  value: 4 as const,
                })
              );
              const { value: f } = Marko.ᜭ.rendered.returns[12];
              return {
                scope: { f },
              };
            }
          })()
        );
        Marko.ᜭ.assertRendered(
          Marko.ᜭ.rendered,
          13,
          (() => {
            if (show) {
              Marko.ᜭ.assertRendered(
                Marko.ᜭ.rendered,
                14,
                (
                  1 as any as Marko.ᜭ.CustomTagRenderer<
                    typeof import("../../components/const/index.marko").default
                  >
                )({
                  /*const*/
                  value: 5 as const,
                })
              );
              const { value: g } = Marko.ᜭ.rendered.returns[14];
              return {
                scope: { g },
              };
            } else {
              Marko.ᜭ.assertRendered(
                Marko.ᜭ.rendered,
                15,
                (
                  1 as any as Marko.ᜭ.CustomTagRenderer<
                    typeof import("../../components/const/index.marko").default
                  >
                )({
                  /*const*/
                  value: 6 as const,
                })
              );
              const { value: g } = Marko.ᜭ.rendered.returns[15];
              return {
                scope: { g },
              };
            }
          })()
        );
        if (show) {
        } else if (undefined) {
        }
        Marko.ᜭ.render(effect)({
          /*effect*/
          value() {
            a;
            b;
            c;
            d;
            e;
            f;
            g;
          },
        });
        const { a, b, c, d, e, f, g } = Marko.ᜭ.readScopes(Marko.ᜭ.rendered);
        Marko.ᜭ.noop({ a, b, c, d, e, f, g });
        return;
      })();
    }
  }
);
