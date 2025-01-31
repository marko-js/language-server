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
  Marko._.renderNativeTag("div")()()({
    "aria-hidden": "true",
    ["renderBody" /*div*/]: (() => {
      Marko._.renderNativeTag("a")()()({
        href: "/",
        style: "position:absolute; top:-999em",
        ["renderBody" /*a*/]: (() => {
          return () => {
            return Marko._.voidReturn;
          };
        })(),
      });
      return () => {
        return Marko._.voidReturn;
      };
    })(),
  });
  Marko._.renderNativeTag("div")()()({
    "aria-hidden": "true",
    ["renderBody" /*div*/]: (() => {
      Marko._.renderNativeTag("input")()()({
        "aria-disabled": "true",
      });
      return () => {
        return Marko._.voidReturn;
      };
    })(),
  });
  Marko._.renderNativeTag("div")()()({
    "aria-hidden": "true",
    ["renderBody" /*div*/]: (() => {
      Marko._.renderNativeTag("div")()()({
        "aria-hidden": "false",
        ["renderBody" /*div*/]: (() => {
          Marko._.renderNativeTag("button")()()({
            ["renderBody" /*button*/]: (() => {
              return () => {
                return Marko._.voidReturn;
              };
            })(),
          });
          return () => {
            return Marko._.voidReturn;
          };
        })(),
      });
      return () => {
        return Marko._.voidReturn;
      };
    })(),
  });
  Marko._.renderNativeTag("p")()()({
    tabindex: "0",
    "aria-hidden": "true",
    ["renderBody" /*p*/]: (() => {
      return () => {
        return Marko._.voidReturn;
      };
    })(),
  });
  Marko._.renderNativeTag("details")()()({
    "aria-hidden": "true",
    ["renderBody" /*details*/]: (() => {
      Marko._.renderNativeTag("summary")()()({
        ["renderBody" /*summary*/]: (() => {
          return () => {
            return Marko._.voidReturn;
          };
        })(),
      });
      Marko._.renderNativeTag("p")()()({
        ["renderBody" /*p*/]: (() => {
          return () => {
            return Marko._.voidReturn;
          };
        })(),
      });
      return () => {
        return Marko._.voidReturn;
      };
    })(),
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
