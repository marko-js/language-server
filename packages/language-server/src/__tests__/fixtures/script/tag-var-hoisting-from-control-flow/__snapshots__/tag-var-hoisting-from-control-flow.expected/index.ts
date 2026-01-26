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
  const __marko_internal_rendered_1 = (() => {
    if ($global.foo) {
      const __marko_internal_tag_2 = Marko._.resolveTemplate(
        import("@marko/runtime-tags/tags/const.d.marko"),
      );
      const __marko_internal_rendered_2 = Marko._.renderTemplate(
        __marko_internal_tag_2,
      )()()({
        value: ["apples", "oranges"] as const,
      });
      {
        const a = __marko_internal_rendered_2.return.value;
        const __marko_internal_tag_3 = Marko._.resolveTemplate(
          import("@marko/runtime-tags/tags/const.d.marko"),
        );
        const __marko_internal_rendered_3 = Marko._.renderTemplate(
          __marko_internal_tag_3,
        )()()(
          // ^?
          {
            value: ["slice", "dice"] as const,
          },
        );
        {
          const b = __marko_internal_rendered_3.return.value;
          const __marko_internal_rendered_4 = Marko._.forOfTag(
            {
              /*for*/ of: b,
            },
            (
              // ^?
              baz,
            ) => {
              const __marko_internal_tag_5 = Marko._.resolveTemplate(
                import("@marko/runtime-tags/tags/const.d.marko"),
              );
              const __marko_internal_rendered_5 = Marko._.renderTemplate(
                __marko_internal_tag_5,
              )()()({
                value: () => a.filter((e) => e.length),
              });
              {
                const c = __marko_internal_rendered_5.return.value;
                baz;
                return new (class MarkoReturn<Return = void> {
                  [Marko._.scope] = { c };
                  declare return: Return;
                  constructor(_?: Return) {}
                })();
              }
            },
          );
          return {
            scope: { ...Marko._.readScope(__marko_internal_rendered_4), a, b },
          };
        }
      }
    } else {
      return undefined;
    }
  })();
  const __marko_internal_rendered_6 = (() => {
    //    ^?
    if ($global.foo) {
      const __marko_internal_tag_7 = Marko._.resolveTemplate(
        import("@marko/runtime-tags/tags/const.d.marko"),
      );
      const __marko_internal_rendered_7 = Marko._.renderTemplate(
        __marko_internal_tag_7,
      )()()({
        value: { d: () => 1 } as const,
      });
      {
        const { d } = __marko_internal_rendered_7.return.value;
        return {
          scope: { d },
        };
      }
    } else {
      const __marko_internal_tag_8 = Marko._.resolveTemplate(
        import("@marko/runtime-tags/tags/const.d.marko"),
      );
      const __marko_internal_rendered_8 = Marko._.renderTemplate(
        __marko_internal_tag_8,
      )()()({
        value: { d: () => 2 } as const,
      });
      {
        const { d } = __marko_internal_rendered_8.return.value;
        return {
          scope: { d },
        };
      }
    }
  })();
  () => {
    a;
    //^?
    b;
    //^?
    c;
    //^?
    d;
    //^?
  };
  var {
    a: __marko_internal_hoist__a,
    b: __marko_internal_hoist__b,
    c: __marko_internal_hoist__c,
    d: __marko_internal_hoist__d,
  } = Marko._.readScopes({
    __marko_internal_rendered_1,
    __marko_internal_rendered_6,
  });
  Marko._.noop({ a, b, c, d, input, $global, $signal });
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
