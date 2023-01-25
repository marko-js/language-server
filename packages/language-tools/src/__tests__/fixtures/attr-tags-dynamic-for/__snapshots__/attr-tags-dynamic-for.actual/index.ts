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
  Marko.ட.render(custom)({
    /*custom*/
    ...Marko.ட.forAttrTag(
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
  Marko.ட.render(custom)({
    /*custom*/
    ...Marko.ட.forAttrTag(
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
  Marko.ட.render(custom)({
    /*custom*/
    ...Marko.ட.forAttrTag(
      {
        /*for*/
        of: list,
      },
      (item, index, all) => ({
        a: {
          /*@a*/
          /*@a*/
          ["renderBody"]: Marko.ட.inlineBody(
            (() => {
              item;
              index;
              all;
            })()
          ),
        },
      })
    ),
  });
  Marko.ட.render(custom)({
    /*custom*/
    ...Marko.ட.forAttrTag(
      {
        /*for*/
        of: list,
      },
      (item, index) => ({
        a: {
          /*@a*/
          /*@a*/
          ["renderBody"]: Marko.ட.inlineBody(
            (() => {
              item;
            })()
          ),
        },
        b: {
          /*@b*/
          /*@b*/
          ["renderBody"]: Marko.ட.inlineBody(
            (() => {
              index;
            })()
          ),
        },
      })
    ),
  });
  Marko.ட.assertRendered(
    Marko.ட.rendered,
    2,
    Marko.ட.render(custom)({
      /*custom*/
      ...Marko.ட.forAttrTag(
        {
          /*for*/
          of: list,
        },
        (item) => ({
          a: {
            /*@a*/
            /*@a*/
            ["renderBody"]: Marko.ட.inlineBody(
              (() => {
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
                return {
                  scope: { hoistedFromForOf },
                };
              })()
            ),
          },
        })
      ),
    })
  );
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
  Marko.ட.render(custom)({
    /*custom*/
    ...Marko.ட.forAttrTag(
      {
        /*for*/
        in: record,
      },
      (key, value) => ({
        a: {
          /*@a*/
          /*@a*/
          ["renderBody"]: Marko.ட.inlineBody(
            (() => {
              key;
              value;
            })()
          ),
        },
      })
    ),
  });
  Marko.ட.assertRendered(
    Marko.ட.rendered,
    5,
    Marko.ட.render(custom)({
      /*custom*/
      ...Marko.ட.forAttrTag(
        {
          /*for*/
          in: record,
        },
        (key) => ({
          a: {
            /*@a*/
            /*@a*/
            ["renderBody"]: Marko.ட.inlineBody(
              (() => {
                Marko.ட.assertRendered(
                  Marko.ட.rendered,
                  6,
                  ˍ.tags["const"]({
                    /*const*/
                    value: key,
                  })
                );
                const { value: hoistedFromForIn } = Marko.ட.rendered.returns[6];
                return {
                  scope: { hoistedFromForIn },
                };
              })()
            ),
          },
        })
      ),
    })
  );
  Marko.ட.render(effect)({
    /*effect*/
    value() {
      hoistedFromForIn;
    },
  });
  Marko.ட.render(custom)({
    /*custom*/
    ...Marko.ட.forAttrTag(
      {
        /*for*/
        to: 10,
      },
      (index) => ({
        a: {
          /*@a*/
          /*@a*/
          ["renderBody"]: Marko.ட.inlineBody(
            (() => {
              index;
            })()
          ),
        },
      })
    ),
  });
  Marko.ட.render(custom)({
    /*custom*/
    ...Marko.ட.forAttrTag(
      {
        /*for*/
        from: 1,
        to: 10,
      },
      (index) => ({
        a: {
          /*@a*/
          /*@a*/
          ["renderBody"]: Marko.ட.inlineBody(
            (() => {
              index;
            })()
          ),
        },
      })
    ),
  });
  Marko.ட.render(custom)({
    /*custom*/
    ...Marko.ட.forAttrTag(
      {
        /*for*/
        to: 10,
        step: 2,
      },
      (index) => ({
        a: {
          /*@a*/
          /*@a*/
          ["renderBody"]: Marko.ட.inlineBody(
            (() => {
              index;
            })()
          ),
        },
      })
    ),
  });
  Marko.ட.assertRendered(
    Marko.ட.rendered,
    7,
    Marko.ட.render(custom)({
      /*custom*/
      ...Marko.ட.forAttrTag(
        {
          /*for*/
          to: 10,
        },
        (index) => ({
          a: {
            /*@a*/
            /*@a*/
            ["renderBody"]: Marko.ட.inlineBody(
              (() => {
                Marko.ட.assertRendered(
                  Marko.ட.rendered,
                  8,
                  ˍ.tags["const"]({
                    /*const*/
                    value: index,
                  })
                );
                const { value: hoistedFromForTo } = Marko.ட.rendered.returns[8];
                return {
                  scope: { hoistedFromForTo },
                };
              })()
            ),
          },
        })
      ),
    })
  );
  Marko.ட.render(effect)({
    /*effect*/
    value() {
      hoistedFromForTo;
    },
  });
  const { hoistedFromForOf, hoistedFromForIn, hoistedFromForTo } =
    Marko.ட.readScopes(Marko.ட.rendered);
  Marko.ட.noop({ hoistedFromForOf, hoistedFromForIn, hoistedFromForTo });
  return;
}
class ட extends Marko.Component<Input> {}
declare namespace ˍ {
  const id: unique symbol;
  const template: Marko.Template<typeof id>;
  const tags: {
    let: Marko.ட.CustomTagRenderer<
      typeof import("/Users/dpiercey/dev/marko-js/language-server/packages/language-tools/src/__tests__/components/let/index.marko").default
    >;
    const: Marko.ட.CustomTagRenderer<
      typeof import("/Users/dpiercey/dev/marko-js/language-server/packages/language-tools/src/__tests__/components/const/index.marko").default
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
