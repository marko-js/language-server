import CustomTagA from "./components/TestTagA.marko";
import CustomTagB from "./components/TestTagB.marko";
export interface Input {}
abstract class Component extends Marko.Component<Input> {}
export { type Component };
(function (this: void) {
  const input = Marko._.any as Input;
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context)
  );
  const out = Marko._.out;
  Marko._.noop({ input, component, state, out, $global });
  Marko._.assertRendered(
    Marko._.rendered,
    1,
    Marko._.renderTemplate(import("../../components/const/index.marko"))()()({
      value: CustomTagA,
    })
  );
  const TestTagA = Marko._.rendered.returns[1].value;
  Marko._.renderPreferLocal(
    // @ts-expect-error We expect the compiler to error because we are checking if the tag is defined.
    (Marko._.error, TestTagA),
    Marko._.renderTemplate(import("./components/TestTagA.marko"))
  )()()({
    a: "hello",
  });
  Marko._.renderPreferLocal(
    // @ts-expect-error We expect the compiler to error because we are checking if the tag is defined.
    (Marko._.error, TestTagB),
    Marko._.renderTemplate(import("./components/TestTagB.marko"))
  )()()({
    b: "hello",
  });
  Marko._.renderNativeTag("div")()()({
    ["renderBody" /*div*/]: (() => {
      Marko._.assertRendered(
        Marko._.rendered,
        2,
        Marko._.renderTemplate(
          import("../../components/const/index.marko")
        )()()({
          value: CustomTagB,
        })
      );
      const TestTagA = Marko._.rendered.returns[2].value;
      Marko._.renderPreferLocal(
        // @ts-expect-error We expect the compiler to error because we are checking if the tag is defined.
        (Marko._.error, TestTagA),
        Marko._.renderTemplate(import("./components/TestTagA.marko"))
      )()()({
        a: "hello",
      });
      return () => {
        return Marko._.voidReturn;
      };
    })(),
  });
  Marko._.renderPreferLocal(
    // @ts-expect-error We expect the compiler to error because we are checking if the tag is defined.
    (Marko._.error, TestTagA),
    Marko._.renderTemplate(import("./components/TestTagA.marko"))
  )()()({
    a: "hello",
  });
  return;
})();
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

  _(): () => <__marko_internal_input extends unknown>(
    input: Input & Marko._.Relate<__marko_internal_input, Input>
  ) => Marko._.ReturnWithScope<__marko_internal_input, void>;
}> {})();
