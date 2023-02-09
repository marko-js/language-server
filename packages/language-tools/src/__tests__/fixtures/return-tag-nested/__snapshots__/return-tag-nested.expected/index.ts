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
  Marko.ᜭ.renderTemplate(import("./components/test-tag.marko"))({
    /*test-tag*/
    /*test-tag*/
    ["renderBody"]: Marko.ᜭ.body(function* (a) {
      a;
      return;
    }),
  });
  Marko.ᜭ.renderTemplate(import("./components/test-tag.marko"))({
    /*test-tag*/
    /*test-tag*/
    ["renderBody"]: Marko.ᜭ.body(function* (a) {
      const ᜭᜭ = {
        return: Marko.ᜭ.returnTag({
          /*return*/
          value: a,
        }),
      };
      return ᜭᜭ.return;
    }),
  });
  Marko.ᜭ.renderTemplate(import("./components/test-tag.marko"))({
    /*test-tag*/
    /*test-tag*/
    ["renderBody"]: Marko.ᜭ.inlineBody(
      (() => {
        const ᜭᜭ = {
          return: Marko.ᜭ.returnTag({
            /*return*/
            value: "b" as const,
          }),
        };
        return {
          return: ᜭᜭ.return,
        };
      })()
    ),
  });
  Marko.ᜭ.renderTemplate(import("./components/test-tag.marko"))({
    /*test-tag*/
    /*test-tag*/
    ["renderBody"]: Marko.ᜭ.inlineBody(
      (() => {
        const ᜭᜭ = {
          return: Marko.ᜭ.returnTag({
            /*return*/
            value: "c" as const,
          }),
        };
        return {
          return: ᜭᜭ.return,
        };
      })()
    ),
  });
  Marko.ᜭ.assertRendered(
    Marko.ᜭ.rendered,
    1,
    Marko.ᜭ.renderTemplate(import("./components/test-tag.marko"))({
      /*test-tag*/
      /*test-tag*/
      ["renderBody"]: Marko.ᜭ.inlineBody(
        (() => {
          Marko.ᜭ.assertRendered(
            Marko.ᜭ.rendered,
            2,
            Marko.ᜭ.renderTemplate(import("../../components/let/index.marko"))({
              /*let*/
              value: 1 as const,
            })
          );
          const { value: hoisted } = Marko.ᜭ.rendered.returns[2];
          const ᜭᜭ = {
            return: Marko.ᜭ.returnTag({
              /*return*/
              value: "b" as const,
            }),
          };
          return {
            scope: { hoisted },
            return: ᜭᜭ.return,
          };
        })()
      ),
    })
  );
  () => {
    hoisted;
  };
  const { hoisted } = Marko.ᜭ.readScopes(Marko.ᜭ.rendered);
  Marko.ᜭ.noop({ hoisted });
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
