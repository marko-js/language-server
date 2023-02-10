import "@marko/language-tools/script.internals";
import "../../lib-fixtures/marko.d.ts";
import CustomTagA from "./components/TestTagA.marko";
import CustomTagB from "./components/TestTagB.marko";
export interface Input {}
abstract class Component extends Marko.Component<Input> {}
export { type Component };
function __marko_internal_template(this: void) {
  const input = 1 as any as Input;
  const component = 1 as any as Component;
  const out = Marko._.out;
  const state = Marko._.state(component);
  Marko._.noop({ input, out, component, state });
  Marko._.assertRendered(
    Marko._.rendered,
    1,
    Marko._.renderTemplate(import("../../components/const/index.marko"))({
      /*const*/
      value: CustomTagA,
    })
  );
  const { value: TestTagA } = Marko._.rendered.returns[1];
  Marko._.renderPreferLocal(
    // @ts-expect-error We expect the compiler to error because we are checking if the tag is defined.
    (Marko._.error, TestTagA),
    Marko._.renderTemplate(import("./components/TestTagA.marko"))
  )({
    /*TestTagA*/
    a: "hello",
  });
  Marko._.renderPreferLocal(
    // @ts-expect-error We expect the compiler to error because we are checking if the tag is defined.
    (Marko._.error, TestTagB),
    Marko._.renderTemplate(import("./components/TestTagB.marko"))
  )({
    /*TestTagB*/
    b: "hello",
  });
  Marko._.renderNativeTag("div")({
    /*div*/
    /*div*/
    ["renderBody"]: Marko._.inlineBody(
      (() => {
        Marko._.assertRendered(
          Marko._.rendered,
          2,
          Marko._.renderTemplate(import("../../components/const/index.marko"))({
            /*const*/
            value: CustomTagB,
          })
        );
        const { value: TestTagA } = Marko._.rendered.returns[2];
        Marko._.renderPreferLocal(
          // @ts-expect-error We expect the compiler to error because we are checking if the tag is defined.
          (Marko._.error, TestTagA),
          Marko._.renderTemplate(import("./components/TestTagA.marko"))
        )({
          /*TestTagA*/
          a: "hello",
        });
      })()
    ),
  });
  Marko._.renderPreferLocal(
    // @ts-expect-error We expect the compiler to error because we are checking if the tag is defined.
    (Marko._.error, TestTagA),
    Marko._.renderTemplate(import("./components/TestTagA.marko"))
  )({
    /*TestTagA*/
    a: "hello",
  });
  return;
}
export default new (class Template extends Marko._.Template<{
  render(
    input: Marko.TemplateInput<Input>,
    stream?: {
      write: (chunk: string) => void;
      end: (chunk?: string) => void;
    }
  ): Marko.Out<Component>;

  renderSync(input: Marko.TemplateInput<Input>): Marko.RenderResult<Component>;

  renderToString(input: Marko.TemplateInput<Input>): string;

  stream(
    input: Marko.TemplateInput<Input>
  ): ReadableStream<string> & NodeJS.ReadableStream;

  _<__marko_internal_input = unknown>(
    input: Marko._.Relate<Input, __marko_internal_input>
  ): Marko._.ReturnWithScope<
    __marko_internal_input,
    ReturnType<typeof __marko_internal_template>
  >;
}> {})();
