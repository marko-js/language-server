export interface Input {}
abstract class Component extends Marko.Component<Input> {}
export { type Component };
function __marko_internal_template(this: void) {
  const input = 1 as any as Input;
  const component = 1 as any as Component;
  const out = Marko._.out;
  const state = Marko._.state(component);
  Marko._.noop({ input, out, component, state });
  Marko._.renderDynamicTag(custom)()()({
    /*custom*/
    ...Marko._.forAttrTag(
      {
        /*for*/
      },
      () => ({
        a: {
          /*@a*/
        },
      })
    ),
  });
  Marko._.assertRendered(
    Marko._.rendered,
    1,
    Marko._.renderTemplate(import("../../components/let/index.marko"))()()({
      /*let*/
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
    })
  );
  const list = Marko._.rendered.returns[1].value;
  Marko._.renderDynamicTag(custom)()()({
    /*custom*/
    ...Marko._.forAttrTag(
      {
        /*for*/
        of: list,
      },
      () => ({
        a: {
          /*@a*/
        },
      })
    ),
  });
  Marko._.renderDynamicTag(custom)()()({
    /*custom*/
    ...Marko._.forAttrTag(
      {
        /*for*/
        of: list,
      },
      (item, index, all) => ({
        a: {
          /*@a*/
          /*@a*/
          ["renderBody"]: (() => {
            item;
            index;
            all;
            return () => {
              return Marko._.voidReturn;
            };
          })(),
        },
      })
    ),
  });
  Marko._.renderDynamicTag(custom)()()({
    /*custom*/
    ...Marko._.forAttrTag(
      {
        /*for*/
        of: list,
      },
      (item, index) => ({
        a: {
          /*@a*/
          /*@a*/
          ["renderBody"]: (() => {
            item;
            return () => {
              return Marko._.voidReturn;
            };
          })(),
        },
        b: {
          /*@b*/
          /*@b*/
          ["renderBody"]: (() => {
            index;
            return () => {
              return Marko._.voidReturn;
            };
          })(),
        },
      })
    ),
  });
  Marko._.assertRendered(
    Marko._.rendered,
    2,
    Marko._.renderDynamicTag(custom)()()({
      /*custom*/
      ...Marko._.forAttrTag(
        {
          /*for*/
          of: list,
        },
        (item) => ({
          a: {
            /*@a*/
            /*@a*/
            ["renderBody"]: (() => {
              Marko._.assertRendered(
                Marko._.rendered,
                3,
                Marko._.renderTemplate(
                  import("../../components/const/index.marko")
                )()()({
                  /*const*/
                  value: item,
                })
              );
              const { value: hoistedFromForOf } =
                Marko._.rendered.returns[3].value;
              return () => {
                return new (class MarkoReturn<Return = void> {
                  [Marko._.scope] = { hoistedFromForOf };
                  declare return: Return;
                  constructor(_?: Return) {}
                })();
              };
            })(),
          },
        })
      ),
    })
  );
  Marko._.renderDynamicTag(effect)()()({
    /*effect*/
    value() {
      hoistedFromForOf;
    },
  });
  Marko._.assertRendered(
    Marko._.rendered,
    4,
    Marko._.renderTemplate(import("../../components/let/index.marko"))()()({
      /*let*/
      value: { a: 1, b: 2 } as const,
    })
  );
  const record = Marko._.rendered.returns[4].value;
  Marko._.renderDynamicTag(custom)()()({
    /*custom*/
    ...Marko._.forAttrTag(
      {
        /*for*/
        in: record,
      },
      (key, value) => ({
        a: {
          /*@a*/
          /*@a*/
          ["renderBody"]: (() => {
            key;
            value;
            return () => {
              return Marko._.voidReturn;
            };
          })(),
        },
      })
    ),
  });
  Marko._.assertRendered(
    Marko._.rendered,
    5,
    Marko._.renderDynamicTag(custom)()()({
      /*custom*/
      ...Marko._.forAttrTag(
        {
          /*for*/
          in: record,
        },
        (key) => ({
          a: {
            /*@a*/
            /*@a*/
            ["renderBody"]: (() => {
              Marko._.assertRendered(
                Marko._.rendered,
                6,
                Marko._.renderTemplate(
                  import("../../components/const/index.marko")
                )()()({
                  /*const*/
                  value: key,
                })
              );
              const hoistedFromForIn = Marko._.rendered.returns[6].value;
              return () => {
                return new (class MarkoReturn<Return = void> {
                  [Marko._.scope] = { hoistedFromForIn };
                  declare return: Return;
                  constructor(_?: Return) {}
                })();
              };
            })(),
          },
        })
      ),
    })
  );
  Marko._.renderDynamicTag(effect)()()({
    /*effect*/
    value() {
      hoistedFromForIn;
    },
  });
  Marko._.renderDynamicTag(custom)()()({
    /*custom*/
    ...Marko._.forAttrTag(
      {
        /*for*/
        to: 10,
      },
      (index) => ({
        a: {
          /*@a*/
          /*@a*/
          ["renderBody"]: (() => {
            index;
            return () => {
              return Marko._.voidReturn;
            };
          })(),
        },
      })
    ),
  });
  Marko._.renderDynamicTag(custom)()()({
    /*custom*/
    ...Marko._.forAttrTag(
      {
        /*for*/
        from: 1,
        to: 10,
      },
      (index) => ({
        a: {
          /*@a*/
          /*@a*/
          ["renderBody"]: (() => {
            index;
            return () => {
              return Marko._.voidReturn;
            };
          })(),
        },
      })
    ),
  });
  Marko._.renderDynamicTag(custom)()()({
    /*custom*/
    ...Marko._.forAttrTag(
      {
        /*for*/
        to: 10,
        step: 2,
      },
      (index) => ({
        a: {
          /*@a*/
          /*@a*/
          ["renderBody"]: (() => {
            index;
            return () => {
              return Marko._.voidReturn;
            };
          })(),
        },
      })
    ),
  });
  Marko._.assertRendered(
    Marko._.rendered,
    7,
    Marko._.renderDynamicTag(custom)()()({
      /*custom*/
      ...Marko._.forAttrTag(
        {
          /*for*/
          to: 10,
        },
        (index) => ({
          a: {
            /*@a*/
            /*@a*/
            ["renderBody"]: (() => {
              Marko._.assertRendered(
                Marko._.rendered,
                8,
                Marko._.renderTemplate(
                  import("../../components/const/index.marko")
                )()()({
                  /*const*/
                  value: index,
                })
              );
              const hoistedFromForTo = Marko._.rendered.returns[8].value;
              return () => {
                return new (class MarkoReturn<Return = void> {
                  [Marko._.scope] = { hoistedFromForTo };
                  declare return: Return;
                  constructor(_?: Return) {}
                })();
              };
            })(),
          },
        })
      ),
    })
  );
  Marko._.renderDynamicTag(effect)()()({
    /*effect*/
    value() {
      hoistedFromForTo;
    },
  });
  const { hoistedFromForOf, hoistedFromForIn, hoistedFromForTo } =
    Marko._.readScopes(Marko._.rendered);
  Marko._.noop({ hoistedFromForOf, hoistedFromForIn, hoistedFromForTo });
  return;
}
export default new (class Template extends Marko._.Template<{
  render(
    input: Marko.TemplateInput<Input>,
    stream?: {
      write: (chunk: string) => void;
      end: (chunk?: string) => void;
    }
  ): Marko.Out<Component>;

  renderSync(input: Marko.TemplateInput<Input>): Marko.RenderResult<Component>;

  renderToString(input: Marko.TemplateInput<Input>): string;

  stream(
    input: Marko.TemplateInput<Input>
  ): ReadableStream<string> & NodeJS.ReadableStream;

  _(): () => <__marko_internal_input>(
    input: Input & Marko._.Relate<__marko_internal_input, Input>
  ) => Marko._.ReturnWithScope<
    __marko_internal_input,
    ReturnType<typeof __marko_internal_template>
  >;
}> {})();
