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
  const __marko_internal_rendered_1 = Marko._.renderNativeTag("div")()()({
    ["renderBody" /*div*/]: (() => {
      const __marko_internal_tag_1 = Marko._.resolveTemplate(
        import("../../../components/let/index.marko"),
      );
      const __marko_internal_rendered_2 = Marko._.renderTemplate(
        __marko_internal_tag_1,
      )()()({
        value: {
          a: 1,
          b: "hello!",
          c: undefined,
          nested: {
            d: 2,
            dChange(v: number) {},
          },
          "some-alias": 3,
          computed: 4,
          other: true,
        } as const,
      });
      const {
        a,
        b,
        c = "default" as const,
        nested: { d },
        "some-alias": e,
        ["computed"]: f,
        ...g
      } = __marko_internal_rendered_2.return.value;
      const __marko_internal_tag_2 = Marko._.resolveTemplate(
        import("../../../components/let/index.marko"),
      );
      const __marko_internal_rendered_3 = Marko._.renderTemplate(
        __marko_internal_tag_2,
      )()()({
        value: [1, 2, 3, 4, 5] as const,
      });
      const [h, i, , ...j] = __marko_internal_rendered_3.return.value;
      return () => {
        return new (class MarkoReturn<Return = void> {
          [Marko._.scope] = { a, b, c, d, e, f, g, h, i, j };
          declare return: Return;
          constructor(_?: Return) {}
        })();
      };
    })(),
  });
  () => {
    a;
    //^?
    b;
    //^?
    c;
    //^?
    d;
    //^?
    e;
    //^?
    f;
    //^?
    g;
    //^?
    h;
    //^?
    i;
    //^?
    j;
    //^?
  };
  const { a, b, c, d, e, f, g, h, i, j } = Marko._.readScopes({
    __marko_internal_rendered_1,
  });
  Marko._.noop({ a, b, c, d, e, f, g, h, i, j });
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
