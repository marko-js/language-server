export interface Input {}
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const list = Marko._.hoist(() => __marko_internal_hoist__list);
  const record = Marko._.hoist(() => __marko_internal_hoist__record);
  const hoistedFromForOf = Marko._.hoist(
    () => __marko_internal_hoist__hoistedFromForOf,
  );
  const hoistedFromForIn = Marko._.hoist(
    () => __marko_internal_hoist__hoistedFromForIn,
  );
  const hoistedFromForTo = Marko._.hoist(
    () => __marko_internal_hoist__hoistedFromForTo,
  );
  const __marko_internal_tag_1 = custom;
  Marko._.attrTagNames(__marko_internal_tag_1, (input) => {
    input["@a"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_1)()()({
    ...Marko._.forAttrTag(
      {},
      () => ({
        ["a"]: {
          [Symbol.iterator]: Marko._.any,
        },
      }),
      Marko._.input(__marko_internal_tag_1),
    ),
  });
  const __marko_internal_tag_2 = Marko._.resolveTemplate(
    import("@marko/runtime-tags/tags/let.d.marko"),
  );
  {
    const list = Marko._.returned(() => __marko_internal_rendered_2);
    const __marko_internal_rendered_2 = Marko._.renderTemplate(
      __marko_internal_tag_2,
    )()()({
      value: [
        {
          value: 1,
        },
        {
          value: 2,
        },
        {
          value: 3,
        },
      ] as const,
    });
    const __marko_internal_tag_3 = custom;
    Marko._.attrTagNames(__marko_internal_tag_3, (input) => {
      input["@a"];
    });
    Marko._.renderDynamicTag(__marko_internal_tag_3)()()({
      ...Marko._.forOfAttrTag(
        {
          of: list,
        },
        () => ({
          ["a"]: {
            [Symbol.iterator]: Marko._.any,
          },
        }),
        Marko._.input(__marko_internal_tag_3),
      ),
    });
    const __marko_internal_tag_4 = custom;
    Marko._.attrTagNames(__marko_internal_tag_4, (input) => {
      input["@a"];
    });
    Marko._.renderDynamicTag(__marko_internal_tag_4)()()({
      ...Marko._.forOfAttrTag(
        {
          of: list,
        },
        (item, index, all) => ({
          ["a"]: {
            [Marko._.contentFor(__marko_internal_tag_4)]: (() => {
              item;
              index;
              all;
              return () => {
                return Marko._.voidReturn;
              };
            })(),
            [Symbol.iterator]: Marko._.any,
          },
        }),
        Marko._.input(__marko_internal_tag_4),
      ),
    });
    const __marko_internal_tag_5 = custom;
    Marko._.attrTagNames(__marko_internal_tag_5, (input) => {
      input["@a"];
      input["@b"];
    });
    Marko._.renderDynamicTag(__marko_internal_tag_5)()()(
      //      ^?      ^?       ^?
      {
        ...Marko._.forOfAttrTag(
          {
            of: list,
          },
          (item, index) => ({
            ["a"]: {
              [Marko._.contentFor(__marko_internal_tag_5)]: (() => {
                item;
                return () => {
                  return Marko._.voidReturn;
                };
              })(),
              [Symbol.iterator]: Marko._.any,
            },
            //      ^?
            ["b"]: {
              [Marko._.contentFor(__marko_internal_tag_5)]: (() => {
                index;
                return () => {
                  return Marko._.voidReturn;
                };
              })(),
              [Symbol.iterator]: Marko._.any,
            },
          }),
          Marko._.input(__marko_internal_tag_5),
        ),
      },
    );
    const __marko_internal_tag_6 = custom;
    Marko._.attrTagNames(__marko_internal_tag_6, (input) => {
      input["@a"];
    });
    const __marko_internal_rendered_6 = Marko._.renderDynamicTag(
      __marko_internal_tag_6,
    )()()(
      //      ^?
      {
        ...Marko._.forOfAttrTag(
          {
            of: list,
          },
          (item) => ({
            ["a"]: {
              [Marko._.contentFor(__marko_internal_tag_6)]: (() => {
                const __marko_internal_tag_7 = Marko._.resolveTemplate(
                  import("@marko/runtime-tags/tags/const.d.marko"),
                );
                {
                  const hoistedFromForOf = Marko._.returned(
                    () => __marko_internal_rendered_7,
                  );
                  const __marko_internal_rendered_7 = Marko._.renderTemplate(
                    __marko_internal_tag_7,
                  )()()({
                    value() {
                      return item.value;
                    },
                  });
                  return () => {
                    return new (class MarkoReturn<Return = void> {
                      readonly [Marko._.scope] = { hoistedFromForOf };
                      declare return: Return;
                      constructor(_?: Return) {}
                    })();
                  };
                }
              })(),
              [Symbol.iterator]: Marko._.any,
            },
          }),
          Marko._.input(__marko_internal_tag_6),
        ),
      },
    );
    const __marko_internal_tag_8 = Marko._.resolveTemplate(
      import("@marko/runtime-tags/tags/effect.d.marko"),
    );
    Marko._.renderTemplate(__marko_internal_tag_8)()()({
      value() {
        hoistedFromForOf;
        //^?
      },
    });
    const __marko_internal_tag_9 = Marko._.resolveTemplate(
      import("@marko/runtime-tags/tags/let.d.marko"),
    );
    {
      const record = Marko._.returned(() => __marko_internal_rendered_9);
      const __marko_internal_rendered_9 = Marko._.renderTemplate(
        __marko_internal_tag_9,
      )()()({
        value: { a: 1, b: 2 } as const,
      });
      const __marko_internal_tag_10 = custom;
      Marko._.attrTagNames(__marko_internal_tag_10, (input) => {
        input["@a"];
      });
      Marko._.renderDynamicTag(__marko_internal_tag_10)()()({
        ...Marko._.forInAttrTag(
          {
            in: record,
          },
          (key, value) => ({
            ["a"]: {
              [Marko._.contentFor(__marko_internal_tag_10)]: (() => {
                key;
                value;
                return () => {
                  return Marko._.voidReturn;
                };
              })(),
              [Symbol.iterator]: Marko._.any,
            },
          }),
          Marko._.input(__marko_internal_tag_10),
        ),
      });
      const __marko_internal_tag_11 = custom;
      Marko._.attrTagNames(__marko_internal_tag_11, (input) => {
        input["@a"];
      });
      const __marko_internal_rendered_11 = Marko._.renderDynamicTag(
        __marko_internal_tag_11,
      )()()(
        //      ^?     ^?
        {
          ...Marko._.forInAttrTag(
            {
              in: record,
            },
            (key) => ({
              ["a"]: {
                [Marko._.contentFor(__marko_internal_tag_11)]: (() => {
                  const __marko_internal_tag_12 = Marko._.resolveTemplate(
                    import("@marko/runtime-tags/tags/const.d.marko"),
                  );
                  {
                    const hoistedFromForIn = Marko._.returned(
                      () => __marko_internal_rendered_12,
                    );
                    const __marko_internal_rendered_12 = Marko._.renderTemplate(
                      __marko_internal_tag_12,
                    )()()({
                      value() {
                        return key;
                      },
                    });
                    return () => {
                      return new (class MarkoReturn<Return = void> {
                        readonly [Marko._.scope] = { hoistedFromForIn };
                        declare return: Return;
                        constructor(_?: Return) {}
                      })();
                    };
                  }
                })(),
                [Symbol.iterator]: Marko._.any,
              },
            }),
            Marko._.input(__marko_internal_tag_11),
          ),
        },
      );
      const __marko_internal_tag_13 = Marko._.resolveTemplate(
        import("@marko/runtime-tags/tags/effect.d.marko"),
      );
      Marko._.renderTemplate(__marko_internal_tag_13)()()({
        value() {
          hoistedFromForIn;
          //^?
        },
      });
      const __marko_internal_tag_14 = custom;
      Marko._.attrTagNames(__marko_internal_tag_14, (input) => {
        input["@a"];
      });
      Marko._.renderDynamicTag(__marko_internal_tag_14)()()({
        ...Marko._.forToAttrTag(
          {
            to: 10,
          },
          (index) => ({
            ["a"]: {
              [Marko._.contentFor(__marko_internal_tag_14)]: (() => {
                index;
                return () => {
                  return Marko._.voidReturn;
                };
              })(),
              [Symbol.iterator]: Marko._.any,
            },
          }),
          Marko._.input(__marko_internal_tag_14),
        ),
      });
      const __marko_internal_tag_15 = custom;
      Marko._.attrTagNames(__marko_internal_tag_15, (input) => {
        input["@a"];
      });
      Marko._.renderDynamicTag(__marko_internal_tag_15)()()(
        //      ^?
        {
          ...Marko._.forToAttrTag(
            {
              from: 1,
              to: 10,
            },
            (index) => ({
              ["a"]: {
                [Marko._.contentFor(__marko_internal_tag_15)]: (() => {
                  index;
                  return () => {
                    return Marko._.voidReturn;
                  };
                })(),
                [Symbol.iterator]: Marko._.any,
              },
            }),
            Marko._.input(__marko_internal_tag_15),
          ),
        },
      );
      const __marko_internal_tag_16 = custom;
      Marko._.attrTagNames(__marko_internal_tag_16, (input) => {
        input["@a"];
      });
      Marko._.renderDynamicTag(__marko_internal_tag_16)()()(
        //      ^?
        {
          ...Marko._.forToAttrTag(
            {
              to: 10,
              step: 2,
            },
            (index) => ({
              ["a"]: {
                [Marko._.contentFor(__marko_internal_tag_16)]: (() => {
                  index;
                  return () => {
                    return Marko._.voidReturn;
                  };
                })(),
                [Symbol.iterator]: Marko._.any,
              },
            }),
            Marko._.input(__marko_internal_tag_16),
          ),
        },
      );
      const __marko_internal_tag_17 = custom;
      Marko._.attrTagNames(__marko_internal_tag_17, (input) => {
        input["@a"];
      });
      const __marko_internal_rendered_17 = Marko._.renderDynamicTag(
        __marko_internal_tag_17,
      )()()(
        //      ^?
        {
          ...Marko._.forToAttrTag(
            {
              to: 10,
            },
            (index) => ({
              ["a"]: {
                [Marko._.contentFor(__marko_internal_tag_17)]: (() => {
                  const __marko_internal_tag_18 = Marko._.resolveTemplate(
                    import("@marko/runtime-tags/tags/const.d.marko"),
                  );
                  {
                    const hoistedFromForTo = Marko._.returned(
                      () => __marko_internal_rendered_18,
                    );
                    const __marko_internal_rendered_18 = Marko._.renderTemplate(
                      __marko_internal_tag_18,
                    )()()({
                      value() {
                        return index;
                      },
                    });
                    return () => {
                      return new (class MarkoReturn<Return = void> {
                        readonly [Marko._.scope] = { hoistedFromForTo };
                        declare return: Return;
                        constructor(_?: Return) {}
                      })();
                    };
                  }
                })(),
                [Symbol.iterator]: Marko._.any,
              },
            }),
            Marko._.input(__marko_internal_tag_17),
          ),
        },
      );
      const __marko_internal_tag_19 = Marko._.resolveTemplate(
        import("@marko/runtime-tags/tags/effect.d.marko"),
      );
      Marko._.renderTemplate(__marko_internal_tag_19)()()({
        value() {
          hoistedFromForTo;
          //^?
        },
      });
      var __marko_internal_hoist__list = list;
      var __marko_internal_hoist__record = record;
      var {
        hoistedFromForOf: __marko_internal_hoist__hoistedFromForOf,
        hoistedFromForIn: __marko_internal_hoist__hoistedFromForIn,
        hoistedFromForTo: __marko_internal_hoist__hoistedFromForTo,
      } = Marko._.readScopes({
        __marko_internal_rendered_6,
        __marko_internal_rendered_11,
        __marko_internal_rendered_17,
      });
    }
  }
  Marko._.noop({
    list,
    record,
    hoistedFromForOf,
    hoistedFromForIn,
    hoistedFromForTo,
    input,
    $global,
    $signal,
  });
  return;
})();
const __marko_internal_api = "tags";
export { __marko_internal_api as "~api" };
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

  api: typeof __marko_internal_api;
  _(): () => <__marko_internal_input extends unknown>(
    input: Marko.Directives &
      Input &
      Marko._.Relate<__marko_internal_input, Marko.Directives & Input>,
  ) => Marko._.ReturnWithScope<__marko_internal_input, void>;
}> {})();
