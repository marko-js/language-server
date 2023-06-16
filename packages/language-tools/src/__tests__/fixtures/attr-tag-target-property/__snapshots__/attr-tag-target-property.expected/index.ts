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
  Marko._.renderTemplate(import("./components/test-tag/index.marko"))()()({
    ...{
      [Marko._.never]() {
        const attrTags = Marko._.attrTagNames(this);
        attrTags["@item"];
      },
    },
    ["items" /*@item*/]: [
      {
        x: 1,
        [Symbol.iterator]: Marko._.any,
      },
    ],
  });
  Marko._.renderTemplate(import("./components/test-tag/index.marko"))()()({
    ...{
      [Marko._.never]() {
        const attrTags = Marko._.attrTagNames(this);
        attrTags["@item"];
        attrTags["@item"];
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
        [Symbol.iterator]: Marko._.any,
      },
      {
        ["renderBody" /*@item*/]: (() => {
          return () => {
            return Marko._.voidReturn;
          };
        })(),
        [Symbol.iterator]: Marko._.any,
      },
    ],
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

  render(
    input: Marko.TemplateInput<Input>,
    cb?: (err: Error | null, result: Marko.RenderResult<Component>) => void
  ): Marko.Out<Component>;

  renderSync(input: Marko.TemplateInput<Input>): Marko.RenderResult<Component>;

  renderToString(input: Marko.TemplateInput<Input>): string;

  stream(
    input: Marko.TemplateInput<Input>
  ): ReadableStream<string> & NodeJS.ReadableStream;

  _(): () => <__marko_internal_input extends unknown>(
    input: Marko.Directives &
      Input &
      Marko._.Relate<__marko_internal_input, Marko.Directives & Input>
  ) => Marko._.ReturnWithScope<__marko_internal_input, void>;
}> {})();
