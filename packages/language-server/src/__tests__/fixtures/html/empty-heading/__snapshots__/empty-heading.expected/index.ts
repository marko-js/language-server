export interface Input {}
abstract class Component extends Marko.Component<Input> {}
export { type Component };
(function (this: void) {
  const input = Marko._.any as Input;
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  Marko._.noop({ component, state, out, input, $global, $signal });
  Marko._.renderNativeTag("h1")()()({
    ["renderBody" /*h1*/]: (() => {
      return () => {
        return Marko._.voidReturn;
      };
    })(),
    /*h1*/
  });
  Marko._.renderNativeTag("h2")()()({
    ["renderBody" /*h2*/]: (() => {
      return () => {
        return Marko._.voidReturn;
      };
    })(),
    /*h2*/
  });
  Marko._.renderNativeTag("h3")()()({
    ["renderBody" /*h3*/]: (() => {
      return () => {
        return Marko._.voidReturn;
      };
    })(),
    /*h3*/
  });
  Marko._.renderNativeTag("h4")()()({
    ["renderBody" /*h4*/]: (() => {
      return () => {
        return Marko._.voidReturn;
      };
    })(),
    /*h4*/
  });
  Marko._.renderNativeTag("h5")()()({
    ["renderBody" /*h5*/]: (() => {
      return () => {
        return Marko._.voidReturn;
      };
    })(),
    /*h5*/
  });
  Marko._.renderNativeTag("h6")()()({
    ["renderBody" /*h6*/]: (() => {
      return () => {
        return Marko._.voidReturn;
      };
    })(),
    /*h6*/
  });
  return;
})();
export default new (class Template extends Marko._.Template<{
  render(
    input: Marko.TemplateInput<Input>,
    stream?: {
      write: (chunk: string) => void;
      end: (chunk?: string) => void;
    },
  ): Marko.Out<Component>;

  render(
    input: Marko.TemplateInput<Input>,
    cb?: (err: Error | null, result: Marko.RenderResult<Component>) => void,
  ): Marko.Out<Component>;

  renderSync(input: Marko.TemplateInput<Input>): Marko.RenderResult<Component>;

  renderToString(input: Marko.TemplateInput<Input>): string;

  stream(
    input: Marko.TemplateInput<Input>,
  ): ReadableStream<string> & NodeJS.ReadableStream;

  api: "class";
  _(): () => <__marko_internal_input extends unknown>(
    input: Marko.Directives &
      Input &
      Marko._.Relate<__marko_internal_input, Marko.Directives & Input>,
  ) => Marko._.ReturnWithScope<__marko_internal_input, void>;
}> {})();
