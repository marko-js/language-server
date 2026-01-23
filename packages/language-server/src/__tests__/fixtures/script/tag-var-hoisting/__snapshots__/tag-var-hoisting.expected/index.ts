export interface Input {}
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const a = Marko._.hoist(() => __marko_internal_hoist__a);
  const b = Marko._.hoist(() => __marko_internal_hoist__b);
  const c = Marko._.hoist(() => __marko_internal_hoist__c);
  const d = Marko._.hoist(() => __marko_internal_hoist__d);
  const e = Marko._.hoist(() => __marko_internal_hoist__e);
  const f = Marko._.hoist(() => __marko_internal_hoist__f);
  const g = Marko._.hoist(() => __marko_internal_hoist__g);
  const h = Marko._.hoist(() => __marko_internal_hoist__h);
  const i = Marko._.hoist(() => __marko_internal_hoist__i);
  const j = Marko._.hoist(() => __marko_internal_hoist__j);
  const __marko_internal_rendered_1 = Marko._.renderNativeTag("div")()()({
    [Marko._.content /*div*/]: (() => {
      const __marko_internal_tag_1 = Marko._.resolveTemplate(
        import("@marko/runtime-tags/tags/let.d.marko"),
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
      {
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
          import("@marko/runtime-tags/tags/let.d.marko"),
        );
        const __marko_internal_rendered_3 = Marko._.renderTemplate(
          __marko_internal_tag_2,
        )()()({
          value: [1, 2, 3, 4, 5] as const,
        });
        {
          const [h, i, , ...j] = __marko_internal_rendered_3.return.value;
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
          return () => {
            return new (class MarkoReturn<Return = void> {
              [Marko._.scope] = { a, b, c, d, e, f, g, h, i, j };
              declare return: Return;
              constructor(_?: Return) {}
            })();
          };
        }
      }
    })(),
  });
  var {
    a: __marko_internal_hoist__a,
    b: __marko_internal_hoist__b,
    c: __marko_internal_hoist__c,
    d: __marko_internal_hoist__d,
    e: __marko_internal_hoist__e,
    f: __marko_internal_hoist__f,
    g: __marko_internal_hoist__g,
    h: __marko_internal_hoist__h,
    i: __marko_internal_hoist__i,
    j: __marko_internal_hoist__j,
  } = Marko._.readScope(__marko_internal_rendered_1);
  Marko._.noop({ a, b, c, d, e, f, g, h, i, j, input, $global, $signal });
  return;
})();
export default new (class Template extends Marko._.Template<{
  render(
    input: Marko.TemplateInput<Input>,
    stream?: {
      write: (chunk: string) => void;
      end: (chunk?: string) => void;
    },
  ): Marko.Out<never>;

  render(
    input: Marko.TemplateInput<Input>,
    cb?: (err: Error | null, result: Marko.RenderResult<never>) => void,
  ): Marko.Out<never>;

  renderSync(input: Marko.TemplateInput<Input>): Marko.RenderResult<never>;

  renderToString(input: Marko.TemplateInput<Input>): string;

  stream(
    input: Marko.TemplateInput<Input>,
  ): ReadableStream<string> & NodeJS.ReadableStream;

  mount(
    input: Marko.TemplateInput<Input>,
    reference: Node,
    position?: "afterbegin" | "afterend" | "beforebegin" | "beforeend",
  ): Marko.MountedTemplate<typeof input>;

  api: "tags";
  _(): () => <__marko_internal_input extends unknown>(
    input: Marko.Directives &
      Input &
      Marko._.Relate<__marko_internal_input, Marko.Directives & Input>,
  ) => Marko._.ReturnWithScope<__marko_internal_input, void>;
}> {})();
