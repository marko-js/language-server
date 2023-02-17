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
    Marko._.renderTemplate(import("../../components/const/index.marko"))()()({
      /*const*/
      value: "hi",
    })
  );
  const value = Marko._.rendered.returns[1].value;
  Marko._.renderNativeTag("div")()()({
    /*div*/
    id: `test`,
  });
  Marko._.renderNativeTag("div")()()({
    /*div*/
    id: `test-${value || ""}`,
  });
  Marko._.renderNativeTag("div")()()({
    /*div*/
    id: `${value || ""}-test`,
  });
  Marko._.renderNativeTag("div")()()({
    /*div*/
    id: `${value || ""}-test-${value || ""}`,
  });
  Marko._.renderNativeTag("div")()()({
    /*div*/
    class: `test`,
  });
  Marko._.renderNativeTag("div")()()({
    /*div*/
    class: `hello world`,
  });
  Marko._.renderNativeTag("div")()()({
    /*div*/
    class: `test-${value || ""}`,
  });
  Marko._.renderNativeTag("div")()()({
    /*div*/
    class: `${value || ""}-test`,
  });
  Marko._.renderNativeTag("div")()()({
    /*div*/
    class: `${value || ""}-test-${value || ""}`,
  });
  Marko._.renderTemplate(import("./components/test-tag.marko"))()()({
    /*test-tag*/
    id: `test`,
  });
  Marko._.renderTemplate(import("./components/test-tag.marko"))()()({
    /*test-tag*/
    id: `test-${value || ""}`,
  });
  Marko._.renderTemplate(import("./components/test-tag.marko"))()()({
    /*test-tag*/
    id: `${value || ""}-test`,
  });
  Marko._.renderTemplate(import("./components/test-tag.marko"))()()({
    /*test-tag*/
    id: `${value || ""}-test-${value || ""}`,
  });
  Marko._.renderTemplate(import("./components/test-tag.marko"))()()({
    /*test-tag*/
    class: `test`,
  });
  Marko._.renderTemplate(import("./components/test-tag.marko"))()()({
    /*test-tag*/
    class: `hello world`,
  });
  Marko._.renderTemplate(import("./components/test-tag.marko"))()()({
    /*test-tag*/
    class: `test-${value || ""}`,
  });
  Marko._.renderTemplate(import("./components/test-tag.marko"))()()({
    /*test-tag*/
    class: `${value || ""}-test`,
  });
  Marko._.renderTemplate(import("./components/test-tag.marko"))()()({
    /*test-tag*/
    class: `${value || ""}-test-${value || ""}`,
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

  _(): () => <__marko_internal_input>(
    input: Input & Marko._.Relate<__marko_internal_input, Input>
  ) => Marko._.ReturnWithScope<
    __marko_internal_input,
    ReturnType<typeof __marko_internal_template>
  >;
}> {})();
