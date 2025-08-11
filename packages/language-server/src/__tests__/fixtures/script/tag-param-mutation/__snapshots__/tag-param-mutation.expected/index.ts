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
  const __marko_internal_tag_1 = Marko._.resolveTemplate(
    import("../../../components/let/index.marko"),
  );
  const __marko_internal_rendered_1 = Marko._.renderTemplate(
    __marko_internal_tag_1,
  )()()({
    value: "bar",
  });
  const string = __marko_internal_rendered_1.return.value;
  const __marko_internal_tag_2 = Marko._.resolveTemplate(
    import("./components/test-tag.marko"),
  );
  Marko._.renderTemplate(__marko_internal_tag_2)()()({
    //  ^?
    ["renderBody" /*test-tag*/]: (val) => {
      Marko._.renderNativeTag("button")()()({
        onClick() {
          __marko_internal_return.mutate.string = val;
        },
        ["renderBody" /*button*/]: (() => {
          //   ^?      ^?
          val;
          return () => {
            return Marko._.voidReturn;
          };
        })(),
      });
      const __marko_internal_return = {
        mutate: Marko._.mutable([
          ["string", "value", __marko_internal_rendered_1.return],
        ] as const),
      };
      Marko._.noop({
        string,
      });
      return Marko._.voidReturn;
    },
  });
  const __marko_internal_rendered_2 = Marko._.forOfTag(
    {
      /*for*/ of: [],
    },
    (_unused) => {
      const __marko_internal_tag_3 = Marko._.resolveTemplate(
        import("../../../components/let/index.marko"),
      );
      const __marko_internal_rendered_3 = Marko._.renderTemplate(
        __marko_internal_tag_3,
      )()()({
        value: "",
      });
      const inputId = __marko_internal_rendered_3.return.value;
      Marko._.renderNativeTag("input")()()({
        id: inputId,
      });
      return new (class MarkoReturn<Return = void> {
        [Marko._.scope] = { inputId };
        declare return: Return;
        constructor(_?: Return) {}
      })();
    },
  );
  Marko._.renderNativeTag("button")()()({
    onClick() {
      inputId;
      // ^?
    },
    ["renderBody" /*button*/]: (() => {
      return () => {
        return Marko._.voidReturn;
      };
    })(),
  });
  const { inputId } = __marko_internal_rendered_2.scope;
  Marko._.noop({ inputId, component, state, out, input, $global, $signal });
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
