export interface Input {}
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const b = Marko._.hoist(() => __marko_internal_hoist__b);
  const a = Marko._.hoist(() => __marko_internal_hoist__a);
  const c = Marko._.hoist(() => __marko_internal_hoist__c);
  const __marko_internal_tag_1 = Marko._.resolveTemplate(
    import("./components/comments.marko"),
  );
  Marko._.attrTagNames(__marko_internal_tag_1, (input) => {
    input["@comment"];
    input["@comment"];
    Marko._.nestedAttrTagNames(input["@comment"], (input) => {
      input["@comment"];
    });
  });
  const __marko_internal_rendered_1 = Marko._.renderTemplate(
    __marko_internal_tag_1 /*comments*/,
  )()()({
    ["comment" /*@comment*/]: Marko._.attrTagFor(
      __marko_internal_tag_1,
      "comment",
    )(
      "comment",
      {
        ["comment" /*@comment*/]: {
          id: Marko._.interpolated`a`,
          ["comment" /*@comment*/]: {
            id: Marko._.interpolated`b`,
            [Marko._.contentFor(__marko_internal_tag_1) /*@comment*/]: (() => {
              const __marko_internal_tag_2 = Marko._.resolveTemplate(
                import("@marko/runtime-tags/tags/let.d.marko"),
              );
              {
                const b = Marko._.returned(() => __marko_internal_rendered_2);
                const __marko_internal_rendered_2 = Marko._.renderTemplate(
                  __marko_internal_tag_2 /*let*/,
                )()()(
                  //    ^?
                  {
                    value: () => "b" as const,
                  },
                );
                return () => {
                  return new (class MarkoReturn<Return = void> {
                    [Marko._.scope] = { b };
                    declare return: Return;
                    constructor(_?: Return) {}
                  })();
                };
              }
            })(),
            [/*@comment*/ Symbol.iterator]: Marko._.any,
          },
          [Marko._.contentFor(__marko_internal_tag_1) /*@comment*/]: (() => {
            const __marko_internal_tag_3 = Marko._.resolveTemplate(
              import("@marko/runtime-tags/tags/let.d.marko"),
            );
            {
              const a = Marko._.returned(() => __marko_internal_rendered_3);
              const __marko_internal_rendered_3 = Marko._.renderTemplate(
                __marko_internal_tag_3 /*let*/,
              )()()({
                value: () => "a" as const,
              });
              return () => {
                return new (class MarkoReturn<Return = void> {
                  [Marko._.scope] = { a };
                  declare return: Return;
                  constructor(_?: Return) {}
                })();
              };
            }
          })(),
          [/*@comment*/ Symbol.iterator]: Marko._.any,
        },
      },
      {
        ["comment" /*@comment*/]: {
          id: Marko._.interpolated`c`,
          [Marko._.contentFor(__marko_internal_tag_1) /*@comment*/]: (() => {
            const __marko_internal_tag_4 = Marko._.resolveTemplate(
              import("@marko/runtime-tags/tags/let.d.marko"),
            );
            {
              const c = Marko._.returned(() => __marko_internal_rendered_4);
              const __marko_internal_rendered_4 = Marko._.renderTemplate(
                __marko_internal_tag_4 /*let*/,
              )()()({
                value: () => "c" as const,
              });
              return () => {
                return new (class MarkoReturn<Return = void> {
                  [Marko._.scope] = { c };
                  declare return: Return;
                  constructor(_?: Return) {}
                })();
              };
            }
          })(),
          [/*@comment*/ Symbol.iterator]: Marko._.any,
        },
      },
    ),
  });
  const __marko_internal_tag_5 = Marko._.resolveTemplate(
    import("@marko/runtime-tags/tags/effect.d.marko"),
  );
  Marko._.renderTemplate(__marko_internal_tag_5 /*effect*/)()()({
    value() {
      a;
      //^?
      b;
      //^?
      c;
      //^?
    },
  });
  var {
    b: __marko_internal_hoist__b,
    a: __marko_internal_hoist__a,
    c: __marko_internal_hoist__c,
  } = Marko._.readScope(__marko_internal_rendered_1);
  Marko._.noop({ b, a, c, input, $global, $signal });
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
