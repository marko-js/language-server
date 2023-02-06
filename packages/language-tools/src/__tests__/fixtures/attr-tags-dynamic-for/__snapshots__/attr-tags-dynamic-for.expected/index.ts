export interface Input {}
class Component extends Marko.Component<Input> {}
export { type Component };
export default Marko.ᜭ.instance(
  class extends Marko.Template {
    /**
     * @internal
     * Do not use or you will be fired.
     */
    public ᜭ<ᜭ = unknown>(input: Marko.ᜭ.Relate<Input, ᜭ>) {
      return Marko.ᜭ.returnWithScope(input as any as ᜭ, this.#ᜭ());
    }
    #ᜭ() {
      const input = 1 as unknown as Input;
      const component = Marko.ᜭ.instance(Component);
      const out = 1 as unknown as Marko.Out;
      const state = Marko.ᜭ.state(component);
      Marko.ᜭ.noop({ input, out, component, state });
      return (function (this: void) {
        Marko.ᜭ.render(custom)({
          /*custom*/
          ...Marko.ᜭ.forAttrTag(
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
        Marko.ᜭ.assertRendered(
          Marko.ᜭ.rendered,
          1,
          (
            1 as any as Marko.ᜭ.CustomTagRenderer<
              typeof import("../../components/let/index.marko").default
            >
          )({
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
        const { value: list } = Marko.ᜭ.rendered.returns[1];
        Marko.ᜭ.render(custom)({
          /*custom*/
          ...Marko.ᜭ.forAttrTag(
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
        Marko.ᜭ.render(custom)({
          /*custom*/
          ...Marko.ᜭ.forAttrTag(
            {
              /*for*/
              of: list,
            },
            (item, index, all) => ({
              a: {
                /*@a*/
                /*@a*/
                ["renderBody"]: Marko.ᜭ.inlineBody(
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
        Marko.ᜭ.render(custom)({
          /*custom*/
          ...Marko.ᜭ.forAttrTag(
            {
              /*for*/
              of: list,
            },
            (item, index) => ({
              a: {
                /*@a*/
                /*@a*/
                ["renderBody"]: Marko.ᜭ.inlineBody(
                  (() => {
                    item;
                  })()
                ),
              },
              b: {
                /*@b*/
                /*@b*/
                ["renderBody"]: Marko.ᜭ.inlineBody(
                  (() => {
                    index;
                  })()
                ),
              },
            })
          ),
        });
        Marko.ᜭ.assertRendered(
          Marko.ᜭ.rendered,
          2,
          Marko.ᜭ.render(custom)({
            /*custom*/
            ...Marko.ᜭ.forAttrTag(
              {
                /*for*/
                of: list,
              },
              (item) => ({
                a: {
                  /*@a*/
                  /*@a*/
                  ["renderBody"]: Marko.ᜭ.inlineBody(
                    (() => {
                      Marko.ᜭ.assertRendered(
                        Marko.ᜭ.rendered,
                        3,
                        (
                          1 as any as Marko.ᜭ.CustomTagRenderer<
                            typeof import("../../components/const/index.marko").default
                          >
                        )({
                          /*const*/
                          value: item,
                        })
                      );
                      const {
                        value: { value: hoistedFromForOf },
                      } = Marko.ᜭ.rendered.returns[3];
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
        Marko.ᜭ.render(effect)({
          /*effect*/
          value() {
            hoistedFromForOf;
          },
        });
        Marko.ᜭ.assertRendered(
          Marko.ᜭ.rendered,
          4,
          (
            1 as any as Marko.ᜭ.CustomTagRenderer<
              typeof import("../../components/let/index.marko").default
            >
          )({
            /*let*/
            value: { a: 1, b: 2 } as const,
          })
        );
        const { value: record } = Marko.ᜭ.rendered.returns[4];
        Marko.ᜭ.render(custom)({
          /*custom*/
          ...Marko.ᜭ.forAttrTag(
            {
              /*for*/
              in: record,
            },
            (key, value) => ({
              a: {
                /*@a*/
                /*@a*/
                ["renderBody"]: Marko.ᜭ.inlineBody(
                  (() => {
                    key;
                    value;
                  })()
                ),
              },
            })
          ),
        });
        Marko.ᜭ.assertRendered(
          Marko.ᜭ.rendered,
          5,
          Marko.ᜭ.render(custom)({
            /*custom*/
            ...Marko.ᜭ.forAttrTag(
              {
                /*for*/
                in: record,
              },
              (key) => ({
                a: {
                  /*@a*/
                  /*@a*/
                  ["renderBody"]: Marko.ᜭ.inlineBody(
                    (() => {
                      Marko.ᜭ.assertRendered(
                        Marko.ᜭ.rendered,
                        6,
                        (
                          1 as any as Marko.ᜭ.CustomTagRenderer<
                            typeof import("../../components/const/index.marko").default
                          >
                        )({
                          /*const*/
                          value: key,
                        })
                      );
                      const { value: hoistedFromForIn } =
                        Marko.ᜭ.rendered.returns[6];
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
        Marko.ᜭ.render(effect)({
          /*effect*/
          value() {
            hoistedFromForIn;
          },
        });
        Marko.ᜭ.render(custom)({
          /*custom*/
          ...Marko.ᜭ.forAttrTag(
            {
              /*for*/
              to: 10,
            },
            (index) => ({
              a: {
                /*@a*/
                /*@a*/
                ["renderBody"]: Marko.ᜭ.inlineBody(
                  (() => {
                    index;
                  })()
                ),
              },
            })
          ),
        });
        Marko.ᜭ.render(custom)({
          /*custom*/
          ...Marko.ᜭ.forAttrTag(
            {
              /*for*/
              from: 1,
              to: 10,
            },
            (index) => ({
              a: {
                /*@a*/
                /*@a*/
                ["renderBody"]: Marko.ᜭ.inlineBody(
                  (() => {
                    index;
                  })()
                ),
              },
            })
          ),
        });
        Marko.ᜭ.render(custom)({
          /*custom*/
          ...Marko.ᜭ.forAttrTag(
            {
              /*for*/
              to: 10,
              step: 2,
            },
            (index) => ({
              a: {
                /*@a*/
                /*@a*/
                ["renderBody"]: Marko.ᜭ.inlineBody(
                  (() => {
                    index;
                  })()
                ),
              },
            })
          ),
        });
        Marko.ᜭ.assertRendered(
          Marko.ᜭ.rendered,
          7,
          Marko.ᜭ.render(custom)({
            /*custom*/
            ...Marko.ᜭ.forAttrTag(
              {
                /*for*/
                to: 10,
              },
              (index) => ({
                a: {
                  /*@a*/
                  /*@a*/
                  ["renderBody"]: Marko.ᜭ.inlineBody(
                    (() => {
                      Marko.ᜭ.assertRendered(
                        Marko.ᜭ.rendered,
                        8,
                        (
                          1 as any as Marko.ᜭ.CustomTagRenderer<
                            typeof import("../../components/const/index.marko").default
                          >
                        )({
                          /*const*/
                          value: index,
                        })
                      );
                      const { value: hoistedFromForTo } =
                        Marko.ᜭ.rendered.returns[8];
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
        Marko.ᜭ.render(effect)({
          /*effect*/
          value() {
            hoistedFromForTo;
          },
        });
        const { hoistedFromForOf, hoistedFromForIn, hoistedFromForTo } =
          Marko.ᜭ.readScopes(Marko.ᜭ.rendered);
        Marko.ᜭ.noop({ hoistedFromForOf, hoistedFromForIn, hoistedFromForTo });
        return;
      })();
    }
  }
);
