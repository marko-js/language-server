export interface Input {}
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const someCondition = Marko._.hoist(
    () => __marko_internal_hoist__someCondition,
  );
  const __marko_internal_tag_1 = Marko._.resolveTemplate(
    import("@marko/runtime-tags/tags/let.d.marko"),
  );
  const __marko_internal_rendered_1 = Marko._.renderTemplate(
    __marko_internal_tag_1,
  )()()({
    value: false,
  });
  {
    const someCondition = __marko_internal_rendered_1.return.value;
    const __marko_internal_tag_2 = custom;
    Marko._.attrTagNames(__marko_internal_tag_2, (input) => {
      input["@header"];
      input["@footer"];
    });
    Marko._.renderDynamicTag(__marko_internal_tag_2)()()({
      ...Marko._.mergeAttrTags(
        {
          ["header" /*@header*/]: {
            [Marko._.contentFor(__marko_internal_tag_2) /*@header*/]: (() => {
              return () => {
                return Marko._.voidReturn;
              };
            })(),
            [/*@header*/ Symbol.iterator]: Marko._.any,
          },
        },
        someCondition
          ? {
              //^?
              ["footer" /*@footer*/]: {
                [Marko._.contentFor(__marko_internal_tag_2) /*@footer*/]:
                  (() => {
                    return () => {
                      return Marko._.voidReturn;
                    };
                  })(),
                [/*@footer*/ Symbol.iterator]: Marko._.any,
              },
            }
          : {},
      ),
      [Marko._.contentFor(__marko_internal_tag_2) /*custom*/]: (() => {
        Marko._.forOfTag(
          {
            /*for*/ of: [1],
          },
          (x) => {
            x;
            return Marko._.voidReturn;
          },
        );
        return () => {
          return Marko._.voidReturn;
        };
      })(),
    });
    var __marko_internal_hoist__someCondition = someCondition;
  }
  Marko._.noop({ someCondition, input, $global, $signal });
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
//               ^?
