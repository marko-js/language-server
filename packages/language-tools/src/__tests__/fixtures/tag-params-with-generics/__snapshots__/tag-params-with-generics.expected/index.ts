export interface Input {}
abstract class Component extends Marko.Component<Input> {}
export { type Component };
function __marko_internal_template(this: void) {
  const input = 1 as any as Input;
  const component = 1 as any as Component;
  const out = Marko._.out;
  const state = Marko._.state(component);
  Marko._.noop({ input, out, component, state });
  Marko._.renderPreferLocal(
    // @ts-expect-error We expect the compiler to error because we are checking if the tag is defined.
    (Marko._.error, loader),
    Marko._.renderTemplate(import("./components/loader.marko"))
  )()()({
    value() {
      return 1;
    },
    ["renderBody" /*loader*/]: (data) => {
      return Marko._.voidReturn;
    },
  });
  Marko._.renderPreferLocal(
    // @ts-expect-error We expect the compiler to error because we are checking if the tag is defined.
    (Marko._.error, loader),
    Marko._.renderTemplate(import("./components/loader.marko"))
  )()()({
    value() {
      return "hi" as const;
    },
    ["renderBody" /*loader*/]: (data) => {
      return Marko._.voidReturn;
    },
  });
  Marko._.renderPreferLocal(
    // @ts-expect-error We expect the compiler to error because we are checking if the tag is defined.
    (Marko._.error, loader),
    Marko._.renderTemplate(import("./components/loader.marko"))
  )()()({
    ["renderBody" /*loader*/]: (data) => {
      return Marko._.voidReturn;
    },
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
