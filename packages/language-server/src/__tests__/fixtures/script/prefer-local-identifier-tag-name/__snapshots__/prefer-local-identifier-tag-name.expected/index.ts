import CustomTagA from "./components/TestTagA.marko";
import CustomTagB from "./components/TestTagB.marko";
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
  const __marko_internal_tag_1 = Marko._.resolveTemplate(
    import("../../../components/const/index.marko"),
  );
  const __marko_internal_rendered_1 = Marko._.renderTemplate(
    __marko_internal_tag_1,
  )()()({
    value: CustomTagA,
  });
  const TestTagA = __marko_internal_rendered_1.return.value;
  const __marko_internal_tag_2 = Marko._.fallbackTemplate(
    TestTagA,
    import("./components/TestTagA.marko"),
  );
  Marko._.renderDynamicTag(__marko_internal_tag_2)()()({
    a: "hello",
  });
  const __marko_internal_tag_3 = Marko._.fallbackTemplate(
    TestTagB,
    import("./components/TestTagB.marko"),
  );
  Marko._.renderDynamicTag(__marko_internal_tag_3)()()({
    b: "hello",
  });
  Marko._.renderNativeTag("div")()()({
    ["renderBody" /*div*/]: (() => {
      const __marko_internal_tag_4 = Marko._.resolveTemplate(
        import("../../../components/const/index.marko"),
      );
      const __marko_internal_rendered_2 = Marko._.renderTemplate(
        __marko_internal_tag_4,
      )()()({
        value: CustomTagB,
      });
      const TestTagA = __marko_internal_rendered_2.return.value;
      const __marko_internal_tag_5 = Marko._.fallbackTemplate(
        TestTagA,
        import("./components/TestTagA.marko"),
      );
      Marko._.renderDynamicTag(__marko_internal_tag_5)()()({
        a: "hello",
      });
      return () => {
        return Marko._.voidReturn;
      };
    })(),
  });
  const __marko_internal_tag_6 = Marko._.fallbackTemplate(
    TestTagA,
    import("./components/TestTagA.marko"),
  );
  Marko._.renderDynamicTag(__marko_internal_tag_6)()()({
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

  mount(
    input: Marko.TemplateInput<Input>,
    reference: Node,
    position?: "afterbegin" | "afterend" | "beforebegin" | "beforeend",
  ): Marko.MountedTemplate<typeof input>;

  api: "class";
  _(): () => <__marko_internal_input extends unknown>(
    input: Marko.Directives &
      Input &
      Marko._.Relate<__marko_internal_input, Marko.Directives & Input>,
  ) => Marko._.ReturnWithScope<__marko_internal_input, void>;
}> {})();
