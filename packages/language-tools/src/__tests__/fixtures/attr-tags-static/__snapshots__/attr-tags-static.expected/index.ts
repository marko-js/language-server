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
        Marko.ᜭ.assertRendered(
          Marko.ᜭ.rendered,
          1,
          Marko.ᜭ.render(custom)({
            /*custom*/
            b: [
              {
                /*@b*/
              },
              {
                /*@b*/
                c: 2,
              },
            ],
            a: {
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
          })
        );
        Marko.ᜭ.render(effect)({
          /*effect*/
          value() {
            hoistedFromStaticMember;
          },
        });
        const { hoistedFromStaticMember } = Marko.ᜭ.readScopes(
          Marko.ᜭ.rendered
        );
        Marko.ᜭ.noop({ hoistedFromStaticMember });
        return;
      })();
    }
  }
);
