export interface Input {}
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const hoistedFromStaticMember = Marko._.hoist(
    () => __marko_internal_hoist__hoistedFromStaticMember,
  );
  const __marko_internal_tag_1 = custom;
  Marko._.attrTagNames(__marko_internal_tag_1, (input) => {
    input["@b"];
    input["@b"];
    input["@a"];
  });
  const __marko_internal_rendered_1 = Marko._.renderDynamicTag(
    __marko_internal_tag_1,
  )()()({
    ["b" /*@b*/]: Marko._.attrTagFor(
      __marko_internal_tag_1,
      "b",
    )([
      {
        [/*@b*/ Symbol.iterator]: Marko._.any,
        /*@b*/
      },
      {
        c: 2,
        [/*@b*/ Symbol.iterator]: Marko._.any,
      },
    ]),
    ["a" /*@a*/]: {
      b: 1,
      [Marko._.contentFor(__marko_internal_tag_1) /*@a*/]: (() => {
        const __marko_internal_tag_2 = Marko._.resolveTemplate(
          import("@marko/runtime-tags/tags/const.d.marko"),
        );
        const __marko_internal_rendered_2 = Marko._.renderTemplate(
          __marko_internal_tag_2,
        )()()({
          value: () => 1 as const,
        });
        {
          const hoistedFromStaticMember =
            __marko_internal_rendered_2.return.value;
          return () => {
            return new (class MarkoReturn<Return = void> {
              [Marko._.scope] = { hoistedFromStaticMember };
              declare return: Return;
              constructor(_?: Return) {}
            })();
          };
        }
      })(),
      [/*@a*/ Symbol.iterator]: Marko._.any,
    },
  });
  const __marko_internal_tag_3 = Marko._.resolveTemplate(
    import("@marko/runtime-tags/tags/effect.d.marko"),
  );
  Marko._.renderTemplate(__marko_internal_tag_3)()()({
    value() {
      hoistedFromStaticMember;
      //^?
    },
  });
  var {
    hoistedFromStaticMember: __marko_internal_hoist__hoistedFromStaticMember,
  } = Marko._.readScope(__marko_internal_rendered_1);
  Marko._.noop({ hoistedFromStaticMember, input, $global, $signal });
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
