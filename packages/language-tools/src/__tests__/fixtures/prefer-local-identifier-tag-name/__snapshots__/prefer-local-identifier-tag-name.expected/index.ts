import "@marko/language-tools/script.internals";
import "../../lib-fixtures/marko.d.ts";
import CustomTagA from "./components/TestTagA.marko";
import CustomTagB from "./components/TestTagB.marko";
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
    Marko.ᜭ.renderTemplate(import("../../components/const/index.marko"))({
      /*const*/
      value: CustomTagA,
    })
  );
  const { value: TestTagA } = Marko.ᜭ.rendered.returns[1];
  Marko.ᜭ.renderPreferLocal(
    // @ts-expect-error We expect the compiler to error because we are checking if the tag is defined.
    (Marko.ᜭ.error, TestTagA),
    Marko.ᜭ.renderTemplate(import("./components/TestTagA.marko"))
  )({
    /*TestTagA*/
    a: "hello",
  });
  Marko.ᜭ.renderPreferLocal(
    // @ts-expect-error We expect the compiler to error because we are checking if the tag is defined.
    (Marko.ᜭ.error, TestTagB),
    Marko.ᜭ.renderTemplate(import("./components/TestTagB.marko"))
  )({
    /*TestTagB*/
    b: "hello",
  });
  Marko.ᜭ.renderNativeTag("div")({
    /*div*/
    /*div*/
    ["renderBody"]: Marko.ᜭ.inlineBody(
      (() => {
        Marko.ᜭ.assertRendered(
          Marko.ᜭ.rendered,
          2,
          Marko.ᜭ.renderTemplate(import("../../components/const/index.marko"))({
            /*const*/
            value: CustomTagB,
          })
        );
        const { value: TestTagA } = Marko.ᜭ.rendered.returns[2];
        Marko.ᜭ.renderPreferLocal(
          // @ts-expect-error We expect the compiler to error because we are checking if the tag is defined.
          (Marko.ᜭ.error, TestTagA),
          Marko.ᜭ.renderTemplate(import("./components/TestTagA.marko"))
        )({
          /*TestTagA*/
          a: "hello",
        });
      })()
    ),
  });
  Marko.ᜭ.renderPreferLocal(
    // @ts-expect-error We expect the compiler to error because we are checking if the tag is defined.
    (Marko.ᜭ.error, TestTagA),
    Marko.ᜭ.renderTemplate(import("./components/TestTagA.marko"))
  )({
    /*TestTagA*/
    a: "hello",
  });
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
