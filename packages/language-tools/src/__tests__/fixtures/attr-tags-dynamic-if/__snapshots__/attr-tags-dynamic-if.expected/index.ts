const x = 1;
const y = 2;
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
          x: 1,
          ...(x
            ? {
                a: {
                  /*@a*/
                },
              }
            : {}),
        });
        Marko.ᜭ.render(custom)({
          /*custom*/
          x: 1,
          ...(x ? {} : {}),
        });
        Marko.ᜭ.render(custom)({
          /*custom*/
          x: 1,
          ...(x
            ? {
                a: {
                  /*@a*/
                },
              }
            : {
                a: {
                  /*@a*/
                },
              }),
        });
        Marko.ᜭ.render(custom)({
          /*custom*/
          x: 1,
          ...(x
            ? {
                a: {
                  /*@a*/
                },
              }
            : y
            ? {
                a: {
                  /*@a*/
                },
              }
            : !y
            ? {
                a: {
                  /*@a*/
                },
              }
            : {
                a: {
                  /*@a*/
                },
              }),
        });
        Marko.ᜭ.render(custom)({
          /*custom*/
          x: 1,
          ...(x
            ? {
                a: {
                  /*@a*/
                },
              }
            : undefined
            ? {
                a: {
                  /*@a*/
                },
              }
            : {}),
        });
        Marko.ᜭ.render(custom)({
          /*custom*/
          x: 1,
          ...(x
            ? {
                a: {
                  /*@a*/
                },
              }
            : {}),
        });
        Marko.ᜭ.render(custom)({
          /*custom*/
          x: 1,
          ...(undefined
            ? {
                a: {
                  /*@a*/
                },
              }
            : {}),
        });
        Marko.ᜭ.render(custom)({
          /*custom*/
          x: 1,
          ...Marko.ᜭ.mergeAttrTags(
            x
              ? {
                  a: {
                    /*@a*/
                  },
                }
              : {},
            y
              ? {
                  b: {
                    /*@b*/
                  },
                }
              : {}
          ),
        });
        Marko.ᜭ.assertRendered(
          Marko.ᜭ.rendered,
          1,
          Marko.ᜭ.render(custom)({
            /*custom*/
            x: 1,
            ...Marko.ᜭ.mergeAttrTags(
              {
                a: /* hi*/ {
                  /*@a*/
                  b: 1,
                  /*@a*/
                  ["renderBody"]: Marko.ᜭ.inlineBody(
                    (() => {
                      Marko.ᜭ.assertRendered(
                        Marko.ᜭ.rendered,
                        2,
                        (
                          1 as any as Marko.ᜭ.CustomTagRenderer<
                            typeof import("../../components/const/index.marko").default
                          >
                        )({
                          /*const*/
                          value: 1 as const,
                        })
                      );
                      const { value: hoistedFromStaticMember } =
                        Marko.ᜭ.rendered.returns[2];
                      return {
                        scope: { hoistedFromStaticMember },
                      };
                    })()
                  ),
                },
                b: {
                  /*@b*/
                },
              },
              x
                ? {
                    b: {
                      /*@b*/
                      /*@b*/
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
                              value: 2 as const,
                            })
                          );
                          const { value: hoistedFromDynamicMember } =
                            Marko.ᜭ.rendered.returns[3];
                          return {
                            scope: { hoistedFromDynamicMember },
                          };
                        })()
                      ),
                    },
                  }
                : {},
              y
                ? {
                    a: {
                      /*@a*/
                    },
                  }
                : {}
            ),
          })
        );
        Marko.ᜭ.render(effect)({
          /*effect*/
          value() {
            hoistedFromStaticMember;
            hoistedFromDynamicMember; // TODO: this should be better and include `undefined` as a possible value
          },
        });
        const { hoistedFromStaticMember, hoistedFromDynamicMember } =
          Marko.ᜭ.readScopes(Marko.ᜭ.rendered);
        Marko.ᜭ.noop({ hoistedFromStaticMember, hoistedFromDynamicMember });
        return;
      })();
    }
  }
);
