export interface Input {}
abstract class Component extends Marko.Component<Input> {}
export { type Component };
(function (this: void) {
  const input = Marko._.any as Input;
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context)
  );
  const out = Marko._.out;
  Marko._.noop({ input, component, state, out, $global });
  Marko._.renderDynamicTag(custom)()()({
    ...Marko._.forAttrTag(
      {
        /*for*/
      },
      () => ({
        [Marko._.never]() {
          const attrTags = Marko._.attrTagNames(this);
          attrTags["@a"];
        },
        ["a" /*@a*/]: {
          [Symbol.iterator]: Marko._.any,
          /*@a*/
        },
      })
    ),
  });
  Marko._.assertRendered(
    Marko._.rendered,
    1,
    Marko._.renderTemplate(import("../../components/let/index.marko"))()()({
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
    ...Marko._.forAttrTag(
      {
        of: list,
      },
      () => ({
        [Marko._.never]() {
          const attrTags = Marko._.attrTagNames(this);
          attrTags["@a"];
        },
        ["a" /*@a*/]: {
          [Symbol.iterator]: Marko._.any,
          /*@a*/
        },
      })
    ),
  });
  Marko._.renderDynamicTag(custom)()()({
    ...Marko._.forAttrTag(
      {
        of: list,
      },
      (item, index, all) => ({
        [Marko._.never]() {
          const attrTags = Marko._.attrTagNames(this);
          attrTags["@a"];
        },
        ["a" /*@a*/]: {
          ["renderBody" /*@a*/]: (() => {
            item;
            index;
            all;
            return () => {
              return Marko._.voidReturn;
            };
          })(),
          [Symbol.iterator]: Marko._.any,
        },
      })
    ),
  });
  Marko._.renderDynamicTag(custom)()()({
    ...Marko._.forAttrTag(
      {
        of: list,
      },
      (item, index) => ({
        [Marko._.never]() {
          const attrTags = Marko._.attrTagNames(this);
          attrTags["@a"];
          attrTags["@b"];
        },
        ["a" /*@a*/]: {
          ["renderBody" /*@a*/]: (() => {
            item;
            return () => {
              return Marko._.voidReturn;
            };
          })(),
          [Symbol.iterator]: Marko._.any,
        },
        ["b" /*@b*/]: {
          ["renderBody" /*@b*/]: (() => {
            index;
            return () => {
              return Marko._.voidReturn;
            };
          })(),
          [Symbol.iterator]: Marko._.any,
        },
      })
    ),
  });
  Marko._.assertRendered(
    Marko._.rendered,
    2,
    Marko._.renderDynamicTag(custom)()()({
      ...Marko._.forAttrTag(
        {
          of: list,
        },
        (item) => ({
          [Marko._.never]() {
            const attrTags = Marko._.attrTagNames(this);
            attrTags["@a"];
          },
          ["a" /*@a*/]: {
            ["renderBody" /*@a*/]: (() => {
              Marko._.assertRendered(
                Marko._.rendered,
                3,
                Marko._.renderTemplate(
                  import("../../components/const/index.marko")
                )()()({
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
            [Symbol.iterator]: Marko._.any,
          },
        })
      ),
    })
  );
  Marko._.renderDynamicTag(effect)()()({
    value() {
      hoistedFromForOf;
    },
  });
  Marko._.assertRendered(
    Marko._.rendered,
    4,
    Marko._.renderTemplate(import("../../components/let/index.marko"))()()({
      value: { a: 1, b: 2 } as const,
    })
  );
  const record = Marko._.rendered.returns[4].value;
  Marko._.renderDynamicTag(custom)()()({
    ...Marko._.forAttrTag(
      {
        in: record,
      },
      (key, value) => ({
        [Marko._.never]() {
          const attrTags = Marko._.attrTagNames(this);
          attrTags["@a"];
        },
        ["a" /*@a*/]: {
          ["renderBody" /*@a*/]: (() => {
            key;
            value;
            return () => {
              return Marko._.voidReturn;
            };
          })(),
          [Symbol.iterator]: Marko._.any,
        },
      })
    ),
  });
  Marko._.assertRendered(
    Marko._.rendered,
    5,
    Marko._.renderDynamicTag(custom)()()({
      ...Marko._.forAttrTag(
        {
          in: record,
        },
        (key) => ({
          [Marko._.never]() {
            const attrTags = Marko._.attrTagNames(this);
            attrTags["@a"];
          },
          ["a" /*@a*/]: {
            ["renderBody" /*@a*/]: (() => {
              Marko._.assertRendered(
                Marko._.rendered,
                6,
                Marko._.renderTemplate(
                  import("../../components/const/index.marko")
                )()()({
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
            [Symbol.iterator]: Marko._.any,
          },
        })
      ),
    })
  );
  Marko._.renderDynamicTag(effect)()()({
    value() {
      hoistedFromForIn;
    },
  });
  Marko._.renderDynamicTag(custom)()()({
    ...Marko._.forAttrTag(
      {
        to: 10,
      },
      (index) => ({
        [Marko._.never]() {
          const attrTags = Marko._.attrTagNames(this);
          attrTags["@a"];
        },
        ["a" /*@a*/]: {
          ["renderBody" /*@a*/]: (() => {
            index;
            return () => {
              return Marko._.voidReturn;
            };
          })(),
          [Symbol.iterator]: Marko._.any,
        },
      })
    ),
  });
  Marko._.renderDynamicTag(custom)()()({
    ...Marko._.forAttrTag(
      {
        from: 1,
        to: 10,
      },
      (index) => ({
        [Marko._.never]() {
          const attrTags = Marko._.attrTagNames(this);
          attrTags["@a"];
        },
        ["a" /*@a*/]: {
          ["renderBody" /*@a*/]: (() => {
            index;
            return () => {
              return Marko._.voidReturn;
            };
          })(),
          [Symbol.iterator]: Marko._.any,
        },
      })
    ),
  });
  Marko._.renderDynamicTag(custom)()()({
    ...Marko._.forAttrTag(
      {
        to: 10,
        step: 2,
      },
      (index) => ({
        [Marko._.never]() {
          const attrTags = Marko._.attrTagNames(this);
          attrTags["@a"];
        },
        ["a" /*@a*/]: {
          ["renderBody" /*@a*/]: (() => {
            index;
            return () => {
              return Marko._.voidReturn;
            };
          })(),
          [Symbol.iterator]: Marko._.any,
        },
      })
    ),
  });
  Marko._.assertRendered(
    Marko._.rendered,
    7,
    Marko._.renderDynamicTag(custom)()()({
      ...Marko._.forAttrTag(
        {
          to: 10,
        },
        (index) => ({
          [Marko._.never]() {
            const attrTags = Marko._.attrTagNames(this);
            attrTags["@a"];
          },
          ["a" /*@a*/]: {
            ["renderBody" /*@a*/]: (() => {
              Marko._.assertRendered(
                Marko._.rendered,
                8,
                Marko._.renderTemplate(
                  import("../../components/const/index.marko")
                )()()({
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
            [Symbol.iterator]: Marko._.any,
          },
        })
      ),
    })
  );
  Marko._.renderDynamicTag(effect)()()({
    value() {
      hoistedFromForTo;
    },
  });
  const { hoistedFromForOf, hoistedFromForIn, hoistedFromForTo } =
    Marko._.readScopes(Marko._.rendered);
  Marko._.noop({ hoistedFromForOf, hoistedFromForIn, hoistedFromForTo });
  return;
})();
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

  _(): () => <__marko_internal_input extends unknown>(
    input: Marko.Directives &
      Input &
      Marko._.Relate<__marko_internal_input, Marko.Directives & Input>
  ) => Marko._.ReturnWithScope<__marko_internal_input, void>;
}> {})();
