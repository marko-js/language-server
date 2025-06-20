const x = 1;
const y = 2;
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
  const __marko_internal_tag_1 = custom;
  Marko._.attrTagNames(__marko_internal_tag_1, (input) => {
    input["@a"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_1)()()({
    x: 1,
    ...(x
      ? {
          ["a" /*@a*/]: {
            [/*@a*/ Symbol.iterator]: Marko._.any,
            /*@a*/
          },
        }
      : {}),
  });
  const __marko_internal_tag_2 = custom;
  Marko._.attrTagNames(__marko_internal_tag_2, (input) => {
    input["@a"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_2)()()({
    x: 1,
    ...(x
      ? {}
      : {
          ["a" /*@a*/]: {
            [/*@a*/ Symbol.iterator]: Marko._.any,
            /*@a*/
          },
        }),
  });
  const __marko_internal_tag_3 = custom;
  Marko._.attrTagNames(__marko_internal_tag_3, (input) => {
    input["@a"];
    input["@b"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_3)()()({
    x: 1,
    ...(x
      ? {
          ["a" /*@a*/]: {
            [/*@a*/ Symbol.iterator]: Marko._.any,
            /*@a*/
          },
        }
      : {
          ["b" /*@b*/]: {
            [/*@b*/ Symbol.iterator]: Marko._.any,
            /*@b*/
          },
        }),
  });
  const __marko_internal_tag_4 = custom;
  Marko._.attrTagNames(__marko_internal_tag_4, (input) => {
    input["@a"];
    input["@b"];
    input["@c"];
    input["@d"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_4)()()({
    x: 1,
    ...(x
      ? {
          ["a" /*@a*/]: {
            [/*@a*/ Symbol.iterator]: Marko._.any,
            /*@a*/
          },
        }
      : y
        ? {
            ["b" /*@b*/]: {
              [/*@b*/ Symbol.iterator]: Marko._.any,
              /*@b*/
            },
          }
        : !y
          ? {
              ["c" /*@c*/]: {
                [/*@c*/ Symbol.iterator]: Marko._.any,
                /*@c*/
              },
            }
          : {
              ["d" /*@d*/]: {
                [/*@d*/ Symbol.iterator]: Marko._.any,
                /*@d*/
              },
            }),
  });
  const __marko_internal_tag_5 = custom;
  Marko._.attrTagNames(__marko_internal_tag_5, (input) => {
    input["@a"];
    input["@b"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_5)()()({
    x: 1,
    ...(x
      ? {
          ["a" /*@a*/]: {
            [/*@a*/ Symbol.iterator]: Marko._.any,
            /*@a*/
          },
        }
      : undefined
        ? {
            ["b" /*@b*/]: {
              [/*@b*/ Symbol.iterator]: Marko._.any,
              /*@b*/
            },
          }
        : {}),
  });
  const __marko_internal_tag_6 = custom;
  Marko._.attrTagNames(__marko_internal_tag_6, (input) => {
    input["@a"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_6)()()({
    x: 1,
    ...(x
      ? {
          ["a" /*@a*/]: {
            [/*@a*/ Symbol.iterator]: Marko._.any,
            /*@a*/
          },
        }
      : {}),
  });
  const __marko_internal_tag_7 = custom;
  Marko._.attrTagNames(__marko_internal_tag_7, (input) => {
    input["@a"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_7)()()({
    x: 1,
    ...(undefined
      ? {
          ["a" /*@a*/]: {
            [/*@a*/ Symbol.iterator]: Marko._.any,
            /*@a*/
          },
        }
      : {}),
  });
  const __marko_internal_tag_8 = custom;
  Marko._.attrTagNames(__marko_internal_tag_8, (input) => {
    input["@a"];
    input["@b"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_8)()()({
    x: 1,
    ...Marko._.mergeAttrTags(
      x
        ? {
            ["a" /*@a*/]: {
              [/*@a*/ Symbol.iterator]: Marko._.any,
              /*@a*/
            },
          }
        : {},
      y
        ? {
            ["b" /*@b*/]: {
              [/*@b*/ Symbol.iterator]: Marko._.any,
              /*@b*/
            },
          }
        : {},
    ),
  });
  const __marko_internal_tag_9 = custom;
  Marko._.attrTagNames(__marko_internal_tag_9, (input) => {
    input["@a"];
    input["@a"];
    input["@b"];
    input["@b"];
  });
  const __marko_internal_rendered_1 = Marko._.renderDynamicTag(
    __marko_internal_tag_9,
  )()()({
    x: 1,
    ...Marko._.mergeAttrTags(
      {
        // hi
        ["a" /*@a*/]: {
          b: 1,
          ["renderBody" /*@a*/]: (() => {
            const __marko_internal_tag_10 = Marko._.resolveTemplate(
              import("../../../components/const/index.marko"),
            );
            const __marko_internal_rendered_2 = Marko._.renderTemplate(
              __marko_internal_tag_10,
            )()()({
              value: 1 as const,
            });
            const hoistedFromStaticMember =
              __marko_internal_rendered_2.return.value;
            return () => {
              return new (class MarkoReturn<Return = void> {
                [Marko._.scope] = { hoistedFromStaticMember };
                declare return: Return;
                constructor(_?: Return) {}
              })();
            };
          })(),
          [/*@a*/ Symbol.iterator]: Marko._.any,
        },
        ["b" /*@b*/]: {
          [/*@b*/ Symbol.iterator]: Marko._.any,
          /*@b*/
        },
      },
      x
        ? {
            ["b" /*@b*/]: {
              ["renderBody" /*@b*/]: (() => {
                const __marko_internal_tag_11 = Marko._.resolveTemplate(
                  import("../../../components/const/index.marko"),
                );
                const __marko_internal_rendered_3 = Marko._.renderTemplate(
                  __marko_internal_tag_11,
                )()()({
                  value: 2 as const,
                });
                const hoistedFromDynamicMember =
                  __marko_internal_rendered_3.return.value;
                return () => {
                  return new (class MarkoReturn<Return = void> {
                    [Marko._.scope] = { hoistedFromDynamicMember };
                    declare return: Return;
                    constructor(_?: Return) {}
                  })();
                };
              })(),
              [/*@b*/ Symbol.iterator]: Marko._.any,
            },
          }
        : {},
      y
        ? {
            ["a" /*@a*/]: {
              [/*@a*/ Symbol.iterator]: Marko._.any,
              /*@a*/
            },
          }
        : {},
    ),
  });
  const __marko_internal_tag_12 = Marko._.interpolated`effect`;
  Marko._.renderDynamicTag(__marko_internal_tag_12)()()({
    value() {
      hoistedFromStaticMember;
      //^?
      hoistedFromDynamicMember; // TODO: this should be better and include `undefined` as a possible value
      //^?
    },
  });
  const { hoistedFromStaticMember, hoistedFromDynamicMember } =
    Marko._.readScopes({ __marko_internal_rendered_1 });
  Marko._.noop({ hoistedFromStaticMember, hoistedFromDynamicMember });
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
