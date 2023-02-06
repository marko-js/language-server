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
          (1 as any as Marko.ᜭ.NativeTagRenderer<"div">)({
            /*div*/
            /*div*/
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
                    value: 1,
                  })
                );
                const { value: x } = Marko.ᜭ.rendered.returns[2];
                x;
                Marko.ᜭ.assertRendered(
                  Marko.ᜭ.rendered,
                  3,
                  (1 as any as Marko.ᜭ.NativeTagRenderer<"button">)({
                    /*button*/
                    onClick() {
                      ᜭ.mutate.x = 2;
                      ᜭ.mutate.x++;
                      ++ᜭ.mutate.x;
                    },
                  })
                );
                const { value: el } = Marko.ᜭ.rendered.returns[3];
                const ᜭ = {
                  mutate: Marko.ᜭ.mutable([
                    ["x", "value", Marko.ᜭ.rendered.returns[2]],
                  ] as const),
                };
                Marko.ᜭ.noop({ x });
                return {
                  scope: { x, el },
                };
              })()
            ),
          })
        );
        Marko.ᜭ.render(effect)({
          /*effect*/
          value() {
            console.log(el());
          },
        });
        x;
        const { x, el } = Marko.ᜭ.readScopes(Marko.ᜭ.rendered);
        Marko.ᜭ.noop({ x, el });
        return;
      })();
    }
  }
);
