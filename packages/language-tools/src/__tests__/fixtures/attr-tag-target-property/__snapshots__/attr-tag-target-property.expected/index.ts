export interface Input {}
abstract class Component extends Marko.Component<Input> {}
export { type Component };
function __marko_internal_template(this: void) {
  const input = 1 as any as Input;
  const component = 1 as any as Component;
  const out = Marko._.out;
  const state = Marko._.state(component);
  Marko._.noop({ input, out, component, state });
  Marko._.renderTemplate(import("./components/test-tag/index.marko"))()()({
    ...{
      [Marko._.never]() {
        Marko._.attrTagNames(this, "@item");
      },
    },
    ["items" /*@item*/]: [
      {
        x: 1,
      },
    ],
  });
  Marko._.renderTemplate(import("./components/test-tag/index.marko"))()()({
    ...{
      [Marko._.never]() {
        Marko._.attrTagNames(this, "@item", "@item");
      },
    },
    ["items" /*@item*/]: [
      {
        x: 1,
        ["renderBody" /*@item*/]: (() => {
          return () => {
            return Marko._.voidReturn;
          };
        })(),
      },
      {
        ["renderBody" /*@item*/]: (() => {
          return () => {
            return Marko._.voidReturn;
          };
        })(),
      },
    ],
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

  _(): () => <__marko_internal_input extends unknown>(
    input: Input & Marko._.Relate<__marko_internal_input, Input>
  ) => Marko._.ReturnWithScope<
    __marko_internal_input,
    ReturnType<typeof __marko_internal_template>
  >;
}> {})();
