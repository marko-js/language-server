import "@marko/language-tools/script.internals";
import "../../lib-fixtures/marko.d.ts";
export interface Input {}
abstract class Component extends Marko.Component<Input> {}
export { type Component };
function ᜭ() {
  const input = 1 as any as Input;
  const component = 1 as any as Component;
  const out = Marko.ᜭ.out;
  const state = Marko.ᜭ.state(component);
  Marko.ᜭ.noop({ input, out, component, state });
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
            Marko.ᜭ.renderTemplate(import("../../components/let/index.marko"))({
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
            Marko.ᜭ.renderTemplate(import("../../components/let/index.marko"))({
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
  const { a, b, c, d, e, f, g, h, i, j } = Marko.ᜭ.readScopes(Marko.ᜭ.rendered);
  Marko.ᜭ.noop({ a, b, c, d, e, f, g, h, i, j });
  return;
}
export default new (class Template extends Marko.ᜭ.Template<{
  /** Asynchronously render the template. */
  render(
    input: Marko.TemplateInput<Input>,
    stream?: {
      write: (chunk: string) => void;
      end: (chunk?: string) => void;
    }
  ): Marko.Out<Component>;

  /** Synchronously render the template. */
  renderSync(input: Marko.TemplateInput<Input>): Marko.RenderResult<Component>;

  /** Synchronously render a template to a string. */
  renderToString(input: Marko.TemplateInput<Input>): string;

  /** Render a template and return a stream.Readable in nodejs or a ReadableStream in a web worker environment. */
  stream(
    input: Marko.TemplateInput<Input>
  ): ReadableStream<string> & NodeJS.ReadableStream;

  /**
   * @internal
   * Do not use or you will be fired.
   */
  ᜭ<ᜭInput = unknown>(
    input: Marko.ᜭ.Relate<Input, ᜭInput>
  ): Marko.ᜭ.ReturnWithScope<ᜭInput, ReturnType<typeof ᜭ>>;
}> {})();
