export type Input = Record<string, never>;
function ˍ(input: Input) {
  const out = 1 as unknown as Marko.Out;
  const component = 1 as unknown as ட;
  const state = 1 as unknown as typeof component extends {
    state: infer State extends object;
  }
    ? State
    : never;
  Marko.ட.noop({ input, out, component, state });
  Marko.ட.assertRendered(
    Marko.ட.rendered,
    1,
    ˍ.tags["let"]({
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
  const { value: list } = Marko.ட.rendered.returns[1];
  Marko.ட.forTag({
    of: list,
    [/*for*/ "renderBody"]: Marko.ட.body(function* () {}),
  });
  Marko.ட.forTag({
    of: list,
    [/*for*/ "renderBody"]: Marko.ட.body(function* (item, index, all) {
      item;
      index;
      all;
    }),
  });
  Marko.ட.assertRendered(
    Marko.ட.rendered,
    2,
    Marko.ட.forTag({
      of: list,
      [/*for*/ "renderBody"]: Marko.ட.body(function* (item) {
        Marko.ட.assertRendered(
          Marko.ட.rendered,
          3,
          ˍ.tags["const"]({
            /*const*/
            value: item,
          })
        );
        const {
          value: { value: hoistedFromForOf },
        } = Marko.ட.rendered.returns[3];
        yield { hoistedFromForOf };
      }),
    })
  );
  Marko.ட.forTag({
    of: list,
  });
  Marko.ட.render(effect)({
    /*effect*/
    value() {
      hoistedFromForOf;
    },
  });
  Marko.ட.assertRendered(
    Marko.ட.rendered,
    4,
    ˍ.tags["let"]({
      /*let*/
      value: { a: 1, b: 2 } as const,
    })
  );
  const { value: record } = Marko.ட.rendered.returns[4];
  Marko.ட.forTag({
    in: record,
    [/*for*/ "renderBody"]: Marko.ட.body(function* (key, value) {
      key;
      value;
    }),
  });
  Marko.ட.assertRendered(
    Marko.ட.rendered,
    5,
    Marko.ட.forTag({
      in: record,
      [/*for*/ "renderBody"]: Marko.ட.body(function* (key) {
        Marko.ட.assertRendered(
          Marko.ட.rendered,
          6,
          ˍ.tags["const"]({
            /*const*/
            value: key,
          })
        );
        const { value: hoistedFromForIn } = Marko.ட.rendered.returns[6];
        yield { hoistedFromForIn };
      }),
    })
  );
  Marko.ட.render(effect)({
    /*effect*/
    value() {
      hoistedFromForIn;
    },
  });
  Marko.ட.forTag({
    to: 10,
    [/*for*/ "renderBody"]: Marko.ட.body(function* (index) {
      index;
    }),
  });
  Marko.ட.forTag({
    from: 1,
    to: 10,
    [/*for*/ "renderBody"]: Marko.ட.body(function* (index) {
      index;
    }),
  });
  Marko.ட.forTag({
    to: 10,
    step: 2,
    [/*for*/ "renderBody"]: Marko.ட.body(function* (index) {
      index;
    }),
  });
  Marko.ட.assertRendered(
    Marko.ட.rendered,
    7,
    Marko.ட.forTag({
      to: 10,
      [/*for*/ "renderBody"]: Marko.ட.body(function* (index) {
        Marko.ட.assertRendered(
          Marko.ட.rendered,
          8,
          ˍ.tags["const"]({
            /*const*/
            value: index,
          })
        );
        const { value: hoistedFromForTo } = Marko.ட.rendered.returns[8];
        yield { hoistedFromForTo };
      }),
    })
  );
  Marko.ட.render(effect)({
    /*effect*/
    value() {
      hoistedFromForTo;
    },
  });
  Marko.ட.forTag({
    [/*for*/ "renderBody"]: Marko.ட.body(function* (index) {}),
  });
  const { hoistedFromForOf, hoistedFromForIn, hoistedFromForTo } =
    Marko.ட.readScopes(Marko.ட.rendered);
  Marko.ட.noop({ hoistedFromForOf, hoistedFromForIn, hoistedFromForTo });
  return;
}
class ட extends Marko.Component<Input> {}
declare namespace ˍ {
  const id: "@language-tools/src/__tests__/fixtures/for-tag/index.marko";
  const template: Marko.Template<typeof id>;
  const tags: {
    let: Marko.ட.CustomTagRenderer<
      typeof import("../../components/let/index.marko").default
    >;
    const: Marko.ட.CustomTagRenderer<
      typeof import("../../components/const/index.marko").default
    >;
  };
}
export default 1 as unknown as typeof ˍ.template;
declare global {
  namespace Marko {
    interface CustomTags {
      [ˍ.id]: CustomTag<Input, ReturnType<typeof ˍ>, ட>;
    }
  }
}
