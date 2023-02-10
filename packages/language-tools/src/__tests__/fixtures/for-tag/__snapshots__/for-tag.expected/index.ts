import "@marko/language-tools/script.internals";
import "../../lib-fixtures/marko.d.ts";
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
    Marko._.renderTemplate(import("../../components/let/index.marko"))({
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
  const { value: list } = Marko._.rendered.returns[1];
  Marko._.forTag({
    of: list,
    [/*for*/ "renderBody"]: Marko._.body(function* () {}),
  });
  Marko._.forTag({
    of: list,
    [/*for*/ "renderBody"]: Marko._.body(function* (item, index, all) {
      item;
      index;
      all;
    }),
  });
  Marko._.assertRendered(
    Marko._.rendered,
    2,
    Marko._.forTag({
      of: list,
      [/*for*/ "renderBody"]: Marko._.body(function* (item) {
        Marko._.assertRendered(
          Marko._.rendered,
          3,
          Marko._.renderTemplate(import("../../components/const/index.marko"))({
            /*const*/
            value: item,
          })
        );
        const {
          value: { value: hoistedFromForOf },
        } = Marko._.rendered.returns[3];
        yield { hoistedFromForOf };
      }),
    })
  );
  Marko._.forTag({
    of: list,
  });
  Marko._.renderDynamicTag(effect)({
    /*effect*/
    value() {
      hoistedFromForOf;
    },
  });
  Marko._.assertRendered(
    Marko._.rendered,
    4,
    Marko._.renderTemplate(import("../../components/let/index.marko"))({
      /*let*/
      value: { a: 1, b: 2 } as const,
    })
  );
  const { value: record } = Marko._.rendered.returns[4];
  Marko._.forTag({
    in: record,
    [/*for*/ "renderBody"]: Marko._.body(function* (key, value) {
      key;
      value;
    }),
  });
  Marko._.assertRendered(
    Marko._.rendered,
    5,
    Marko._.forTag({
      in: record,
      [/*for*/ "renderBody"]: Marko._.body(function* (key) {
        Marko._.assertRendered(
          Marko._.rendered,
          6,
          Marko._.renderTemplate(import("../../components/const/index.marko"))({
            /*const*/
            value: key,
          })
        );
        const { value: hoistedFromForIn } = Marko._.rendered.returns[6];
        yield { hoistedFromForIn };
      }),
    })
  );
  Marko._.renderDynamicTag(effect)({
    /*effect*/
    value() {
      hoistedFromForIn;
    },
  });
  Marko._.forTag({
    to: 10,
    [/*for*/ "renderBody"]: Marko._.body(function* (index) {
      index;
    }),
  });
  Marko._.forTag({
    from: 1,
    to: 10,
    [/*for*/ "renderBody"]: Marko._.body(function* (index) {
      index;
    }),
  });
  Marko._.forTag({
    to: 10,
    step: 2,
    [/*for*/ "renderBody"]: Marko._.body(function* (index) {
      index;
    }),
  });
  Marko._.assertRendered(
    Marko._.rendered,
    7,
    Marko._.forTag({
      to: 10,
      [/*for*/ "renderBody"]: Marko._.body(function* (index) {
        Marko._.assertRendered(
          Marko._.rendered,
          8,
          Marko._.renderTemplate(import("../../components/const/index.marko"))({
            /*const*/
            value: index,
          })
        );
        const { value: hoistedFromForTo } = Marko._.rendered.returns[8];
        yield { hoistedFromForTo };
      }),
    })
  );
  Marko._.renderDynamicTag(effect)({
    /*effect*/
    value() {
      hoistedFromForTo;
    },
  });
  Marko._.forTag({
    [/*for*/ "renderBody"]: Marko._.body(function* (index) {}),
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

  _<__marko_internal_input = unknown>(
    input: Marko._.Relate<Input, __marko_internal_input>
  ): Marko._.ReturnWithScope<
    __marko_internal_input,
    ReturnType<typeof __marko_internal_template>
  >;
}> {})();
