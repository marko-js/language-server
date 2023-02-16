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
    /*loader*/
    value() {
      return 1;
    },
    /*loader*/
    ["renderBody"]: (data) => {
      return Marko._.voidReturn;
    },
  });
  Marko._.renderPreferLocal(
    // @ts-expect-error We expect the compiler to error because we are checking if the tag is defined.
    (Marko._.error, loader),
    Marko._.renderTemplate(import("./components/loader.marko"))
  )()()({
    /*loader*/
    value() {
      return "hi" as const;
    },
    /*loader*/
    ["renderBody"]: (data) => {
      return Marko._.voidReturn;
    },
  });
  Marko._.renderPreferLocal(
    // @ts-expect-error We expect the compiler to error because we are checking if the tag is defined.
    (Marko._.error, loader),
    Marko._.renderTemplate(import("./components/loader.marko"))
  )()()({
    /*loader*/
    /*loader*/
    ["renderBody"]: (data) => {
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

  _<__marko_internal_apply>(): __marko_internal_apply extends 0
    ? () => <__marko_internal_input>(
        input: Marko._.Matches<Input, __marko_internal_input>
      ) => Marko._.ReturnWithScope<
        __marko_internal_input,
        ReturnType<typeof __marko_internal_template>
      >
    : () => <__marko_internal_input>(
        input: Marko._.Matches<Input, __marko_internal_input>
      ) => Marko._.ReturnWithScope<
        __marko_internal_input,
        ReturnType<typeof __marko_internal_template>
      >;
}> {})();
