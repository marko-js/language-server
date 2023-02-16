export interface Input {}
abstract class Component extends Marko.Component<Input> {}
export { type Component };
function __marko_internal_template(this: void) {
  const input = 1 as any as Input;
  const component = 1 as any as Component;
  const out = Marko._.out;
  const state = Marko._.state(component);
  Marko._.noop({ input, out, component, state });
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
  Marko._.forTag({
    of: list,
    [/*for*/ "renderBody"]: () => {
      return Marko._.voidReturn;
    },
  });
  Marko._.forTag({
    of: list,
    [/*for*/ "renderBody"]: (item, index, all) => {
      item;
      index;
      all;
      return Marko._.voidReturn;
    },
  });
  Marko._.assertRendered(
    Marko._.rendered,
    2,
    Marko._.forTag({
      of: list,
      [/*for*/ "renderBody"]: (item) => {
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
        const { value: hoistedFromForOf } = Marko._.rendered.returns[3].value;
        return new (class MarkoReturn<Return = void> {
          [Marko._.scope] = { hoistedFromForOf };
          declare return: Return;
          constructor(_?: Return) {}
        })();
      },
    })
  );
  Marko._.forTag({
    of: list,
    [/*for*/ "renderBody"]: (item) => {
      return Marko._.voidReturn;
    },
  });
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
  Marko._.forTag({
    in: record,
    [/*for*/ "renderBody"]: (key, value) => {
      key;
      value;
      return Marko._.voidReturn;
    },
  });
  Marko._.assertRendered(
    Marko._.rendered,
    5,
    Marko._.forTag({
      in: record,
      [/*for*/ "renderBody"]: (key) => {
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
        return new (class MarkoReturn<Return = void> {
          [Marko._.scope] = { hoistedFromForIn };
          declare return: Return;
          constructor(_?: Return) {}
        })();
      },
    })
  );
  Marko._.renderDynamicTag(effect)()()({
    /*effect*/
    value() {
      hoistedFromForIn;
    },
  });
  Marko._.forTag({
    to: 10,
    [/*for*/ "renderBody"]: (index) => {
      index;
      return Marko._.voidReturn;
    },
  });
  Marko._.forTag({
    from: 1,
    to: 10,
    [/*for*/ "renderBody"]: (index) => {
      index;
      return Marko._.voidReturn;
    },
  });
  Marko._.forTag({
    to: 10,
    step: 2,
    [/*for*/ "renderBody"]: (index) => {
      index;
      return Marko._.voidReturn;
    },
  });
  Marko._.assertRendered(
    Marko._.rendered,
    7,
    Marko._.forTag({
      to: 10,
      [/*for*/ "renderBody"]: (index) => {
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
        return new (class MarkoReturn<Return = void> {
          [Marko._.scope] = { hoistedFromForTo };
          declare return: Return;
          constructor(_?: Return) {}
        })();
      },
    })
  );
  Marko._.renderDynamicTag(effect)()()({
    /*effect*/
    value() {
      hoistedFromForTo;
    },
  });
  Marko._.forTag({
    [/*for*/ "renderBody"]: (index) => {
      return Marko._.voidReturn;
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

  _<__marko_internal_apply>(): __marko_internal_apply extends 0
    ? () => <__marko_internal_input>(
        input: Marko._.Matches<Input, __marko_internal_input>
      ) => Marko._.ReturnWithScope<
        __marko_internal_input,
        ReturnType<typeof __marko_internal_template>
      >
    : () => <__marko_internal_input>(
        input: Marko._.Matches<Input, __marko_internal_input>
      ) => Marko._.ReturnWithScope<
        __marko_internal_input,
        ReturnType<typeof __marko_internal_template>
      >;
}> {})();
