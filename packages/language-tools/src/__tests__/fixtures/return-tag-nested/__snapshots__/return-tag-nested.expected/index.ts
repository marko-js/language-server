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
        (
          1 as any as Marko.ᜭ.CustomTagRenderer<
            typeof import("./components/test-tag.marko").default
          >
        )({
          /*test-tag*/
          /*test-tag*/
          ["renderBody"]: Marko.ᜭ.body(function* (a) {
            a;
            return;
          }),
        });
        (
          1 as any as Marko.ᜭ.CustomTagRenderer<
            typeof import("./components/test-tag.marko").default
          >
        )({
          /*test-tag*/
          /*test-tag*/
          ["renderBody"]: Marko.ᜭ.body(function* (a) {
            const ᜭ = {
              return: Marko.ᜭ.returnTag({
                /*return*/
                value: a,
              }),
            };
            return ᜭ.return;
          }),
        });
        (
          1 as any as Marko.ᜭ.CustomTagRenderer<
            typeof import("./components/test-tag.marko").default
          >
        )({
          /*test-tag*/
          /*test-tag*/
          ["renderBody"]: Marko.ᜭ.inlineBody(
            (() => {
              const ᜭ = {
                return: Marko.ᜭ.returnTag({
                  /*return*/
                  value: "b" as const,
                }),
              };
              return {
                return: ᜭ.return,
              };
            })()
          ),
        });
        (
          1 as any as Marko.ᜭ.CustomTagRenderer<
            typeof import("./components/test-tag.marko").default
          >
        )({
          /*test-tag*/
          /*test-tag*/
          ["renderBody"]: Marko.ᜭ.inlineBody(
            (() => {
              const ᜭ = {
                return: Marko.ᜭ.returnTag({
                  /*return*/
                  value: "c" as const,
                }),
              };
              return {
                return: ᜭ.return,
              };
            })()
          ),
        });
        Marko.ᜭ.assertRendered(
          Marko.ᜭ.rendered,
          1,
          (
            1 as any as Marko.ᜭ.CustomTagRenderer<
              typeof import("./components/test-tag.marko").default
            >
          )({
            /*test-tag*/
            /*test-tag*/
            ["renderBody"]: Marko.ᜭ.inlineBody(
              (() => {
                Marko.ᜭ.assertRendered(
                  Marko.ᜭ.rendered,
                  2,
                  (
                    1 as any as Marko.ᜭ.CustomTagRenderer<
                      typeof import("../../components/let/index.marko").default
                    >
                  )({
                    /*let*/
                    value: 1 as const,
                  })
                );
                const { value: hoisted } = Marko.ᜭ.rendered.returns[2];
                const ᜭ = {
                  return: Marko.ᜭ.returnTag({
                    /*return*/
                    value: "b" as const,
                  }),
                };
                return {
                  scope: { hoisted },
                  return: ᜭ.return,
                };
              })()
            ),
          })
        );
        () => {
          hoisted;
        };
        const { hoisted } = Marko.ᜭ.readScopes(Marko.ᜭ.rendered);
        Marko.ᜭ.noop({ hoisted });
        return;
      })();
    }
  }
);
