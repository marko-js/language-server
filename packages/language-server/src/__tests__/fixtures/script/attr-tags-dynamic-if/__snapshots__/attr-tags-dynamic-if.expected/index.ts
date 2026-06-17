const x = 1;
const y = 2;
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
  const hoistedFromDynamicMember = Marko._.hoist(
    () => __marko_internal_hoist__hoistedFromDynamicMember,
  );
  const __marko_internal_tag_1 = custom;
  Marko._.attrTagNames(__marko_internal_tag_1, (input) => {
    input["@a"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_1)()()({
    x: 1,
    ...(x
      ? {
          ["a"]: {
            [Symbol.iterator]: Marko._.any,
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
          ["a"]: {
            [Symbol.iterator]: Marko._.any,
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
          ["a"]: {
            [Symbol.iterator]: Marko._.any,
          },
        }
      : {
          ["b"]: {
            [Symbol.iterator]: Marko._.any,
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
          ["a"]: {
            [Symbol.iterator]: Marko._.any,
          },
        }
      : y
        ? {
            ["b"]: {
              [Symbol.iterator]: Marko._.any,
            },
          }
        : !y
          ? {
              ["c"]: {
                [Symbol.iterator]: Marko._.any,
              },
            }
          : {
              ["d"]: {
                [Symbol.iterator]: Marko._.any,
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
          ["a"]: {
            [Symbol.iterator]: Marko._.any,
          },
        }
      : undefined
        ? {
            ["b"]: {
              [Symbol.iterator]: Marko._.any,
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
          ["a"]: {
            [Symbol.iterator]: Marko._.any,
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
          ["a"]: {
            [Symbol.iterator]: Marko._.any,
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
            ["a"]: {
              [Symbol.iterator]: Marko._.any,
            },
          }
        : {},
      y
        ? {
            ["b"]: {
              [Symbol.iterator]: Marko._.any,
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
  const __marko_internal_rendered_9 = Marko._.renderDynamicTag(
    __marko_internal_tag_9,
  )()()({
    x: 1,
    ...Marko._.mergeAttrTags(
      {
        // hi
        ["a"]: {
          b: 1,
          [Marko._.contentFor(__marko_internal_tag_9)]: (() => {
            const __marko_internal_tag_10 = Marko._.resolveTemplate(
              import("@marko/runtime-tags/tags/const.d.marko"),
            );
            {
              const hoistedFromStaticMember = Marko._.returned(
                () => __marko_internal_rendered_10,
              );
              const __marko_internal_rendered_10 = Marko._.renderTemplate(
                __marko_internal_tag_10,
              )()()({
                value: () => 1 as const,
              });
              return () => {
                return new (class MarkoReturn<Return = void> {
                  readonly [Marko._.scope] = { hoistedFromStaticMember };
                  declare return: Return;
                  constructor(_?: Return) {}
                })();
              };
            }
          })(),
          [Symbol.iterator]: Marko._.any,
        },
        ["b"]: {
          [Symbol.iterator]: Marko._.any,
        },
      },
      x
        ? {
            ["b"]: {
              [Marko._.contentFor(__marko_internal_tag_9)]: (() => {
                const __marko_internal_tag_11 = Marko._.resolveTemplate(
                  import("@marko/runtime-tags/tags/const.d.marko"),
                );
                {
                  const hoistedFromDynamicMember = Marko._.returned(
                    () => __marko_internal_rendered_11,
                  );
                  const __marko_internal_rendered_11 = Marko._.renderTemplate(
                    __marko_internal_tag_11,
                  )()()({
                    value: () => 2 as const,
                  });
                  return () => {
                    return new (class MarkoReturn<Return = void> {
                      readonly [Marko._.scope] = { hoistedFromDynamicMember };
                      declare return: Return;
                      constructor(_?: Return) {}
                    })();
                  };
                }
              })(),
              [Symbol.iterator]: Marko._.any,
            },
          }
        : {},
      y
        ? {
            ["a"]: {
              [Symbol.iterator]: Marko._.any,
            },
          }
        : {},
    ),
  });
  const __marko_internal_tag_12 = Marko._.resolveTemplate(
    import("@marko/runtime-tags/tags/effect.d.marko"),
  );
  Marko._.renderTemplate(__marko_internal_tag_12)()()({
    value() {
      hoistedFromStaticMember;
      //^?
      hoistedFromDynamicMember; // TODO: this should be better and include `undefined` as a possible value
      //^?
    },
  });
  var {
    hoistedFromStaticMember: __marko_internal_hoist__hoistedFromStaticMember,
    hoistedFromDynamicMember: __marko_internal_hoist__hoistedFromDynamicMember,
  } = Marko._.readScope(__marko_internal_rendered_9);
  Marko._.noop({
    hoistedFromStaticMember,
    hoistedFromDynamicMember,
    input,
    $global,
    $signal,
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
