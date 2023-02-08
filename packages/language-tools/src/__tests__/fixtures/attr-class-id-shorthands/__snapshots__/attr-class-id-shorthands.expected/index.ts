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
          Marko.ᜭ.renderTemplate(import("../../components/const/index.marko"))({
            /*const*/
            value: "hi",
          })
        );
        const { value: value } = Marko.ᜭ.rendered.returns[1];
        Marko.ᜭ.renderNativeTag("div")({
          /*div*/
          id: `test`,
        });
        Marko.ᜭ.renderNativeTag("div")({
          /*div*/
          id: `test-${value || ""}`,
        });
        Marko.ᜭ.renderNativeTag("div")({
          /*div*/
          id: `${value || ""}-test`,
        });
        Marko.ᜭ.renderNativeTag("div")({
          /*div*/
          id: `${value || ""}-test-${value || ""}`,
        });
        Marko.ᜭ.renderNativeTag("div")({
          /*div*/
          class: `test`,
        });
        Marko.ᜭ.renderNativeTag("div")({
          /*div*/
          class: `hello world`,
        });
        Marko.ᜭ.renderNativeTag("div")({
          /*div*/
          class: `test-${value || ""}`,
        });
        Marko.ᜭ.renderNativeTag("div")({
          /*div*/
          class: `${value || ""}-test`,
        });
        Marko.ᜭ.renderNativeTag("div")({
          /*div*/
          class: `${value || ""}-test-${value || ""}`,
        });
        Marko.ᜭ.renderTemplate(import("./components/test-tag.marko"))({
          /*test-tag*/
          id: `test`,
        });
        Marko.ᜭ.renderTemplate(import("./components/test-tag.marko"))({
          /*test-tag*/
          id: `test-${value || ""}`,
        });
        Marko.ᜭ.renderTemplate(import("./components/test-tag.marko"))({
          /*test-tag*/
          id: `${value || ""}-test`,
        });
        Marko.ᜭ.renderTemplate(import("./components/test-tag.marko"))({
          /*test-tag*/
          id: `${value || ""}-test-${value || ""}`,
        });
        Marko.ᜭ.renderTemplate(import("./components/test-tag.marko"))({
          /*test-tag*/
          class: `test`,
        });
        Marko.ᜭ.renderTemplate(import("./components/test-tag.marko"))({
          /*test-tag*/
          class: `hello world`,
        });
        Marko.ᜭ.renderTemplate(import("./components/test-tag.marko"))({
          /*test-tag*/
          class: `test-${value || ""}`,
        });
        Marko.ᜭ.renderTemplate(import("./components/test-tag.marko"))({
          /*test-tag*/
          class: `${value || ""}-test`,
        });
        Marko.ᜭ.renderTemplate(import("./components/test-tag.marko"))({
          /*test-tag*/
          class: `${value || ""}-test-${value || ""}`,
        });
        return;
      })();
    }
  }
);
