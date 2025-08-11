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
  const __marko_internal_tag_1 = custom;
  Marko._.attrTagNames(__marko_internal_tag_1, (input) => {
    input["@a"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_1)()()({
    ...Marko._.forAttrTag(
      {
        /*for*/
      },
      () => ({
        ["a" /*@a*/]: {
          [/*@a*/ Symbol.iterator]: Marko._.any,
          /*@a*/
        },
      }),
    ),
  });
  const __marko_internal_tag_2 = Marko._.resolveTemplate(
    import("../../../components/let/index.marko"),
  );
  const __marko_internal_rendered_1 = Marko._.renderTemplate(
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
  const list = __marko_internal_rendered_1.return.value;
  const __marko_internal_tag_3 = custom;
  Marko._.attrTagNames(__marko_internal_tag_3, (input) => {
    input["@a"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_3)()()({
    ...Marko._.forOfAttrTag(
      {
        /*for*/ of: list,
      },
      () => ({
        ["a" /*@a*/]: {
          [/*@a*/ Symbol.iterator]: Marko._.any,
          /*@a*/
        },
      }),
    ),
  });
  const __marko_internal_tag_4 = custom;
  Marko._.attrTagNames(__marko_internal_tag_4, (input) => {
    input["@a"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_4)()()({
    ...Marko._.forOfAttrTag(
      {
        /*for*/ of: list,
      },
      (item, index, all) => ({
        ["a" /*@a*/]: {
          ["renderBody" /*@a*/]: (() => {
            item;
            index;
            all;
            return () => {
              return Marko._.voidReturn;
            };
          })(),
          [/*@a*/ Symbol.iterator]: Marko._.any,
        },
      }),
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
          /*for*/ of: list,
        },
        (item, index) => ({
          ["a" /*@a*/]: {
            ["renderBody" /*@a*/]: (() => {
              item;
              return () => {
                return Marko._.voidReturn;
              };
            })(),
            [/*@a*/ Symbol.iterator]: Marko._.any,
          },
          //      ^?
          ["b" /*@b*/]: {
            ["renderBody" /*@b*/]: (() => {
              index;
              return () => {
                return Marko._.voidReturn;
              };
            })(),
            [/*@b*/ Symbol.iterator]: Marko._.any,
          },
        }),
      ),
    },
  );
  const __marko_internal_tag_6 = custom;
  Marko._.attrTagNames(__marko_internal_tag_6, (input) => {
    input["@a"];
  });
  const __marko_internal_rendered_2 = Marko._.renderDynamicTag(
    __marko_internal_tag_6,
  )()()(
    //      ^?
    {
      ...Marko._.forOfAttrTag(
        {
          /*for*/ of: list,
        },
        (item) => ({
          ["a" /*@a*/]: {
            ["renderBody" /*@a*/]: (() => {
              const __marko_internal_tag_7 = Marko._.resolveTemplate(
                import("../../../components/const/index.marko"),
              );
              const __marko_internal_rendered_3 = Marko._.renderTemplate(
                __marko_internal_tag_7,
              )()()({
                value: item,
              });
              const { value: hoistedFromForOf } =
                __marko_internal_rendered_3.return.value;
              return () => {
                return new (class MarkoReturn<Return = void> {
                  [Marko._.scope] = { hoistedFromForOf };
                  declare return: Return;
                  constructor(_?: Return) {}
                })();
              };
            })(),
            [/*@a*/ Symbol.iterator]: Marko._.any,
          },
        }),
      ),
    },
  );
  const __marko_internal_tag_8 = Marko._.interpolated`effect`;
  Marko._.renderDynamicTag(__marko_internal_tag_8)()()({
    value() {
      hoistedFromForOf;
      //^?
    },
  });
  const __marko_internal_tag_9 = Marko._.resolveTemplate(
    import("../../../components/let/index.marko"),
  );
  const __marko_internal_rendered_4 = Marko._.renderTemplate(
    __marko_internal_tag_9,
  )()()({
    value: { a: 1, b: 2 } as const,
  });
  const record = __marko_internal_rendered_4.return.value;
  const __marko_internal_tag_10 = custom;
  Marko._.attrTagNames(__marko_internal_tag_10, (input) => {
    input["@a"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_10)()()({
    ...Marko._.forInAttrTag(
      {
        /*for*/ in: record,
      },
      (key, value) => ({
        ["a" /*@a*/]: {
          ["renderBody" /*@a*/]: (() => {
            key;
            value;
            return () => {
              return Marko._.voidReturn;
            };
          })(),
          [/*@a*/ Symbol.iterator]: Marko._.any,
        },
      }),
    ),
  });
  const __marko_internal_tag_11 = custom;
  Marko._.attrTagNames(__marko_internal_tag_11, (input) => {
    input["@a"];
  });
  const __marko_internal_rendered_5 = Marko._.renderDynamicTag(
    __marko_internal_tag_11,
  )()()(
    //      ^?     ^?
    {
      ...Marko._.forInAttrTag(
        {
          /*for*/ in: record,
        },
        (key) => ({
          ["a" /*@a*/]: {
            ["renderBody" /*@a*/]: (() => {
              const __marko_internal_tag_12 = Marko._.resolveTemplate(
                import("../../../components/const/index.marko"),
              );
              const __marko_internal_rendered_6 = Marko._.renderTemplate(
                __marko_internal_tag_12,
              )()()({
                value: key,
              });
              const hoistedFromForIn = __marko_internal_rendered_6.return.value;
              return () => {
                return new (class MarkoReturn<Return = void> {
                  [Marko._.scope] = { hoistedFromForIn };
                  declare return: Return;
                  constructor(_?: Return) {}
                })();
              };
            })(),
            [/*@a*/ Symbol.iterator]: Marko._.any,
          },
        }),
      ),
    },
  );
  const __marko_internal_tag_13 = Marko._.interpolated`effect`;
  Marko._.renderDynamicTag(__marko_internal_tag_13)()()({
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
        /*for*/ to: 10,
      },
      (index) => ({
        ["a" /*@a*/]: {
          ["renderBody" /*@a*/]: (() => {
            index;
            return () => {
              return Marko._.voidReturn;
            };
          })(),
          [/*@a*/ Symbol.iterator]: Marko._.any,
        },
      }),
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
          /*for*/ from: 1,
          to: 10,
        },
        (index) => ({
          ["a" /*@a*/]: {
            ["renderBody" /*@a*/]: (() => {
              index;
              return () => {
                return Marko._.voidReturn;
              };
            })(),
            [/*@a*/ Symbol.iterator]: Marko._.any,
          },
        }),
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
          /*for*/ to: 10,
          step: 2,
        },
        (index) => ({
          ["a" /*@a*/]: {
            ["renderBody" /*@a*/]: (() => {
              index;
              return () => {
                return Marko._.voidReturn;
              };
            })(),
            [/*@a*/ Symbol.iterator]: Marko._.any,
          },
        }),
      ),
    },
  );
  const __marko_internal_tag_17 = custom;
  Marko._.attrTagNames(__marko_internal_tag_17, (input) => {
    input["@a"];
  });
  const __marko_internal_rendered_7 = Marko._.renderDynamicTag(
    __marko_internal_tag_17,
  )()()(
    //      ^?
    {
      ...Marko._.forToAttrTag(
        {
          /*for*/ to: 10,
        },
        (index) => ({
          ["a" /*@a*/]: {
            ["renderBody" /*@a*/]: (() => {
              const __marko_internal_tag_18 = Marko._.resolveTemplate(
                import("../../../components/const/index.marko"),
              );
              const __marko_internal_rendered_8 = Marko._.renderTemplate(
                __marko_internal_tag_18,
              )()()({
                value: index,
              });
              const hoistedFromForTo = __marko_internal_rendered_8.return.value;
              return () => {
                return new (class MarkoReturn<Return = void> {
                  [Marko._.scope] = { hoistedFromForTo };
                  declare return: Return;
                  constructor(_?: Return) {}
                })();
              };
            })(),
            [/*@a*/ Symbol.iterator]: Marko._.any,
          },
        }),
      ),
    },
  );
  const __marko_internal_tag_19 = Marko._.interpolated`effect`;
  Marko._.renderDynamicTag(__marko_internal_tag_19)()()({
    value() {
      hoistedFromForTo;
      //^?
    },
  });
  const { hoistedFromForOf, hoistedFromForIn, hoistedFromForTo } =
    Marko._.readScopes({
      __marko_internal_rendered_2,
      __marko_internal_rendered_5,
      __marko_internal_rendered_7,
    });
  Marko._.noop({
    hoistedFromForOf,
    hoistedFromForIn,
    hoistedFromForTo,
    component,
    state,
    out,
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
