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
  const __marko_internal_rendered_1 = (() => {
    if (true) {
      const __marko_internal_tag_1 = Marko._.resolveTemplate(
        import("../../../components/const/index.marko"),
      );
      const __marko_internal_rendered_3 = Marko._.renderTemplate(
        __marko_internal_tag_1,
      )()()({
        value: ["apples", "oranges"] as const,
      });
      const a = __marko_internal_rendered_3.return.value;
      const __marko_internal_tag_2 = Marko._.resolveTemplate(
        import("../../../components/const/index.marko"),
      );
      const __marko_internal_rendered_4 = Marko._.renderTemplate(
        __marko_internal_tag_2,
      )()()({
        value: ["slice", "dice"] as const,
      });
      const b = __marko_internal_rendered_4.return.value;
      const __marko_internal_rendered_2 = Marko._.forOfTag(
        {
          /*for*/ of: b,
        },
        (d) => {
          const __marko_internal_tag_3 = Marko._.resolveTemplate(
            import("../../../components/const/index.marko"),
          );
          const __marko_internal_rendered_5 = Marko._.renderTemplate(
            __marko_internal_tag_3,
          )()()({
            value: a.filter((e) => e.length),
          });
          const c = __marko_internal_rendered_5.return.value;
          d;
          return new (class MarkoReturn<Return = void> {
            [Marko._.scope] = { c };
            declare return: Return;
            constructor(_?: Return) {}
          })();
        },
      );
      return {
        scope: { ...Marko._.readScope(__marko_internal_rendered_2), a, b },
      };
    } else {
      return undefined;
    }
  })();
  //    ^?
  () => {
    a;
    //^?
    b;
    //^?
    c;
    //^?
  };
  const { a, b, c } = Marko._.readScope(__marko_internal_rendered_1);
  Marko._.noop({ a, b, c, component, state, out, input, $global, $signal });
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
